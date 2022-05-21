package com.covidlore.service;

import com.covidlore.dao.PostRepository;
import com.covidlore.dao.PostScoresRepository;
import com.covidlore.entity.Post;
import com.covidlore.entity.PostScore;
import com.covidlore.helper.OrderPost;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostScoresRepository postScoresRepository;

    public PostServiceImpl(PostRepository postDao, PostScoresRepository postScoresRepository) {
        this.postRepository = postDao;
        this.postScoresRepository = postScoresRepository;
    }

    @Override
    public List<Post> findAll(OrderPost orderPost) {

        switch (orderPost) {
            case DateAsc: return postRepository.findAllByOrderByDateAsc();
            case DateDesc: return postRepository.findAllByOrderByDateDesc();
            case LikeAsc: return postRepository.findAllByOrderBySumLikeAsc();
            case LikeDesc: return postRepository.findAllByOrderBySumLikeDesc();
            default: return postRepository.findAll();
        }
    }

    @Override
    public Post findById(int postId) {
        return postRepository.findById(postId).orElse(null);
    }

    @Override
    public void savePost(Post post) {
        postRepository.save(post);
    }

    @Override
    public void savePostScore(PostScore postScore) {
        postScoresRepository.save(postScore);
    }
}

