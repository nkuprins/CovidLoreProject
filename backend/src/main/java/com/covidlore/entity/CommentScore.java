package com.covidlore.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
