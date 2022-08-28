package com.example.commentservice.dao;

import com.example.commentservice.entity.CommentScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentScoresRepository extends JpaRepository<CommentScore, Integer> {

}
