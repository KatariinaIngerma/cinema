package com.example.cgitest.Service;

import com.example.cgitest.model.Movie;
import com.example.cgitest.model.User;
import com.example.cgitest.repository.MovieRepository;
import com.example.cgitest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public UserService(UserRepository userRepository, MovieRepository movieRepository) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void addMovieToUserHistory(Long userId, Long movieId) {
        User user = getUserById(userId);

        // lisamine
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + movieId));

        user.getHistory().add(movie);
        userRepository.save(user);
    }

    public User getUserById(Long id){
        return userRepository.getReferenceById(id);
    }
}
