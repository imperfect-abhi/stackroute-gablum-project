import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ContractDetail } from 'src/app/interfaces/contract-detail';
import { ContractsDataService } from 'src/app/services/contracts-data.service';
import { Auction } from 'src/app/interfaces/auction';
import { Proposal } from 'src/app/interfaces/proposal';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NewBid } from 'src/app/interfaces/newbid';
import { ContractWithBothUser } from 'src/app/interfaces/contract-with-both-user';
import { Profile } from 'src/app/interfaces/profile';
import { TranslateService } from '@ngx-translate/core';
import { IntlService } from 'src/app/services/intl.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  public static messagekey = 'ContractDetail';
  public contract: ContractDetail;
  public buyer: Profile;
  public seller: Profile;
  public auctionDetails: Auction;
  public proposal: Proposal;
  public productName: string;
  public sellerName: string;
  public bidDetails: NewBid;
  constructor(
    @Inject(MAT_DIALOG_DATA) public contractWithBothUser: ContractWithBothUser,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractsDataService,
    public translate: TranslateService,
    public intl: IntlService
  ) {
    this.contract = this.contractWithBothUser.contract;
    this.buyer = this.contractWithBothUser.buyer;
    this.seller = this.contractWithBothUser.seller;
    this.auctionDetails = this.contract.auctionDetails;
    this.proposal = this.auctionDetails.proposal;
    this.productName = this.proposal.productName;
    this.bidDetails = this.contract.bidDetails;
    this.sellerName = this.bidDetails.createdBy;
    translate.addLangs(['en', 'fr', 'hi']);
    translate.setDefaultLang('en');
    // const browserLang = translate.getBrowserLang();
    translate.use(intl.getLang());
  }
  ngOnInit() {}
}
