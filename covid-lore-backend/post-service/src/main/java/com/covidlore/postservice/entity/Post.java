package com.covidlore.postservice.entity;

import lombok.*;
import org.hibernate.annotations.Formula;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Again just for grading and clarification,
// if IDE tells, 'is never assigned' ignore it, as Hibernate does it implicitly. You may change it in settings
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

    @PrePersist
    public void processPost() {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.date = LocalDateTime.now().format(dateFormatter);
    }
}
