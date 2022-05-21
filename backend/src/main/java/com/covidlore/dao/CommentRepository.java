package com.covidlore.dao;

import com.covidlore.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Set<Comment> findByPostIdAndParentCommentId(int postId, int parentId);
    Set<Comment> findByPostIdAndParentCommentIdIsNull(int postId);

    @Query("SELECT max(commentId) FROM Comment")
    int lastCommentId();

}
