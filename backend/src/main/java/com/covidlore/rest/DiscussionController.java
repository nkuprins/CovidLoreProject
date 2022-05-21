package com.covidlore.rest;

import com.covidlore.entity.Comment;
import com.covidlore.entity.Post;
import com.covidlore.entity.User;
import com.covidlore.service.CommentService;
import com.covidlore.service.PostService;
import com.covidlore.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/discussion")
public class DiscussionController {

    private final CommentService commentService;
    private final PostService postService;
    private final User loggedInUser;

    public DiscussionController(CommentService commentService, PostService postService, User loggedInUser) {
        this.commentService = commentService;
        this.postService = postService;
        this.loggedInUser = loggedInUser;
    }

    @GetMapping(value = "lastCommentId", produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody int readLastCommentId() {
        return commentService.lastCommentId();
    }

    @GetMapping(value = "loggedInUser", produces = { "application/json" })
    public @ResponseBody User readLoggedInUser() {
        return loggedInUser;
    }

    @GetMapping(value = "post/{postId}", produces = { "application/json" })
    public @ResponseBody Post readPost(@PathVariable int postId) {
        return postService.findById(postId);
    }

    @GetMapping(value = "comment/{postId}", produces = { "application/json" })
    public @ResponseBody
    Set<Comment> readComments(@PathVariable int postId) {
        return commentService.findByPostAndParent(postId, 0);
    }

    @GetMapping(value = "comment/{postId}/{level}", produces = { "application/json" })
    public @ResponseBody
    Set<Comment> readCommentsOnLevel(@PathVariable int postId, @PathVariable int level) {
        return commentService.findByPostAndParent(postId, level);
    }

    @PostMapping(value = "createComment")
    public void createComment(@RequestBody Comment comment) {
        System.out.println(comment.getUser().getUserId());
//        commentService.save(comment);

        if (comment.getParentCommentId() != null) {
            Comment parentComment = commentService.findById(comment.getParentCommentId());
            parentComment.increaseChildren();
//            commentService.save(parentComment);
        }
    }
}
