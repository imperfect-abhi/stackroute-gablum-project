import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Proposal } from 'src/app/interfaces/proposal';
import { Auction } from 'src/app/interfaces/auction';
import { AuctionsDataService } from 'src/app/services/auctions-data.service';
import { AuctionStartDialogComponent } from 'src/app/auction/auction-start-dialog/auction-start-dialog.component';
import { Profile } from 'src/app/interfaces/profile';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { ProposalsDataService } from 'src/app/services/proposals-data.service';
import { SellersListDialogComponent } from '../sellers-list-dialog/sellers-list-dialog.component';
import { ExtendProposalDialogComponent } from '../extend-proposal-dialog/extend-proposal-dialog.component';
import { Weights } from '../../interfaces/weights';
import { element } from 'protractor';
import { ProfileDataService } from 'src/app/services/profile-data.service';
@Component({
  selector: 'app-proposal-seller-dialog',
  templateUrl: './proposal-seller-dialog.component.html',
  styleUrls: ['./proposal-seller-dialog.component.css']
})
export class ProposalSellerDialogComponent implements OnInit {

  public static messageKey = 'ProposalSellerDialog';
  public userProfile: Profile;
  proposals: Proposal[];
  allProposals: Proposal[];
  auctions: Auction[];
  pastAuctions: Proposal[];
  public businessSubdomain: string;
  isBuyer;
  isSeller;
  userRole;
  tog;
  weightObject = [];
  weightData;
  view: any[] = [500, 165];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auctionDataService: AuctionsDataService,
    private matDialog: MatDialog, private comms: CommunicatorService,
    private proposalDataService: ProposalsDataService,
    private user: ProfileDataService
  ) {
    this.weightObject = Object.keys(this.data).filter((ele) => {
      if (ele === 'priceWeight' ||
        ele === 'deliveryDateWeight' ||
        ele === 'creditPeriodWeight' ||
        ele === 'qualityCertificationWeight' ||
        ele === 'methodOfSupplyWeight') {
        return {
          name: ele,
          value: this.data[ele]
        };
      }
    });
    comms.getMessages().subscribe(msg => {
      if (msg.dest === ProposalSellerDialogComponent.messageKey || msg.dest === '@all') {
        const Data = msg.data;

        if ('userProfile' in Data) {
          this.userProfile = Data.userProfile;
          if (this.userProfile.role.length === 1) {
            if (this.userProfile.role[0].role === 'seller') {
              this.isSeller = true;
              this.isBuyer = false;
            } else {
              this.isSeller = false;
              this.isBuyer = true;
            }
          } else {
            this.isBuyer = true;
            this.isSeller = true;
          }
        }
      }
    });
  }
  data1;

  ngOnInit() {
    this.weightData = this.weightObject.map(key => {
      return {
        name: key, value: this.data[key]
      };
    });
    this.user.getUserProfileByEmail(ProposalSellerDialogComponent.messageKey, 'userProfile');
  }

}
