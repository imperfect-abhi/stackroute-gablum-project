import { Component, OnInit, Inject } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { ProposalsDataService } from 'src/app/services/proposals-data.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Proposal } from 'src/app/interfaces/proposal';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-extend-proposal-dialog',
  templateUrl: './extend-proposal-dialog.component.html',
  styleUrls: ['./extend-proposal-dialog.component.css']
})
export class ExtendProposalDialogComponent implements OnInit {

  public static messageKey = 'extend-proposal-dialog-component';

  extendProposalForm = new FormGroup({
    regStartDate: new FormControl({ value: '' }, [Validators.required]),
    regEndDate: new FormControl({ value: '' }, [Validators.required])

  });

  public proposal: Proposal;

  get regStartDate() {
    return this.extendProposalForm.get('regStartDate');
  }

  get regEndDate() {
    return this.extendProposalForm.get('regEndDate');
  }

  get deliveryDate() {
    return this.extendProposalForm.get('deliveryDate');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Proposal,
    private router: Router,
    private proposalService: ProposalsDataService,
    private logger: LoggerService,
    public dialogRef: MatDialogRef<ExtendProposalDialogComponent>
  ) {}

  ngOnInit() {}

  onSubmit(proposal: Proposal, extendProposalForm) {
    proposal.regStartDate = this.extendProposalForm.value.regStartDate;
    proposal.regEndDate = this.extendProposalForm.value.regEndDate;
    this.logger.log('extending the registration period for a proposal.');
    this.logger.log(proposal);
    this.router.navigate(['/dashboard']);
    const extendRegistrationDate = {
      regStartDate: proposal.regStartDate,
      regEndDate: proposal.regEndDate,
      proposalId: proposal.proposalId
    };
    const extendRegistrationJSON = JSON.parse(JSON.stringify(extendRegistrationDate));
    // console.log('Patch Data :::', extendRegistrationJSON);
    this.proposalService.extendProposal(ExtendProposalDialogComponent.messageKey, extendRegistrationJSON, 'proposals')
      .subscribe((response) => {
        this.proposalService.getAllProposals(ExtendProposalDialogComponent.messageKey, 'proposals');
        this.dialogRef.close(ExtendProposalDialogComponent);
      });
  }
  RegStartDateFilter = (d: Date): boolean => {
    return d < new Date(this.data.deliveryDate);
  }

  RegEndDateFilter = (d: Date): boolean => {
    return d >= new Date(this.extendProposalForm.value.regStartDate) && d < new Date(this.data.deliveryDate);
  }

  close() {
    this.dialogRef.close(ExtendProposalDialogComponent);
  }

}
