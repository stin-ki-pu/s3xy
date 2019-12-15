import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DeleteBucketModalComponent } from './components/delete-bucket-modal/delete-bucket-modal.component';
import { BucketsComponent } from './pages/buckets/buckets.component';
import { BucketComponent } from './pages/bucket/bucket.component';

import { NgxFilesizeModule } from 'ngx-filesize';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DirectoryComponent } from './components/directory/directory.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule, MatList } from '@angular/material/list';
import { ObjectInfoModalComponent } from './components/object-info-modal/object-info-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BucketsComponent,
    DeleteBucketModalComponent,
    BucketComponent,
    DirectoryComponent,
    ObjectInfoModalComponent
  ],
  imports: [
    NgxFilesizeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTreeModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule
  ],
  entryComponents: [
    DeleteBucketModalComponent,
    ObjectInfoModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
