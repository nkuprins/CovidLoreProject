package com.covidlore.commentservice;

import com.covidlore.commentservice.entity.Comment;
import com.covidlore.commentservice.rest.CommentController;
import com.covidlore.commentservice.service.CommentService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.ws.rs.core.MediaType;
import java.util.Set;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@RunWith(SpringRunner.class)
@WebMvcTest(CommentController.class)
@WithMockUser("Nikitos")
@AutoConfigureMockMvc
public class CommentWebControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CommentService commentService;

    private final String defaultCommentMockStr =
            "{\"commentId\": \"username12345\"," +
            "\"description\":\"some description\"," +
            "\"postId\": 1," +
            "\"parentCommentId\": \"parentUsername12345\"," +
            "\"commentDate\": null," +
            "\"numOfChildren\": 0," +
            "\"creatorUsername\": null}";

    private final Comment defaultCommentMock = new Comment("username12345", 1, "some description", "parentUsername12345");

    @Test
    public void showComment() throws Exception {

        Set<Comment> comments = Set.of(this.defaultCommentMock);
        Mockito.when(commentService.findByPostAndParent(anyInt(), eq("")))
                .thenReturn(comments);

        mvc.perform(MockMvcRequestBuilders
                        .get("/comment/" + this.defaultCommentMock.getPostId())
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[" + this.defaultCommentMockStr + "]"));
    }

    @Test
    public void showCommentsOfParent() throws Exception {

        Set<Comment> comments = Set.of(this.defaultCommentMock);
        Mockito.when(commentService.findByPostAndParent(anyInt(), anyString()))
                .thenReturn(comments);

        mvc.perform(MockMvcRequestBuilders
                        .get("/comment/" + this.defaultCommentMock.getPostId() + "/"
                                + this.defaultCommentMock.getParentCommentId())
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[" + this.defaultCommentMockStr + "]"));
    }

    @Test
    public void saveCommentDefault() throws Exception {

        Comment parentComment = new Comment("parentUsername12345", 1, "some parent description", null);
        Mockito.when(commentService.saveComment(any(Comment.class)))
                .thenReturn(this.defaultCommentMock);
        Mockito.when(commentService.findById(defaultCommentMock.getParentCommentId()))
                .thenReturn(parentComment);

        mvc.perform(MockMvcRequestBuilders
                        .post("/comment")
                        .content("{\"commentId\": \"username12345\"," +
                                "\"description\":\"some description\"," +
                                "\"postId\": 1," +
                                "\"parentCommentId\": \"parentUsername12345\"}")
                        .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(this.defaultCommentMockStr))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    public void saveCommentValidationError() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .post("/comment")
                        .content("{}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
