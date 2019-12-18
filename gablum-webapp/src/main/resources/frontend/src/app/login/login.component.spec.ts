import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatToolbarModule, MatCardModule, MatFormFieldModule,
  MatButtonModule, MatRadioModule, MatInputModule, MatDialogModule,
  MatDividerModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
        MatDialogModule,
        MatDividerModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
