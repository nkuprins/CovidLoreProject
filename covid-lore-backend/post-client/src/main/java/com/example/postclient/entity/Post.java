package com.example.postclient.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class Post {

    private int postId;
    private User user;

    private long sumLike;

    private long sumDisLike;

    private String date;

    private String title;

    private String description;

    public Post(User user, String date, String title, String description) {
        this.user = user;
        this.date = date;
        this.title = title;
        this.description = description;
    }
}
