import { Component, OnInit, Input } from '@angular/core';
import { ContractsDataService } from 'src/app/services/contracts-data.service';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoggerService } from 'src/app/services/logger.service';
import { ContractDetail } from 'src/app/interfaces/contract-detail';
import { environment } from 'src/environments/environment';
import { ContractDetailComponent } from '../contract-detail/contract-detail.component';
import { ProfileDataService } from 'src/app/services/profile-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Profile } from 'src/app/interfaces/profile';
import { ContractWithBothUser } from 'src/app/interfaces/contract-with-both-user';

@Component({
  selector: 'app-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.css']
})
export class ContractCardComponent implements OnInit {

  public static messageKey = 'contract-card-component';
  public contractData: ContractDetail;
  public productName: string;
  public sellerName: string;
  public companyName: string;
  public deliveryDate: Date;
  public creditPeriod: number;
  // panelOpenState = false;
  public SellerEmail: string;
  public BuyerEmail: string;
  @Input() public contract: ContractDetail;
  public user: Profile;
  public profileUrl: string;
  public otherUser: Profile;
  public contractWithBothUsers: ContractWithBothUser;
  public supplyTrue = 'FULL';
  public supplyFalse = 'IN PARTS';

  constructor(
    private dialog: MatDialog,
    public contractDataService: ContractsDataService,
    private comms: CommunicatorService,
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService,
    private profileDataService: ProfileDataService,
    private auth: AuthenticationService,
  ) {
    this.user = auth.getProfileData();
    comms.getMessages().subscribe(msg => {
      if (msg.dest === ContractCardComponent.messageKey || msg.dest === '@all') {
        const data = msg.data;
        if ('otherUser' in data) {
          this.otherUser = data.otherUser;  // panelOpenState = false;
        }
      }
    });
  }

  ngOnInit() {
    const contractsUrl = environment.contractsUrl;
    this.profileUrl = environment.profileUrl;

    this.profileUrl = environment.profileUrl;
    if (this.contract.sellerEmail !== this.user.email) {
      this.SellerEmail = this.contract.bidDetails.createdBy;
      this.profileUrl = this.profileUrl + '/' + this.SellerEmail;

    } else {
      this.BuyerEmail = this.contract.auctionDetails.createdBy;
      this.profileUrl = this.profileUrl + '/' + this.BuyerEmail;
    }

    this.profileDataService.getUserProfileByEmailWithUrl(
    this.profileUrl, ContractCardComponent.messageKey, 'otherUser');
    this.contractWithBothUsers = {
      buyer: this.user,
      seller: this.user,
      contract: this.contract
    };
  }

  openDialog() {
    if (this.contract.buyerEmail === this.user.email) {
      this.contractWithBothUsers = {
        buyer: this.user,
        seller: this.otherUser,
        contract: this.contract
      };
    } else {
      this.contractWithBothUsers = {
        buyer: this.otherUser,
        seller: this.user,
        contract: this.contract
      };
    }
    this.dialog.open(ContractDetailComponent, {
      data: this.contractWithBothUsers,
      width: '80%'
    });
  }

}
