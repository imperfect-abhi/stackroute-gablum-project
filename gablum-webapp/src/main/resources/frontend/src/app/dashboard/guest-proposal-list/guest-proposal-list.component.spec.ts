import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProposalListComponent } from './guest-proposal-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule , MatButtonModule, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';


describe('GuestProposalListComponent', () => {
  let component: GuestProposalListComponent;
  let fixture: ComponentFixture<GuestProposalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatTableModule,
        MatButtonModule
      ],
      declarations: [ GuestProposalListComponent ],
      providers: [{
        provide: MAT_DIALOG_DATA,
      }, Router]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProposalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
