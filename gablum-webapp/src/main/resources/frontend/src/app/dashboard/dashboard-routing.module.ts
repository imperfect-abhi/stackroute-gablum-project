import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProposalCardComponent } from './new-proposal-card/new-proposal-card.component';
import { ProposalCardDialogComponent } from './proposal-card-dialog/proposal-card-dialog.component';
import { GuestProposalListComponent } from './guest-proposal-list/guest-proposal-list.component';

const routes: Routes = [
  {path: '',
   component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'card',
    component: NewProposalCardComponent,
    pathMatch: 'full'
  },
  {
    path: 'modal',
    component: ProposalCardDialogComponent,
    pathMatch: 'full'
  },
  {
    path: 'guestproposallist',
    component: GuestProposalListComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
