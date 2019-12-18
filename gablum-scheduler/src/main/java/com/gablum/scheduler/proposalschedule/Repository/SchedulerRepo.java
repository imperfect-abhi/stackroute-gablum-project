package com.gablum.scheduler.proposalschedule.Repository;


import com.gablum.scheduler.proposalschedule.Model.TimerModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SchedulerRepo extends MongoRepository<TimerModel,String> {
    TimerModel findByJobId(String jobId);
    void deleteByJobId(String jobId);
}
