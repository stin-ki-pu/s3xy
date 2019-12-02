import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  secretKey: string;
  accessKey: string;

  constructor(private dataService: DataService ) {
    this.secretKey = '';
    this.accessKey = '';
  }

  ngOnInit() {
  }
  login() {
    this.dataService.connect(this.accessKey, this.secretKey);
    const buckets = this.dataService.listBuckets();
    buckets.subscribe((d) => {
      alert(d);
    });
  }
}
