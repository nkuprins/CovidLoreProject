package com.covidlore.scoresservice;


import com.covidlore.scoresservice.entity.*;
import com.covidlore.scoresservice.entity.comment.CommentScore;
import com.covidlore.scoresservice.entity.comment.CommentScoreId;
import com.covidlore.scoresservice.entity.post.PostScore;
import com.covidlore.scoresservice.entity.post.PostScoreId;
import com.covidlore.scoresservice.rest.ScoreController;
import com.covidlore.scoresservice.service.ScoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

@RunWith(SpringRunner.class)
@WebMvcTest(ScoreController.class)
@WithMockUser("Nikitos")
@AutoConfigureMockMvc
public class ScoresWebControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ScoreService scoreService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void putCommentScore() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        PostScoreId id = new PostScoreId(0);
        id.setUserId(username);
        Score commentScore = new CommentScore(id, -1);

        String jsonExpected = objectMapper.writeValueAsString(commentScore);

        Mockito.when(scoreService.saveScore(any(CommentScore.class))).thenReturn(commentScore);

        mvc.perform(MockMvcRequestBuilders
                        .put("/score/putScore")
                        .content("{" +
                                "\"type\": \"comment\"," +
                                "\"score\": \"-1\"," +
                                "\"scoreId\": {\"primaryId\": \"0\"}" +
                                "}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(jsonExpected));
    }

    @Test
    public void putCommentScoreError() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .put("/score/putScore")
                        .content("{" +
                                "\"type\": \"comment\"," +
                                "\"score\": \"0\"," +
                                "\"scoreId\": {\"primaryId\": \"0\"}" +
                                "}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    public void putPostScore() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        PostScoreId id = new PostScoreId(0);
        id.setUserId(username);
        Score postScore = new PostScore(id, -1);

        String jsonExpected = objectMapper.writeValueAsString(postScore);

        Mockito.when(scoreService.saveScore(any(PostScore.class))).thenReturn(postScore);

        mvc.perform(MockMvcRequestBuilders
                        .put("/score/putScore")
                        .content("{" +
                                "\"type\": \"post\"," +
                                "\"score\": \"1\"," +
                                "\"scoreId\": {\"primaryId\": \"0\"}" +
                                "}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(jsonExpected));
    }

    @Test
    public void putPostScoreError() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .put("/score/putScore")
                        .content("{" +
                                "\"type\": \"post\"," +
                                "\"score\": \"999\"," +
                                "\"scoreId\": {\"primaryId\": \"0\"}" +
                                "}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
