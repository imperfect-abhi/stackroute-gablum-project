import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProposalsDataService } from 'src/app/services/proposals-data.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-form-confirm-dialog',
  templateUrl: './form-confirm-dialog.component.html',
  styleUrls: ['./form-confirm-dialog.component.css']
})
export class FormConfirmDialogComponent implements OnInit {

  public static messageKey = 'form-confirm-dialog-component';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private proposalService: ProposalsDataService,
    private logger: LoggerService) { }

  ngOnInit() {
    // console.log( ' data ::', this.data.form1 , this.data.form2, this.data.form3);
  }


  onConfirm(data) {
    this.logger.log('price---' + data.form2.value.price);
    const proposalFormDetails = {
    businessDomain: data.form1.value.businessDomain,
    businessSubDomain: data.form1.value.businessSubDomain,
    productName: data.form1.value.productName,
    productDescription: data.form1.value.productDescription,
    quantityValue: data.form1.value.quantityValue,
    quantityUnit: data.form1.value.quantityUnit,
    price: data.form2.value.price,
    priceWeight: data.form2.value.priceWeight,
    deliveryDate: data.form2.value.deliveryDate,
    deliveryDateWeight: data.form2.value.deliveryDateWeight,
    creditPeriod: data.form2.value.creditPeriod,
    creditPeriodWeight: data.form2.value.creditPeriodWeight,
    qualityCertification: data.form2.value.qualityCertification,
    qualityCertificationWeight: data.form2.value.qualityCertificationWeight,
    methodOfSupply: data.form2.value.methodOfSupply,
    methodOfSupplyWeight: data.form2.value.methodOfSupplyWeight,
    regStartDate: data.form3.value.regStartDate,
    regEndDate: data.form3.value.regEndDate,
    auctionStartDate: data.form3.value.auctionStartDate,
    auctionEndDate: data.form3.value.auctionEndDate
    };
    const proposalJSON = JSON.parse(JSON.stringify(proposalFormDetails));
    this.proposalService.saveProposal(
      FormConfirmDialogComponent.messageKey, proposalJSON, 'form-confirm');
    this.router.navigate(['/dashboard']);
  }
}
