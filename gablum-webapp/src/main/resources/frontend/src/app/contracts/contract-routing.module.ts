import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractCardComponent } from './contract-card/contract-card.component';
import { ContractDetailComponent } from './contract-detail/contract-detail.component';
import { ContractPageComponent } from './contract-page/contract-page.component';


const routes: Routes = [
  {
    path: '',
    component: ContractPageComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'card',
  //   component: ContractCardComponent,
  //   pathMatch: 'full'
  // },
  {
    path: 'modal',
    component: ContractDetailComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
