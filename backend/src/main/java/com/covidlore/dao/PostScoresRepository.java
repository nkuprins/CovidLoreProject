package com.covidlore.dao;

import com.covidlore.model.Post;
import com.covidlore.model.PostScores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostScoresRepository extends JpaRepository<PostScores, Integer> {

    @Query("select sum(ps.scoreLike) from PostScores ps where ps.postScoreId.postId = 1")
    int total();
}
