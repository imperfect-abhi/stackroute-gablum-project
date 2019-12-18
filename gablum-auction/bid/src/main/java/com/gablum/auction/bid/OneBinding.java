package com.gablum.auction.bid;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface OneBinding {

    @Input("chn")
    SubscribableChannel getChannel();
}