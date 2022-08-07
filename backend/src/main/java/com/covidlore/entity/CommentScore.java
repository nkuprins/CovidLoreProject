package com.covidlore.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
