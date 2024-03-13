package com.example.cgitest.Service;

import com.example.cgitest.model.Movie;
import com.example.cgitest.model.User;
import com.example.cgitest.repository.MovieRepository;
import com.example.cgitest.repository.UserRepository;
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
    /**
     * Laeb kasutaja andmetega kasutaja andmebaasist.
     * @param username kasutajanimi
     * @return vastav kasutaja
     * @throws UsernameNotFoundException kui kasutajat ei leitud
     */
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
    /**
     * Tagastab kõik kasutajad.
     * @return kõikide kasutajate nimekiri
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Tagastab kasutaja ID alusel.
     * @param id kasutaja ID
     * @return vastav kasutaja
     */
    public User getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }
    /**
     * Lisab filmi kasutaja ajalukku.
     * @param userId kasutaja ID
     * @param movieId filmi ID
     * @throws IllegalArgumentException kui kasutaja ID või filmi ID on null
     * @throws EntityNotFoundException kui kasutajat või filmi ei leitud vastavate ID-dega
     */
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
