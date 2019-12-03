from flask import Flask, request, session
from flask_session import Session

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

    @app.before_request
    def before_request_func():
        # Enforce login
        if request.path != '/api/login':
            if session.get('access-key') is None or \
                    session.get('secret-key') is None:
                raise ApiUnauthorized('Please login.')

    @app.errorhandler(ApiException)
    def error_handler(error):
        return error.message, error.status_code

    return app


app = create_app()
