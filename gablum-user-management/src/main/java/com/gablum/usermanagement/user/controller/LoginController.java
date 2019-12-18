package com.gablum.usermanagement.user.controller;

import com.gablum.usermanagement.user.exception.CustomException;
import com.gablum.usermanagement.user.model.AuthResponse;
import com.gablum.usermanagement.user.model.LoginRequest;
import com.gablum.usermanagement.user.security.JwtTokenProvider;
import com.gablum.usermanagement.user.services.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Controller
public class LoginController {

    @Autowired
    private ILoginService iLoginService;

    @Autowired
    JwtTokenProvider jwtTokenProvider;


    @CrossOrigin("*")
    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String token;
        try {
            token = iLoginService.login(loginRequest.getUsername(), loginRequest.getPassword());
        }
        catch (CustomException ex) {
            return new ResponseEntity<AuthResponse>(
                    new AuthResponse(""),
                    HttpStatus.UNAUTHORIZED
            );
        }
        HttpHeaders headers = new HttpHeaders();
        List<String> headerlist = new ArrayList<>();
        List<String> exposeList = new ArrayList<>();
        headerlist.add("Content-Type");
        headerlist.add(" Accept");
        headerlist.add("X-Requested-With");
        headerlist.add("Authorization");
        headers.setAccessControlAllowHeaders(headerlist);
        exposeList.add("Authorization");
        headers.setAccessControlExposeHeaders(exposeList);
        //headers.set("Authorization", token);
        Cookie cookie = new Cookie("Authorization", token);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(3600);
        cookie.setPath("/");
        response.addCookie(cookie);
        return new ResponseEntity<AuthResponse>(new AuthResponse(""), headers, HttpStatus.CREATED);
    }
    @CrossOrigin("*")
    @PostMapping("/signout")
    @ResponseBody
    public ResponseEntity<AuthResponse> logout (HttpServletResponse response, HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        if (iLoginService.logout(jwtTokenProvider.resolveToken(request))) {
            Cookie cookie = new Cookie("Authorization", "");
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(0);
            response.addCookie(cookie);
            return new ResponseEntity<AuthResponse>(new AuthResponse("logged out"), headers, HttpStatus.CREATED);
        }
        return new ResponseEntity<AuthResponse>(new AuthResponse("Logout Failed"), headers, HttpStatus.NOT_MODIFIED);
    }

    /**
     *
     * @param token
     * @return boolean.
     * if request reach here it means it is a valid token.
     */
    @PostMapping("/valid/token")
    @ResponseBody
    public Boolean isValidToken (@RequestHeader(value="Authorization") String token) {
        return true;
    }


    @PostMapping("/signin/token")
    @ResponseBody
    public ResponseEntity<AuthResponse> createNewToken (@RequestHeader(value="Authorization") String token) {
        String newToken = iLoginService.createNewToken(token);
        HttpHeaders headers = new HttpHeaders();
        List<String> headerList = new ArrayList<>();
        List<String> exposeList = new ArrayList<>();
        headerList.add("Content-Type");
        headerList.add(" Accept");
        headerList.add("X-Requested-With");
        headerList.add("Authorization");
        headers.setAccessControlAllowHeaders(headerList);
        exposeList.add("Authorization");
        headers.setAccessControlExposeHeaders(exposeList);
        headers.set("Authorization", newToken);
        return new ResponseEntity<AuthResponse>(new AuthResponse(newToken), headers, HttpStatus.CREATED);
    }
}