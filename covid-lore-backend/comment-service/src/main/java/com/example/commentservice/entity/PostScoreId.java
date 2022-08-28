package com.example.commentservice.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Embeddable
@Data
public class PostScoreId implements Serializable {

    @Serial
    private static final long serialVersionUID = 54930920940322L;

    @Column(name = "post_id")
    private int postId;

    @Column(name = "user_id")
    private String userId;

}
