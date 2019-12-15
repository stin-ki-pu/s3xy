import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Directory } from 'src/app/components/directory/directory.component';
import { createOutput } from '@angular/compiler/src/core';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {

  bucketName: string;
  bucketInfo$: object;
  bucketObjects$;
  root: Directory;
  loaded = false;
  treeControl = new NestedTreeControl<Directory>(dir => Object.values(dir.subDirectories));
  dataSource = new MatTreeNestedDataSource<Directory>();
  constructor(private data: DataService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.bucketName = this.route.snapshot.paramMap.get('bucket_name');
    this.load();
  }

  load() {
    let bucketInfo = this.data.getBucketInfo(this.bucketName);
    let bucketObjects = this.data.getBucketObjects(this.bucketName);
    forkJoin([bucketInfo, bucketObjects]).subscribe(results => {
      setTimeout(() => {
        this.bucketInfo$ = results[0];
        this.bucketObjects$ = results[1];
        this.root = new Directory('/', null);
        for (const object of this.bucketObjects$) {
          const path = object['Key'].split('/');
          let curPath = this.root;
          for (let i = 0; i < path.length - 1; i++) {
            const folder = path[i];
            if (!(folder in curPath.subDirectories)) {
              curPath.subDirectories[folder] = new Directory(folder, curPath);
            }
            curPath = curPath.subDirectories[folder];
          }
          curPath.objects.push(object);
        }
        console.log(this.root);
        this.loaded = true;
        this.dataSource.data = Object.values(this.root);
        /*this.bucketInfo$ = data.buckets;
        this.buckets.forEach((bucket) => {
          bucket.created_at = new Date(bucket.CreationDate).toLocaleDateString();
          setTimeout(() => {
            this.data.getBucketInfo(bucket.Name).subscribe((bucketInfo) => {
            bucket.info = bucketInfo;
              });
            }, 50);
        });
        */
      }, 500);
    });
  }

  hasChild(_: number, dir: Directory) { return Object.keys(dir.subDirectories).length > 0; }
}

