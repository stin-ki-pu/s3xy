#!/bin/bash

cd ../
sudo npm run build
cd ./infra
docker-compose build 
docker-compose up -d
