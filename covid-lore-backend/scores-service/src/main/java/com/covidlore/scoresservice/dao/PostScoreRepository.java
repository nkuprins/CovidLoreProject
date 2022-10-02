package com.covidlore.scoresservice.dao;

import com.covidlore.scoresservice.dao.polymorphic.ScoreRepository;
import com.covidlore.scoresservice.entity.comment.CommentScore;
import com.covidlore.scoresservice.entity.post.PostScore;
import com.covidlore.scoresservice.entity.Score;
import com.covidlore.scoresservice.entity.ScoreId;
import com.covidlore.scoresservice.entity.post.PostScoreId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostScoreRepository extends ScoreRepository, JpaRepository<PostScore, Integer> {

    Optional<Score> findByScoreId(PostScoreId scoreId);

}
