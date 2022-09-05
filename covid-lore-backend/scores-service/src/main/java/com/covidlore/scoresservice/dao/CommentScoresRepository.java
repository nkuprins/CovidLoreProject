package com.covidlore.scoresservice.dao;

import com.covidlore.scoresservice.entity.CommentScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentScoresRepository extends JpaRepository<CommentScore, Integer> {

}
