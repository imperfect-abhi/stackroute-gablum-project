import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxPageComponent } from './inbox-page/inbox-page.component';


const routes: Routes = [
  {
    path: '',
    component: InboxPageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
