package com.netflix.movie;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieRepository repository;

    public MovieController(MovieRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));
    }

    @Bean
    public CommandLineRunner init(MovieRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Movie(null, "Inception", "Dreams within dreams",
                        "http://localhost:8080/stream/inception.mp4"));
                repository.save(new Movie(null, "The Matrix", "Red pill or Blue pill",
                        "http://localhost:8080/stream/matrix.mp4"));
                repository.save(new Movie(null, "Interstellar", "Love transcends dimensions",
                        "http://localhost:8080/stream/interstellar.mp4"));
            }
        };
    }
}
