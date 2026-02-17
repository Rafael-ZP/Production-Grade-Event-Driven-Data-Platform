package com.netflix.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtService;

    public String saveUser(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAllowedMovies(request.getAllowedMovies() > 0 ? request.getAllowedMovies() : 1);
        repository.save(user);
        return "User added to the system";
    }

    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token, jwtService.extractUsername(token));
    }

    public User validateUser(AuthRequest request) {
        Optional<User> user = repository.findByEmail(request.getEmail());
        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return user.get();
        }
        throw new RuntimeException("Invalid Access");
    }
}
