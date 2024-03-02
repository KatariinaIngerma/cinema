package com.example.cgitest.repository;
import com.example.cgitest.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    // query methods
}

