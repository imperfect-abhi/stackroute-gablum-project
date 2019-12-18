import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewProposalRoutingModule } from './new-proposal-routing.module';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NewProposalPageComponent} from './new-proposal-page/new-proposal-page.component';
import { NewProposalForm1Component } from './new-proposal-form/new-proposal-form1.component';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormConfirmDialogComponent } from './form-confirm-dialog/form-confirm-dialog.component';


@NgModule({
  declarations: [
    NewProposalPageComponent,
    NewProposalForm1Component,
    FormConfirmDialogComponent],

  imports: [
    CommonModule,
    NewProposalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatCardModule,
    FlexLayoutModule
  ],
  entryComponents: [FormConfirmDialogComponent]
})
export class NewProposalModule { }
