from os import getenv

import redis


class Config:
    # Flask-Session
    SESSION_TYPE = "redis"
    SESSION_REDIS = redis.from_url(getenv('REDIS_URL', "redis://127.0.0.1:6379"))
