from flask import Blueprint, request, jsonify
import math
from datetime import datetime, timedelta
from .models_incidente import Incidente
from . import db

incidentes_bp = Blueprint('incidentes', __name__)

TIPOS_PERMITIDOS = {"Assalto", "Homicídio", "Agressão física", "Estupro / abuso Sexual", "Vandalismo", 
"Arrombamento", "Disparo de arma de fogo", "Acidente de trânsito", "Corrida Clandestina", "Tráfico"}

def haversine_km(lat1, lon1, lat2, lon2):
  R = 6371.0
  p1, p2 = math.radians(lat1), math.radians(lat2)
  dphi = math.radians(lat2 - lat1)
  dlambda = math.radians(lon2 - lon1)
  a = math.sin(dphi/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dlambda/2)**2
  return 2 * R * math.asin(math.sqrt(a))

@incidentes_bp.route('/incidentes', methods=['POST'])
def criar_incidente():
  data = request.get_json() or {}
  tipo = data.get('tipo')
  descricao = data.get('descricao')
  lat = data.get('lat')
  lon = data.get('lon')

  if tipo not in TIPOS_PERMITIDOS:
    return jsonify({'error': 'tipo inválido'}), 400
  try:
    lat = float(lat); lon = float(lon)
  except Exception:
    return jsonify({'error': 'lat/lon inválidos'}), 400

  dez_min_atras = datetime.utcnow() - timedelta(minutes=10)
  similares = (Incidente.query
               .filter(Incidente.created_at >= dez_min_atras,
                       Incidente.tipo == tipo)
               .all())
  for p in similares:
    if haversine_km(lat, lon, p.lat, p.lon) < 0.1:
      return jsonify({'error': 'relato duplicado recentemente'}), 409

  inc = Incidente(tipo=tipo, descricao=descricao, lat=lat, lon=lon,
                  status='validado', fonte='usuario')
  db.session.add(inc)
  db.session.commit()
  return jsonify({'message': 'Incidente criado', 'id': inc.id}), 201

@incidentes_bp.route('/incidentes', methods=['GET'])
def listar_incidentes():
  q = Incidente.query
  tipo = request.args.get('tipo')
  status = request.args.get('status')
  since_str = request.args.get('since')
  periodo = request.args.get('periodo')  # 'hoje', 'semana', 'mes'
  
  if tipo:
    q = q.filter(Incidente.tipo == tipo)
  if status:
    q = q.filter(Incidente.status == status)
  if since_str:
    try:
      since_dt = datetime.fromisoformat(since_str.replace('Z',''))
      q = q.filter(Incidente.created_at >= since_dt)
    except Exception:
      return jsonify({'error': 'since inválido (use ISO8601)'}), 400
  
  # Filtro por período: hoje, últimos 7 dias, este mês
  if periodo == 'hoje':
    from datetime import timedelta
    today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    q = q.filter(Incidente.created_at >= today)
  elif periodo == 'semana':
    from datetime import timedelta
    week_ago = datetime.utcnow() - timedelta(days=7)
    q = q.filter(Incidente.created_at >= week_ago)
  elif periodo == 'mes':
    from datetime import timedelta
    month_ago = datetime.utcnow() - timedelta(days=30)
    q = q.filter(Incidente.created_at >= month_ago)

  items = q.order_by(Incidente.created_at.desc()).limit(1000).all()
  out = [{
    'id': i.id, 'tipo': i.tipo, 'descricao': i.descricao,
    'lat': i.lat, 'lon': i.lon,
    'created_at': i.created_at.isoformat() + 'Z',
    'status': i.status
  } for i in items]
  return jsonify(out), 200

@incidentes_bp.route('/health', methods=['GET'])
def health():
  return jsonify({'ok': True})
