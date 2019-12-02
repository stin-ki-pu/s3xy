import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  accessKey: string;
  secretKey: string;
  s3: S3;
  constructor() { }

  connect(accessKey, secretKey) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.s3 = new S3({
      endpoint: 'http://127.0.0.1:80',
      credentials: new AWS.Credentials(this.accessKey, this.secretKey)
    });
  }

  listBuckets() {
    return from(this.s3.listBuckets().promise());
  }

  createBucket(bucketName) {
    return from(this.s3.createBucket({
      Bucket: bucketName
    }).promise());
  }


}
