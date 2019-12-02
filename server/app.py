import boto3
from flask import Flask
from flask_session import Session

from routes.login import login


def create_app():
    app = Flask(__name__, static_folder='../dist/s3xy/')
    # s3 = boto3.resource('s3')

    # Initialize session
    app.config.from_object("config.Config")
    Session(app)

    api_prefix = '/api'
    # Register Blueprints
    app.register_blueprint(login, url_prefix=api_prefix)

    return app


app = create_app()
