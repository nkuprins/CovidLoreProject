package com.covidlore.dao;

import com.covidlore.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("SELECT p.title,\n" +
            "u.username,\n" +
            "p.date\n" +
            "FROM Post p\n" +
            "JOIN User u ON p.user = u\n")
    List<Post> findAllForForumPage(); // with title, username, date, score_like, score_dislike
}
