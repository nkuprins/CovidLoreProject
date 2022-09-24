package com.covidlore.postservice.rest;

import com.covidlore.postservice.dao.PostRepository;
import com.covidlore.postservice.entity.Post;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(path = "/posts", produces = "application/json")
@CrossOrigin(value = "http://localhost:1234/")
public class PostController {

    private final PostRepository postRepository;

    @Autowired
    public PostController(PostRepository postService) {
        this.postRepository = postService;
    }

    @GetMapping
    public ResponseEntity<List<Post>> showPosts() {
        return new ResponseEntity<>(postRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> showPost(@PathVariable int postId) {
        return new ResponseEntity<>(postRepository.findById(postId).get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Post> savePost(@Valid @RequestBody Post post, JwtAuthenticationToken user) {
        String preferredUsername = String.valueOf(user.getTokenAttributes().get("preferred_username"));
        post.setCreatorUsername(preferredUsername);
        Post saved = postRepository.save(post);

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

}
