package com.covidlore.postservice.rest;

import com.covidlore.postservice.entity.Post;
import com.covidlore.postservice.helper.OrderPost;
import com.covidlore.postservice.service.PostService;
import com.nimbusds.jwt.JWTParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(path = "/posts", produces = "application/json")
@CrossOrigin(value = "http://localhost:1234/")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<Post>> showPosts(
            @RequestParam(name = "o", required = false, defaultValue = "Default") OrderPost orderPost) {
        return new ResponseEntity<>(postService.findAll(orderPost), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> readPost(@PathVariable int postId) {
        return new ResponseEntity<>(postService.findById(postId), HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Post> savePost(@RequestBody Post post, JwtAuthenticationToken user) {

        String preferredUsername =
                String.valueOf(user.getTokenAttributes().get("preferred_username"));
        post.setCreatorUsername(preferredUsername);
        Post saved = postService.savePost(post);

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

}
