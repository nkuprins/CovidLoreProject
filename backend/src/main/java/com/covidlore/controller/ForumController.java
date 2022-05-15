package com.covidlore.controller;

import com.covidlore.service.PostServiceImpl;
import com.covidlore.service.UserServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ForumController {

    private final PostServiceImpl postService;
    private final UserServiceImpl userService;

    public ForumController(PostServiceImpl postService, UserServiceImpl userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping("forum")
    public String showForum(Model model) {

        model.addAttribute("allPosts", postService.findAll());

        return "forum";
    }


}
