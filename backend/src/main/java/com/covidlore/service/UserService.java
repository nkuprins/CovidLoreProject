package com.covidlore.service;

import com.covidlore.model.User;
import com.covidlore.user.CrmUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User findById(int userId);
    User findByUsername(String username);
    void save(CrmUser user);
}
