package com.covidlore.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
//    @JoinColumn(name = "post_id")
//    private Post post;
    @Column(name = "post_id")
    private int postId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "comment_date")
    private String commentDate;

    @Column(name = "description")
    private String description;

//    @OneToMany
//    @JoinColumn(name = "parent_comment_id")
//    private Set<Comment> childComments;
    @Column(name = "parent_comment_id")
    private Integer parentCommentId;

    @Column(name = "childs")
    private int numOfChildren;

    @Formula("(select COALESCE(sum(cs.score), 0) from comment_scores cs where cs.comment_id = comment_id AND cs.score > 0)")
    private long sumLike;

    @Formula("(select COALESCE(sum(cs.score), 0) from comment_scores cs where cs.comment_id = comment_id AND cs.score < 0)")
    private long sumDisLike;
}
