package com.covidlore.controller;

import com.covidlore.model.User;
import com.covidlore.service.UserServiceImpl;
import com.covidlore.user.CrmUser;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.util.Set;

@Controller
@RequestMapping("/register")
public class RegisterController {

    private final UserServiceImpl userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegisterController(UserServiceImpl userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @InitBinder
    public void initBinder(WebDataBinder dataBinder) {

        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @GetMapping("/showRegistrationForm")
    public String showRegister(Model model) {

        model.addAttribute("crmUser", new CrmUser());
        return "register";
    }

    @PostMapping("/processRegistration")
    public String processRegistrationForm(@Valid @ModelAttribute("crmUser") CrmUser crmUser,
                                          BindingResult bindingResult, Model model) {

        if (bindingResult.hasErrors()) {
            return "register";
        }

        String userName = crmUser.getUsername();

        // check the database if user already exists
        User existing = userService.findByUsername(userName);
        if (existing != null){
            model.addAttribute("crmUser", new CrmUser());
            return "register";
        }

        String plainPassword = crmUser.getPassword();
        crmUser.setPassword(passwordEncoder.encode(plainPassword));
        userService.save(crmUser);

        return "forum";
    }
}
