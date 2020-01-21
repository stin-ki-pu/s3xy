docker build -f ServerDockerfile -t s3xy-server ../server/
docker rm hara -f
docker run -p 1607:80 -d --name hara s3xy-server 
docker logs hara
