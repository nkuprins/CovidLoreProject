package com.covidlore.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.support.DefaultSingletonBeanRegistry;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.support.SessionStatus;

@Controller
public class LoginController {

    private final BeanFactory beanFactory;

    public LoginController(BeanFactory beanFactory) {
        this.beanFactory = beanFactory;
    }


    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response, SessionStatus sessionStatus) {

        DefaultSingletonBeanRegistry registry = (DefaultSingletonBeanRegistry) beanFactory;
        registry.destroySingleton("loggedInUser"); //destroys the bean for reinit

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null)
            new SecurityContextLogoutHandler().logout(request, response, authentication);

        sessionStatus.setComplete();
        return "redirect:/login";
    }
}
