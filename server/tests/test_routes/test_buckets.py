import random
import string

import pytest

from utils.exceptions import ApiNotFound


@pytest.mark.incremental
class TestBuckets:
    bucket_name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

    def test_create_bucket(self, app_client_logged):
        response = app_client_logged.post('/api/login',
                                          json={'access-key': "s3xyAccessKey", 'secret-key': "s3xySecretKey"})
        assert response.status_code == 200

        data = {"name": self.bucket_name}
        response = app_client_logged.post('/api/buckets', json=data)
        assert response.status_code == 200
        assert response.get_json()

    def test_list_buckets(self, app_client_logged):
        response = app_client_logged.get('/api/buckets')
        assert response.status_code == 200
        json = response.get_json()
        assert json['buckets']
        assert type(json['buckets']) is list
        assert len(json['buckets']) >= 1

    def test_get_bucket(self, app_client_logged):
        response = app_client_logged.get(f'/api/buckets/{self.bucket_name}')
        assert response.status_code == 200
        json = response.get_json()
        assert json['Name'] == self.bucket_name
        assert json['Size'] == 0
        assert json['Length'] == 0

    def test_delete_bucket(self, app_client_logged):
        response = app_client_logged.delete(f'/api/buckets/{self.bucket_name}')
        assert response.status_code == 200
        response = app_client_logged.get(f'/api/buckets/{self.bucket_name}')
        assert response.status_code == 404

    # def test_logout(self, app_client):
    #     app_client.post('/api/login', json={'access-key': "s3xyAccessKey", 'secret-key': "s3xySecretKey"})
    #
    #     response = app_client.get('/api/logout')
    #     assert response.status_code == 200
    #
    #     response = app_client.get('/api/login')
    #     assert response.status_code == 200
    #     assert not response.get_json()
