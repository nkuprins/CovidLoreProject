package com.covidlore.service;

import com.covidlore.entity.Comment;
import com.covidlore.entity.CommentScore;
import com.covidlore.entity.PostScore;

import java.util.Set;

public interface CommentService {

    Set<Comment> findByPostAndParent(int postId, int parentId);
    void saveComment(Comment comment);
    void saveCommentScore(CommentScore commentScore);
    Comment findById(int commentId);
    int lastCommentId();
}
