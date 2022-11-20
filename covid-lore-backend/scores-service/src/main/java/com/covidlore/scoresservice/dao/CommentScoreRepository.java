package com.covidlore.scoresservice.dao;

import com.covidlore.scoresservice.dao.polymorphic.ScoreRepository;
import com.covidlore.scoresservice.entity.*;
import com.covidlore.scoresservice.entity.comment.CommentScore;
import com.covidlore.scoresservice.entity.comment.CommentScoreId;
import com.covidlore.scoresservice.entity.post.PostScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//public interface CommentScoreRepository extends ScoreRepository, JpaRepository<CommentScore, Integer> {
//
//    Optional<Score> findByScoreId(CommentScoreId scoreId);
//
//}
