import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-object-info-modal',
  templateUrl: './object-info-modal.component.html',
  styleUrls: ['./object-info-modal.component.scss']
})
export class ObjectInfoModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public object: object) { }

  ngOnInit() {
    this.object['LastModified'] = new Date(this.object['LastModified']);
  }

}
