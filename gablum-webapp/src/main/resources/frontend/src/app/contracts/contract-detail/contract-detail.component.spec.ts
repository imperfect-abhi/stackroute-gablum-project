import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDetailComponent } from './contract-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('ContractDetailComponent', () => {
  let component: ContractDetailComponent;
  let fixture: ComponentFixture<ContractDetailComponent>;
  const contractWithBothUser = {
    contract: {
      _id: '',
      contractId: '',
      auctionId: '',
      bidId: '',
      auctionDetails: {
        auctionId: '',
        uniqueLink: '',
        auctionName: '',
        proposal: {
          proposalId: '',
          productId: '',
          createdBy: '',
          updatedBy: '',
          businessDomain: '',
          businessSubDomain: '',
          productName: '',
          quantityValue: 2,
          quantityUnit: '',
          price: 1,
          priceWeight: 1,
          deliveryDate: new Date(),
          deliveryDateWeight: 1,
          creditPeriod: 2,
          creditPeriodWeight: 1,
          qualityCertification: true,
          qualityCertificationWeight: 2,
          methodOfSupply: true,
          methodOfSupplyWeight: 1,
          regStartDate: new Date(),
          regEndDate: new Date(),
          auctionStartDate: new Date(),
          auctionEndDate: new Date(),
          createdOn: new Date(),
          updatedOn: new Date(),
          thresholdParticipants: 3,
          viewSellerEmails: [],
          views: 2,
          interested: 1,
          interestedUsersEmail: [],
          invitedUsersEmail: [],
          productDescription: ''
        },
        isAuctionActive: true,
        isAuctionFinished: true,
        participantsVerificationId: '',
        selectedParticipantList: [],
        interestedUsersEmail: [],
        winningBid: '',
        createdOn: new Date(),
        updatedOn: new Date(),
        createdBy: '',
        updatedBy: '',
        auctionStartDate: new Date(),
        auctionEndDate: new Date(),
        bidIdList: []
      },
      bidDetails: {
        bidId: '',
        auctionId: '',
        bid: {
          price: 20,
          creditPeriod: 2,
          qaqcCertificate: true,
          typeOfSupply: true,
          timeOfDelivery: new Date()
        },
        scoreObject: {
          total: 3,
          deliveryScore: 3,
          priceScore: 2,
          creditScore: 2,
          qaqcScore: 2,
          typeScore: 2
        },
        createdBy: ''
      },
      buyerEmail: '',
      buyerESign: '',
      sellerESign: '',
      sellerEmail: '',
      contractStatus: true,
      currentHash: '',
      previousHash: '',
      createdOn: new Date()
    },
    buyer: {
      name: '',
      email: '',
      address: '',
      phone: 2,
      companyName: '',
      businessLicense: '',
      password: '',
      role: [{
        role: '',
        id: 2
      }],
      businessDomain: '',
      businessSubDomain: ''
    },
    seller: {
      name: '',
      email: '',
      address: '',
      phone: 2,
      companyName: '',
      businessLicense: '',
      password: '',
      role: [{
        role: '',
        id: 2
      }],
      businessDomain: '',
      businessSubDomain: ''
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractDetailComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: contractWithBothUser,
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDetailComponent);
    component = fixture.componentInstance;


    component.contractWithBothUser = contractWithBothUser;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
