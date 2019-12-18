import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidResponseDialogComponent } from './bid-response-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('BidResponseDialogComponent', () => {
  let component: BidResponseDialogComponent;
  let fixture: ComponentFixture<BidResponseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [ BidResponseDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
