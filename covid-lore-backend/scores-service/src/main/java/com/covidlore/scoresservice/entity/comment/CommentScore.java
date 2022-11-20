package com.covidlore.scoresservice.entity.comment;

import com.covidlore.scoresservice.contraints.PossibleValues;
import com.covidlore.scoresservice.entity.Score;
import com.covidlore.scoresservice.entity.post.PostScoreId;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name = "comment_scores")
@Getter
@NoArgsConstructor(force = true)
@JsonTypeName("comment")
public class CommentScore extends Score {

//
//    @EmbeddedId
//    @NonNull
//    private CommentScoreId scoreId;
    public CommentScore(PostScoreId scoreId, int score) {
        super(scoreId);
        this.score = score;
    }

    @Column(name = "score")
    @PossibleValues(allowedValues = {-1, 1})
    private final int score;

}
