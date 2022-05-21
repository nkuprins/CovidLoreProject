package com.covidlore.controller;

import com.covidlore.entity.User;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/*
@class - represents controller for simple mappings,
         where we need only one common model attribute and nothing else.
 */

@Controller
public class PageController {

    private final BeanFactory beanFactory;

    public PageController(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
    }

    private User getLoggedInUser() {
        return this.beanFactory.getBean(User.class);
    }

    @GetMapping("/discussion")
    public String showDiscussion(Model model) {
        model.addAttribute("profileImage", this.getLoggedInUser().getProfileImage());
        return "discussion";
    }

    @GetMapping("/map")
    public String showMap(Model model) {
        model.addAttribute("profileImage", this.getLoggedInUser().getProfileImage());
        return "map";
    }

    @GetMapping("/news")
    public String showNews(Model model) {
        model.addAttribute("profileImage", this.getLoggedInUser().getProfileImage());
        return "news";
    }
}
