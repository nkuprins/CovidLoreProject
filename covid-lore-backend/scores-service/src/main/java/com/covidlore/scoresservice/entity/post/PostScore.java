package com.covidlore.scoresservice.entity.post;

import com.covidlore.scoresservice.constraints.PossibleNumbers;
import com.covidlore.scoresservice.entity.Score;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
@Entity
@Table(name = "post_scores")
@Getter
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@JsonTypeName("post")
public class PostScore extends Score {

    public PostScore(PostScoreId scoreId, int score) {
        super(scoreId);
        this.score = score;
    }

    @Column(name = "score")
    @PossibleNumbers(allowedValues = {-1, 1})
    private final int score;

}
