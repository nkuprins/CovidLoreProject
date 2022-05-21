package com.covidlore.controller;

import com.covidlore.entity.User;
import com.covidlore.service.UserService;
import com.covidlore.prototype.model.PrototypeUser;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/register")
public class RegisterController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegisterController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @InitBinder
    public void initBinder(WebDataBinder dataBinder) {
        // Trim all input(no spaces)
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @GetMapping("/showRegistrationForm")
    public String showRegister(Model model) {

        model.addAttribute("protUser", new PrototypeUser());
        return "register";
    }

    @PostMapping("/processRegistration")
    public String processRegistrationForm(@Valid @ModelAttribute("protUser") PrototypeUser prototypeUser,
                                          BindingResult bindingResult, Model model) {

        if (bindingResult.hasErrors())
            return "redirect:/register/showRegistrationForm";


        // Check if user already exists
        User existingUser = userService.findByUsername(prototypeUser.getUsername());
        if (existingUser != null)
            return "redirect:/register/showRegistrationForm";

        String plainPassword = prototypeUser.getPassword(); // Non encrypted password
        prototypeUser.setPassword(passwordEncoder.encode(plainPassword)); // Set encrypted password
        userService.save(prototypeUser); // Save new user

        return "redirect:/login";
    }
}
