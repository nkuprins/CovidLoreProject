package com.covidlore.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PostScoreId implements Serializable {

    private static final long serialVersionUID = -4543385774779230646L;
    @Column(name = "post_id")
    private int postId;

    @Column(name = "user_id")
    private int userId;

}
