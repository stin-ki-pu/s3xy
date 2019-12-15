import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true};

@Injectable({
  providedIn: 'root'
})

export class DataService {

  accessKey: string;
  secretKey: string;
  s3: S3;
  serverEndpoint = 'http://127.0.0.1:1607';
  cephEndpoint = 'http://127.0.0.1:80';

  constructor(private http: HttpClient) { }

  connect(accessKey, secretKey) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.s3 = new S3({
      endpoint: 'http://127.0.0.1:80',
      credentials: new AWS.Credentials(this.accessKey, this.secretKey)
    });
    return from(
      this.http.post(
        this.serverEndpoint + '/api/login',
        {'access-key': this.accessKey, 'secret-key': this.secretKey},
        httpOptions).toPromise()
    );
  }

  listBuckets(): Observable<any> {
    return from(this.http.get(this.serverEndpoint + '/api/buckets', httpOptions));
  }

  createBucket(bucketName: string) {
    return from(
      this.http.post(this.serverEndpoint + '/api/buckets', { name: bucketName }, httpOptions).toPromise()
    );
  }

  deleteBucket(bucketName: string) {
    return from(
      this.http.delete(this.serverEndpoint + '/api/buckets/' + bucketName, httpOptions).toPromise()
    );
  }

  getBucketInfo(bucketName: string) {
    return from(
      this.http.get(`${this.serverEndpoint}/api/buckets/${bucketName}`, httpOptions).toPromise()
    );
  }

  getBucketObjects(bucketName: string) {
    return from(
      this.http.get(`${this.serverEndpoint}/api/buckets/${bucketName}/objects`, httpOptions).toPromise()
    );
  }


}
