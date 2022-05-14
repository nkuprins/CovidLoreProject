package com.covidlore.controller;

import com.covidlore.service.TestService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class ForumController {

    private final TestService testService;

    public ForumController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("forum")
    public String showForum(Model model) {

        model.addAttribute("postsAttr", testService.getPost());

        return "forum";
    }
}
