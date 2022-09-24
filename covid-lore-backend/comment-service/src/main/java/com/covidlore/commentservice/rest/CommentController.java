package com.covidlore.commentservice.rest;

import com.covidlore.commentservice.service.CommentService;
import com.covidlore.commentservice.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping(path = "/comment", produces = "application/json")
@CrossOrigin(value = "http://localhost:1234/")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Set<Comment>> showComments(@PathVariable int postId) {
        return new ResponseEntity<>(commentService.findByPostAndParent(postId, ""), HttpStatus.OK);
    }

    @GetMapping("/{postId}/{parentId}")
    public ResponseEntity<Set<Comment>> showCommentsOfParent(@PathVariable int postId, @PathVariable String parentId) {
        return new ResponseEntity<>(commentService.findByPostAndParent(postId, parentId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Comment> saveComment(@Valid @RequestBody Comment comment, JwtAuthenticationToken user) {
        String preferredUsername = String.valueOf(user.getTokenAttributes().get("preferred_username"));
        comment.setCreatorUsername(preferredUsername);
        Comment saved = commentService.saveComment(comment);

        if (comment.getParentCommentId() != null) {
            Comment parentComment = commentService.findById(comment.getParentCommentId());
            parentComment.increaseChildren();
            commentService.saveComment(parentComment);
        }

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
