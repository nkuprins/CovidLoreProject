package com.covidlore.service;

import com.covidlore.dao.UserRepository;
import com.covidlore.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById(int userId) {
        return userRepository.getById(userId);
    }
}
