package com.covidlore.service;

import com.covidlore.model.Post;

import java.util.List;

public interface PostService {

    List<Post> findAll();
    Post findById(int postId);
    void save(Post post);

}
