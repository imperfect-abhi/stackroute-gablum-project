import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmDialogComponent } from './form-confirm-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormConfirmDialogComponent', () => {
  let component: FormConfirmDialogComponent;
  let fixture: ComponentFixture<FormConfirmDialogComponent>;
  const data = {
    form1:
    {
      value:
      {
        businessDomain: '', businessSubDomain: 'Raw material', productName: '343', quantity: '44'
      }

    }
    ,
    form2:
    {
      value:
      {
        creditPeriod: '111',
        creditPeriodWeight: '',
        deliveryDate: new Date('Date Fri Nov 29 2019 00:00:00 GMT+0530 (India Standard Time)'),
        deliveryDateWeight: '',
        methodOfSupply: '1',
        methodOfSupplyWeight: '',
        price: '323',
        priceWeight: '',
        qualityCertification: '1',
        qualityCertificationWeight: '',
      }

    }
    ,
    form3:
    {
      value:
      {
        auctionEndDate: new Date('Date Mon Nov 11 2019 00:00:00 GMT+0530 (India Standard Time)'),

        auctionStartDate: new Date('Date Wed Nov 13 2019 00:00:00 GMT+0530 (India Standard Time)'),

        regEndDate: new Date('Date Fri Nov 29 2019 00:00:00 GMT+0530 (India Standard Time)'),

        regStartDate: new Date('Date Thu Nov 28 2019 00:00:00 GMT+0530 (India Standard Time)')
      }

    }

  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormConfirmDialogComponent],
      imports: [MaterialModule, RouterTestingModule, ReactiveFormsModule, FormsModule,
      HttpClientTestingModule],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: data,
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
