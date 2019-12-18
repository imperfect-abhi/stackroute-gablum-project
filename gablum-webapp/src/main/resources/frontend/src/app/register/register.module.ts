import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatToolbarModule, MatCardModule, MatFormFieldModule,
        MatButtonModule, MatRadioModule, MatOptionModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class RegisterModule { }
