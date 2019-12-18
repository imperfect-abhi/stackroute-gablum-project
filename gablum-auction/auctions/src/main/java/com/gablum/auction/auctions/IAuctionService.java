package com.gablum.auction.auctions;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface IAuctionService {
    List<Auction> getAllAuctions(Map<String, String> queryparam);

    Auction getAuctionById(String auctionId);

    List<Auction> addAuctions(List<Auction> auctionToAdd);

    Auction startAuction (String auctionId, String uniqueLink) throws ParseException;

}
