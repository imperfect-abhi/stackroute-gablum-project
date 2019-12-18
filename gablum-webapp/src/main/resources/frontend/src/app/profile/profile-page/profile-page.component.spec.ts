import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';
import { MatDialogModule, MatButtonModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileRoutingModule } from '../profile-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageComponent ],
      imports: [ MatDialogModule, MatButtonModule, FlexLayoutModule, ProfileRoutingModule,
        CommonModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, FormsModule,
        MaterialModule, HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
