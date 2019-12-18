import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidListComponent } from './bid-list.component';
import { BidCardComponent } from '../bid-card/bid-card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuctionCardComponent } from '../auction-card/auction-card.component';
import { SchedulerModule } from 'src/app/scheduler/scheduler.module';

describe('BidListComponent', () => {
  let component: BidListComponent;
  let fixture: ComponentFixture<BidListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule,
        SchedulerModule
      ],
      declarations: [
        BidListComponent,
        BidCardComponent,
        AuctionCardComponent
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
