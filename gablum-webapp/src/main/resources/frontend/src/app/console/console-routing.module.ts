import { NgModule } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { ButtonComponent } from './button/button.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'window', component: WindowComponent},
  {path: '', component: ButtonComponent, pathMatch: 'full'}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConsoleRoutingModule { }
