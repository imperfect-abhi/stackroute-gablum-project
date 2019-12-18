package com.gablum.usermanagement.user.model.othermodels;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.UUID;

@Getter @Setter @AllArgsConstructor @ToString @NoArgsConstructor
public class BidDataEntity {
    @Id
    private String _id;
    private String bidId = UUID.randomUUID().toString();
    private String auctionId;
    private String userId;
    private Bid bid;
    private float score;
    private String createdBy;

    private long rank;

    private Date createdOn;
    private ScoreObject scoreObject;
    private float percentile;
    public String toStringContract(){
        return this.getBidId() + this.getAuctionId() + this.getCreatedBy() +
                this.getBid().toString()+ String.valueOf(this.scoreObject.getTotal());
    }
}
