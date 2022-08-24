package com.example.postclient.controller;

import com.example.postclient.feign.PostClient;
import com.example.postclient.helper.OrderPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;

@Controller
public class PostController {

    private final PostClient postClient;

    @Autowired
    public PostController(PostClient postClient) {
        this.postClient = postClient;
    }

    @GetMapping("/forum")
    public String showForum(@RequestParam(name = "o", required = false, defaultValue = "Default") OrderPost orderPost,
                            Model model) {
        model.addAttribute("allPosts", postClient.getAllPosts(orderPost));

        return "forum";
    }

}
