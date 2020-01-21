from flask import request

from app import app


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')


@app.route('/buckets', methods=['POST'])
def list_buckets():
    data = request.json()


if __name__ == '__main__':
    app.run("localhost", 1607)
