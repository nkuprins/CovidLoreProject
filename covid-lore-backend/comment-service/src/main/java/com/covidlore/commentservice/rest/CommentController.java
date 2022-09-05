package com.covidlore.commentservice.rest;

import com.covidlore.commentservice.service.CommentService;
import com.covidlore.commentservice.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value = "/lastCommentId")
    public ResponseEntity<Long> readLastCommentId() {
        return new ResponseEntity<>(commentService.lastCommentId(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Set<Comment>> readComments(@PathVariable int postId) {
        return new ResponseEntity<>(commentService.findByPostAndParent(postId, 0), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{postId}/{level}")
    public ResponseEntity<Set<Comment>> readCommentsOnLevel(@PathVariable int postId, @PathVariable int level) {
        return new ResponseEntity<>(commentService.findByPostAndParent(postId, level), HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/createComment")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment, JwtAuthenticationToken user) {

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
