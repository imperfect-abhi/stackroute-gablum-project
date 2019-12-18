package com.gablum.usermanagement.user.repository;

import com.gablum.usermanagement.user.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataMongoTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User testUser1 = new User();
    private User testUser2 = new User();


    @BeforeEach
    public void setUp() {

        //User1 details
        testUser1.setUserName("abhi");
        testUser1.setCompanyName("Boeing");
        testUser1.setEmail("abc@two.com");

        //User2 details
        testUser2.setUserName("abhi2");
        testUser2.setCompanyName("Boeing-1");
        testUser2.setEmail("bcd@three.com");

        List<User> list = List.of(testUser1,testUser2);
    }

    @AfterEach
    public void removeEntities() {
        userRepository.deleteAll();
    }
    @Test
    public void findUserByEmail() {
        userRepository.saveAll(List.of(testUser1, testUser2));
        Assertions.assertEquals(
                testUser2.getEmail(),
                userRepository.findUserByEmail("bcd@three.com").getEmail(),
                "The DB has the data you asked for");
    }

    @Test
    public void dbCanStore() {
        Assertions.assertEquals(
                2,
                userRepository.saveAll(
                        List.of(testUser1, testUser2)).size(), "DB should be able to store all"
        );
    }

    @Test
    public void dbCanFetchAll() {
        userRepository.saveAll(List.of(testUser1, testUser2));
        Assertions.assertEquals(2, userRepository.findAll().size(),
                "DB can store and fetch all elements");
    }
}
