package com.example.authservice.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.DefaultSingletonBeanRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
@CrossOrigin
public class JwtController {

    private final TokenManager tokenManager;
    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    @Autowired
    public JwtController(AuthenticationManager am, TokenManager tokenManager, UserService userService) {
        this.authenticationManager = am;
        this.tokenManager = tokenManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> createToken(@RequestBody JwtRequestModel request)  {
        log.info("SOMETHING");
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
        String jwtToken = tokenManager.generateJwtToken(userDetails);
        log.info(jwtToken);
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response, SessionStatus sessionStatus) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null)
            new SecurityContextLogoutHandler().logout(request, response, authentication);

        return "redirect:/login";
    }

}
