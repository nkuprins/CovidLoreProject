package com.covidlore.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "post_scores")
@NoArgsConstructor
@Getter
public class PostScore {

    @EmbeddedId
    private PostScoreId scoreId;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "post_id")
//    @MapsId("postId")
//    private Post postScore;
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
//    @MapsId("userId")
//    private User userScore;

    @Column(name = "score")
    private int score;

    public void setScore(int score) {
        this.score = score;
    }
}
