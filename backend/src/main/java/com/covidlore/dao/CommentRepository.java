package com.covidlore.dao;

import com.covidlore.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Set<Comment> findByPostIdAndParentCommentId(int postId, int parentId);
    Set<Comment> findByPostIdAndParentCommentIdIsNull(int postId);
}
