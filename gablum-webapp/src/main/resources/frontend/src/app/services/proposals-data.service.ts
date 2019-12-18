import { Injectable } from '@angular/core';
import { CommunicatorService } from './communicator.service';
import { NetworkingService } from './networking.service';
import { Proposal } from '../interfaces/proposal';
import { environment } from 'src/environments/environment';
import { LoggerService } from './logger.service';
// import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class ProposalsDataService {

  public proposalsUrl: string;
  public guestProposallistUrl: string;
  public sellerProposalsUrl: string;
  public inviteSellerUrl: string;
  public saveSellerViewUrl: string;
  public businessSubdomain: string;

  constructor(
    private comms: CommunicatorService,
    private networking: NetworkingService,
    private logger: LoggerService
  ) {
    this.proposalsUrl = environment.proposalUrl;
    this.guestProposallistUrl = environment.guestProposallistUrl;
    this.inviteSellerUrl = environment.inviteSellerUrl;
    this.saveSellerViewUrl = environment.saveSellerViewUrl;
  }

  saveProposal(dest, data, key) {
    this.networking.postData<Proposal>(this.proposalsUrl, dest, data, key);
    // .subscribe(res => {
    //   this.getAllProposals('DashboardComponent', 'proposals');
    //   },
    //   err => {
    //     this.logger.log(err);
    //   });
    }

  getAllProposals(dest, key) {
    this.networking.getData<Proposal>(this.proposalsUrl, dest, key);
  }

  getAllProposalForSeller(dest, key) {
    this.networking.getData<Proposal>(this.guestProposallistUrl, dest, key);
  }

  postInterestedSeller(dest, data, key) {
    this.businessSubdomain = data.businessSubDomain;
    this.networking.patchData<Proposal>(this.proposalsUrl, dest, data, key)
    .subscribe(res => {
      this.getProposalsBySubDomain(this.businessSubdomain, 'DashboardComponent', 'sellerProposals');
      },
      err => {
        this.logger.log(err);
      });
  }

  postInvitedSeller(dest, data, key) {
    this.networking.patchData<Proposal>(this.inviteSellerUrl, dest, data, key)
    .subscribe(res => {
      this.getAllProposals(dest, key);
    },
    err => {
      this.logger.log(err);
    });
  }

  postSellerView(dest, data, key) {
    this.networking.patchData<Proposal>(this.saveSellerViewUrl, dest, data, key)
    .subscribe(res => {
      this.getAllProposals('DashboardComponent', 'proposals');
      },
      err => {
        this.logger.log(err);
      });
  }

  deleteProposal(proposalId, dest, key) {
    const proposalUrlDel = this.proposalsUrl + '/' + proposalId;
    this.networking.deleteData<Proposal>(proposalUrlDel, dest, key).subscribe(
      res => {
        this.getAllProposals(dest, key);
      }
    );
  }

  extendProposal(dest, data, key) {
    const proposalExtend = this.proposalsUrl + '/' + data.proposalId;
    return this.networking.patchData<Proposal>(proposalExtend, dest, data, key);
  }

  getProposalsBySubDomain(businessSubDomain: string, dest, key) {
    const proposalUrlSubDomain = this.guestProposallistUrl + '/' + businessSubDomain;
    this.networking.getData<Proposal>(proposalUrlSubDomain, dest, key);
  }


  changeAuctionFlag(proposalId, dest, key) {
    const proposalAuctionStartUrl = this.proposalsUrl + '/' + proposalId + '/auction-started';
    this.networking.patchData(proposalAuctionStartUrl, dest, '', key).subscribe((res) => {
      this.getAllProposals('DashboardComponent', 'proposals');
    },
    err => {
        this.logger.log(err);
    });
    this.logger.log('in change auctionnnnnnnn------------>');
  }


}
