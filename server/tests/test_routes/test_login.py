class TestLogin:
    def test_login(self, app_client):
        app_client.post('/api/login',
                        json={'access-key': "BestAccessKeyAlive", 'secret-key': "Shhhhhhhhhhhh"})

        assert app_client.get('/api/login').json

    def test_logout(self, app_client):
        app_client.post('/api/login',
                        json={'access-key': "BestAccessKeyAlive", 'secret-key': "Shhhhhhhhhhhh"})

        app_client.get('/api/logout')
        assert not app_client.get('/api/login').json
