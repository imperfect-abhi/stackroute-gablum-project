package com.gablum.usermanagement.user.services;

import com.gablum.usermanagement.user.model.User;

public interface ILoginService {
    String login(String username, String password);
    User saveUser(User user);

    boolean logout(String token);

    Boolean isValidToken(String token);

    String createNewToken(String token);
}