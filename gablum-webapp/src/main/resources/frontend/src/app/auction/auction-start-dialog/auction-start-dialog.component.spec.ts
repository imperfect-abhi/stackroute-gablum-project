import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionStartDialogComponent } from './auction-start-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('AuctionStartDialogComponent', () => {
  let component: AuctionStartDialogComponent;
  let fixture: ComponentFixture<AuctionStartDialogComponent>;
  const data1 = {};
  const data2 = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionStartDialogComponent ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionStartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should call network', () => {
    expect(component.startAuction(null)).toThrowError(TypeError);
  });
});
