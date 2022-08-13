package com.covidlore.postservice.rest;

import com.covidlore.postservice.entity.Post;
import com.covidlore.postservice.helper.OrderPost;
import com.covidlore.postservice.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public List<Post> showForum(
            @RequestParam(name = "o", required = false, defaultValue = "Default") OrderPost orderPost) {

        return postService.findAll(orderPost);
    }

    /*@PostMapping("/saveThread")
    public String saveThread(@RequestParam String title, @RequestParam String description,
                             @AuthenticationPrincipal User loggedInUser) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = LocalDateTime.now().format(dateFormatter);

        Post newPost = new Post(loggedInUser, date, title, description);
        postService.savePost(newPost);

        return "redirect:/forum";
    }*/

}
