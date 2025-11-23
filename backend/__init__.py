from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    load_dotenv()
    from .config import Config

    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)  # <- registra Flask-Migrate (habilita "flask db ...")

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    # IMPORTANTE: importar os models para o Alembic enxergar
    from . import models, models_incidente

    from .routes import api as api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    from .supguard_incidentes import incidentes_bp
    app.register_blueprint(incidentes_bp, url_prefix="/api")

    return app
    return app
