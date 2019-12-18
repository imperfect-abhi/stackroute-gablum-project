package com.gablum.usermanagement.user.repository;


import com.gablum.usermanagement.user.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findUserByEmail(String email);
    long count();
    long countByIsLocked(boolean locked);
    long countByIsEnabled(boolean enabled);
    List<User> findUserByRoleRoleContaining(String role);
    List<User> findAllByBusinessSubDomain(String businessSubDomain);
}