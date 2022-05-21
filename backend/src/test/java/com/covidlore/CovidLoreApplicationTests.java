package com.covidlore;

import com.covidlore.entity.Comment;
import com.covidlore.entity.Post;
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

    @Autowired
    private PostScoresServiceImpl postScoresService;

//    @Autowired
//    private UserServiceImpl userService;

    @Test
    @Transactional
    void contextLoads() {
        List<Post> post = postService.findAll();
//
//        User userMain = userService.findById(3);
//        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        String date = LocalDateTime.now().format(dateFormatter);
//        Post newPost = new Post(6, userService.findById(3), date, "Some new title", "Some new description");
//
////        System.out.println(newPost.getUser().getUsername());
        post.forEach(post1 -> System.out.println(post1.getSumDisLike() + "   " + post1.getId()));
////        System.out.println(newPost.getUser());

        Set<Comment> comments = commentService.findByPostAndParent(1, 0);
        comments.forEach(c -> System.out.println(c.getNumOfChildren()));
        assertTrue(true);
    }

}
