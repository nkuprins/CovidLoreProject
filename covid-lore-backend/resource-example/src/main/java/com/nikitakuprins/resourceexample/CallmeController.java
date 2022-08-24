package com.nikitakuprins.resourceexample;

import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/callme")
@Slf4j
@CrossOrigin(value = "http://localhost:1234")
public class CallmeController {

    @GetMapping("/ping")
    public String ping() {
        log.info("PIZDEC");
//        SecurityContext context = SecurityContextHolder.getContext();
//        Authentication authentication = context.getAuthentication();
        return "Scopes: zalupa ssssssssssss"; //+ authentication.getName();
    }

    @GetMapping("/orgs")
    public String orgs() {
        log.info("PIZDEC2");
        return "ZALUAPA";
    }
}
