from flask import Blueprint, session, make_response, jsonify, request

from managers.ceph_manager import CephManager
from utils.validation_schemas import schemas
from utils.validator import json_schema_validator

buckets = Blueprint('login', __name__)


@buckets.route('/buckets', methods=['GET'], strict_slashes=False)
def list_buckets():
    ceph = CephManager.from_session(session=session)
    buckets_list = ceph.list_buckets()
    return make_response(jsonify(dict(buckets=buckets_list)), 200)


@buckets.route('/buckets', methods=['POST'], strict_slashes=False)
def create_bucket():
    """
    Creates a bucket and assigns the user's origin to the bucket's CORS
    """
    data = request.get_json()
    json_schema_validator(data, schema=schemas['create_bucket'])
    ceph = CephManager.from_session(session=session)
    ceph.create_buckets(bucket_name=data['bucket_name'])
    ceph.set_bucket_cors(bucket_name=data['bucket_name'], origins=[request.environ['HTTP_ORIGIN']])
    return make_response("", 200)

@buckets.route('/buckets/<bucket_name>', methods=['GET'], strict_slashes=False)
def get_bucket(bucket_name):
    ceph = CephManager.from_session(session=session)
