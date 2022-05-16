package com.covidlore.controller;

import com.covidlore.model.Post;
import com.covidlore.model.User;
import com.covidlore.service.PostServiceImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ForumController {

    private final PostServiceImpl postService;
    //private final UserServiceImpl userService;
    private User userMain;

    public ForumController(PostServiceImpl postService) {
        this.postService = postService;
        //this.userService = userService;
    }

    @GetMapping("/login")
    public String showLogin() {
        return "login";
    }

    @GetMapping("/forum")
    public String showForum(Model model) {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
        //this.userMain = userService.findById(1);
        model.addAttribute("allPosts", postService.findAll());

        return "forum";
    }

    @GetMapping("/discussion")
    public String showDiscussion() {

        return "discussion";
    }

    @PostMapping("/saveThread")
    public String saveThread(@RequestParam String title, @RequestParam String description) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = LocalDateTime.now().format(dateFormatter);
        Post newPost = new Post(userMain, date, title, description);

        postService.save(newPost);

        return "redirect:/forum";
    }

}
