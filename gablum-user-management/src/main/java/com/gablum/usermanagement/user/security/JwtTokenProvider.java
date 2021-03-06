package com.gablum.usermanagement.user.security;

import com.gablum.usermanagement.user.model.MongoUserDetails;
import com.gablum.usermanagement.user.repository.JwtTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class JwtTokenProvider {
    private static final String AUTH="auth";
    private static final String AUTHORIZATION="Authorization";
    @Getter
    @Value("${spring.security.secret}")
    private String secretKey;
    private long validityInMilliseconds = 3600000; // 1h

    public JwtTokenProvider(JwtTokenRepository jwtTokenRepository) {
        log.info(jwtTokenRepository.toString());
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String username, List<String> roles) {

        Claims claims = Jwts.claims().setSubject(username);
        claims.put(AUTH,roles);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        String token =  Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(SignatureAlgorithm.HS256, secretKey)//
                .compact();
        //jwtTokenRepository.save(new JwtToken(token));
        return token;
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = null;
        if (req.getRequestURI().contains("/signin")) {
            return null;
        }
        try {
            Cookie[] cookies = req.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(AUTHORIZATION)) {
                    bearerToken = cookie.getValue();
                }
            }
        } catch (Exception ex) {
            return null;
        }

        if (bearerToken != null ) {
            return bearerToken;
        }
        return null;
    }

    public boolean validateToken(String token) throws JwtException,IllegalArgumentException{
        Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        return true;
    }
    public boolean isTokenPresentInDB (String token) {
        return true;
//        return jwtTokenRepository.findById(token).isPresent();
    }
    //user details with out database hit
    public UserDetails getUserDetails(String token) {
        String userName =  getUsername(token);
        List<String> roleList = getRoleList(token);
        UserDetails userDetails = new MongoUserDetails(userName,roleList.toArray(new String[roleList.size()]));
        return userDetails;
    }
    public List<String> getRoleList(String token) {
        return (List<String>) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).
                getBody().get(AUTH);
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }
    public Authentication getAuthentication(String token) {
        //using data base: uncomment when you want to fetch data from data base
        //UserDetails userDetails = userDetailsService.loadUserByUsername(getUsername(token));
        //from token take user value. comment below line for changing it taking from data base
        UserDetails userDetails = getUserDetails(token);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

}
