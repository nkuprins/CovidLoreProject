package com.covidlore.dao;

import com.covidlore.entity.CommentScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentScoresRepository extends JpaRepository<CommentScore, Integer> {

}
