from flask import Blueprint, request, jsonify
from . import db
from .models import Usuario

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')
    telefone = data.get('telefone')

    if not all([nome, email, senha]):
        return jsonify({'error': 'nome, email e senha são obrigatórios'}), 400

    if Usuario.query.filter_by(email=email).first():
        return jsonify({'error': 'email já cadastrado'}), 409

    usuario = Usuario(nome=nome, email=email, senha=senha, telefone=telefone)
    db.session.add(usuario)
    db.session.commit()
    return jsonify({'message': 'Usuário cadastrado', 'id': usuario.id}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    senha = data.get('senha')

    usuario = Usuario.query.filter_by(email=email).first()
    if usuario and usuario.senha == senha:
        return jsonify({'message': 'Login OK'})
    return jsonify({'error': 'Falha no login'}), 401
