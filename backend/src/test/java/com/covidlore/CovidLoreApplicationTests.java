package com.covidlore;

import com.covidlore.model.Post;
import com.covidlore.service.TestService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class CovidLoreApplicationTests {

    @Autowired
    private TestService testService;

    @Test
    void contextLoads() {
        Post post = testService.getPost();
        System.out.println(post.toString());
        assertTrue(true);
    }

}
