package com.example.commentservice.service;

import com.example.commentservice.entity.Comment;

import java.util.Set;

public interface CommentService {

    Set<Comment> findByPostAndParent(int postId, int parentId);
    Comment saveComment(Comment comment);

    Comment findById(int commentId);
    long lastCommentId();
}
