package com.covidlore.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "post")
@NoArgsConstructor
@Getter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "creator_id")
    private User user;

//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "postScore")
//    private Set<PostScores> postScores;

    @Formula("(select sum(ps.score_like) from post_scores ps where ps.post_id = post_id)")
    private long sumLike;

    @Formula("(select sum(ps.score_dislike) from post_scores ps where ps.post_id = post_id)")
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

    public Post(int id, User user, String date, String title, String description) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.title = title;
        this.description = description;
    }

    public Post(int id, User user, long sumLike, long sumDisLike, String date, String title, String description) {
        this.id = id;
        this.user = user;
        this.sumLike = sumLike;
        this.sumDisLike = sumDisLike;
        this.date = date;
        this.title = title;
        this.description = description;
    }
}
