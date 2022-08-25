package com.covidlore.postservice.rest;

import com.covidlore.postservice.entity.Post;
import com.covidlore.postservice.entity.User;
import com.covidlore.postservice.helper.OrderPost;
import com.covidlore.postservice.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<Post> showPosts(@RequestParam(name = "o", required = false, defaultValue = "Default") OrderPost orderPost) {

        return postService.findAll(orderPost);
    }

    @PostMapping
    public ResponseEntity<Post> savePost(@RequestBody Post post, @AuthenticationPrincipal User user) {


        log.info("SOMETHING HAS HAPPEND");
        log.info(user.getUsername());
        post.setUser(user);
        Post saved = postService.savePost(post);

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

}
