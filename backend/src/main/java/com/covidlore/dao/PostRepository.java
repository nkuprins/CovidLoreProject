package com.covidlore.dao;

import com.covidlore.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findAllByOrderByDateAsc();
    List<Post> findAllByOrderByDateDesc();

    List<Post> findAllByOrderBySumLikeAsc();
    List<Post> findAllByOrderBySumLikeDesc();
}
