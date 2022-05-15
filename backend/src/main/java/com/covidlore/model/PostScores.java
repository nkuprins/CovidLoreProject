package com.covidlore.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Table(name = "post_scores")
@NoArgsConstructor
@Getter
public class PostScores {

    @EmbeddedId
    private PostScoresId postScoreId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    @MapsId("postId")
    private Post postScore;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @MapsId("userId")
    private User userScore;

    @Column(name = "score_like")
    private int scoreLike;

    @Column(name = "score_dislike")
    private int scoreDislike;

}
