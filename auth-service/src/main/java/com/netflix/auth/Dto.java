package com.netflix.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
class AuthRequest {
    private String email;
    private String password;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private int allowedMovies;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class AuthResponse {
    private String token;
}
