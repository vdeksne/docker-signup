from app import create_app


def test_index():
    app = create_app()
    client = app.test_client()
    r = client.get('/')
    assert r.status_code == 200
    assert r.get_json()['message'] == 'Hello from Flask app'


def test_health():
    app = create_app()
    client = app.test_client()
    r = client.get('/health')
    assert r.status_code == 200
    assert r.get_json()['status'] == 'ok'
