from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

try:
    # tente reutilizar o db já criado pelo projeto
    from models import db  # type: ignore
except Exception:
    # fallback: se não houver 'models.py' com 'db', crie um novo (apenas para referência)
    db = SQLAlchemy()

class Incidente(db.Model):
    __tablename__ = "incidentes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=True)
    tipo = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default="validado")  
    fonte = db.Column(db.String(20), nullable=False, default="usuario")    
