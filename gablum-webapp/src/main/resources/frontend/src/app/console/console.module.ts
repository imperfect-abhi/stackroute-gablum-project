import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WindowComponent } from './window/window.component';
import { ConsoleRoutingModule } from './console-routing.module';
import { PortalModule } from '@angular/cdk/portal';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ButtonComponent, WindowComponent],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    PortalModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [ButtonComponent,
    WindowComponent
  ]
})
export class ConsoleModule { }
