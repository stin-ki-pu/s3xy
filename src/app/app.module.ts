import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DeleteBucketModalComponent } from './delete-bucket-modal/delete-bucket-modal.component';
import { BucketsComponent } from './buckets/buckets.component';

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
import { MatChipsModule } from '@angular/material/chips';
import { BucketComponent } from './bucket/bucket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BucketsComponent,
    DeleteBucketModalComponent,
    BucketComponent
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
    MatChipsModule
  ],
  entryComponents: [
    DeleteBucketModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
