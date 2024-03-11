package com.example.cgitest;

import com.example.cgitest.Service.MovieService;
import com.example.cgitest.model.Movie;
import com.example.cgitest.repository.MovieRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Date;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class MovieServiceTest {

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieService movieService;

    @Test
    public void testGetMovieById() {
        // Arrange
        Long movieId = 1L;
        Movie expectedMovie = new Movie(movieId, "The Shawshank Redemption", "Drama", 200, 18, new Date(), "19:00", "Eesti");
        when(movieRepository.getReferenceById(movieId)).thenReturn(expectedMovie);

        // Act
        Movie actualMovie = movieService.getMovieById(movieId);

        // Assert
        assertEquals(expectedMovie, actualMovie);
    }
}

