package com.covidlore;

import com.covidlore.model.Post;
import com.covidlore.service.PostScoresService;
import com.covidlore.service.PostScoresServiceImpl;
import com.covidlore.service.PostServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.management.Query;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class CovidLoreApplicationTests {

    @Autowired
    private PostServiceImpl postService;

    @Autowired
    private PostScoresServiceImpl postScoresService;

    @Test
    void contextLoads() {
        List<Post> post = postService.findAll();
        System.out.println(post.get(1));
        assertTrue(true);
    }

}
