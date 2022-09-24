package com.covidlore.scoresservice.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serial;
import java.io.Serializable;

@Embeddable
@Getter
@EqualsAndHashCode
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class CommentScoreId implements Serializable {

    @Serial
    private static final long serialVersionUID = -4543385774779230646L;

    @Column(name = "comment_id")
    private final int commentId;

    @Column(name = "user_id")
    @Setter
    private String userId;
}
