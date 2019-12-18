package com.gablum.contract.contracts.Interfaces;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface OutputRabbit {

    @Output("addingContractIdInUser")
    MessageChannel addingContractIdInUser();

}
