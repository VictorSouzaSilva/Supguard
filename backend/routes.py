from flask import Blueprint, request, jsonify
from models import db, Usuario

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    
    usuario = Usuario(nome=nome, email=email, senha=senha)
    db.session.add(usuario)
    db.session.commit()

    return jsonify({'message': 'Registrado'}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    senha = data.get('senha')

    usuario = Usuario.query.filter_by(email=email).first()
    if usuario and usuario.senha == senha:
        return jsonify({'message': 'Login OK'})
    return jsonify({'error': 'Falha no login'}), 401
