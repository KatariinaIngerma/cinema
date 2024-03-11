package com.example.cgitest.Service;

import com.example.cgitest.model.Movie;
import com.example.cgitest.model.User;
import com.example.cgitest.repository.MovieRepository;
import com.example.cgitest.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final MovieService movieService;

    public UserServiceImplementation(UserRepository userRepository, MovieRepository movieRepository, MovieService movieService) {
        this.userRepository=userRepository;
        this.movieRepository = movieRepository;
        this.movieService = movieService;
    }

    @PostConstruct
    private void initializeUsers() {

        // hardcodetud kasutajad
        User user1 = new User(1L, "user1@example.com", "password1", new ArrayList<>());
        User user2 = new User(2L, "user2@example.com", "password2", new ArrayList<>());
        User user3 = new User(3L, "user3@example.com", "password3", new ArrayList<>());

        // Salvestame kasutajad db
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        //addMovieToUserHistory(user1.getId(), 1L);
        //addMovieToUserHistory(user1.getId(), movieId2);
        //addMovieToUserHistory(user1.getId(), movieId3);


    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with this username: " + username);
        }

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()); // No authorities
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public void addMovieToUserHistory(Long userId, Long movieId) {
        if (userId == null || movieId == null) {
            throw new IllegalArgumentException("User ID and movie ID cannot be null");
        }
        User user = getUserById(userId);

        if (user == null) {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }

        Movie movie = movieService.getMovieById(movieId);

        if (movie != null) {
            System.out.println(movie.getTitle());
            user.getHistory().add(movie);
            System.out.println("k" + user.getHistory());
            userRepository.save(user);
        } else {
            throw new EntityNotFoundException("Movie not found with ID: " + movieId);
        }
    }
}
