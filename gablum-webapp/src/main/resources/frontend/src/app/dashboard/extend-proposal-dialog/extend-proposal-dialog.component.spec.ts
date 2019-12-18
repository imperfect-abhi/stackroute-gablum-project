import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendProposalDialogComponent } from './extend-proposal-dialog.component';
import { MaterialModule } from './../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

describe('ExtendProposalDialogComponent', () => {
  let component: ExtendProposalDialogComponent;
  let fixture: ComponentFixture<ExtendProposalDialogComponent>;
  const data = {
    proposalId: '',
    productId: '',
    createdBy: '',
    updatedBy: '',
    businessDomain: '',
    businessSubDomain: '',
    productName: '',
    quantityValue: 1,
    quantityUnit: '',
    price: 1,
    priceWeight: 1,
    deliveryDate: new Date(),
    deliveryDateWeight: 1,
    creditPeriod: 1,
    creditPeriodWeight: 1,
    qualityCertification: true,
    qualityCertificationWeight: 1,
    methodOfSupply: true,
    methodOfSupplyWeight: 1,
    regStartDate: new Date(),
    regEndDate: new Date(),
    auctionStartDate: new Date(),
    auctionEndDate: new Date(),
    createdOn: new Date(),
    updatedOn: new Date(),
    thresholdParticipants: 1,
    views: 1,
    interested: 1,
    interestedUsersEmail: []
};


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendProposalDialogComponent ],
      imports: [MaterialModule,
                FormsModule,
                ReactiveFormsModule],
      providers: [Router,
        {
        provide: MAT_DIALOG_DATA,
        useValue: data
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendProposalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
