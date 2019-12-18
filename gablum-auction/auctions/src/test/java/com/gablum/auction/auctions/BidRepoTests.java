package com.gablum.auction.auctions;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class BidRepoTests {

    @Autowired
    private BidRepo bidRepo;

    private BidDataEntity bid1 = new BidDataEntity();
    private BidDataEntity bid2 = new BidDataEntity();

    @Test
    public void dbCanStore() {
        Assertions.assertEquals(
                bid1,
                bidRepo.save(bid1),
                "repo should be able to store a bid"
        );
    }

    @Test
    public void dbCanFetchAll() {
        bidRepo.save(bid2);
        Assertions.assertEquals(
                2,
                bidRepo.findAll().size(),
                "repo can store and fetch all elements"
        );
    }

}
