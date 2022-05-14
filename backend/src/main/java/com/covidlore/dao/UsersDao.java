package com.covidlore.dao;

import com.covidlore.model.Post;
import com.covidlore.model.Users;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class UsersDao {

    private final EntityManager em;

    public UsersDao(EntityManager em) {
        this.em = em;
    }

    public Users getUser(int userId) {
        Session currentSession = em.unwrap(Session.class);

        return currentSession.get(Users.class, userId);
    }

    public Post getPost(int postId) {
        Session currentSession = em.unwrap(Session.class);

        return currentSession.get(Post.class, postId);
    }
}
