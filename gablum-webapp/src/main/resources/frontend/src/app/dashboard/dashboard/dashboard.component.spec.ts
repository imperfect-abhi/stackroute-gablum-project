import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AuctionsListComponent } from '../auctions-list/auctions-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NewProposalCardComponent } from 'src/app/dashboard/new-proposal-card/new-proposal-card.component';
import { TimerComponent } from 'src/app/scheduler/timer/timer.component';
import { AuctionCardComponent } from 'src/app/auction/auction-card/auction-card.component';
import { ButtonComponent } from '../../console/button/button.component';
import { WindowComponent } from '../../console/window/window.component';
import { SellerProposalCardComponent } from '../seller-proposal-card/seller-proposal-card.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        DashboardComponent,
        AuctionsListComponent,
        NewProposalCardComponent,
        TimerComponent,
        WindowComponent,
        AuctionCardComponent,
        ButtonComponent,
        SellerProposalCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
