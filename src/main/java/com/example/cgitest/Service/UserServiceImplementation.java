package com.example.cgitest.Service;

import com.example.cgitest.model.Movie;
import com.example.cgitest.model.User;
import com.example.cgitest.repository.MovieRepository;
import com.example.cgitest.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public UserServiceImplementation(UserRepository userRepository, MovieRepository movieRepository) {
        this.userRepository=userRepository;
        this.movieRepository = movieRepository;
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

    @Override
    public User findUserProfileByJwt(String jwt) {
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }

    @Override
    public User findUserById(String userId) {
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return null;
    }

    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }


    public void addMovieToUserHistory(Long userId, Long movieId) {
        User user = getUserById(userId);

        // lisamine
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + movieId));

        user.getHistory().add(movie);
        userRepository.save(user);
    }
}
