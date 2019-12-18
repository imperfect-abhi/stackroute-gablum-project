import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { AuctionsDataService } from 'src/app/services/auctions-data.service';
import { NewBid } from 'src/app/interfaces/newbid';
import { ContractsDataService } from 'src/app/services/contracts-data.service';


@Component({
  selector: 'app-winning-bid-dialog',
  templateUrl: './winning-bid-dialog.component.html',
  styleUrls: ['./winning-bid-dialog.component.css']
})
export class WinningBidDialogComponent {

  public static messageKey = 'WinningBidDialogComponent';
  bidData = this.data.bidDataEntity;
  auctionIdn = this.data.auctionID;
  public qualityMsgTrue = 'Provided';
  public qualityMsgFalse = 'Not Provided';
  public supplyTrue = 'FULL';
  public supplyFalse = 'IN PARTS';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<WinningBidDialogComponent>,
    private auctionDataService: AuctionsDataService,
    private router: Router,
    private comms: CommunicatorService,
    private contractsDataService: ContractsDataService
  ) {
    comms.getMessages().subscribe(msg => {
      if (msg.dest === WinningBidDialogComponent.messageKey || msg.dest === '@all') {
        const data1 = msg.data;

        // if ('save-auction' in data1) {
        //   this.auctionDataService.getAllAuctions('DashboardComponent', 'auctions');
        // }

      }
    });
  }


  close() {
  this.dialogRef.close();
  }
  selectBid() {
    this.auctionDataService.saveWinningBid(WinningBidDialogComponent.messageKey, this.bidData, 'winningBid', this.auctionIdn);
    this.contractsDataService.getAllContracts('ContractPageComponent', 'contracts');
    this.router.navigate(['contracts']);
    this.close();
  }






}
