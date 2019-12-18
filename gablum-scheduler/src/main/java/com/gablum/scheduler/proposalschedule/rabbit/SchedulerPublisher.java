package com.gablum.scheduler.proposalschedule.rabbit;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;
import org.springframework.stereotype.Component;

@Component
public interface SchedulerPublisher {
    @Output("startAuction")
    MessageChannel getchannel();
}
