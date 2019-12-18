package com.gablum.contract.contracts.model.othermodels;

import lombok.*;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class Auction {
    private String _id;
    private String auctionId = UUID.randomUUID().toString();
    private String uniqueLink;
//    private UUID proposalId;
    private String auctionName;
    private Proposal proposal;
    private boolean isAuctionActive;
    private String participantsVerificationId;
    private List<String> selectedParticipantList; // usernames
    private List<String> interestedUsersEmail;
    private List<String> bidIdList;
    private HashMap<String, String> socketTokens;
    private Date createdOn;
    private Date updatedOn;
    private String createdBy; // username
    private String updatedBy; // username
    private Date auctionStartDate;
    private Date auctionEndDate;
    private String winningBid;

    public String toStringContract(){
        return auctionId + auctionName + proposal.toStringContract();
    }
    public String toBeEncrypted(){
        return auctionName + String.valueOf(auctionStartDate) + String.valueOf(auctionEndDate)
                +proposal.toBeEncrypted() + String.valueOf(auctionStartDate) + String.valueOf(auctionEndDate);
    }

}