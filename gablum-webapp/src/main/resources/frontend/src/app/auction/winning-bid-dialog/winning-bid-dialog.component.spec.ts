import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningBidDialogComponent } from './winning-bid-dialog.component';

describe('WinningBidDialogComponent', () => {
  let component: WinningBidDialogComponent;
  let fixture: ComponentFixture<WinningBidDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinningBidDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningBidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
