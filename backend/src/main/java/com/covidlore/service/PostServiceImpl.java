package com.covidlore.service;

import com.covidlore.dao.PostRepository;
import com.covidlore.entity.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postDao) {
        this.postRepository = postDao;
    }

    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Post findById(int postId) {
        return postRepository.findById(postId).orElse(null);
    }

    @Override
    public void save(Post post) {
        postRepository.save(post);
    }
}

