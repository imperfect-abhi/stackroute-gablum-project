import { Injectable, OnInit } from '@angular/core';
import { CommunicatorService } from './communicator.service';
import { NetworkingService } from './networking.service';
import { Auction } from '../interfaces/auction';
import { environment } from 'src/environments/environment';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionsDataService {

  public auctionsUrl: string;
  bidUrl;
  auctionUrlForSingle;
  oldAuctionUrl;

  constructor(
    private comms: CommunicatorService,
    private networking: NetworkingService,
    private logger: LoggerService
  ) {
    this.auctionsUrl = environment.auctionUrl;
  }

  getAllAuctions(dest, key) {
    this.networking.getData<Auction>(this.auctionsUrl, dest, key);
  }

  getAllAuctionsBuyer(dest, key) {
    const auctionUrlBuyer = this.auctionsUrl + '/buyer';
    this.networking.getData<Auction>(auctionUrlBuyer, dest, key);
  }

  getAllAuctionsSeller(dest, key) {
    const auctionUrlSeller = this.auctionsUrl + '/seller';
    this.networking.getData<Auction>(auctionUrlSeller, dest, key);
  }

  getAuctionById(dest, key, auctionId) {
    this.auctionUrlForSingle = this.auctionsUrl + '/' + auctionId;
    this.networking.getData<Auction>(this.auctionUrlForSingle, dest, key);
  }

  saveAuction(dest, data, key) {
    this.networking.postData(this.auctionsUrl, dest, data, key);
  }

  saveBid(dest, data, key, auctionId) {
    this.bidUrl = this.auctionsUrl + '/' + auctionId + '/bid';
    this.networking.postData(this.bidUrl, dest, data, key);
  }

  getScore(dest, data, key, auctionId) {
    this.bidUrl = this.auctionsUrl + '/' + auctionId + '/bid/score';
    this.networking.postData(this.bidUrl, dest, data, key);
  }

  getBidsAuction(dest, key, auctionId) {
    this.bidUrl = this.auctionsUrl + '/' + auctionId + '/bid';
    this.networking.getData(this.bidUrl, dest, key);
  }

  saveWinningBid(dest, data, key, auctionId) {
    this.bidUrl = this.auctionsUrl + '/' + auctionId + '/bid/end';
    this.networking.patchData(this.bidUrl, dest, data, key).subscribe((res) => {
      // console.log('We won');
    },
    err => {
        this.logger.log(err);
    });
  }

  getOldAuctions(dest, key) {
    this.oldAuctionUrl = this.auctionsUrl + '/buyer/old';
    this.networking.getData(this.oldAuctionUrl, dest, key);
  }
}
