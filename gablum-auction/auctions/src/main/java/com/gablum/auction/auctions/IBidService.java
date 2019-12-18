package com.gablum.auction.auctions;

import java.text.ParseException;
import java.util.List;

public interface IBidService {

    BidDataEntity addBid(BidDataEntity bidDataEntity);
    List<BidDataEntity> getBids();
    ScoreObject getBidScore(Bid bid, String auctionId) throws ParseException;
}
