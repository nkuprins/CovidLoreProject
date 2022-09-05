package com.covidlore.scoresservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "comment_scores")
@Getter
@Setter
@NoArgsConstructor
public class CommentScore {

    @EmbeddedId
    private CommentScoreId scoreId;

    @Column(name = "score")
    private int score;

}
