import { Component, OnInit, Input } from '@angular/core';
import { Location, PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ObjectInfoModalComponent } from '../object-info-modal/object-info-modal.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() directory: Directory;
  @Input() root = false;
  currentDir: Directory;
  subdirs: Array<Directory>;
  placeholder: Array<any>;
  currentPath: Array<string>;
  constructor(private location: Location, private plocation: PlatformLocation, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.currentPath = ['root'];
    this.changeDir(this.directory);
  }


  back(index: number) {
    let temp = this.directory;
    for (let i = 1; i <= index; i++) {
      temp = temp.subDirectories[this.currentPath[i]];
    }
    this.currentPath.splice(index + 1);
    this.changeDir(temp);
  }
  enter(dir: Directory) {
    this.currentPath.push(dir.name);
    this.changeDir(dir);
  }

  changeDir(dir: Directory) {
    this.currentDir = dir;
    this.subdirs = Object.values(this.currentDir.subDirectories);
    console.log(this.currentPath);
    this.placeholder = Array(5 - this.subdirs.length % 5).fill(0);
  }

  info(object) {
    const dialogRef = this.dialog.open(ObjectInfoModalComponent, {data: object, height: 'auto',  width: '500px'});
  }
}


export class Directory {
  subDirectories: object; // Subdirectories
  objects: Array<any>; // Objects under directory
  constructor(public name: string, public parent: Directory) {
    this.subDirectories = {};
    this.objects = [];
  }
}
