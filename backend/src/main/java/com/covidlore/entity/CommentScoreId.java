package com.covidlore.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentScoreId implements Serializable {

    private static final long serialVersionUID = -4543385774779230646L;
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "user_id")
    private int userId;
}
