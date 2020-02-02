from flask import request

from app import app




@app.route('/buckets', methods=['POST'], strict_slashes=False)
def list_buckets():
    data = request.json()


if __name__ == '__main__':
    app.run("localhost", 1607)
