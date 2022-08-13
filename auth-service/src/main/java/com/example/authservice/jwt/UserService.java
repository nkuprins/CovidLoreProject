package com.example.authservice.jwt;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User findByUsername(String username);
    void save(JwtRequestModel user);
}
