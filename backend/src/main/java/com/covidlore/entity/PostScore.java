package com.covidlore.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
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
