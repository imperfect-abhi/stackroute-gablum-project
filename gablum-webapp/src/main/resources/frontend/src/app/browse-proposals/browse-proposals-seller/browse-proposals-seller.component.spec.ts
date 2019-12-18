import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseProposalsSellerComponent } from './browse-proposals-seller.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SellerProposalCardComponent } from 'src/app/dashboard/seller-proposal-card/seller-proposal-card.component';
import { TimerComponent } from 'src/app/scheduler/timer/timer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('BrowseProposalsSellerComponent', () => {
  let component: BrowseProposalsSellerComponent;
  let fixture: ComponentFixture<BrowseProposalsSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseProposalsSellerComponent, SellerProposalCardComponent, TimerComponent ],
      imports: [
        MaterialModule, HttpClientModule, BrowserAnimationsModule, RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseProposalsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
