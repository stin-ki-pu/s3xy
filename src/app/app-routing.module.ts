import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BucketsComponent } from './pages/buckets/buckets.component';
import { BucketComponent } from './pages/bucket/bucket.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {animation: 'Login'} },
  { path: 'buckets', component: BucketsComponent, data: {animation: 'Buckets'} },
  { path: 'buckets/:bucket_name', component: BucketComponent, data: {animation: 'Bucket'} },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
