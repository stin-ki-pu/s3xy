import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteBucketModalComponent } from '../delete-bucket-modal/delete-bucket-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.scss']
})
export class BucketsComponent implements OnInit {
  loaded = false;
  buckets: Array<any>;
  createdBucketName = '';
  constructor(private data: DataService, private dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.data.listBuckets().subscribe((d) => {
      setTimeout(() => {
        this.buckets = d.buckets;
        this.buckets.forEach((bucket) => {
          bucket.created_at = new Date(bucket.CreationDate).toLocaleDateString();
          setTimeout(() => {
            this.data.getBucketInfo(bucket.Name).subscribe((bucketInfo) => {
            bucket.info = bucketInfo;
              });
            }, 50);
        });
        this.loaded = true;
      }, 500);
    });
  }

  createBucket() {
    if (this.createdBucketName === '') {
      this.snack.open(`Please specify name.`, 'Dismiss', {panelClass: 'danger'});
    } else {
    this.data.createBucket(this.createdBucketName).subscribe(() => {
      this.load();
      this.snack.open(`bucket ${this.createdBucketName} created successfully`, 'Dismiss');
      this.createdBucketName = '';
      this.flip();
    },
    (err) => {this.snack.open(err.error, 'Dismiss', {panelClass: 'danger'}); });
    }
  }

  deleteBucket(bucketName: string) {
    const dialogRef = this.dialog.open(DeleteBucketModalComponent, {data: bucketName, height: '350px', width: '500px'});
    dialogRef.afterClosed().subscribe(() => this.load());
  }

  flip() {
    document.getElementById('createFlipped').classList.toggle('flipped');
  }
}
