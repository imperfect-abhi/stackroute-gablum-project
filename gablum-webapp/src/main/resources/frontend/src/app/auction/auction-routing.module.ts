import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BidFormComponent } from './bid-form/bid-form.component';
import { BidListComponent } from './bid-list/bid-list.component';

const routes: Routes = [
  {
    path: ':id/new/bid',
    component: BidFormComponent,
    pathMatch: 'full'
  },
  {
    path: ':id/see/bids',
    component: BidListComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
