package com.covidlore.commentservice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @Column(name = "post_id")
    private int postId;

    @Column(name = "creator_username")
    @Setter
    private String creatorUsername;

    @Column(name = "comment_date")
    private String commentDate;

    @Column(name = "description")
    private String description;

    @Column(name = "parent_comment_id")
    private Integer parentCommentId;

    @Column(name = "childs")
    private int numOfChildren;

    @Formula("(select COALESCE(sum(cs.score), 0) from comment_scores cs where cs.comment_id = comment_id AND cs.score > 0)")
    private long sumLike;

    @Formula("(select COALESCE(sum(cs.score), 0) from comment_scores cs where cs.comment_id = comment_id AND cs.score < 0)")
    private long sumDisLike;

    public void increaseChildren() {
        this.numOfChildren++;
    }
}
