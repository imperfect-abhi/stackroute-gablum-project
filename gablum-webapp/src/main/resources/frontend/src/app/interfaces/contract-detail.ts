// import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Time } from '@angular/common';
import { Auction } from './auction';
import { Bid } from './bid';
import { NewBid } from './newbid';

export interface ContractDetail {
    _id: string;
    contractId: string;
    auctionId: string;
    bidId: string;
    auctionDetails: Auction;
    bidDetails: NewBid;
    buyerEmail: string;
    buyerESign: string;
    sellerESign: string;
    sellerEmail: string;
    contractStatus: boolean;
    currentHash: string;
    previousHash: string;
    createdOn: Date;
}
