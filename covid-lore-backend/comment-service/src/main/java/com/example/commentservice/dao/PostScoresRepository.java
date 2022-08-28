package com.example.commentservice.dao;

import com.example.commentservice.entity.PostScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostScoresRepository extends JpaRepository<PostScore, Integer> {

}
