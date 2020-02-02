import os
from os import getenv

from flask import Flask, request, session, make_response, send_from_directory
from flask_session import Session

from managers.ceph_manager import CephManager
from routes.buckets import buckets
from routes.login import login
from utils.exceptions import ApiUnauthorized, ApiException


def create_app(debug=False):
    app = Flask(__name__, static_folder=None)
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
        if request.path.startswith('/api') and request.path not in (
                '/api/login', '/api/endpoint') and request.method != 'OPTIONS':
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

    @app.route('/api/endpoint')
    def get_endpoint():
        return make_response({'endpoint': CephManager.endpoint})

    @app.route('/', methods=['GET'], strict_slashes=False)
    def index():
        return send_from_directory('./static/', 'index.html')

    @app.route('/<path:path>', methods=['GET'], strict_slashes=False)
    def static(path):
        if os.path.exists(os.path.join('./static/', path)):
            return send_from_directory('./static/', path)
        else:
            return send_from_directory('./static/', 'index.html')

    print('HARARARARARA')
    return app


app = create_app()
