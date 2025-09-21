from . import db  

class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    senha = db.Column(db.String(255), nullable=False)
    telefone = db.Column(db.String(30), nullable=True)

    def __init__(self, nome, email, senha, telefone=None):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.telefone = telefone

    def __repr__(self):
        return f"<Usuario {self.id} {self.email}>"
