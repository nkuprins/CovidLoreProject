package com.covidlore.service;

import com.covidlore.dao.CommentRepository;
import com.covidlore.model.Comment;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    @Override
    public Set<Comment> findByPostAndParent(int postId, int parentId) {

        if (parentId <= 0)
            return commentRepository.findByPostIdAndParentCommentIdIsNull(postId);

        return commentRepository.findByPostIdAndParentCommentId(postId, parentId);
    }
}
