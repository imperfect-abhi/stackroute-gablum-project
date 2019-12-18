package com.gablum.usermanagement.user.repository;

import com.gablum.usermanagement.user.model.JwtToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtTokenRepository extends MongoRepository<JwtToken, String> {
}
