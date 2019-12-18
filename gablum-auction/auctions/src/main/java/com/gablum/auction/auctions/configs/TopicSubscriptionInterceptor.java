package com.gablum.auction.auctions.configs;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gablum.auction.auctions.AuctionJwtPayload;
//import com.gablum.auction.auctions.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

import java.util.Base64;

@Slf4j
public class TopicSubscriptionInterceptor implements ChannelInterceptor {

//    @Autowired
//    private UserService userService;

//    @Autowired
//    private AuctionService auctionService;

    private String secretKey = "big-secret";

    private final String AUTH = "auth";

    private Claims claims;

    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.SUBSCRIBE.equals(headerAccessor.getCommand()) && !subscriptionAuthorized(headerAccessor)) {
            throw new NullPointerException("denied");
        }
        return message;
    }

    private boolean subscriptionAuthorized(StompHeaderAccessor headerAccessor) {
        String authHeader = headerAccessor.getNativeHeader(AUTH).toString();
        authHeader = authHeader.substring(1, authHeader.length() - 1);
        String subscriptionTopic = headerAccessor.getDestination();
        subscriptionTopic = subscriptionTopic.substring(1);
        log.warn("\n\n\n\n");
        try {
            claims = Jwts.parser().setSigningKey(
                    Base64.getEncoder().encodeToString(secretKey.getBytes()))
                    .parseClaimsJws(authHeader).getBody();
            log.info(claims.getSubject());
        }
        catch (JwtException err) {
            log.error("invalid jwt: " + authHeader);
            return false;
        }
        log.warn("subscription topic: " + subscriptionTopic);
        AuctionJwtPayload payload = getAuctionPayload(authHeader);
        log.warn("auctionId: " + payload.getAuctionId());
        if (!subscriptionTopic.contains(payload.getAuctionId())) {
            log.error("tried subscribing to an unauthorized auction: " + subscriptionTopic);
            return false;
        }
        if (!payload.isOwner() && subscriptionTopic.contains("admin")) {
            log.error("tried subscribing to buyer stream: " + payload.toString());
            return false;
        }
        log.warn("\n\n\n\n");
        return true;
    }

    public AuctionJwtPayload getAuctionPayload(String token) {
        String payloadEncoded = token.split("\\.")[1];
        String payload = new String(Base64.getDecoder().decode(payloadEncoded));
        AuctionJwtPayload jwtPayload;
        try {
            jwtPayload = new ObjectMapper().readValue(payload, AuctionJwtPayload.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
        return jwtPayload;
    }
}
