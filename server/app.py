from os import getenv

from flask import Flask, request, session
from flask_session import Session
from routes.buckets import buckets
from routes.login import login
from utils.exceptions import ApiUnauthorized, ApiException


def create_app(debug=False):
    app = Flask(__name__, static_folder='../dist/s3xy/')
    app.debug = debug

    # Initialize session
    app.config.from_object("config.Config")

    Session(app)

    api_prefix = '/api'
    # Register Blueprints
    app.register_blueprint(login, url_prefix=api_prefix)
    app.register_blueprint(buckets, url_prefix=api_prefix)

    @app.before_request
    def before_request_func():
        # Enforce login
        if request.path != '/api/login' and request.method != 'OPTIONS':
            if session.get('access-key') is None or \
                    session.get('secret-key') is None:
                raise ApiUnauthorized('Please login.')

    @app.errorhandler(ApiException)
    def error_handler(error):
        return error.message, error.status_code

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', getenv('GUI_URL', 'http://localhost:4200'))
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, *')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response
    return app


app = create_app()
