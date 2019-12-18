package com.gablum.auction.auctions;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.UUID;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class AuctionRepoTests {

    @Autowired
    private AuctionRepo auctionRepo;

    private Auction testAuction1 = new Auction();
    private Auction testAuction2 = new Auction();

    @BeforeEach
    public void setupEntities() {
    }

    @AfterEach
    public void removeEntities() {
        auctionRepo.deleteAll();
    }

    @Test
    public void dbCanStore() {
        Assertions.assertEquals(
                2,
                auctionRepo.saveAll(
                        List.of(testAuction1, testAuction2)
                ).size(),
                "repo should be able to store all"
        );
    }

    @Test
    public void dbCanFetchAll() {
        auctionRepo.saveAll(
                List.of(testAuction1, testAuction2)
        );
        Assertions.assertEquals(
                2,
                auctionRepo.findAll().size(),
                "repo can store and fetch all elements"
        );
    }

    @Test
    public void dbCanFetchOne() {
        auctionRepo.saveAll(
                List.of(testAuction1, testAuction2)
        );

        Assertions.assertEquals(
                testAuction1.getAuctionId(),
                auctionRepo.findByAuctionId(testAuction1.getAuctionId()).orElse(null).getAuctionId(),
                "repo should be able to fetch a specific auction from id"
        );
    }

    @Test
    public void dbCanDeleteOne() {
        auctionRepo.saveAll(
                List.of(testAuction1, testAuction2)
        );

        Auction auctionToDelete = auctionRepo.findByAuctionId(testAuction1.getAuctionId()).orElse(null);
        auctionRepo.deleteByAuctionId(auctionToDelete.getAuctionId());

        Assertions.assertEquals(
                1,
                auctionRepo.findAll().size(),
                "should now contain one element"
        );

        Assertions.assertEquals(
                testAuction2.getAuctionId(),
                auctionRepo.findAll().get(0).getAuctionId(),
                "should now only contain 'testAuction2'"
        );
    }
}
