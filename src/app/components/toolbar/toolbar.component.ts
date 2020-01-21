import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  accessKey: string;
  constructor(private data: DataService, private router: Router) {
    this.accessKey = this.data.accessKey;
    console.log(data);
    console.log(this.accessKey)
  }

  ngOnInit() {
  }

  logout() {
    this.data.logout().subscribe(() => { this.router.navigateByUrl('/login'); });
  }

}
