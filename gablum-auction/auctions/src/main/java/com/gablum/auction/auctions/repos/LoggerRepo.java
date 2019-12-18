package com.gablum.auction.auctions.repos;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

@Repository
public class LoggerRepo {

    @Bean
    public Logger getLogger() {
        return LogManager.getLogger();
    }
}
