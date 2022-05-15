package com.covidlore.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "post")
@NoArgsConstructor
@Getter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
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

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", date='" + date + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
