import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseProposalsSellerComponent } from './browse-proposals-seller/browse-proposals-seller.component';


const routes: Routes = [
  {
    path: '',
    component: BrowseProposalsSellerComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseProposalsRoutingModule { }
