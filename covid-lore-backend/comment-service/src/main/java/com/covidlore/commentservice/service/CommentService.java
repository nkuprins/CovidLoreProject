package com.covidlore.commentservice.service;

import com.covidlore.commentservice.entity.Comment;

import java.util.Set;

public interface CommentService {

    Set<Comment> findByPostAndParent(int postId, String parentId);
    Comment saveComment(Comment comment);
    Comment findById(String commentId);
}
