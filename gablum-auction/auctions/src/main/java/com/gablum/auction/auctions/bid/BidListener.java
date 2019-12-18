package com.gablum.auction.auctions.bid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;


@Component
@Slf4j
public class BidListener {

    @Autowired
    private SimpMessageSendingOperations messageSendingOperations;

    @EventListener
    public void handleMessage(SessionConnectedEvent event) {
        log.info("session connected", event);
        messageSendingOperations.convertAndSend(
                "/topic/announce",
                "new client connected at: " + event.getTimestamp()
        );
    }
}
