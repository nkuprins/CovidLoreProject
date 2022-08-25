package com.covidlore.postservice.entity;

import lombok.*;
import org.hibernate.annotations.Formula;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @Setter
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

    @PrePersist
    public void processPost() {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.date = LocalDateTime.now().format(dateFormatter);
    }

    public Post(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
