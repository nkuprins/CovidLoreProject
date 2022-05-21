package com.covidlore.service;

import com.covidlore.entity.User;
import com.covidlore.prototype.model.PrototypeUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User findById(int userId);
    User findByUsername(String username);
    void save(PrototypeUser user);
}
