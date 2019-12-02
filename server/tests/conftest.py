import pytest

from app import create_app


@pytest.yield_fixture
def app_client():
    test_app = create_app()
    test_app.testing = True

    # Establish an application context before running the tests.
    ctx = test_app.app_context()
    ctx.push()
    yield test_app.test_client()  # this is where the testing happens!
    ctx.pop()
