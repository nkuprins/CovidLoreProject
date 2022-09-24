package com.covidlore.scoresservice.entity;

import com.covidlore.scoresservice.contraints.PossibleValues;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.*;

@Entity
@Table(name = "comment_scores")
@Getter
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
public class CommentScore {

    @EmbeddedId
    @NonNull
    private CommentScoreId scoreId;

    @Column(name = "score")
    @PossibleValues(allowedValues = {-1, 1})
    private final int score;

}
