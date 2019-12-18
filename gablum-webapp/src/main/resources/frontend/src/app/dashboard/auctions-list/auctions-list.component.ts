import { Component, OnInit } from '@angular/core';
import { AuctionsDataService } from 'src/app/services/auctions-data.service';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { Auction } from 'src/app/interfaces/auction';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.css']
})
export class AuctionsListComponent implements OnInit {

  public static messageKey = 'auctions-list-component';

  public auctions: Auction[];

  constructor(
    private auctionDataService: AuctionsDataService,
    private comms: CommunicatorService,
    private logger: LoggerService
    ) {
      comms.getMessages().subscribe(msg => {
        if (msg.dest === AuctionsListComponent.messageKey || msg.dest === '@all') {
          const data = msg.data;

          if ('auctions' in data) {
            this.auctions = data.auctions;
            this.logger.log(this.auctions);
          }
        }
      });
    }

  ngOnInit() {
    this.auctionDataService.getAllAuctions(AuctionsListComponent.messageKey, 'auctions');
  }

}
