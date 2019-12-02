from flask import request

from app import app


@app.route('/')
def hello_world():
    return app.send_static_file('index.html')


@app.route('/buckets', methods=['POST'])
def list_buckets():
    data = request.json()


@app.before_request
def before_request_func():
    print(request.script_root)
    if request.script_root == '/login':
        print('lol')


if __name__ == '__main__':
    app.run('localhost', 5000)
