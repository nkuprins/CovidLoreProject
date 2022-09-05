package com.covidlore.scoresservice.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serial;
import java.io.Serializable;

@Embeddable
@Data
public class CommentScoreId implements Serializable {

    @Serial
    private static final long serialVersionUID = -4543385774779230646L;

    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "user_id")
    private String userId;
}
