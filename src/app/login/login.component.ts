import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  secretKey: string;
  accessKey: string;
  errorMessage: string;
  constructor(private dataService: DataService, private router: Router) {
    this.secretKey = '';
    this.accessKey = '';
  }

  ngOnInit() {
  }
  login() {
    try {
      this.dataService.connect(this.accessKey, this.secretKey).subscribe(() => {
        this.router.navigate(['/buckets']);
      });
    } catch (err) {
      this.errorMessage = err.error;
    }
  }
}
