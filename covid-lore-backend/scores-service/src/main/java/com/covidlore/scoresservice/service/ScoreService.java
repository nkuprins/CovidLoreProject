package com.covidlore.scoresservice.service;

import com.covidlore.scoresservice.entity.CommentScore;
import com.covidlore.scoresservice.entity.PostScore;

public interface ScoreService {

    CommentScore saveCommentScore(CommentScore commentScore);
    PostScore savePostScore(PostScore postScore);

}
