package com.example.cgitest;

import com.example.cgitest.Service.MovieService;
import com.example.cgitest.Service.UserServiceImplementation;
import com.example.cgitest.model.Movie;
import com.example.cgitest.model.User;
import com.example.cgitest.repository.MovieRepository;
import com.example.cgitest.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplementationTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private MovieRepository movieRepository;


    @InjectMocks
    private UserServiceImplementation userService;


    @Test(expected = IllegalArgumentException.class)
    public void testAddMovieToUserHistory_NullUserId() {
        // Arrange
        Long movieId = 1L;

        // Act
        userService.addMovieToUserHistory(null, movieId);

    }

    @Test(expected = IllegalArgumentException.class)
    public void testAddMovieToUserHistory_NullMovieId() {
        // Arrange
        Long userId = 1L;

        // Act
        userService.addMovieToUserHistory(userId, null);
    }

    @Test(expected = EntityNotFoundException.class)
    public void testAddMovieToUserHistory_UserNotFound() {
        // Arrange
        Long userId = 1L;
        Long movieId = 1L;

        when(userRepository.getReferenceById(userId)).thenReturn(null);

        // Act
        userService.addMovieToUserHistory(userId, movieId);

    }

}
