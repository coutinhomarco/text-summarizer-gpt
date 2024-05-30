from flask import Flask
from dotenv import load_dotenv
import os

def create_app():
    app = Flask(__name__)
    load_dotenv()

    from . import routes
    app.register_blueprint(routes.bp)

    return app
