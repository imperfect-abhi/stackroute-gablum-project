package com.gablum.usermanagement.user.services;

import com.gablum.usermanagement.user.model.User;
import com.gablum.usermanagement.user.model.UserCounts;
import com.gablum.usermanagement.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserManagementService {
    @Autowired
    private UserRepository userRepository;

    public User getUser(String email) {
        return userRepository.findUserByEmail(email);
    }

    public UserCounts getUserCount() {
        UserCounts counts = new UserCounts();
        counts.setActive(userRepository.count());
        counts.setDisabled(userRepository.countByIsEnabled(false));
        counts.setLocked(userRepository.countByIsLocked(true));
        return counts;
    }
    public List<User> getAllUsersBySubDomain(String subDomain){
        return userRepository.findAllByBusinessSubDomain(subDomain);
    }
}
