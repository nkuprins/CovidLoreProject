package com.example.postclient.feign;

import com.example.postclient.entity.Post;
import com.example.postclient.helper.OrderPost;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("post-service")
public interface PostClient {

    @GetMapping("/posts")
    List<Post> getAllPosts(@RequestParam(name = "o", required = false, defaultValue = "Default") OrderPost orderPost);

}
