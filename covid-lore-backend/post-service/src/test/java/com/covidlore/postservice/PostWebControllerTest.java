package com.covidlore.postservice;

import com.covidlore.postservice.dao.PostRepository;
import com.covidlore.postservice.entity.Post;
import com.covidlore.postservice.rest.PostController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@RunWith(SpringRunner.class)
@WebMvcTest(PostController.class)
@WithMockUser("Nikitos")
@AutoConfigureMockMvc
public class PostWebControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PostRepository postRepository;

    private final String defaultPostMockStr =
            "{\"postId\": 0," +
            " \"creatorUsername\": null," +
            "\"date\":null," +
            "\"title\":\"TITLE\"," +
            "\"description\": \"DESCRIPTION\"}";

    private final Post defaultPostMock = new Post("TITLE", "DESCRIPTION");

    @Test
    public void getPosts() throws Exception {

        List<Post> posts = List.of(this.defaultPostMock);
        Mockito.when(postRepository.findAll()).thenReturn(posts);

        mvc.perform(MockMvcRequestBuilders
                        .get("/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[" + this.defaultPostMockStr + "]"));
    }

    @Test
    public void savePostDefault() throws Exception {

        Mockito.when(postRepository.save(any(Post.class))).thenReturn(this.defaultPostMock);

        mvc.perform(MockMvcRequestBuilders
                        .post("/posts")
                        .content(("{\"title\": \"TITLE\"," +
                                "\"description\": \"DESCRIPTION\"}"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(this.defaultPostMockStr));
    }

    @Test
    public void savePostValidationError() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .post("/posts")
                        .content(("{}"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
