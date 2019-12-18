package com.gablum.scheduler.proposalschedule.Service;

import com.gablum.scheduler.proposalschedule.rabbit.SchedulerPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageChannel;
import org.springframework.stereotype.Service;

@Service
public class RabbitService {
    private MessageChannel messageChannel;

    @Autowired
    SchedulerPublisher publisher;


    public MessageChannel getMessageChannel() {
        messageChannel = publisher.getchannel();
        return messageChannel;
    }
}
