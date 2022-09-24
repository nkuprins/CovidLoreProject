package com.covidlore.commentservice.service;

import com.covidlore.commentservice.dao.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.covidlore.commentservice.entity.Comment;

import java.util.Set;


@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Set<Comment> findByPostAndParent(int postId, String parentId) {

        if (parentId.isBlank())
            return commentRepository.findByPostIdAndParentCommentIdIsNull(postId);

        return commentRepository.findByPostIdAndParentCommentId(postId, parentId);
    }

    @Override
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment findById(String commentId) {
        return commentRepository.findByCommentId(commentId);
    }
}
