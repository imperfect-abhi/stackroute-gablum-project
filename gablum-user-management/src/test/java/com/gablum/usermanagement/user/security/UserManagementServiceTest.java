package com.gablum.usermanagement.user.security;

import com.gablum.usermanagement.user.model.MongoUserDetails;
import com.gablum.usermanagement.user.model.Role;
import com.gablum.usermanagement.user.model.User;
import com.gablum.usermanagement.user.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
class UserManagementServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUser1 = new User();

    @BeforeEach
    public void setUp() {

        //User1 details
        testUser1.setUserName("abhi");
        testUser1.setCompanyName("Boeing");
        testUser1.setEmail("abc@two.com");
    }
    @Test
    public void loadUserByUsername() {
        Mockito.when(userRepository.findUserByEmail("abc@two.com")).thenReturn(testUser1);
        Assertions.assertEquals(userService.loadUserByUsername("abc@two.com").getUsername(),
                testUser1.getEmail());
    }
}