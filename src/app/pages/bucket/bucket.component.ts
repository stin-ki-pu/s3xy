import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
import { PutObjectModalComponent } from 'src/app/components/put-object-modal/put-object-modal.component';
import { CreateFolderModalComponent } from 'src/app/components/create-folder-modal/create-folder-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  currentDir: string;
  constructor(private data: DataService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute, 
              private cd: ChangeDetectorRef, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.bucketName = this.route.snapshot.paramMap.get('bucket_name');
    this.currentDir = '';
    this.load();
  }

  load() {
    const bucketInfoObservable = this.data.getBucketInfo(this.bucketName);
    const bucketObjectsObservable = this.data.getBucketObjects(this.bucketName);
    forkJoin([bucketInfoObservable, bucketObjectsObservable]).subscribe(results => {
      setTimeout(() => {
        this.bucketInfo$ = results[0];
        this.bucketObjects$ = results[1];
        this.root = new Directory('/', null);
        for (const object of this.bucketObjects$) {
          const path = object.Key.split('/');
          object.Name = path[path.length - 1];
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
        this.loaded = true;
        this.dataSource.data = Object.values(this.root);
      }, 500);
    });
  }

  changeDir(dir: string) {
    this.currentDir = dir;
  }

  getObject(fileName) {
    window.location.href = this.data.getSignedObjectUrl(this.bucketName, fileName);
  }
  uploadObject() {
    const dialogRef = this.dialog.open(PutObjectModalComponent,
      {
        data: { bucketName: this.bucketName, path: this.currentDir},
        height: 'auto',
        width: '500px'
      });
    dialogRef.afterClosed().subscribe(() => { this.load(); });
  }
  deleteObject(objectName) {
    this.data.deleteObject(this.bucketName, objectName).subscribe(()=> {
      this.snackBar.open(`Deleted ${objectName} successfully`, 'Dismiss');
      this.load();
    },
    (err) => {
      this.snackBar.open(`Failed deleting ${objectName}: ${err.error}.`, 'Dismiss');
    });
  }
  createFolder() {
    const dialogRef = this.dialog.open(CreateFolderModalComponent, { height: 'auto',  width: '500px' });
    dialogRef.afterClosed().subscribe(foldername => {
      if (foldername) {
        let temp = this.root;
        const path = this.currentDir.split('/');
        if (path[0] !== '') {
          for (let i = 0; i < path.length; i++) {
            temp = temp.subDirectories[path[i]];
          }
        }
        temp.subDirectories[foldername] = new Directory(foldername, temp);
      }
      this.root = Object.assign({}, this.root);
      this.cd.detectChanges();
    });
  }
  hasChild(_: number, dir: Directory) { return Object.keys(dir.subDirectories).length > 0; }
}

