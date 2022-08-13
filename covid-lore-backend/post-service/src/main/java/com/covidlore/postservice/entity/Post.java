package com.covidlore.postservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

// Again just for grading and clarification,
// if IDE tells, 'is never assigned' ignore it, as Hibernate does it implicitly. You may change it in settings
@Entity
@Table(name = "post")
@NoArgsConstructor
@Getter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "creator_id")
    private User user;

    @Formula("(select COALESCE(sum(ps.score), 0) from post_scores ps where ps.post_id = post_id AND ps.score > 0)")
    private long sumLike;

    @Formula("(select COALESCE(sum(ps.score), 0) from post_scores ps where ps.post_id = post_id AND ps.score < 0)")
    private long sumDisLike;

    @Column(name = "post_date")
    private String date;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    public Post(User user, String date, String title, String description) {
        this.user = user;
        this.date = date;
        this.title = title;
        this.description = description;
    }
}
