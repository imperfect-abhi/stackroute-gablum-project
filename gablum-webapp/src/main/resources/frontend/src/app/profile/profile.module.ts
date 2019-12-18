import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MAT_DIALOG_DATA } from '@angular/material';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PublicProfileComponent } from './public-profile/public-profile.component';
// import { FormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [EditProfileDialogComponent, ProfilePageComponent],
  declarations: [ProfilePageComponent, EditProfileDialogComponent, PublicProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MaterialModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ProfileModule { }
