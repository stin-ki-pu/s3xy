#!/bin/bash

cd ../
sudo ng build --outputPath=./server/static/
cd ./infra
docker-compose build 
docker-compose up -d
