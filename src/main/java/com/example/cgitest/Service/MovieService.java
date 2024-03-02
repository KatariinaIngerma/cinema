package com.example.cgitest.Service;

import com.example.cgitest.model.Movie;
import com.example.cgitest.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        List<Movie> movies = new ArrayList<>();

        // Hardcoded movie data
        Movie movie1 = new Movie(1L, "The Shawshank Redemption", "Drama", 200, 18, new Date(), "19:00");
        Movie movie2 = new Movie(2L, "The Godfather", "Crime", 180, 18, new Date(), "21:00");
        Movie movie3 = new Movie(3L, "The Dark Knight", "Action", 220, 16, new Date(), "18:30");
        // Add more movies as needed

        // Add movies to the list
        movies.add(movie1);
        movies.add(movie2);
        movies.add(movie3);
        // Add more movies as needed

        return movies;
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }
    public Movie updateMovie(Long id, Movie movieDetails) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));

        movie.setTitle(movieDetails.getTitle());
        movie.setGenre(movieDetails.getGenre());
        movie.setAgeRating(movieDetails.getAgeRating());

        return movieRepository.save(movie);
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    public Movie getMovieById(Long id) {
        return movieRepository.getReferenceById(id);
    }
}
