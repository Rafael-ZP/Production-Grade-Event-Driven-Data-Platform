package com.netflix.movie;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MovieServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner run(MovieRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				repository.save(new Movie(null, "Inception",
						"A thief who steals corporate secrets through the use of dream-sharing technology.",
						"http://localhost:8083/stream/video/inception.mp4"));
				repository.save(new Movie(null, "Interstellar",
						"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
						"http://localhost:8083/stream/video/interstellar.mp4"));
				repository.save(new Movie(null, "The Matrix",
						"A computer hacker learns from mysterious rebels about the true nature of his reality.",
						"http://localhost:8083/stream/video/matrix.mp4"));
			}
		};
	}

}
