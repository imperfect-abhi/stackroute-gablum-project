import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimerComponent } from './timer/timer.component';

const route: Routes = [
  {
    path: '',
    component: TimerComponent,
    pathMatch: 'full'
  }
];

@NgModule({
declarations: [],
  imports: [ RouterModule.forChild(route)],
  exports: [ RouterModule ]
})
export class SchedulerRoutingModule { }
