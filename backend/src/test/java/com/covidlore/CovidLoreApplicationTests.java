package com.covidlore;

import com.covidlore.entity.Comment;
import com.covidlore.entity.Post;
import com.covidlore.helper.OrderPost;
import com.covidlore.service.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class CovidLoreApplicationTests {

    @Autowired
    private PostServiceImpl postService;

    @Autowired
    private CommentServiceImpl commentService;

    @Test
    @Transactional
    void contextLoads() {
        List<Post> post = postService.findAll(OrderPost.DateDesc);

        post.forEach(el -> System.out.println(el.getDate()));
        System.out.println(commentService.lastCommentId());
        assertTrue(true);
    }

}
