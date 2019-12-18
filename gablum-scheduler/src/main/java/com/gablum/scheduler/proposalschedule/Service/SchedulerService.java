package com.gablum.scheduler.proposalschedule.Service;

import com.gablum.scheduler.proposalschedule.Scheduler.QuartzScheduling.QuartzJobConfig;
import com.gablum.scheduler.proposalschedule.Model.TimerModel;
import com.gablum.scheduler.proposalschedule.Repository.SchedulerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchedulerService {

    @Autowired
    SchedulerRepo schedulerRepo;

    @Autowired
    QuartzJobConfig quartzJobConfig;


    public TimerModel findTimerDetailsByAuctionId(String id){
     return schedulerRepo.findByJobId(id);
 }

    public List<TimerModel> findAllTimerDetails(){
        return schedulerRepo.findAll();
    }

    public TimerModel saveSchedulerDetail(TimerModel timerModelToBeSaved) throws Exception{
        quartzJobConfig.executeTimer();
        return schedulerRepo.save(timerModelToBeSaved);
    }

    public void cancelEvent(String jobId) {
        schedulerRepo.deleteByJobId(jobId);
    }

    public TimerModel rescheduleEvent(TimerModel updatedTimerModel) {
        TimerModel updatedTimer = schedulerRepo.findByJobId(updatedTimerModel.getJobId());
        updatedTimer.setEventStartDate(updatedTimerModel.getEventStartDate());
        updatedTimer.setEventEndDate(updatedTimerModel.getEventEndDate());
        return schedulerRepo.save(updatedTimer);
    }


}
