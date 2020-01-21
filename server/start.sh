#!/usr/bin/env bash
service nginx start
#uwsgi --ini uwsgi.ini

uwsgi --socket /tmp/uwsgi.socket --wsgi-file app.py --callable app --processes 4 --threads 2 --uid www-data --gid www-data #--stats 127.0.0.1:9191