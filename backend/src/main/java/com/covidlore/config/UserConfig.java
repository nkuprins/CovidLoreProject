package com.covidlore.config;

import com.covidlore.entity.User;
import com.covidlore.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;

@Configuration
public class UserConfig {

    private final UserService userService;

    public UserConfig(UserService userService) {
        this.userService = userService;
    }

    @Bean
    @Lazy
    public User loggedInUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.findByUsername(username);
    }

}
