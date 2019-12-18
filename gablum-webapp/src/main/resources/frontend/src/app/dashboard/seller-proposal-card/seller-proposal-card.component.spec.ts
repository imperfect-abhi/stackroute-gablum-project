import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProposalCardComponent } from './seller-proposal-card.component';
import { MaterialModule} from '../../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TimerComponent } from '../../scheduler/timer/timer.component';

describe('SellerProposalCardComponent', () => {
  let component: SellerProposalCardComponent;
  let fixture: ComponentFixture<SellerProposalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProposalCardComponent, TimerComponent ],
      imports: [ MaterialModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProposalCardComponent);
    component = fixture.componentInstance;
    const proposal = { proposalId: '',        // mock data
    productId: '',
    createdBy: '',
    updatedBy: '',
    createdOn: new Date('Date Fri Nov 29 2019 00:00:00 GMT+0530 (India Standard Time)') ,
    updatedOn: new Date('Date Fri Nov 29 2019 00:00:00 GMT+0530 (India Standard Time)'),
    thresholdParticipants: 5,
    viewSellerEmails: ['a', 'b'],
    interested: 5,
    businessDomain: 'Agriculture',
  businessSubDomain: 'Raw material',
  qualityCertificate: true,
  productName: '343',
  quantityValue: 2,
  quantityUnit: 'Kg',
  creditPeriod: 67,
  creditPeriodWeight: 1,
  deliveryDate: new Date('Date Fri Nov 29 2019 00:00:00 GMT+0530 (India Standard Time)'),
  deliveryDateWeight: 4,
  methodOfSupply: true,
  methodOfSupplyWeight: 2,
  price: 67,
  priceWeight: 5,
  qualityCertification: true,
  qualityCertificationWeight: 3,
  auctionEndDate: new Date('Date Mon Nov 11 2019 00:00:00 GMT+0530 (India Standard Time)'),
  auctionStartDate: new Date('Date Wed Nov 13 2019 00:00:00 GMT+0530 (India Standard Time)'),
  regEndDate: new Date('Date Fri Nov 29 2019 00:00:00 GMT+0530 (India Standard Time)'),
  regStartDate: new Date('Date Thu Nov 28 2019 00:00:00 GMT+0530 (India Standard Time)'),
  interestedUsersEmail: [],
  productDescription: 'Whole Maize',
  invitedUsersEmail: []
};

// simulate the parent setting the input property with that hero
    component.allProposal = proposal;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
