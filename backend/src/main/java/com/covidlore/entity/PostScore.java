package com.covidlore.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "post_scores")
@NoArgsConstructor
@Getter
public class PostScore {

    @EmbeddedId
    private PostScoreId scoreId;

    @Column(name = "score")
    private int score;

    // IDE may say that it is not needed, but actually Hibernate may need it implicitly
    public void setScore(int score) {
        this.score = score;
    }
}
