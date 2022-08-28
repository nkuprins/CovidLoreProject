package com.example.commentservice.service;

import com.example.commentservice.entity.CommentScore;
import com.example.commentservice.entity.PostScore;

public interface ScoreService {

    CommentScore saveCommentScore(CommentScore commentScore);
    PostScore savePostScore(PostScore postScore);

}
