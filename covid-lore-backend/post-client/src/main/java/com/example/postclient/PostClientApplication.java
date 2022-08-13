package com.example.postclient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PostClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(PostClientApplication.class, args);
    }

}
