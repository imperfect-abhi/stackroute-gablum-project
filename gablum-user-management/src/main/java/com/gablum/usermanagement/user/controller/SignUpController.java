package com.gablum.usermanagement.user.controller;

import com.gablum.usermanagement.user.model.SignupResult;
import com.gablum.usermanagement.user.model.User;
import com.gablum.usermanagement.user.repository.UserRepository;
import com.gablum.usermanagement.user.services.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
public class SignUpController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailService mailService;


    @PostMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<SignupResult> newRegistration(@RequestBody User user)  {
        if (emailExist(user.getEmail())) {
            return new ResponseEntity<SignupResult>(
                    new SignupResult("There is an account with that email address", false), HttpStatus.NOT_ACCEPTABLE);
        }
        user.setCreatedOn(new Date());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProfileImage(
                "https://picsum.photos/id/10" +
                        (20 + (int)(Math.random()*9)) +
                        "/200/200"
        );
        mailService.sendEmail("registering", user);
        userRepository.save(user);
        return new ResponseEntity<SignupResult>(new SignupResult("Registered", true), HttpStatus.CREATED );
    }

    private boolean emailExist(String email) {
        return userRepository.findUserByEmail(email) != null;
    }
}