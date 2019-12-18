type uuid = string;

export interface Proposal {
    proposalId: uuid;
    productId: uuid;
    createdBy: uuid;
    updatedBy: uuid;
    businessDomain: string;
    businessSubDomain: string;
    productName: string;
    quantityValue: number;
    quantityUnit: string;
    price: number;
    priceWeight: number;
    deliveryDate: Date;
    deliveryDateWeight: number;
    creditPeriod: number;
    creditPeriodWeight: number;
    qualityCertification: boolean;
    qualityCertificationWeight: number;
    methodOfSupply: boolean;
    methodOfSupplyWeight: number;
    regStartDate: Date;
    regEndDate: Date;
    auctionStartDate: Date;
    auctionEndDate: Date;
    createdOn: Date;
    updatedOn: Date;
    thresholdParticipants: number;
    viewSellerEmails: string[];
    interested: number;
    interestedUsersEmail: string[];
    invitedUsersEmail: string[];
    productDescription: string;
}
