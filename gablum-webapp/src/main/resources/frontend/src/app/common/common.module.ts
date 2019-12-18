import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PageTitleComponent
  ],
  entryComponents: [LoginComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    PageTitleComponent
  ]
})
export class AppCommonModule { }
