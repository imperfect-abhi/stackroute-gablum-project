import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxPageComponent } from './inbox-page/inbox-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [InboxPageComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    MaterialModule
  ]
})
export class InboxModule { }
