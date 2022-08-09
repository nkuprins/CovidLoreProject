package com.covidlore.controller;

import com.covidlore.entity.Post;
import com.covidlore.entity.User;
import com.covidlore.helper.OrderPost;
import com.covidlore.service.PostService;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@SessionAttributes("profileImage")
public class ForumController {

    private final PostService postService;

    @Autowired
    public ForumController(PostService postService) {
        this.postService = postService;
    }

    @ModelAttribute(name = "profileImage")
    public int userProfileImage(@AuthenticationPrincipal User loggedInUser) {
        return loggedInUser.getProfileImage();
    }

    @GetMapping("/forum")
    public String showForum(@RequestParam(name = "o", required = false, defaultValue = "Default") OrderPost orderPost, Model model) {

        model.addAttribute("allPosts", postService.findAll(orderPost));
        return "forum";
    }

    @PostMapping("/saveThread")
    public String saveThread(@RequestParam String title, @RequestParam String description,
                             @AuthenticationPrincipal User loggedInUser) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = LocalDateTime.now().format(dateFormatter);

        Post newPost = new Post(loggedInUser, date, title, description);
        postService.savePost(newPost);

        return "redirect:/forum";
    }
}
