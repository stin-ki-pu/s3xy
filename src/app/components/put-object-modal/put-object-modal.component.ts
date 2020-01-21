import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createReadStream } from 'fs';

@Component({
  selector: 'app-put-object-modal',
  templateUrl: './put-object-modal.component.html',
  styleUrls: ['./put-object-modal.component.scss']
})
export class PutObjectModalComponent implements OnInit {
  progrez?: Array<number>;
  bucketName: string;
  path: string;
  selectedFiles = [];
  constructor(@Inject(MAT_DIALOG_DATA) public params: object,
              private data: DataService, private snackBar: MatSnackBar) {
                this.bucketName = params['bucketName'];
                this.path = params['path'];
              }

  ngOnInit() {
    this.progrez = undefined;
  }

  upload() {
    this.progrez = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      this.progrez.push(0);

      let objectName;
      if (this.path.length !== 0) {
        objectName =  [this.path, file.name].join('/');
      }
      this.data.putObject(this.bucketName, file, objectName).on('httpUploadProgress', (progress) => {
        this.progrez[i] = (progress.loaded * 100) / progress.total;
      });
    }
  }

  isFinished() {
    if (this.progrez === undefined) { return false; }
    for (const p of this.progrez) {
      if (p !== 100) { return false; }
    }
    return true;
  }

  dropFile(event) {
    for (const element of event) {
      this.selectedFiles.push(element);
    }
  }
  deleteAttachment(index) {
    this.selectedFiles.splice(index, 1);
  }
}
