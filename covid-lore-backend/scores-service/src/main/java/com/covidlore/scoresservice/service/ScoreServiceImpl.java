package com.covidlore.scoresservice.service;

import com.covidlore.scoresservice.dao.CommentScoreRepository;
import com.covidlore.scoresservice.dao.CommentTotalScoreRepository;
import com.covidlore.scoresservice.dao.PostScoreRepository;
import com.covidlore.scoresservice.dao.PostTotalScoreRepository;
import com.covidlore.scoresservice.dao.polymorphic.ScoreRepository;
import com.covidlore.scoresservice.dao.polymorphic.TotalScoreRepository;
import com.covidlore.scoresservice.entity.Score;
import com.covidlore.scoresservice.entity.TotalScore;
import com.covidlore.scoresservice.entity.comment.CommentScore;
import com.covidlore.scoresservice.entity.comment.CommentTotalScore;
import com.covidlore.scoresservice.entity.post.PostScore;
import com.covidlore.scoresservice.entity.post.PostTotalScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ScoreServiceImpl implements ScoreService {

    private final PostScoreRepository postScoreRepo;
    private final CommentScoreRepository commentScoreRepo;

    private final CommentTotalScoreRepository commentTotalScoreRepo;
    private final PostTotalScoreRepository postTotalScoreRepo;

    @Autowired
    public ScoreServiceImpl(CommentScoreRepository commentScoreRepo,
                            PostScoreRepository postScoreRepo,
                            CommentTotalScoreRepository commentTotalScoreRepo,
                            PostTotalScoreRepository postTotalScoreRepo) {
        this.postScoreRepo = postScoreRepo;
        this.commentScoreRepo = commentScoreRepo;
        this.commentTotalScoreRepo = commentTotalScoreRepo;
        this.postTotalScoreRepo = postTotalScoreRepo;
    }

    private void updateScore(Score score, TotalScore totalScore) {
        if (score.getScore() == 1)
            totalScore.increaseScore();
        else
            totalScore.decreaseScore();
    }

    private void updateTotalScore(CommentScore score) {
        int id = score.getScoreId().getPrimaryId();
        TotalScore totalScore = commentTotalScoreRepo.findById(id);
        updateScore(score, totalScore);
        commentTotalScoreRepo.save((CommentTotalScore) totalScore);
    }

    private void updateTotalScore(PostScore score) {
        int id = score.getScoreId().getPrimaryId();
        TotalScore totalScore = postTotalScoreRepo.findById(id);
        updateScore(score, totalScore);
        postTotalScoreRepo.save((PostTotalScore) totalScore);
    }

    private boolean isFreshUpdate(Optional<Score> oldScore, Score score) {
        return oldScore.isEmpty() || oldScore.get().getScore() != score.getScore();
    }

    private Score saveCommentScore(CommentScore score) {
        Optional<Score> oldScore = commentScoreRepo.findByScoreId(score.getScoreId());

        if (isFreshUpdate(oldScore, score))
            updateTotalScore(score);

        return commentScoreRepo.save(score);
    }

    private Score savePostScore(PostScore score) {
        Optional<Score> oldScore = postScoreRepo.findByScoreId(score.getScoreId());

        if (isFreshUpdate(oldScore, score))
            updateTotalScore(score);

        return postScoreRepo.save(score);
    }

    @Override
    public Score saveScore(Score score) {
        return score instanceof PostScore ?
                savePostScore((PostScore) score) : saveCommentScore((CommentScore) score);
    }
}
