import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSubmissionDialogComponent } from './bid-submission-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { NewBid } from 'src/app/interfaces/newbid';

describe('BidSubmissionDialogComponent', () => {
  let component: BidSubmissionDialogComponent;
  let fixture: ComponentFixture<BidSubmissionDialogComponent>;

  const bid = {
    price: 0,
    creditPeriod: 0,
    qaqcCertificate: true,
    typeOfSupply: true,
    timeOfdelivery: new Date()
    };
  const bidDataEntity = {
    bidId: '',
    auctionId: '',
    bid: {
        price: 0,
        creditPeriod: 0,
        qaqcCertificate: true,
        typeOfSupply: true,
        timeOfdelivery: new Date(),
        },
    score: 0,
    createdBy: '',
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ BidSubmissionDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: bidDataEntity}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
