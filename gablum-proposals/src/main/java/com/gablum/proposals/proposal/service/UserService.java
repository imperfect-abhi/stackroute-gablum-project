package com.gablum.proposals.proposal.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gablum.proposals.proposal.model.JwtPayload;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;

@Service
public class UserService {

    private final String AUTHORIZATION = "Authorization";

    public String getEmail(HttpServletRequest request) {
        return getJwtPayload(request).getSub();
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
