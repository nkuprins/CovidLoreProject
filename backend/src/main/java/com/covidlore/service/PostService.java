package com.covidlore.service;

import com.covidlore.entity.Post;
import com.covidlore.entity.PostScore;
import com.covidlore.helper.OrderPost;
import org.hibernate.criterion.Order;

import java.util.List;
import java.util.Set;

public interface PostService {

    List<Post> findAll(OrderPost orderPost);

    Post findById(int postId);
    void savePost(Post post);
    void savePostScore(PostScore postScore);
}
