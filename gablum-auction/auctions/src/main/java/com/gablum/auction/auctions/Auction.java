package com.gablum.auction.auctions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AccessLevel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Document(collection = "auctions")
public class Auction {
    @Id
    private String _id;
    @Indexed(unique = true)
    @Setter(AccessLevel.NONE)
    private String auctionId = UUID.randomUUID().toString();
    private String uniqueLink;
//    private UUID proposalId;
    private String auctionName;
    public Proposal proposal;
    boolean isAuctionActive;
    boolean isAuctionFinished;
    private String participantsVerificationId;
    private List<String> selectedParticipantList; // usernames
    private List<String> interestedUsersEmail;
    private List<String> invitedUsersEmail = new ArrayList<>();
    private String winningBid;
    private HashMap<String, String> socketTokens;
    private Date createdOn;
    private Date updatedOn;
    private String createdBy; // username
    private String updatedBy; // username
    private Date auctionStartDate;
    private Date auctionEndDate;
    private List<String> bidIdList;
    public String toStringContract(){
        return auctionId + auctionName + proposal.toStringContract();
    }
    public String toBeEncrypted(){
        return auctionName + String.valueOf(auctionStartDate) + String.valueOf(auctionEndDate)
                +proposal.toBeEncrypted() + String.valueOf(auctionStartDate) + String.valueOf(auctionEndDate);
    }
}