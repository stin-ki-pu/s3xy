import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Location, PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ObjectInfoModalComponent } from '../object-info-modal/object-info-modal.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit, OnChanges {
  @Input() directory: Directory;
  @Input() root = false;
  @Output() getObject = new EventEmitter<string>();
  @Output() deleteObject = new EventEmitter<string>();
  @Output() dirChanged = new EventEmitter<string>();
  currentDir: Directory;
  subdirs: Array<Directory>;
  currentPath: Array<string>;
  placeholderDirs: Array<any>;
  placeholderObjects: Array<any>;
  test: Array<any>;
  constructor(private dialog: MatDialog, private data: DataService) {
    this.currentPath = [];
  }

  ngOnInit() {
    this.test = [];
    this.changeDir(this.directory);
  }

  ngOnChanges(changes): void {
    this.changeDir(this.directory);
    for (let i = 0; i < this.currentPath.length; i++) {
      const element = this.currentPath[i];
      if (this.currentDir.subDirectories[element]) {
        this.changeDir(this.currentDir.subDirectories[element]);
      } else {
        this.currentPath = this.currentPath.slice(0, i);
        break;
      }
    }
  }

  back(index: number) {
    let temp = this.directory;
    for (let i = 0; i <= index; i++) {
      temp = temp.subDirectories[this.currentPath[i]];
    }
    this.currentPath.splice(index + 1);
    this.changeDir(temp);
  }
  enter(dir: Directory) {
    this.currentPath.push(dir.name);
    this.changeDir(dir);
  }

  lazyLoad(loaded = 0) {
    let end = loaded + 10;
    if (end > this.currentDir.objects.length) {
      end = this.currentDir.objects.length;
    } else {
      setTimeout(() => this.lazyLoad(loaded + 10), 10);
    }
    this.test.push(...this.currentDir.objects.slice(loaded, end));
  }
  changeDir(dir: Directory) {
    this.dirChanged.emit(this.currentPath.join('/'));
    this.currentDir = dir;
    this.test = [];
    this.lazyLoad();
    this.subdirs = Object.values(this.currentDir.subDirectories);
    this.placeholderDirs = Array(5 - this.subdirs.length % 5).fill(0);
    this.placeholderObjects = Array(5 - this.currentDir.objects.length % 5).fill(0);
  }

  info(object) {
    const dialogRef = this.dialog.open(ObjectInfoModalComponent, {data: object, height: 'auto',  width: '500px'});
  }

  callParentGetObject(object) {
    this.getObject.next(object.Key);
  }

  callParentDeleteObject(object) {
    this.deleteObject.emit(object.Key);
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
