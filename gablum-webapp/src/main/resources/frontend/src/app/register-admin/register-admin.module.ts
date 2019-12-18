import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAdminRoutingModule } from './register-admin-routing.module';
import { RegisterAdminPageComponent } from './register-admin-page/register-admin-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RegisterAdminPageComponent],
  imports: [
    CommonModule,
    RegisterAdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterAdminModule { }
