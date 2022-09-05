package com.covidlore.scoresservice.rest;

import com.covidlore.scoresservice.entity.CommentScore;
import com.covidlore.scoresservice.entity.PostScore;
import com.covidlore.scoresservice.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/score", produces = "application/json")
@CrossOrigin(value = "http://localhost:1234/")
public class CommentController {

    private final ScoreService scoreService;

    @Autowired
    public CommentController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }


    @PostMapping(value = "/changeCommentScore")
    public ResponseEntity<CommentScore> changeCommentScore(@RequestBody CommentScore commentScore, JwtAuthenticationToken user) {
        commentScore.getScoreId().setUserId(user.getName());
        CommentScore saved = scoreService.saveCommentScore(commentScore);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PostMapping(value = "/changePostScore")
    public ResponseEntity<PostScore> changePostScore(@RequestBody PostScore postScore, JwtAuthenticationToken user) {
        postScore.getScoreId().setUserId(user.getName());
        PostScore saved = scoreService.savePostScore(postScore);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

}
