from flask import request, session, make_response, jsonify
from flask.blueprints import Blueprint
from jsonschema import validate, FormatChecker

from utils.validation_schemas import schemas
from utils.validator import json_schema_validator

login = Blueprint('login', __name__)


@login.route('/login', methods=['POST'], strict_slashes=False)
def login_route():
    data = request.json
    json_schema_validator(data=data, schema=schemas['login'])
    session['access-key'] = data['access-key']
    session['secret-key'] = data['secret-key']
    return make_response("", 200)


@login.route('/logout', methods=['GET'], strict_slashes=False)
def logout():
    session.clear()
    return make_response("", 200)


@login.route('/login', methods=['GET'], strict_slashes=False)
def check_login():
    if 'access-key' in session and \
            'secret-key' in session:
        return make_response(jsonify(True), 200)
    else:
        return make_response(jsonify(False), 200)
