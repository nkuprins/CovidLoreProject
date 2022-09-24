package com.covidlore.commentservice.entity;

import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "comments")
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    @NonNull
    @NotNull
    private String commentId;

    @Column(name = "post_id")
    @Min(1)
    @NotNull
    private final int postId;

    @Column(name = "creator_username")
    @Setter
    private String creatorUsername;

    @Column(name = "comment_date")
    private String commentDate;

    @Column(name = "description")
    @NonNull
    @NotNull
    private String description;

    @Column(name = "parent_comment_id")
    private final String parentCommentId;

    @Column(name = "childs")
    private int numOfChildren;

    public void increaseChildren() {
        this.numOfChildren++;
    }

    @PrePersist
    public void processPost() {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.commentDate = LocalDateTime.now().format(dateFormatter);
    }
}
