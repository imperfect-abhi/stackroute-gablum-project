package com.gablum.auction.auctions;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AuctionRepo extends MongoRepository<Auction, ObjectId> {

    Optional<Auction> findByAuctionId(String auctionId);
    void deleteByAuctionId(String auctionId);
    Page<Auction> findAll(Pageable pageable);
    Page<Auction> findAllByCreatedByAndIsAuctionActiveAndIsAuctionFinished(Pageable pageable,
                                                                           String email,
                                                                           boolean isAuctionActive,
                                                                           boolean isAuctionFinished);
    Page<Auction> findAllByInvitedUsersEmailContainingAndIsAuctionActiveAndIsAuctionFinished(Pageable pageable,
                                                                                             String email,
                                                                                                boolean isAuctionActive,
                                                                                                boolean isAuctionFinished);
}
