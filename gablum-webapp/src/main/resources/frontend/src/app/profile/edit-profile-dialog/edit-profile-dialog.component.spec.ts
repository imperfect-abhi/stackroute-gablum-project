import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDialogComponent } from './edit-profile-dialog.component';
import { MatDialogModule, MatButtonModule, MatSelectModule, MatOptionModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileRoutingModule } from '../profile-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { PublicProfileComponent } from '../public-profile/public-profile.component';

describe('EditProfileDialogComponent', () => {
  let component: EditProfileDialogComponent;
  let fixture: ComponentFixture<EditProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileDialogComponent, ProfilePageComponent, PublicProfileComponent ],
      imports: [MatDialogModule, MatButtonModule, FlexLayoutModule, ProfileRoutingModule,
        CommonModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, FormsModule,
        MaterialModule, HttpClientModule, MatDialogModule, BrowserAnimationsModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
