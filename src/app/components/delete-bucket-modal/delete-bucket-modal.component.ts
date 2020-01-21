import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-bucket-modal',
  templateUrl: './delete-bucket-modal.component.html',
  styleUrls: ['./delete-bucket-modal.component.scss']
})
export class DeleteBucketModalComponent {
  deleteBucketName: string;
  constructor(@Inject(MAT_DIALOG_DATA) public bucketName: string, private data: DataService, private snackBar: MatSnackBar) {}

  deleteBucket() {
    if (this.deleteBucketName === this.bucketName)  {
      this.data.deleteBucket(this.bucketName).subscribe(() => {
        this.snackBar.open(`Bucket ${this.bucketName} deleted successfully`, 'OK');
      }, (err) => {
        this.snackBar.open(`Error: ${err.error}`, 'Dissmiss', {panelClass: 'danger'});
      });
    } else {
      this.snackBar.open(`Wrong bucket name confirmation (${this.bucketName} != ${this.deleteBucketName})`, 'OK');
    }

  }
}

