import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { ProposalsDataService } from 'src/app/services/proposals-data.service';
import { Proposal } from 'src/app/interfaces/proposal';
import { Location } from '@angular/common';
@Component({
  selector: 'app-browse-proposals-seller',
  templateUrl: './browse-proposals-seller.component.html',
  styleUrls: ['./browse-proposals-seller.component.css']
})
export class BrowseProposalsSellerComponent implements OnInit {

  public static messageKey = 'browser-proposals-seller-component';
  public proposals: Proposal[];

  constructor(private comms: CommunicatorService,
              private proposalDataService: ProposalsDataService,
              private location: Location) {
    comms.getMessages().subscribe(msg => {
      if (msg.dest === BrowseProposalsSellerComponent.messageKey || msg.dest === '@all') {
        const data = msg.data;

        if ('proposals' in data) {
          this.proposals = data.proposals;
        }
   }
  });
}

      ngOnInit() {
    this.proposalDataService.getAllProposalForSeller(BrowseProposalsSellerComponent.messageKey, 'proposals');

  }

  goBack() {
    this.location.back();
  }
}
