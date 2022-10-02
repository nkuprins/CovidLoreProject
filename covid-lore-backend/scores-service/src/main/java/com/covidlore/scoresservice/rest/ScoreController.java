package com.covidlore.scoresservice.rest;

import com.covidlore.scoresservice.entity.Score;
import com.covidlore.scoresservice.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/score", produces = "application/json")
@CrossOrigin(value = "http://localhost:1234/")
public class ScoreController {

    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PutMapping(value = "/putScore")
    public ResponseEntity<Score> putScore(@RequestBody @Validated Score score, JwtAuthenticationToken user) {
        score.getScoreId().setUserId(user.getName());
        Score saved = scoreService.saveScore(score);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

}
