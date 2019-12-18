package com.gablum.contract.contracts.model.othermodels;

import lombok.*;

import java.util.UUID;

@Getter @Setter @AllArgsConstructor @ToString @NoArgsConstructor
public class BidDataEntity {
    private String bidId = UUID.randomUUID().toString();
    private String auctionId;
    private String userId;
    private Bid bid;
    private float score;
    private ScoreObject scoreObject;
    private String createdBy;
    private long rank;
    public String toStringContract(){
        return this.getBidId() + this.getAuctionId() + this.getCreatedBy() +
                this.getBid().toString()+ String.valueOf(this.scoreObject.getTotal());
    }

}
