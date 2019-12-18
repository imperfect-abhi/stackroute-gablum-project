import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionCardComponent } from './auction-card.component';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConsoleModule } from '../../console/console.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TimerComponent } from 'src/app/scheduler/timer/timer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuctionCardComponent', () => {
  let component: AuctionCardComponent;
  let fixture: ComponentFixture<AuctionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionCardComponent, TimerComponent ],
      imports: [  MaterialModule, BrowserAnimationsModule, NoopAnimationsModule, ConsoleModule,
        HttpClientTestingModule, RouterTestingModule],
      providers: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
      {
        provide: Router,
        useValue: {
          snapshot: {
            queryParamMap: {
              get(): number {
                return 6;
              }
            }
          }
        }
      }


      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCardComponent);
    component = fixture.componentInstance;
    const auction = {
      auctionId: '',
      uniqueLink: '',
      auctionName: '',
      proposal: {
        proposalId: ' ',
        productId: ' ',
        createdBy: ' ',
        updatedBy: ' ',
        businessDomain: ' ',
        businessSubDomain: ' ',
        productName: ' ',
        quantityValue: 2,
        quantityUnit: ' ',
        price: 2,
        priceWeight: 2,
        deliveryDate: new Date(),
        deliveryDateWeight: 2,
        creditPeriod: 2,
        creditPeriodWeight: 2,
        qualityCertification: false,
        qualityCertificationWeight: 2,
        methodOfSupply: false,
        methodOfSupplyWeight: 2,
        regStartDate: new Date(),
        regEndDate: new Date(),
        auctionStartDate: new Date(),
        auctionEndDate: new Date(),
        createdOn: new Date(),
        updatedOn: new Date(),
        thresholdParticipants: 2,
        viewSellerEmails: ['a', 'b'],
        interested: 2,
        interestedUsersEmail: [],
        productDescription: ' ',
        invitedUsersEmail: []
    },
    isAuctionActive: false,
    isAuctionFinished: false,
    participantsVerificationId: '',
    selectedParticipantList: [],
    interestedUsersEmail: [],
    winningBid: '',
    bidIdList: [],
    createdOn: new Date(),
    updatedOn: new Date(),
    createdBy: '',
    updatedBy: '',
    auctionStartDate: new Date(),
    auctionEndDate: new Date(),
    };
    component.auction = auction;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
