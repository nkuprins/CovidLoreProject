package com.covidlore.dao;

import com.covidlore.model.PostScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostScoresRepository extends JpaRepository<PostScore, Integer> {

}
