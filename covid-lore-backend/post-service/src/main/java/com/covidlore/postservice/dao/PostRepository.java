package com.covidlore.postservice.dao;

import com.covidlore.postservice.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

}
