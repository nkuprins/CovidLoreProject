package com.covidlore.scoresservice.service;

import com.covidlore.scoresservice.dao.CommentScoresRepository;
import com.covidlore.scoresservice.dao.PostScoresRepository;
import com.covidlore.scoresservice.entity.CommentScore;
import com.covidlore.scoresservice.entity.PostScore;
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
