package com.gablum.auction.auctions.rabbit;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface InputRabbit {
    @Input("startAuction")
    SubscribableChannel getStartChannel();

    @Input("newBid")
    SubscribableChannel getNewbidChannel();

    @Input("userParsing")
    SubscribableChannel userParsing();
}
