import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidCardComponent } from './bid-card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BidCardComponent', () => {
  let component: BidCardComponent;
  let fixture: ComponentFixture<BidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidCardComponent ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidCardComponent);
    component = fixture.componentInstance;
    const bidDataEntity = {
      bidId: '',
      auctionId: '',
      createdBy: '',
      bid: {
        price: 0,
        creditPeriod: 0,
        qaqcCertificate: true,
        typeOfSupply: true,
        timeOfDelivery: new Date()
      },
      scoreObject: {
        creditScore: 123,
        deliveryScore: 23,
        priceScore: 56,
        qaqcScore: 3,
        typeScore: 4,
        total: 209
      }
    };
    component.bidDataEntity = bidDataEntity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
