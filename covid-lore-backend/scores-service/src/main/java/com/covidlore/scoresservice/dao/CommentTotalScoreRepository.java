package com.covidlore.scoresservice.dao;

import com.covidlore.scoresservice.dao.polymorphic.TotalScoreRepository;
import com.covidlore.scoresservice.entity.Score;
import com.covidlore.scoresservice.entity.TotalScore;
import com.covidlore.scoresservice.entity.comment.CommentTotalScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentTotalScoreRepository extends JpaRepository<CommentTotalScore, Integer>, TotalScoreRepository {

    TotalScore findById(int id);

}
