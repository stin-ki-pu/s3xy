import boto3


class CephManager:
    def __init__(self, secret_key, access_key, endpoint):
        """
        :raises: ClientError in case the credentials are invalid
        """
        self.client = boto3.client(
            service_name='s3',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            endpoint_url="http://" + endpoint,
            use_ssl=False,
            verify=False,
        )
        self.list_buckets()

    @staticmethod
    def from_session(session):
        return CephManager(session['access-key'], session['secret-key'], endpoint='127.0.0.1:8000')

    def list_buckets(self):
        return self.client.list_buckets()

    def create_buckets(self, bucket_name):
        return self.client.create_bucket(Bucket=bucket_name)

    def get_bucket(self, bucket_name):
        return self.client.get_bucket(bucket_name)

    def set_bucket_cors(self, bucket_name, headers, methods, origins):
        rules = []
        if headers and type(headers) is list:
            rules.append({"AllowedHeaders": headers})
        if methods and type(methods) is list:
            rules.append({"AllowedMethods": headers})
        if origins and type(origins) is list:
            rules.append({"AllowedOrigins": headers})

        cors_configuration = {'CORSRules': rules}
        self.client.put_bucket_cors(Bucket=bucket_name, CORSConfiguration=cors_configuration)
