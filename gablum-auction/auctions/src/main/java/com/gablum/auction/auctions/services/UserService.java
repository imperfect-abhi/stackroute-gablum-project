package com.gablum.auction.auctions.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gablum.auction.auctions.AuctionJwtPayload;
import com.gablum.auction.auctions.JwtPayload;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Service
public class UserService {

    @Getter
    @Value("${spring.security.secret}")
    private String secretKey;

    private final String AUTHORIZATION = "Authorization";
    private final String AUCTIONID = "auctionId";
    private final String OWNER = "isOwner";

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String getEmail(HttpServletRequest request) {
        String bearerToken = null;
        try {
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(AUTHORIZATION)) {
                    bearerToken = cookie.getValue();
                }
            }
        }
        catch (Exception ex) {
            return null;
        }
        if (bearerToken == null) {
            return null;
        }
        String payloadEncoded = bearerToken.split("\\.")[1];
        String payload = new String(Base64.getDecoder().decode(payloadEncoded));
        JwtPayload jwtPayload;
        try {
            jwtPayload = new ObjectMapper().readValue(payload, JwtPayload.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
        return jwtPayload.getSub();
    }

    public String generateToken(String email, String auctionId, Date validity, boolean isOwner) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put(AUCTIONID, auctionId);
        claims.put(OWNER, isOwner);
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();

        return token;
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

    public JwtPayload getJwtPayload(HttpServletRequest request) {
        String bearerToken = null;
        try {
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(AUTHORIZATION)) {
                    bearerToken = cookie.getValue();
                }
            }
        }
        catch (Exception ex) {
            return null;
        }
        if (bearerToken == null) {
            return null;
        }
        String payloadEncoded = bearerToken.split("\\.")[1];
        String payload = new String(Base64.getDecoder().decode(payloadEncoded));
        JwtPayload jwtPayload;
        try {
            jwtPayload = new ObjectMapper().readValue(payload, JwtPayload.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
        return jwtPayload;
    }
}
