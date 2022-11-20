package com.covidlore.scoresservice.entity;


import com.covidlore.scoresservice.entity.comment.CommentScore;
import com.covidlore.scoresservice.entity.post.PostScore;
import com.covidlore.scoresservice.entity.post.PostScoreId;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;


@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = CommentScore.class, name = "comment"),
        @JsonSubTypes.Type(value = PostScore.class, name = "post")})
@Entity
@Inheritance(strategy= InheritanceType.TABLE_PER_CLASS)
@NoArgsConstructor
public abstract class Score {

    @EmbeddedId
    @NonNull
    private PostScoreId scoreId;

    public Score(@NonNull PostScoreId scoreId) {
        this.scoreId = scoreId;
    }

    public abstract int getScore();

    public PostScoreId getScoreId() {
        return scoreId;
    }

}
