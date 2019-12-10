from flask import Blueprint, session, make_response, jsonify, request

from managers.ceph_manager import CephManager
from utils.validation_schemas import schemas
from utils.validator import json_schema_validator

buckets = Blueprint('buckets', __name__)


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
    bucket = ceph.create_buckets(bucket_name=data['name'])
    if 'HTTP_ORIGIN' in request.environ:  # Only if the client is a browser this is needed
        ceph.set_bucket_cors(bucket_name=data['name'], origins=[request.environ['HTTP_ORIGIN']])
    return make_response(jsonify(bucket), 200)


# @buckets.route('/buckets/<bucket_name>/cors', methods=['GET'], strict_slashes=False)
# def get_bucket_cors(bucket_name):
#     ceph = CephManager.from_session(session=session)
#     bucket = ceph.get_bucket(bucket_name=bucket_name)
#     return make_response(jsonify(bucket), 200)
#
#
# @buckets.route('/buckets/<bucket_name>/cors', methods=['PUT'], strict_slashes=False)
# def set_bucket_cors(bucket_name):
#     ceph = CephManager.from_session(session=session)
#     bucket = ceph.get_bucket(bucket_name=bucket_name)
#     return make_response(jsonify(bucket), 200)


@buckets.route('/buckets/<bucket_name>', methods=['DELETE'], strict_slashes=False)
def delete_bucket(bucket_name):
    ceph = CephManager.from_session(session=session)
    ceph.delete_bucket(bucket_name)
    resp = make_response(jsonify(dict(msg=f"Bucket {bucket_name} deleted.")), 200)
    return resp


@buckets.route('/buckets/<bucket_name>', methods=['GET'], strict_slashes=False)
def get_bucket(bucket_name):
    ceph = CephManager.from_session(session=session)
    objects = ceph.list_object(bucket_name)
    if 'Contents' in objects:
        size = sum(objects['Contents'], lambda obj: obj['size'])
        length = len(objects['KeyCount'])
    else:
        size = 0
        length = 0
    response_data = dict(Name=bucket_name, Size=size, Length=length)
    return make_response(jsonify(response_data), 200)
