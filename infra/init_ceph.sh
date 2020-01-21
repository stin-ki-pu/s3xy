docker rm -f ceph-nano-s3xy_ceph
if [ -z './cn' ]; then
       	curl -L https://github.com/ceph/cn/releases/download/v2.3.1/cn-v2.3.1-linux-amd64 -o cn && chmod +x cn
fi
./cn cluster start -d /tmp s3xy_ceph
docker exec -it ceph-nano-s3xy_ceph radosgw-admin user create --uid=s3xy --display-name="S3xy" --access-key s3xyAccessKey --secret-key s3xySecretKey 
docker exec -it ceph-nano-s3xy_ceph radosgw-admin user create --uid=foobar --display-name="Foobar" --access-key Foo --secret-key Bar
#docker exec -it ceph-nano-s3xy_ceph radosgw-admin key create --uid=s3xy --key-type=s3 --access-key s3xyAccessKey --secret-key s3xySecretKey
