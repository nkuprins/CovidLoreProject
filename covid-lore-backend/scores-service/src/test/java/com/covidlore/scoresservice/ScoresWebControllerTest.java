package com.covidlore.scoresservice;


import com.covidlore.scoresservice.entity.CommentScore;
import com.covidlore.scoresservice.entity.CommentScoreId;
import com.covidlore.scoresservice.entity.PostScore;
import com.covidlore.scoresservice.entity.PostScoreId;
import com.covidlore.scoresservice.rest.ScoreController;
import com.covidlore.scoresservice.service.ScoreService;
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

    private final String defaultCommentScoreMockStr =
                    "{\"scoreId\": " +
                    "{\"commentId\":0, \"userId\": \"Nikitos\"}," +
                    " \"score\": 1}";

    private final String defaultPostScoreMockStr =
                    "{\"scoreId\": " +
                    "{\"postId\":0, \"userId\": \"Nikitos\"}," +
                    " \"score\": -1}";

    @Test
    public void postCommentScore() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        CommentScoreId id = new CommentScoreId(0);
        id.setUserId(username);
        CommentScore commentScore = new CommentScore(id, 1);

        Mockito.when(scoreService.saveCommentScore(any(CommentScore.class))).thenReturn(commentScore);

        mvc.perform(MockMvcRequestBuilders
                        .post("/score/changeCommentScore")
                        .content("{\"score\": \"1\"," +
                                "\"scoreId\": {\"commentId\": \"0\"}}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(this.defaultCommentScoreMockStr));
    }

    @Test
    public void postCommentScoreError() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .post("/score/changeCommentScore")
                        .content("{\"score\": \"0\"," +
                                "\"scoreId\": {\"commentId\": \"0\"}}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    public void postPostScore() throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        PostScoreId id = new PostScoreId(0);
        id.setUserId(username);
        PostScore postScore = new PostScore(id, -1);

        Mockito.when(scoreService.savePostScore(any(PostScore.class))).thenReturn(postScore);

        mvc.perform(MockMvcRequestBuilders
                        .post("/score/changePostScore")
                        .content("{\"score\": \"1\"," +
                                "\"scoreId\": {\"postId\": \"0\"}}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(this.defaultPostScoreMockStr));
    }

    @Test
    public void postPostScoreError() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .post("/score/changePostScore")
                        .content("{\"score\": \"999\"," +
                                "\"scoreId\": {\"postId\": \"0\"}}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(jwt())
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
