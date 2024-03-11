package com.example.cgitest.Service;

import com.example.cgitest.model.Movie;
import com.example.cgitest.repository.MovieRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Transactional
@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @PostConstruct
    public void initialize() {
        addHardcodedMoviesToDatabase();
    }

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with ID: " + id));
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie updateMovie(Long id, Movie movieDetails) {
        Movie movie = getMovieById(id);

        movie.setTitle(movieDetails.getTitle());
        movie.setGenre(movieDetails.getGenre());
        movie.setAgeRating(movieDetails.getAgeRating());

        return movieRepository.save(movie);
    }

    // Filmide liamine andmebaasi
    public void addHardcodedMoviesToDatabase() {
        List<Movie> hardcodedMovies = getHardcodedMovies();
        for (Movie movie : hardcodedMovies) {
            createMovie(movie);
        }
    }
    // Hardcoded filmid
    public List<Movie> getHardcodedMovies() {
        List<Movie> hardcodedMovies = new ArrayList<>();

        hardcodedMovies.add(new Movie(1L, "The Shawshank Redemption", "Drama", 200, 18, new Date(), "19:00", "Eesti"));
        hardcodedMovies.add(new Movie(2L, "The Godfather", "Crime", 180, 18, new Date(), "21:00", "Inglise"));
        hardcodedMovies.add(new Movie(3L, "The Dark Knight", "Action", 220, 16, new Date(), "18:30", "Inglise"));

        return hardcodedMovies;
    }



}
