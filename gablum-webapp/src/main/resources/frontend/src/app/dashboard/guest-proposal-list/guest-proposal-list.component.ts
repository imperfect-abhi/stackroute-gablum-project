import { Component, OnInit } from '@angular/core';
import { Proposal } from 'src/app/interfaces/proposal';
// import { MatDialog } from '@angular/material';
import { ProposalsDataService } from 'src/app/services/proposals-data.service';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { LoggerService } from 'src/app/services/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-proposal-list',
  templateUrl: './guest-proposal-list.component.html',
  styleUrls: ['./guest-proposal-list.component.css']
})
export class GuestProposalListComponent implements OnInit {
  public static messageKey = 'GuestProposalListComponent';
  proposals: Proposal[];
  displayedColumns: string[] = ['productName', 'businessSubDomain', 'createdBy', 'quantity', 'showInterest'];
  dataSource;
  alreadyRegistered = false;

  constructor(
    private proposalDataService: ProposalsDataService,
    private comms: CommunicatorService,
    private logger: LoggerService,
    public router: Router
    ) {
      comms.getMessages().subscribe(msg => {
        if (msg.dest === GuestProposalListComponent.messageKey || msg.dest === '@all') {
          const data = msg.data;
          logger.log('Response from api', msg);
          if ('proposals' in data) {
            this.proposals = data.proposals;
            this.logger.log(this.proposals.toString);
            this.dataSource = this.proposals;
          }
        }
      });
     }

  ngOnInit() {
    this.proposalDataService.getAllProposalForSeller(GuestProposalListComponent.messageKey, 'proposals');
  }
  shownInterest(element) {
    // const proposalId = element.proposalId;
    this.logger.log('some data which we are publishing ' , element );
    // this.alreadyRegistered = true;
    this.proposalDataService.postInterestedSeller(GuestProposalListComponent.messageKey, element , 'interestedSellers');
  }
  loadProfile(email) {
    this.router.navigate(['/profile', email]);
  }
}
