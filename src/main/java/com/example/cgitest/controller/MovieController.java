package com.example.cgitest.controller;

import com.example.cgitest.model.Movie;
import com.example.cgitest.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    /**
     * Tagastab kõik filmid.
     * @return kõikide filmide nimekiri
     */
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }
    /**
     * Filmi otsimine ID järgi.
     * @param id filmi ID
     * @return tagastab filmi.
     */
    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }

    /**
     * Loob uue filmi
     * @param movie loodav film
     * @return loodud film
     */
    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieService.createMovie(movie);
    }
    /**
     * Uuendab olemasolevat filmi.
     * @param id filmi ID, mida uuendatakse
     * @param movie uuendatud filmiandmed
     * @return uuendatud filmiandmed
     */
    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        return movieService.updateMovie(id, movie);
    }
    /**
     * Kustutab filmi ID alusel.
     * @param id kustutatava filmi ID
     */
    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {

        movieService.deleteMovie(id);
    }
}
