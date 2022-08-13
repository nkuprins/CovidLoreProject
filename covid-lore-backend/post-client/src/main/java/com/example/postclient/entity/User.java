package com.example.postclient.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.concurrent.ThreadLocalRandom;

// Again just for grading and clarification,
// if IDE tells, 'is never assigned' ignore it, as Hibernate does it implicitly. You may change it in settings
@NoArgsConstructor
@Getter
public class User {

    private int userId;

    private String username;

    private String password;

    private int enabled;

    private int profileImage;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.enabled = 1;
        this.profileImage = ThreadLocalRandom.current().nextInt(1, 7);
    }
}
