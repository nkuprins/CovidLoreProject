package com.covidlore.scoresservice.dao;

import com.covidlore.scoresservice.entity.PostScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostScoresRepository extends JpaRepository<PostScore, Integer> {

}
