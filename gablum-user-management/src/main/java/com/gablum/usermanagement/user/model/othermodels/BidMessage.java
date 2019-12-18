package com.gablum.usermanagement.user.model.othermodels;

//import com.gablum.auction.auctions.Bid;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class BidMessage {
    private BidDataEntity bidDataEntity;
    private String instanceId;
}
