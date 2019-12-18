import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormConfirmDialogComponent } from '../form-confirm-dialog/form-confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { LoggerService } from 'src/app/services/logger.service';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-proposal-form1',
  templateUrl: './new-proposal-form1.component.html',
  styleUrls: ['./new-proposal-form1.component.css']
})

export class NewProposalForm1Component implements OnInit {

  newMoment = moment();
  showTicks = false;
  exPanelOpenState = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private logger: LoggerService,
    private location: Location) { }

  subDomains = ['Raw material', 'Crops', 'Machinery'];
  units = ['Units', 'Kgs', 'Litres'];
  invert = false;
  thumbLabel = false;
  value = 0;
  vertical = false;
  panelOpenState = false;
  editable = false;

  productSpecsForm = new FormGroup({
    businessDomain: new FormControl('Agriculture'),
    businessSubDomain: new FormControl('', [Validators.required]),
    productName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])),
    productDescription: new FormControl('', Validators.compose([Validators.required, Validators.minLength(40), Validators.maxLength(400)])),
    quantityValue: new FormControl('', [Validators.required, Validators.min(1)]),
    quantityUnit: new FormControl('')
  });

  paramForm = new FormGroup({
    price: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.maxLength(10)])),
    priceWeight: new FormControl(1),
    deliveryDate: new FormControl({ value: '' }, Validators.required),
    deliveryDateWeight: new FormControl(1),
    creditPeriod: new FormControl('', [Validators.required, Validators.min(1)]),
    creditPeriodWeight: new FormControl(1),
    qualityCertification: new FormControl('', [Validators.required]),
    qualityCertificationWeight: new FormControl(1),
    methodOfSupply: new FormControl('', [Validators.required]),
    methodOfSupplyWeight: new FormControl(1)
  });

  timeForm = new FormGroup({
    regStartDate: new FormControl({ value: '' }, [Validators.required]),
    regEndDate: new FormControl({ value: '' }, [Validators.required]),
    auctionStartDate: new FormControl({ value: '' }, [Validators.required]),
    auctionEndDate: new FormControl({ value: '' }, [Validators.required])
  });

  formatLabel(value: number) {
    return value;
  }
  ngOnInit() {
  }

  deliveryDate = (d: Date): boolean => {
    const currentDate = new Date();
    if (d.getMonth() === currentDate.getMonth()
      && d.getFullYear() === currentDate.getFullYear()) {
      return ((d.getDate() > currentDate.getDate() + 4));
    } else if (d.getMonth() > currentDate.getMonth() || d.getFullYear() > currentDate.getFullYear()) {
      return true;
    }
  }

  onNext1(form: FormGroup) {
    this.logger.log('domain:::' + form.value.businessDomain);
  }

  onSubmit() {
    this.dialog.open(FormConfirmDialogComponent,
      {
        width: '45%',
        data: {
          form2: this.paramForm, form1: this.productSpecsForm,
          form3: this.timeForm
        }
      });
  }

  RegStartDateFilter = (d: Date): boolean => {
    // Prevent dates after delivery date
    const currentDate = new Date();
    return d > currentDate && d < this.paramForm.value.deliveryDate;
    // return true;
  }

  RegEndDateFilter = (d: Date): boolean => {
    // Prevent dates before registration start date
    return d > this.timeForm.value.regStartDate && d < this.paramForm.value.deliveryDate;
  }
  AuctionStartDateFilter = (d: Date): boolean => {
    // Prevent dates before registration end date
    return d > this.timeForm.value.regEndDate && d < this.paramForm.value.deliveryDate;
  }
  AuctionEndDateFilter = (d: Date): boolean => {
    // Prevent dates before auction start date
    return d > this.timeForm.value.auctionStartDate && d < this.paramForm.value.deliveryDate;
  }

  get productName() {
    return this.productSpecsForm.get('productName');
  }

  get productDescription() {
    return this.productSpecsForm.get('productDescription');
  }

  get quantityValue() {
    return this.productSpecsForm.get('quantityValue');
  }

  get price() {
    return this.paramForm.get('price');
  }

  get creditPeriod() {
    return this.paramForm.get('creditPeriod');
  }

  productNameError() {
    return this.productName.hasError('required') ? '*You must enter a product name' :
    this.productName.hasError('minlength') ? '*( Atleast 3 characters)' :
    this.productName.hasError('maxlength') ? '*More than 40 characters not allowed' :
        '';
  }

  productDescriptionError() {
    return this.productDescription.hasError('required') ? '*You must enter product Details' :
    this.productDescription.hasError('minlength') ? '*Describe little more( Atleast 40 characters)' :
    this.productDescription.hasError('maxlength') ? '*400 characters limit reached' :
      '';
  }

  quantityValueError() {
    return this.quantityValue.hasError('required') ? '*You must enter quantity value' :
      this.quantityValue.hasError('min') ? '*Enter positive quantity' :
        '';
  }

  priceError() {
    return this.price.hasError('required') ? '*You must enter price' :
      this.price.hasError('min') ? '*Enter positive price' :
        this.price.hasError('maxLength') ? '*Enter reasonable price' : '';
  }

  creditPeriodError() {
    return this.creditPeriod.hasError('required') ? '*You must enter Credit Period' :
      this.creditPeriod.hasError('min') ? '* Enter positive credit period' :
        '';
  }

  goBack() {
    this.location.back();
  }
}
