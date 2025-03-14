import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
