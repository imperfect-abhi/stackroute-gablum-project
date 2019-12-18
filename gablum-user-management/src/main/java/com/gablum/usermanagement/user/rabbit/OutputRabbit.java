package com.gablum.usermanagement.user.rabbit;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface OutputRabbit {

    @Output("userParsing")
    MessageChannel userParsingChannel();
//
//    @Output("userList")
//    MessageChannel userListBySubDomainChannel();
}
