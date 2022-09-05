package com.covidlore.commentservice.dao;

import com.covidlore.commentservice.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Set<Comment> findByPostIdAndParentCommentId(int postId, int parentId);
    Set<Comment> findByPostIdAndParentCommentIdIsNull(int postId);

    @Query("SELECT COALESCE(max(commentId), 0) FROM Comment")
    long lastCommentId();

}
