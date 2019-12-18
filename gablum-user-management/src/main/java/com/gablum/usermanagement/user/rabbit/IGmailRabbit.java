package com.gablum.usermanagement.user.rabbit;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface IGmailRabbit {

    @Input("newProposal")
    SubscribableChannel newProposal();

    @Input("newAuction")
    SubscribableChannel newAuction();

    @Input("newBid")
    SubscribableChannel newBid();

}
