package com.covidlore.scoresservice.dao.polymorphic;

import com.covidlore.scoresservice.entity.Score;
import com.covidlore.scoresservice.entity.ScoreId;
import com.covidlore.scoresservice.entity.comment.CommentScore;
import com.covidlore.scoresservice.entity.post.PostScore;
import com.covidlore.scoresservice.entity.post.PostScoreId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

public interface ScoreRepository extends JpaRepository<Score, Integer> {

    Optional<Score> findByScoreId(PostScoreId score);
//    Optional<Score> findByScoreId(CommentScore score);
//    Optional<Score> findByScoreId(PostScore score);

//    Score save(Score score);

}
