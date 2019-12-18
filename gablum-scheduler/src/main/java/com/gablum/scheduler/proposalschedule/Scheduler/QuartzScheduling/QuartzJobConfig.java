package com.gablum.scheduler.proposalschedule.Scheduler.QuartzScheduling;

import lombok.extern.slf4j.Slf4j;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class QuartzJobConfig {

    private int i =1;
    private String cronSchedule = "0 0/1 * 1/1 * ? *";

    JobKey renewableJobKey = JobKey.jobKey("job"+i ,"my-auction"+i);
    JobDetail job = JobBuilder.newJob(SchedulerJob.class)
            .withIdentity(renewableJobKey)
            .storeDurably(true)
            .build();

    TriggerKey renewableTriggerKey = TriggerKey.triggerKey("trigger"+i, "my-auction"+i);
    Trigger trigger = TriggerBuilder
            .newTrigger()
            .withIdentity(renewableTriggerKey)
            .forJob(job.getKey())
            .withSchedule(
                    CronScheduleBuilder.cronSchedule(cronSchedule))
            .build();

    public void executeTimer() throws Exception{
        Scheduler scheduler = new StdSchedulerFactory().getScheduler();
        scheduler.start();
        log.info("a------------------" + job.getKey());
        if (scheduler.checkExists(job.getKey())){
            scheduler.deleteJob(job.getKey());
        }
        scheduler.scheduleJob(job,trigger);
        i++;
    }

//    public String convertIncomingDate
}
