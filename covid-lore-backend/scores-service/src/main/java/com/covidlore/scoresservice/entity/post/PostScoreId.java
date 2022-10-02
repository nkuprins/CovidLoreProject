package com.covidlore.scoresservice.entity.post;

import com.covidlore.scoresservice.entity.ScoreId;
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
public class PostScoreId implements Serializable, ScoreId {

    @Serial
    private static final long serialVersionUID = 54930920940322L;

    @Column(name = "post_id")
    private final int primaryId;

    @Column(name = "user_id")
    @Setter
    private String userId;

}
