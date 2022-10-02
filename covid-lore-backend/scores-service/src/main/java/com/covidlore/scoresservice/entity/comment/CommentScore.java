package com.covidlore.scoresservice.entity.comment;

import com.covidlore.scoresservice.contraints.PossibleValues;
import com.covidlore.scoresservice.entity.Score;
import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "comment_scores")
@Getter
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@JsonTypeName("comment")
public class CommentScore implements Score {

    @EmbeddedId
    @NonNull
    private CommentScoreId scoreId;

    @Column(name = "score")
    @PossibleValues(allowedValues = {-1, 1})
    private final int score;

}
