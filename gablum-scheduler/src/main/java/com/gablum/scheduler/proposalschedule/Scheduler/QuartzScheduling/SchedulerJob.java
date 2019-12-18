package com.gablum.scheduler.proposalschedule.Scheduler.QuartzScheduling;

import com.gablum.scheduler.proposalschedule.Controller.SchedulesController;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@NoArgsConstructor
public class SchedulerJob implements Job {

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException, NullPointerException {
        try {

            MessageChannel messageChannel = SchedulesController.messageChannel;
            Message<String> msg = MessageBuilder.withPayload("hello auction from Scheduler").build();
            messageChannel.send(msg);
            log.info("-----------------------------Hello Quartz-----------------------------");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

//    @Override
//    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
//        try {
//            ApplicationContext applicationContext = (ApplicationContext) jobExecutionContext.getScheduler().getContext().get(SchedulerPublisher.class);
//                messageChannel = applicationContext.getBean(SchedulerPublisher.class).getchannel();
//            Message<String> msg = MessageBuilder.withPayload("hello auction from Scheduler").build();
//            this.messageChannel.send(msg);
//            log.info("-----------------------------Hello Quartz-----------------------------");
//        } catch (SchedulerException e) {
//            e.printStackTrace();
//        }
//    }


//
//    @GetMapping("/sc")
//    public String getMessageChannel() {
//        return rabbitService.getMessageChannel().toString();
//    }
}
