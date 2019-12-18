import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatOptionModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatBottomSheetModule,
  MatSortModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';



const modules = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatOptionModule,
  MatSelectModule,
  MatExpansionModule,
  MatTooltipModule,
  MatChipsModule,
  MatRadioModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatCardModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatSliderModule,
  MatStepperModule,
  MatDividerModule,
  MatListModule,
  MatCheckboxModule,
  MatOptionModule,
  MatExpansionModule,
  MatTooltipModule,
  MatChipsModule,
  MatTooltipModule,
  MatSidenavModule,
  FlexLayoutModule,
  MatIconModule,
  MatBadgeModule,
  MatDialogModule,
  MatTabsModule,
  MatGridListModule,
  MatDividerModule,
  FlexLayoutModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatProgressBarModule,
  NgxChartsModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatBottomSheetModule,
  MatSortModule
];

@NgModule({
  declarations: [],
  imports: [ modules],
  exports: [ modules],
  providers: [ MatDatepickerModule]
})
export class MaterialModule { }
