package com.covidlore.scoresservice.entity.comment;

import com.covidlore.scoresservice.entity.TotalScore;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "comment_total_scores")
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class CommentTotalScore implements TotalScore {

    @Id
    private final int id;

    @Column(name = "total_score")
    private long score;

    @Override
    public void increaseScore() {
        this.score++;
    }

    @Override
    public void decreaseScore() {
        this.score--;
    }
}
