package com.covidlore.service;

import com.covidlore.dao.UsersDao;
import com.covidlore.model.Post;
import com.covidlore.model.Users;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class TestService {

    private final UsersDao usersDao;

    public TestService(UsersDao usersDao) {
        this.usersDao = usersDao;
    }

    public Users getUser() {
        return this.usersDao.getUser(4);
    }

    public Post getPost() {
        return this.usersDao.getPost(13);
    }
}
