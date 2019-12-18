package com.gablum.usermanagement.user.services;

import com.gablum.usermanagement.user.model.User;

public interface ISignUpService {
    String signup (String name, String email, String address, String companyName, String username,
                   String businessLicense, String password);
    User saveUser (User user);
    }
