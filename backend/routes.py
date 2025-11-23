from flask import Blueprint, request, jsonify
from . import db
from .models import Usuario

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json(silent=True) or request.form.to_dict() or {}

    if 'name' in data and 'nome' not in data:
        data['nome'] = data.pop('name')
    if 'emailOrPhone' in data:
        v = (data.pop('emailOrPhone') or '').strip()
        if '@' in v:
            data['email'] = v
        else:
            data['telefone'] = v
    if 'password' in data and 'senha' not in data:
        data['senha'] = data.pop('password')

    nome = (data.get('nome') or '').strip()
    email = (data.get('email') or '').strip() or None
    senha = (data.get('senha') or '').strip()
    telefone = (data.get('telefone') or '').strip() or None

    if not nome or not senha or (not email and not telefone):
        return jsonify({'error': 'nome, senha e (email ou telefone) são obrigatórios'}), 400

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

@api.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})
