package com.covidlore.scoresservice.entity;


import com.covidlore.scoresservice.entity.comment.CommentScore;
import com.covidlore.scoresservice.entity.post.PostScore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = CommentScore.class, name = "comment"),
        @JsonSubTypes.Type(value = PostScore.class, name = "post")})
public interface Score {

    ScoreId getScoreId();
    int getScore();

}
