package com.covidlore.postservice.service;

import com.covidlore.postservice.dao.PostRepository;
import com.covidlore.postservice.entity.Post;
import com.covidlore.postservice.helper.OrderPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    @Override
    public List<Post> findAll(OrderPost orderPost) {
        return switch (orderPost) {
            case DateAsc -> postRepository.findAllByOrderByDateAsc();
            case DateDesc -> postRepository.findAllByOrderByDateDesc();
            case LikeAsc -> postRepository.findAllByOrderBySumLikeAsc();
            case LikeDesc -> postRepository.findAllByOrderBySumLikeDesc();
            default -> postRepository.findAllBy();
        };
    }

    @Override
    public Post findById(int postId) {
        return postRepository.findById(postId).get();
    }

    @Override
    public Post savePost(Post post) {
        return postRepository.save(post);
    }
}
