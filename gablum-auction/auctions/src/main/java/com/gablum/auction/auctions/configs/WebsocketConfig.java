package com.gablum.auction.auctions.configs;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {
    private ThreadPoolTaskScheduler taskScheduler;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS()
                .setClientLibraryUrl( "https://cdn.jsdelivr.net/npm/sockjs-client@1.4.0/dist/sockjs.min.js" );
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setPoolSize(1);
        taskScheduler.setThreadNamePrefix("ws-heartbeat-thread");
        taskScheduler.initialize();
        registry.setApplicationDestinationPrefixes("");
        registry.enableSimpleBroker("/topic")
                .setHeartbeatValue(new long[]{5000, 5000})
                .setTaskScheduler(taskScheduler);
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new TopicSubscriptionInterceptor());
    }
}
