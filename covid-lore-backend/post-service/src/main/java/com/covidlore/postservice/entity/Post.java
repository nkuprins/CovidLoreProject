package com.covidlore.postservice.entity;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "post")
@RequiredArgsConstructor
@NoArgsConstructor
@Getter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId;

    @Setter
    @Column(name = "creator_username")
    private String creatorUsername ;

    @Column(name = "post_date")
    private String date;

    @Column(name = "title")
    @NonNull
    @NotNull
    private String title;

    @Column(name = "description")
    @NonNull
    @NotNull
    private String description;

    @Setter
    private long sumLikes;

    @Setter
    private long sumDislikes;

    @PrePersist
    public void processPost() {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.date = LocalDateTime.now().format(dateFormatter);
    }
}
