export interface NewBid {
    bidId: string;
    auctionId: string;
    bid: {
        price: number;
        creditPeriod: number;
        qaqcCertificate: boolean;
        typeOfSupply: boolean;
        timeOfDelivery: Date;
        };
    scoreObject: {
        total: number;
        deliveryScore: number;
        priceScore: number;
        creditScore: number;
        qaqcScore: number;
        typeScore: number;
    };
    createdBy: string;
    rank?: number;
    createdOn?: string;
    percentile?: number;
}
