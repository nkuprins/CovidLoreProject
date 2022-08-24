package com.example.cloudgateway;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;


@RestController
@Slf4j
@CrossOrigin(value = "http://localhost:1234")
public class CallmeController {

//    @GetMapping(value = "/token")
//    public Mono<String> getHome(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
//        return Mono.just(authorizedClient.getAccessToken().getTokenValue());
//    }

    @GetMapping("/")
    public Mono<String> index(WebSession session) {
        return Mono.just(session.getId());
    }
}
