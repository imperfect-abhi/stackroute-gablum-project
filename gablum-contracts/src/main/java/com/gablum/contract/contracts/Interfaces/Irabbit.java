package com.gablum.contract.contracts.Interfaces;

import org.springframework.cloud.stream.annotation.Input;
//import org.springframework.cloud.stream.annotation.Output;
//import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;

public interface Irabbit {

    @Input("newContract")
    SubscribableChannel awardContractChannel();

}
