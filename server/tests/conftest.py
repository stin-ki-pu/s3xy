import pytest

from app import create_app


@pytest.fixture(scope="module")
def api_client():
    test_app = create_app(debug=True)
    test_app.config['TESTING'] = True
    return test_app.test_client()


@pytest.fixture(scope='module')
def app_client_logged(api_client):
    # Login the test user before testing:
    api_client.post('/api/login', json={'access-key': "s3xyAccessKey", 'secret-key': "s3xySecretKey"})

    return api_client
