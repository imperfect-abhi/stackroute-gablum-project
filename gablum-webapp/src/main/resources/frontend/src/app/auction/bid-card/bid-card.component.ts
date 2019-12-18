import { Component, OnInit, Input } from '@angular/core';
import { NewBid } from 'src/app/interfaces/newbid';
import { NgxData } from 'src/app/interfaces/ngx-data';
import { AuctionsDataService } from 'src/app/services/auctions-data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { WinningBidDialogComponent } from '../winning-bid-dialog/winning-bid-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Auction } from 'src/app/interfaces/auction';


@Component({
  selector: 'app-bid-card',
  templateUrl: './bid-card.component.html',
  styleUrls: ['./bid-card.component.css']
})
export class BidCardComponent implements OnInit {
  constructor(
    private auctionDataService: AuctionsDataService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private auth: AuthenticationService,
    public router: Router
    ) {
  }
  public static messageKey = 'BidCardComponent';
  public auctionId: string;
  public bidRank: number;

  @Input() public auction: Auction;
  @Input() public bidDataEntity: NewBid;

  public data: NgxData[];


  ngOnInit() {
    this.data = Object.keys(this.bidDataEntity.scoreObject).map(key => {
        return {name: key, value: this.bidDataEntity.scoreObject[key]};
    }).filter(item => item.name !== 'total');
    this.route.paramMap
      .subscribe((params: Params) => {
        this.auctionId = params.get('id');
      });
  }

  openDialog(bidDataEntity1: NewBid) {
    const sellerEmail = bidDataEntity1.createdBy;
    const buyerEmail = this.auction.createdBy;
    const bidData = {
      bidDataEntity: bidDataEntity1,
      auctionID: this.auctionId
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = bidData;
    dialogConfig.width = '40%';
    this.matDialog.open(WinningBidDialogComponent, dialogConfig);
  }
  loadProfile(email) {
    this.router.navigate(['/profile', email]);
  }

}
