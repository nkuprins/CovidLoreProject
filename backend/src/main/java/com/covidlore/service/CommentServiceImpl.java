package com.covidlore.service;

import com.covidlore.dao.CommentRepository;
import com.covidlore.dao.CommentScoresRepository;
import com.covidlore.entity.Comment;
import com.covidlore.entity.CommentScore;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentScoresRepository commentScoresRepository;

    public CommentServiceImpl(CommentRepository commentRepository, CommentScoresRepository commentScoresRepository) {
        this.commentRepository = commentRepository;
        this.commentScoresRepository = commentScoresRepository;
    }

    @Override
    public Set<Comment> findByPostAndParent(int postId, int parentId) {

        if (parentId <= 0)
            return commentRepository.findByPostIdAndParentCommentIdIsNull(postId);

        return commentRepository.findByPostIdAndParentCommentId(postId, parentId);
    }

    @Override
    public void saveComment(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public void saveCommentScore(CommentScore commentScore) {
        commentScoresRepository.save(commentScore);
    }

    @Override
    public Comment findById(int commentId) {
        return commentRepository.getById(commentId);
    }

    @Override
    public int lastCommentId() {
        return commentRepository.lastCommentId();
    }
}
