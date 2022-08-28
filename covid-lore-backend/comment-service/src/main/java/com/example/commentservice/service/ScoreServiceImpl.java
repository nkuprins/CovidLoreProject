package com.example.commentservice.service;

import com.example.commentservice.dao.CommentScoresRepository;
import com.example.commentservice.dao.PostScoresRepository;
import com.example.commentservice.entity.CommentScore;
import com.example.commentservice.entity.PostScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreServiceImpl implements ScoreService {

    private final PostScoresRepository postScoresRepository;
    private final CommentScoresRepository commentScoresRepository;

    @Autowired
    public ScoreServiceImpl(PostScoresRepository postScoresRepository, CommentScoresRepository commentScoresRepository) {
        this.postScoresRepository = postScoresRepository;
        this.commentScoresRepository = commentScoresRepository;
    }

    @Override
    public CommentScore saveCommentScore(CommentScore commentScore) {
        return commentScoresRepository.save(commentScore);
    }

    @Override
    public PostScore savePostScore(PostScore postScore) {
        return postScoresRepository.save(postScore);
    }
}
