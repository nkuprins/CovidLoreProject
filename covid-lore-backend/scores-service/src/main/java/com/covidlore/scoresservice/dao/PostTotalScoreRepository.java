package com.covidlore.scoresservice.dao;

import com.covidlore.scoresservice.dao.polymorphic.TotalScoreRepository;
import com.covidlore.scoresservice.entity.TotalScore;
import com.covidlore.scoresservice.entity.comment.CommentTotalScore;
import com.covidlore.scoresservice.entity.post.PostTotalScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostTotalScoreRepository extends JpaRepository<PostTotalScore, Integer>, TotalScoreRepository {

    TotalScore findById(int id);


}
