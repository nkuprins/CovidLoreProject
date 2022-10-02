package com.covidlore.scoresservice.entity.post;

import com.covidlore.scoresservice.contraints.PossibleValues;
import com.covidlore.scoresservice.entity.Score;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "post_scores")
@Getter
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@JsonTypeName("post")
public class PostScore implements Score {

    @EmbeddedId
    @NonNull
    private PostScoreId scoreId;

    @Column(name = "score")
    @PossibleValues(allowedValues = {-1, 1})
    private final int score;

}
