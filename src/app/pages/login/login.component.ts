import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  secretKey: string;
  accessKey: string;
  errorMessage: string;
  constructor(private dataService: DataService, private router: Router, private snackBar: MatSnackBar) {
    this.secretKey = '';
    this.accessKey = '';
  }

  ngOnInit() {
  }
  async login() {
    (await this.dataService.connect(this.accessKey, this.secretKey)).subscribe(() => {
      this.router.navigate(['/buckets']);
    }, (err) => {
      this.errorMessage = err.error;
      this.snackBar.open(`Wrong credentials`, 'Dismiss');
    });
  }
}
