package com.gablum.auction.auctions;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@ExtendWith(SpringExtension.class)
public class BidServiceTests {

    @Mock
    private BidRepo bidRepo;

    @InjectMocks
    private BidService bidService;

    private BidDataEntity testbid1 = new BidDataEntity();
    private BidDataEntity testbid2 = new BidDataEntity();

    @Test
    public void serviceCanStore() {
        Mockito.when(bidRepo.save(Mockito.any(BidDataEntity.class))).thenReturn(
                testbid1
        );

        Assertions.assertEquals(
                testbid1,
                bidService.addBid(testbid1),
                "should be able to store Bid"
        );
    }

    @Test
    public void serviceCanGetAll() {
        Mockito.when(bidRepo.findAll()).thenReturn(
                List.of(testbid1, testbid2)
        );

        Assertions.assertEquals(
                List.of(testbid1, testbid2),
                bidService.getBids(),
                "should be able to fetch Bids"
        );

    }
}
