package com.gablum.auction.auctions.rabbit;

//import com.gablum.auction.auctions.Bid;
import com.gablum.auction.auctions.BidDataEntity;
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
