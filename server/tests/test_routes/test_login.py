class TestLogin:
    def test_login(self, app_client):
        response = app_client.post('/api/login', json={'access-key': "s3xyAccessKey", 'secret-key': "s3xySecretKey"})
        assert response.status_code == 200

        response = app_client.get('/api/login')
        assert response.status_code == 200
        assert response.get_json()

    def test_login_invalid_credentials(self, app_client):
        response = app_client.post('/api/login', json={'access-key': "BestAccessKeyEver", 'secret-key': "Shhhhhhhhh"})
        assert response.status_code == 401

        response = app_client.get('/api/login')
        assert response.status_code == 200
        assert not response.get_json()

    def test_logout(self, app_client):
        app_client.post('/api/login', json={'access-key': "s3xyAccessKey", 'secret-key': "s3xySecretKey"})

        response = app_client.get('/api/logout')
        assert response.status_code == 200

        response = app_client.get('/api/login')
        assert response.status_code == 200
        assert not response.get_json()
