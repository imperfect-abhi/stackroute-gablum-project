import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { MatToolbarModule, MatCardModule, MatFormFieldModule,
        MatButtonModule, MatRadioModule, MatInputModule,
        MatOptionModule, MatSelectModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent ],
      imports: [ MatFormFieldModule, MatInputModule, BrowserAnimationsModule,
        MatCardModule, MatButtonModule, MatRadioModule, MatToolbarModule,
        ReactiveFormsModule, FormsModule, MatOptionModule, MatSelectModule,
        RouterTestingModule, HttpClientModule, MatIconModule, MatSnackBarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing email field', () => {
    expect(component.email.valid).toBeFalsy();
    component.email.setValue('wrong@right');
    expect(component.email.valid).toBeTruthy();
    component.email.setValue('wrong');
    expect(component.email.valid).toBeFalsy();
    component.email.setValue('wrong@right.com');
    expect(component.email.valid).toBeTruthy();
    expect(component.registrationForm.valid).toBeFalsy();
  });
  it('testing business License field', () => {
    expect(component.businessLicense.valid).toBeFalsy();
    component.businessLicense.setValue('');
    expect(component.businessLicense.valid).toBeFalsy();
    component.businessLicense.setValue('27AAPFU0939R1ZV');
    expect(component.businessLicense.valid).toBeTruthy();
    component.businessLicense.setValue('27AAPFU39R1ZV');
    expect(component.businessLicense.valid).toBeFalsy();
    expect(component.registrationForm.valid).toBeFalsy();
  });
  it('name field testing', () => {
    expect(component.name.valid).toBeFalsy();
    component.name.setValue('Right Or Wrong');
    expect(component.name.valid).toBeTruthy();
    component.name.setValue('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    expect(component.name.valid).toBeFalsy();
    expect(component.registrationForm.valid).toBeFalsy();
  });
  it('address field testing', () => {
    expect(component.address.valid).toBeFalsy();
    component.address.setValue('');
    expect(component.address.valid).toBeFalsy();
    component.address.setValue('adjf, aisdjf, ladfj, adf');
    expect(component.address.valid).toBeTruthy();
  });
  it('company Name field testing', () => {
    expect(component.companyName.valid).toBeFalsy();
    component.companyName.setValue('');
    expect(component.companyName.valid).toBeFalsy();
    component.companyName.setValue('Anu\'s Rag Pvt. Ltd. ');
    expect(component.companyName.valid).toBeTruthy();
    const x = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    component.companyName.setValue(x);
    expect(component.companyName.valid).toBeFalsy();
  });
  it('password field testing', () => {
    expect(component.password.valid).toBeFalsy();
    component.password.setValue('1234');
    expect(component.password.valid).toBeFalsy();
    component.password.setValue('anu@rag');
    expect(component.password.valid).toBeTruthy();
  });
  it('phone field testing', () => {
    expect(component.phone.valid).toBeFalsy();
    component.phone.setValue('1234567890');
    expect(component.phone.valid).toBeFalsy();
    component.phone.setValue('9012345678');
    expect(component.phone.valid).toBeTruthy(); // suppose to be truthy.
  });
  it('Registration whole form testing', () => {
    component.email.setValue('wrong@right.com');
    component.businessLicense.setValue('27AAPFU0939R1ZV');
    component.name.setValue('Right Or Wrong');
    component.address.setValue('adjf, aisdjf, ladfj, adf');
    component.companyName.setValue('Anu\'s Rag Pvt. Ltd. ');
    component.businessDomain.setValue('Agriculture');
    component.businessSubDomain.setValue('Raw Materials');
    component.role.setValue('Buyer');
    // expect(component.registrationForm.valid).toBeTruthy();

    // spyOn(component, 'onSubmit');
    // let button = fixture.debugElement.nativeElement.querySelector('button');
    // button.click();
    // fixture.whenStable.then(() => {

    // });
  });
});
