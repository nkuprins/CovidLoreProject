package com.covidlore.controller;

import com.covidlore.entity.Post;
import com.covidlore.entity.User;
import com.covidlore.service.PostService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ForumController {

    private final PostService postService;
    private final User loggedInUser;

    public ForumController(PostService postService, User loggedInUser) {
        this.postService = postService;
        this.loggedInUser = loggedInUser;
    }

    @GetMapping("/forum")
    public String showForum(Model model) {

        model.addAttribute("profileImage", loggedInUser.getProfileImage());
        model.addAttribute("allPosts", postService.findAll());

        return "forum";
    }

    @PostMapping("/saveThread")
    public String saveThread(@RequestParam String title, @RequestParam String description) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = LocalDateTime.now().format(dateFormatter);

        Post newPost = new Post(loggedInUser, date, title, description);
        postService.save(newPost);

        return "redirect:/forum";
    }

    @GetMapping("/discussion")
    public String showDiscussion() {
        return "discussion";
    }
}
