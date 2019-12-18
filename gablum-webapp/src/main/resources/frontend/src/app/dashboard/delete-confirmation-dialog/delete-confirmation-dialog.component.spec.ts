import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';

describe('DeleteConfirmationDialogComponent', () => {
  let component: DeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDialogComponent>;
  const data = {
    confirmDia: {
      title: 'abc',
      message: ''
    },
    proposalData: {
      auctionEndDate: '2019-12-25T18:30:00.000+0000',
      auctionStartDate: '2019-12-24T18:30:00.000+0000',
      businessDomain: '',
      businessSubDomain: 'Crops',
      createdBy: 'shutterbug@gmail.com',
      createdOn: '2019-12-12T09:42:21.220+0000',
      creditPeriod: 12,
      creditPeriodWeight: 3,
      deliveryDate: '2020-01-14T18:30:00.000+0000',
      deliveryDateWeight: 4,
      interested: 0,
      interestedUsersEmail: [],
      invitedUsersEmail: [],
      methodOfSupply: true,
      methodOfSupplyWeight: 4,
      price: 24,
      priceWeight: 5,
      productDescription: null,
      productDetails: null,
      productId: null,
      productName: 'Wheat',
      productSpecList: null,
      proposalId: '75e6e4d6-4d83-49be-a4d4-70394109655d',
      qualityCertification: true,
      qualityCertificationWeight: 5,
      quantityUnit: 'Kgs',
      quantityValue: 213,
      regEndDate: '2019-12-21T18:30:00.000+0000',
      regStartDate: '2019-12-17T18:30:00.000+0000',
      thresholdParticipants: 0,
      updatedBy: 'shutterbug@gmail.com',
      updatedOn: '2019-12-12T09:42:21.220+0000',
      userID: null,
      views: 0,
      _id: '5df20b7d1d739267df347b7d'
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationDialogComponent],
      imports: [RouterTestingModule,
        HttpClientModule,
        MaterialModule,
        MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {data} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
