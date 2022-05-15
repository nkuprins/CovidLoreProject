package com.covidlore.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    private Set<Post> foreignUserId;

//    @OneToMany(mappedBy = "userScore")
//    private List<PostScores> postScores;

    @Column(name = "username")
    private String username;

    public User(int userId, String username) {
        this.userId = userId;
        this.username = username;
    }
}
