package com.covidlore.model;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @OneToMany(mappedBy = "creatorId")
    private List<Post> foreignUserId;

    @Column(name = "username")
    private String username;

    public String getUsername() {
        return username;
    }
}
