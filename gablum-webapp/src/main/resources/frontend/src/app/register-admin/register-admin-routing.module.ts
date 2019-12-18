import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterAdminPageComponent } from './register-admin-page/register-admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterAdminPageComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAdminRoutingModule { }
