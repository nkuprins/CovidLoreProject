package com.covidlore.rest;

import com.covidlore.model.Comment;
import com.covidlore.model.Post;
import com.covidlore.service.CommentServiceImpl;
import com.covidlore.service.PostServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/discussion")
public class DiscussionController {

    private final CommentServiceImpl commentService;
    private final PostServiceImpl postService;

    public DiscussionController(CommentServiceImpl commentService, PostServiceImpl postService) {
        this.commentService = commentService;
        this.postService = postService;
    }

    @GetMapping(value = "post/{postId}", produces = { "application/json" })
    public @ResponseBody
    Post readPost(@PathVariable int postId) {
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

    @PostMapping(value = "/createComment")
    public void createComment(@RequestBody Comment payload) {
        System.out.println(payload.getDescription());
    }
}
