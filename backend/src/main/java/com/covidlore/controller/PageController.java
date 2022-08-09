package com.covidlore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

/*
@class - represents controller for simple mappings,
         where we need only one common session attribute and nothing else.
*/

@Controller
@SessionAttributes("profileImage")
public class PageController {

    @GetMapping("/discussion")
    public String showDiscussion() {
        return "discussion";
    }

    @GetMapping("/map")
    public String showMap() {
        return "map";
    }

    @GetMapping("/news")
    public String showNews() {
        return "news";
    }
}
