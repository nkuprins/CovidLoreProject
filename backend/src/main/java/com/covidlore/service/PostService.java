package com.covidlore.service;

import com.covidlore.entity.Post;
import com.covidlore.entity.PostScore;
import com.covidlore.helper.OrderPost;

import java.util.List;

public interface PostService {

    List<Post> findAll(OrderPost orderPost);

    Post findById(int postId);
    void savePost(Post post);
    void savePostScore(PostScore postScore);
}
