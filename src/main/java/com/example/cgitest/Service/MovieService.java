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
        hardcodedMovies.add(new Movie(1L, "The Shawshank Redemption", "Drama", 70, 18, new Date(), "19:00", "Eesti"));
        hardcodedMovies.add(new Movie(2L, "The Godfather", "Crime", 57, 18, new Date(), "21:00", "Inglise"));
        hardcodedMovies.add(new Movie(3L, "The Dark Knight", "Action", 220, 16, new Date(), "18:30", "Inglise"));
        hardcodedMovies.add(new Movie(4L, "Schindler's List", "Biography", 70, 18, new Date(), "20:30", "Eesti"));
        hardcodedMovies.add(new Movie(5L, "Pulp Fiction", "Crime", 80, 18, new Date(), "22:00", "Inglise"));
        hardcodedMovies.add(new Movie(6L, "Forrest Gump", "Drama", 75, 12, new Date(), "17:45", "Inglise"));
        hardcodedMovies.add(new Movie(7L, "The Matrix", "Action", 66, 16, new Date(), "21:15", "Eesti"));
        hardcodedMovies.add(new Movie(8L, "The Silence of the Lambs", "Thriller", 70, 18, new Date(), "19:30", "Inglise"));
        hardcodedMovies.add(new Movie(9L, "The Lion King", "Animation", 70, 6, new Date(), "14:00", "Eesti"));
        hardcodedMovies.add(new Movie(10L, "The Shawshank Redemption", "Drama", 75, 18, new Date(), "19:00", "Eesti"));
        hardcodedMovies.add(new Movie(11L, "The Godfather", "Crime", 65, 18, new Date(), "21:00", "Inglise"));
        hardcodedMovies.add(new Movie(12L, "The Dark Knight", "Action", 71, 16, new Date(), "18:30", "Inglise"));
        hardcodedMovies.add(new Movie(13L, "Inception", "Sci-Fi", 75, 12, new Date(), "20:45", "Eesti"));
        hardcodedMovies.add(new Movie(14L, "The Shawshank Redemption", "Drama", 70, 18, new Date(), "21:00", "Eesti"));
        hardcodedMovies.add(new Movie(15L, "The Godfather", "Crime", 57, 18, new Date(), "23:00", "Inglise"));
        hardcodedMovies.add(new Movie(16L, "The Dark Knight", "Action", 220, 16, new Date(), "19:30", "Inglise"));

        return hardcodedMovies;
    }



}
