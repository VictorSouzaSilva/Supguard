from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    load_dotenv()
    from .config import Config

    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)  

    from . import models, models_incidente  # noqa: F401

    from .routes import api as api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    from .supguard_incidentes import incidentes_bp
    app.register_blueprint(incidentes_bp, url_prefix="/api")

    return app
