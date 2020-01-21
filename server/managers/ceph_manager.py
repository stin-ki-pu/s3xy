from os import getenv

import boto3
from botocore.exceptions import ParamValidationError

from utils.exceptions import ApiNotFound, ApiBadRequest


class CephManager:
    endpoint = getenv('S3_ENDPOINT', 'http://127.0.0.1:8000')

    def __init__(self, secret_key, access_key):
        """
        :raises: ClientError in case the credentials are invalid
        """
        self.client = boto3.client(
            service_name='s3',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name='us-east-1',
            endpoint_url=self.endpoint,
            use_ssl=False,
            verify=False
        )
        self.list_buckets()

    @staticmethod
    def from_session(session):
        return CephManager(access_key=session['access-key'], secret_key=session['secret-key'])

    def list_buckets(self):
        return self.client.list_buckets()['Buckets']

    def create_buckets(self, bucket_name):
        try:
            return self.client.create_bucket(Bucket=bucket_name)
        except ParamValidationError as e:
            raise ApiBadRequest(e.kwargs['report'])

    def delete_bucket(self, bucket_name, force=False):
        try:
            return self.client.delete_bucket(Bucket=bucket_name)
        except self.client.exceptions.NoSuchBucket:
            raise ApiNotFound(f"Bucket {bucket_name} does not exist.")
        except self.client.exceptions.ClientError:
            raise ApiBadRequest(f"Bucket {bucket_name} is not empty.")

    def set_bucket_cors(self, bucket_name, headers=None, methods=None, origins=None):
        if methods is None:
            methods = ["GET", "POST", "DELETE", "PUT", "HEAD"]
        if headers is None:
            headers = ["Content-type", "*"]
        rules = {}
        if headers and type(headers) is list:
            rules["AllowedHeaders"] = headers
        if methods and type(methods) is list:
            rules["AllowedMethods"] = methods
        if origins and type(origins) is list:
            rules["AllowedOrigins"] = origins
        rules['ExposeHeaders'] = ['ETag']

        cors_configuration = {'CORSRules': [rules]}
        self.client.put_bucket_cors(Bucket=bucket_name, CORSConfiguration=cors_configuration)

    def list_object(self, bucket_name):
        try:
            return self.client.list_objects_v2(Bucket=bucket_name)
        except self.client.exceptions.NoSuchBucket:
            raise ApiNotFound(f"Bucket {bucket_name} does not exist.")
