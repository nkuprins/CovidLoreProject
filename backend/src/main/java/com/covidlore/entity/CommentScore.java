package com.covidlore.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comment_scores")
@NoArgsConstructor
@Getter
public class CommentScore {

    @EmbeddedId
    private CommentScoreId scoreId;

    @Column(name = "score")
    private int score;

    public void setScore(int score) {
        this.score = score;
    }
}
