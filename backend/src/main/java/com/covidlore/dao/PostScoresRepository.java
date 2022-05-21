package com.covidlore.dao;

import com.covidlore.entity.PostScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostScoresRepository extends JpaRepository<PostScore, Integer> {

}
