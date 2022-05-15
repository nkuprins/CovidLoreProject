package com.covidlore.service;

import com.covidlore.dao.PostScoresRepository;
import org.springframework.stereotype.Service;

@Service
public class PostScoresServiceImpl implements PostScoresService {

    private final PostScoresRepository postScoresRepository;

    public PostScoresServiceImpl(PostScoresRepository postScoresRepository) {
        this.postScoresRepository = postScoresRepository;
    }

    @Override
    public int sumLikes() {
        return postScoresRepository.total();
    }
}
