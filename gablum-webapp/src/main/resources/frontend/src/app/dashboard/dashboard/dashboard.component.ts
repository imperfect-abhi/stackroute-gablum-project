import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { NewBid } from 'src/app/interfaces/newbid';
import { DashboardSection } from 'src/app/interfaces/dashboard-section';
import { LoggerService } from 'src/app/services/logger.service';
import { ProposalsDataService } from 'src/app/services/proposals-data.service';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { Proposal } from 'src/app/interfaces/proposal';
import { Auction } from 'src/app/interfaces/auction';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProposalCardDialogComponent } from '../proposal-card-dialog/proposal-card-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuctionsDataService } from 'src/app/services/auctions-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileDataService } from 'src/app/services/profile-data.service';
import { Profile } from 'src/app/interfaces/profile';
// import { TranslateService } from '@ngx-translate/core';
// import { IntlService } from 'src/app/services/intl.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public static messageKey = 'DashboardComponent';
  public buttonName = 'BUYERS VIEW';
  public show = true;

  public isLoggedIn = false;
  public isBuyer;
  public isSeller;
  public userRole = new Array();

  public userProfile: Profile;
  proposals: Proposal[];
  allProposals: Proposal[];
  auctions: Auction[];
  oldAuctions: Auction[];
  auctionsBuyer: Auction[];
  auctionsSeller: Auction[];
  pastAuctions: Proposal[];
  public businessSubdomain: string;
  public auctionsNotEmpty = true;
  public oldAuctionsNotEmpty = true;

  public bids: NewBid[] = [];
  data;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    public dialog: MatDialog,
    private ws: WebsocketService,
    private user: ProfileDataService,
    private proposalDataService: ProposalsDataService,
    private auctionDataService: AuctionsDataService,
    private comms: CommunicatorService,
    private router: Router,
    private logger: LoggerService,
    private auth: AuthenticationService,
    public http: HttpClient,
    // public translate: TranslateService,
    // public intl: IntlService
  ) {
    comms.getMessages().subscribe(msg => {
      if (msg.dest === DashboardComponent.messageKey || msg.dest === '@all') {
        const data = msg.data;

        if ('proposals' in data) {
          this.proposals = data.proposals;
        }

        if ('sellerProposals' in data) {
          this.allProposals = data.sellerProposals;
        }


        if ('auctionsSeller' in data) {
          this.auctionsSeller = data.auctionsSeller;
        }

        if ('auctionsSellerOnly' in data) {
          this.auctionsSeller = data.auctionsSellerOnly;
          this.auctions = this.auctionsSeller;
          if (this.auctions.length !== 0) {
            this.auctionsNotEmpty = true;
          } else {
            this.auctionsNotEmpty = false;
          }
        }



        if ('auctionsBuyer' in data) {
          this.auctionsBuyer = data.auctionsBuyer;
          this.auctions = this.auctionsBuyer;
          if (this.auctions.length !== 0) {
            this.auctionsNotEmpty = true;
          } else {
            this.auctionsNotEmpty = false;
          }
          this.logger.log('auctionnnnnnsbbbuuyyer------>', this.auctionsBuyer);
        }


        if ('authChanged' in data) {
          this.isLoggedIn = auth.getAuthenticated();
          // this.logger.log(this, auth.getProfileData());
        }

        if ('userProfile' in data) {
          // getting user profile for subDomain
          this.userProfile = data.userProfile;
          this.businessSubdomain = this.userProfile.businessSubDomain;
          this.proposalDataService.getProposalsBySubDomain(
            this.businessSubdomain,
            DashboardComponent.messageKey,
            'sellerProposals'
          );

          this.userRole = this.userProfile.role;
          // console.log(this.userProfile.role[0]);
          // console.log(this.userProfile.role[1]);
          if (this.userProfile.role.length === 1) {
            if (this.userProfile.role[0].role === 'seller') {
              this.isSeller = true;
              this.isBuyer = false;
              this.auctionDataService.getAllAuctionsSeller(
                DashboardComponent.messageKey,
                'auctionsSellerOnly'
              );
            } else {
              this.isSeller = false;
              this.isBuyer = true;
            }
          } else {
            this.isBuyer = true;
            this.isSeller = true;
          }
        }

        if ('oldAuctions' in data) {
          this.oldAuctions = data.oldAuctions;
          this.logger.log('olllddd auctions', this.oldAuctions);
          if (this.oldAuctions.length !== 0) {
            this.oldAuctionsNotEmpty = true;
          } else {
            this.oldAuctionsNotEmpty = false;
          }
        }

        // translate.addLangs(['en', 'fr', 'hi']);
        // translate.setDefaultLang('en');
    // const browserLang = translate.getBrowserLang();
        // translate.use(intl.getLang());
        // console.log(this.isBuyer);
        // console.log(this.isSeller);
      }
    });
  }

  ngOnInit() {
    // this.ws.connect(message => this.subscribe());
    this.proposalDataService.getProposalsBySubDomain(
      this.businessSubdomain,
      DashboardComponent.messageKey,
      'sellerProposals'
    );
    this.proposalDataService.getAllProposals(
      DashboardComponent.messageKey,
      'proposals'
    );
    this.user.getUserProfileByEmail(
      DashboardComponent.messageKey,
      'userProfile'
    );


    this.auctionDataService.getAllAuctionsBuyer(
      DashboardComponent.messageKey,
      'auctionsBuyer'
    );


    this.auctionDataService.getAllAuctionsSeller(
        DashboardComponent.messageKey,
        'auctionsSeller'
      );

    this.auctionDataService.getOldAuctions(
      DashboardComponent.messageKey,
      'oldAuctions'
      );
  }

  send() {
    this.ws.sendBid({ price: 100 });
  }

  openDialog(proposal: Proposal) {
    this.dialog.open(ProposalCardDialogComponent, {
      width: '60%',
      height: '60%',
      data: { proposal }
    });
  }

  // doStuff(proposal: Proposal) {
  //   this.dialog.open(DetailsDialogComponent, {data: proposal});
  // }
  startAuction(proposal1: Proposal) {
    const auction = {
      auctionName: proposal1.productName,
      proposal: proposal1,
      isAuctionActive: true,
      interestedUsersEmail: proposal1.interestedUsersEmail,
      invitedUsersEmail: proposal1.invitedUsersEmail
    };
    const auctionList = [];
    auctionList.push(auction);

    this.data = JSON.parse(JSON.stringify(auctionList));

    this.auctionDataService.saveAuction(
      DashboardComponent.messageKey,
      this.data,
      'save-auction'
    );
  }
  switch() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
      this.buttonName = 'BUYERS VIEW';
      this.auctions = this.auctionsBuyer;
      if (this.auctions.length !== 0) {
        this.auctionsNotEmpty = true;
      } else {
        this.auctionsNotEmpty = false;
      }

    } else {
      this.buttonName = 'SELLERS VIEW';
      this.auctions = this.auctionsSeller;
      if (this.auctions.length !== 0) {
        this.auctionsNotEmpty = true;
      } else {
        this.auctionsNotEmpty = false;
      }
    }
  }
}
