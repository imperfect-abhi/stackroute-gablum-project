import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbarModule, MatCardModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material';
import { MaterialModule } from 'src/app/material/material.module';


import { ProposalSellerDialogComponent } from './proposal-seller-dialog.component';

describe('ProposalSellerDialogComponent', () => {
  let component: ProposalSellerDialogComponent;
  let fixture: ComponentFixture<ProposalSellerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalSellerDialogComponent ],
      imports: [MaterialModule, BrowserAnimationsModule,
        HttpClientModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
