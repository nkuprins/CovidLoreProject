package com.nikitakuprins.resourceexample;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin("*")
public class HomeController {

    @GetMapping("/zalupa")
    public String showPage() {
        return "index";
    }

}
