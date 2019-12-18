import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractCardComponent } from './contract-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContractCardComponent', () => {
  let component: ContractCardComponent;
  let fixture: ComponentFixture<ContractCardComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractCardComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get(): string {
                return '123';
              },
            },
          },
        },
      }, ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCardComponent);
    component = fixture.componentInstance;
    const user = {
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
    };

    const contract = {
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
          viewSellerEmails: [],
          thresholdParticipants: 3,
          views: 2,
          interested: 1,
          interestedUsersEmail: [],
          invitedUsersEmail: [],
          productDescription: ''
        },
        isAuctionActive: true,
        isAuctionFinished: false,
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
        bidIdList: [],
      },
      bidDetails: {
        bidId: '',
        auctionId: '',
        bid: {
          price: 10,
          creditPeriod: 2,
          qaqcCertificate: true,
          typeOfSupply: true,
          timeOfDelivery: new Date()
        },
        scoreObject: {
          total: 1,
          deliveryScore: 1,
          priceScore: 1,
          creditScore: 1,
          qaqcScore: 1,
          typeScore: 1
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
    };

    component.contract = contract;
    component.user = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
