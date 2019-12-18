import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from '../login/login.component';
import { MatToolbarModule, MatCardModule,
  MatFormFieldModule, MatButtonModule, MatRadioModule, MatInputModule,
  MatDividerModule, MatListModule, MatIconModule, MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent, LoginComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        FlexLayoutModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
