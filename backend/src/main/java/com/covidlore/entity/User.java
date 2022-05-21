package com.covidlore.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.concurrent.ThreadLocalRandom;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private int enabled;

    @Column(name = "profile_image")
    private int profileImage;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.enabled = 1;
        this.profileImage = ThreadLocalRandom.current().nextInt(1, 7);
    }

}
