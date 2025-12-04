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


class Contato(db.Model):
    __tablename__ = "contatos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    assunto = db.Column(db.String(200), nullable=False)
    mensagem = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    def __init__(self, nome, email, assunto, mensagem):
        self.nome = nome
        self.email = email
        self.assunto = assunto
        self.mensagem = mensagem

    def __repr__(self):
        return f"<Contato {self.id} {self.email}>"

