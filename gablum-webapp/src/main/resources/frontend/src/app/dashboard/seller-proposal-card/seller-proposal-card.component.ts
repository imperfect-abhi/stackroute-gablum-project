import { Component, OnInit, Input } from '@angular/core';
import { Proposal } from '../../interfaces/proposal';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from '../../services/logger.service';
import { ProposalsDataService } from '../../services/proposals-data.service';
import { CommunicatorService } from '../../services/communicator.service';
import { ProposalSellerDialogComponent } from '../proposal-seller-dialog/proposal-seller-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Profile } from 'src/app/interfaces/profile';
import { all } from 'q';

@Component({
  selector: 'app-seller-proposal-card',
  templateUrl: './seller-proposal-card.component.html',
  styleUrls: ['./seller-proposal-card.component.css']
})
export class SellerProposalCardComponent implements OnInit {

  public static messageKey = 'seller-proposal-card-component';
  public isLoggedIn = false;
  public isBuyer = false;
  public isSeller = false;
  public profile: Profile;
  alreadyRegistered: boolean;
  public userEmail = '';
  @Input() allProposal: Proposal;
  public buttonClicked = false;

  constructor(private proposalDataService: ProposalsDataService, private comms: CommunicatorService,
              private dialog: MatDialog,
              private logger: LoggerService,
              private auth: AuthenticationService
             ) {
              if (auth.getAuthenticated()) {
                this.isLoggedIn = true;
                this.profile = auth.getProfileData();
                this.isBuyer = auth.isBuyer();
                this.isSeller = auth.isSeller();
                this.userEmail = this.profile.email;
              }
              comms.getMessages().subscribe(msg => {
                if (msg.dest === SellerProposalCardComponent.messageKey || msg.dest === '@all') {
                  const data = msg.data;

                  if ('authChanged' in data) {
                    this.isLoggedIn = auth.getAuthenticated();
                    this.profile = auth.getProfileData();
                    this.isBuyer = auth.isBuyer();
                    this.isSeller = auth.isSeller();
                    this.userEmail = this.profile.email;
                  }

                  // if ('interestedSellers' in data) {
                  //   this.buttonClicked = true;
                  // }
              }
            });
          }

  ngOnInit() {
  }

  shownInterest(allProposal: Proposal) {
    // const proposalId = element.proposalId;
    this.proposalDataService.postInterestedSeller(SellerProposalCardComponent.messageKey, allProposal, 'interestedSellers');
    this.buttonClicked = true;
  }

  openDialog(allProposal: Proposal) {
    this.proposalDataService.postSellerView(SellerProposalCardComponent.messageKey, this.allProposal, 'saveSellerView');
    this.dialog.open(ProposalSellerDialogComponent, {
      // width: '60%',
      // height: '60%',
      data: allProposal
    });
    // this.allProposal.views += 1;
    this.logger.log('view--->' + JSON.stringify(allProposal));
  }
}
