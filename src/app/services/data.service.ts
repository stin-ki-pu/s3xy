import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'}), withCredentials: true};

@Injectable({
  providedIn: 'root'
})

export class DataService {

  accessKey: string;
  secretKey: string;
  s3: S3;
  serverEndpoint = environment.serverEndpoint;
  cephEndpoint = environment.cephEndpoint;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('accessKey')) {
      this.connect(sessionStorage.getItem('accessKey'),
                   sessionStorage.getItem('secretKey'));
    }
  }

  connect(accessKey, secretKey) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    sessionStorage.setItem('accessKey', accessKey);
    sessionStorage.setItem('secretKey', secretKey);
    AWS.config.update(
      {
        region: "us-east-1",
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
        s3ForcePathStyle: true,
      }
    );
    this.s3 = new S3({ endpoint: this.cephEndpoint });
    return from(
      this.http.post(
        this.serverEndpoint + '/api/login',
        {'access-key': this.accessKey, 'secret-key': this.secretKey},
        httpOptions).toPromise()
    );
  }

  logout() {
    this.accessKey = undefined;
    this.secretKey = undefined;
    this.s3 = undefined;
    sessionStorage.clear();
    return from(
      this.http.get(
        this.serverEndpoint + '/api/logout',
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

  getSignedObjectUrl(bucketName: string, fileName: string) {
    return this.s3.getSignedUrl('getObject', { Bucket: bucketName, Key: fileName });
  }

  getObject(bucketName: string, fileName: string) {
    return from(
      this.s3.getObject({ Bucket: bucketName, Key: fileName}).promise()
    );
    /*this.s3.getObject({ Bucket: bucketName, Key: fileName }, function (error, data) {
      if (error != null) {
        alert("Failed to retrieve an object: " + error);
      } else {
        alert(data.Body.toString('utf-8'));
        // do something with data.Body
      }
    });*/
  }

  deleteObject(bucketName: string, objectName: string) {
    return from(
      this.s3.deleteObject({ Bucket: bucketName, Key: objectName}).promise()
    );
  }

  putObject(bucektName: string, file, objectName: string | any = null) {
    if (objectName == null) {
      objectName = file.name;
    }
    return this.s3.upload({
      Bucket: bucektName,
      Key: objectName,
      ACL: 'private',
      Body: file,
      Metadata: {type: file.type }
    }, (err, data) => {
      if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

}
