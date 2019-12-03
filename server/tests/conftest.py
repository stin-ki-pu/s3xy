import pytest

from app import create_app


@pytest.fixture
def app_client():
    test_app = create_app(debug=True)
    test_app.config['TESTING'] = True
    return test_app.test_client()  # this is where the testing happens!
