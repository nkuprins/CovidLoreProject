package com.covidlore.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostScoreId implements Serializable {

    private static final long serialVersionUID = -4543385774779230646L;
    @Column(name = "post_id")
    private int postId;

    @Column(name = "user_id")
    private int userId;

}
