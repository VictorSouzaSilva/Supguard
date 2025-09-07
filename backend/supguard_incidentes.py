from flask import Blueprint, request, jsonify
import math
from datetime import datetime, timezone, timedelta
from .models_incidente import Incidente
from . import db

incidentes_bp = Blueprint('incidentes', __name__)

TIPOS_PERMITIDOS = {"roubo","furto","vandalismo","agressao","outros"}

def haversine_km(lat1, lon1, lat2, lon2):
    R = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2-lat1)
    dlambda = math.radians(lon2-lon1)
    a = math.sin(dphi/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dlambda/2)**2
    return 2*R*math.asin(math.sqrt(a))

@incidentes_bp.post('/incidentes')
def criar_incidente():
    data = request.get_json() or {}
    if not {'tipo','lat','lon'} <= set(data.keys()):
        return jsonify({'error':'Campos obrigatórios: tipo, lat, lon'}), 400
    if data['tipo'] not in TIPOS_PERMITIDOS:
        return jsonify({'error':'tipo inválido'}), 400
    try:
        lat = float(data['lat']); lon = float(data['lon'])
    except Exception:
        return jsonify({'error':'lat/lon inválidos'}), 400
    if not (-90 <= lat <= 90 and -180 <= lon <= 180):
        return jsonify({'error':'lat/lon fora de faixa'}), 400

    cinco_min = datetime.now(timezone.utc) - timedelta(minutes=5)
    if Incidente.query.filter(Incidente.created_at >= cinco_min).count() > 200:
        return jsonify({'error':'muitos relatos agora, tente mais tarde'}), 429

    dez_min = datetime.now(timezone.utc) - timedelta(minutes=10)
    similares = Incidente.query.filter(
        Incidente.tipo == data['tipo'],
        Incidente.created_at >= dez_min
    ).all()
    for p in similares:
        if haversine_km(lat, lon, p.lat, p.lon) < 0.1:
            return jsonify({'error':'relato duplicado recentemente'}), 409

    inc = Incidente(
        tipo=data['tipo'],
        descricao=data.get('descricao'),
        lat=lat, lon=lon,
        status='validado',   
        fonte='usuario'
    )
    db.session.add(inc)
    db.session.commit()
    return jsonify({'id': inc.id, 'status': inc.status}), 201

@incidentes_bp.get('/incidentes/<int:incidente_id>')
def obter_incidente(incidente_id):
    inc = Incidente.query.get_or_404(incidente_id)
    return jsonify({
        'id': inc.id, 'tipo': inc.tipo, 'descricao': inc.descricao,
        'lat': inc.lat, 'lon': inc.lon,
        'created_at': inc.created_at.isoformat()+'Z',
        'status': inc.status
    })

@incidentes_bp.get('/incidentes')
def listar_incidentes():
    """Lista incidentes (suporta bbox e since) – útil para o mapa depois."""
    bbox_str = request.args.get('bbox')
    since_str = request.args.get('since')

    q = Incidente.query.filter(Incidente.status == 'validado')

    if bbox_str:
        try:
            lat_min, lon_min, lat_max, lon_max = map(float, bbox_str.split(','))
            q = q.filter(
                Incidente.lat >= lat_min, Incidente.lat <= lat_max,
                Incidente.lon >= lon_min, Incidente.lon <= lon_max
            )
        except Exception:
            return jsonify({'error':'bbox inválido (lat_min,lon_min,lat_max,lon_max)'}), 400

    if since_str:
        try:
            since_dt = datetime.fromisoformat(since_str.replace('Z',''))
            q = q.filter(Incidente.created_at >= since_dt)
        except Exception:
            return jsonify({'error':'since inválido (use ISO8601 UTC)'}), 400

    items = q.order_by(Incidente.created_at.desc()).limit(1000).all()
    out = [{
        'id': i.id, 'tipo': i.tipo, 'descricao': i.descricao,
        'lat': i.lat, 'lon': i.lon,
        'created_at': i.created_at.isoformat()+'Z',
        'status': i.status
    } for i in items]
    return jsonify(out)
