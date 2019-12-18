import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalCardDialogComponent } from './proposal-card-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbarModule, MatCardModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material';
import { MaterialModule } from 'src/app/material/material.module';

describe('ProposalCardDialogComponent', () => {
  let component: ProposalCardDialogComponent;
  let fixture: ComponentFixture<ProposalCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalCardDialogComponent ],
      imports: [MaterialModule, BrowserAnimationsModule,
        HttpClientModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
