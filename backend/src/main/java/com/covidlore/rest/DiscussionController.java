package com.covidlore.rest;

import com.covidlore.entity.*;
import com.covidlore.service.CommentService;
import com.covidlore.service.PostService;
import com.covidlore.service.UserService;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/discussion")
public class DiscussionController {

    private final CommentService commentService;
    private final UserService userService;
    private final PostService postService;
    private final BeanFactory beanFactory;

    public DiscussionController(CommentService commentService, UserService userService, PostService postService, BeanFactory beanFactory) {
        this.commentService = commentService;
        this.userService = userService;
        this.postService = postService;
        this.beanFactory = beanFactory;
    }

    @GetMapping(value = "/lastCommentId")
    public @ResponseBody int readLastCommentId() {
        return commentService.lastCommentId();
    }

    @GetMapping(value = "/loggedInUser", produces = { "application/json" })
    public @ResponseBody User readLoggedInUser() {
        return this.beanFactory.getBean(User.class);
    }

    @GetMapping(value = "/post/{postId}", produces = { "application/json" })
    public @ResponseBody Post readPost(@PathVariable int postId) {
        return postService.findById(postId);
    }

    @GetMapping(value = "/comment/{postId}", produces = { "application/json" })
    public @ResponseBody
    Set<Comment> readComments(@PathVariable int postId) {
        return commentService.findByPostAndParent(postId, 0);
    }

    @GetMapping(value = "/comment/{postId}/{level}", produces = { "application/json" })
    public @ResponseBody
    Set<Comment> readCommentsOnLevel(@PathVariable int postId, @PathVariable int level) {
        return commentService.findByPostAndParent(postId, level);
    }

    @PostMapping(value = "/createComment")
    public void createComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);

        if (comment.getParentCommentId() != null) {
            Comment parentComment = commentService.findById(comment.getParentCommentId());
            parentComment.increaseChildren();
            commentService.saveComment(parentComment);
        }
    }

    @PostMapping(value = "/changeCommentScore")
    public void changeCommentScore(@RequestBody CommentScore commentScore) {

        commentService.saveCommentScore(commentScore);
    }

    @PostMapping(value = "/changePostScore")
    public void changePostScore(@RequestBody PostScore postScore) {

        postService.savePostScore(postScore);
    }

}
