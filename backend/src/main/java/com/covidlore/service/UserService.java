package com.covidlore.service;

import com.covidlore.model.User;

public interface UserService {

    User findById(int userId);
}
