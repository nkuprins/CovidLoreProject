package com.covidlore.controller;

import com.covidlore.entity.Post;
import com.covidlore.entity.User;
import com.covidlore.helper.OrderPost;
import com.covidlore.service.PostService;
import org.springframework.beans.factory.BeanFactory;
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
    private final BeanFactory beanFactory;

    public ForumController(PostService postService, BeanFactory beanFactory) {
        this.postService = postService;
        this.beanFactory = beanFactory;
    }

    private User getLoggedInUser() {
        return this.beanFactory.getBean(User.class);
    }

    @GetMapping("/forum")
    public String showForum(@RequestParam(name = "o", required = false, defaultValue = "Default") OrderPost orderPost, Model model) {

        model.addAttribute("profileImage", this.getLoggedInUser().getProfileImage());
        model.addAttribute("allPosts", postService.findAll(orderPost));

        return "forum";
    }

    @PostMapping("/saveThread")
    public String saveThread(@RequestParam String title, @RequestParam String description) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = LocalDateTime.now().format(dateFormatter);

        Post newPost = new Post(this.getLoggedInUser(), date, title, description);
        postService.savePost(newPost);

        return "redirect:/forum";
    }
}
