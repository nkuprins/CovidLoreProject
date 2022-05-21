package com.covidlore.service;

import com.covidlore.entity.Comment;

import java.util.Set;

public interface CommentService {

    Set<Comment> findByPostAndParent(int postId, int parentId);
    void save(Comment comment);
    Comment findById(int commentId);
    int lastCommentId();
}
