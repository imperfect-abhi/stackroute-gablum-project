import { Proposal } from './proposal';

type uuid = string;

export interface Auction {
    auctionId: uuid;
    uniqueLink: string;
    auctionName: string;
    proposal: Proposal;
    isAuctionActive: boolean;
    isAuctionFinished: boolean;
    participantsVerificationId: string;
    selectedParticipantList: string[];
    interestedUsersEmail: string[];
    winningBid: string;
    createdOn: Date;
    updatedOn: Date;
    createdBy: string;
    updatedBy: string;
    auctionStartDate: Date;
    auctionEndDate: Date;
    socketToken?: string;
    bidIdList: string[];
}
