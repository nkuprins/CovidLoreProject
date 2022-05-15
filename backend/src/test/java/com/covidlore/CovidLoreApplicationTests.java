package com.covidlore;

import com.covidlore.model.Post;
import com.covidlore.model.User;
import com.covidlore.service.PostScoresService;
import com.covidlore.service.PostScoresServiceImpl;
import com.covidlore.service.PostServiceImpl;
import com.covidlore.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.management.Query;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class CovidLoreApplicationTests {

    @Autowired
    private PostServiceImpl postService;

    @Autowired
    private PostScoresServiceImpl postScoresService;

    @Autowired
    private UserServiceImpl userService;

    @Test
    @Transactional
    void contextLoads() {
        List<Post> post = postService.findAll();

        User userMain = userService.findById(3);
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = LocalDateTime.now().format(dateFormatter);
        Post newPost = new Post(6, userService.findById(3), date, "Some new title", "Some new description");

//        System.out.println(newPost.getUser().getUsername());
        post.forEach(post1 -> System.out.println(post1.getSumDisLike() + "   " + post1.getId()));
//        System.out.println(newPost.getUser());
        assertTrue(true);
    }

}
