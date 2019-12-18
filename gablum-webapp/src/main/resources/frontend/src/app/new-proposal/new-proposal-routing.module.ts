import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProposalForm1Component } from './new-proposal-form/new-proposal-form1.component';


const routes: Routes = [
  {
    path: '',
    component: NewProposalForm1Component,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProposalRoutingModule { }
