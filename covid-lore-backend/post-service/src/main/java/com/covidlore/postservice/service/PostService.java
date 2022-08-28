package com.covidlore.postservice.service;

import com.covidlore.postservice.entity.Post;
import com.covidlore.postservice.helper.OrderPost;

import java.util.List;

public interface PostService {

    List<Post> findAll(OrderPost orderPost);
    Post findById(int postId);
    Post savePost(Post post);

}
