package com.todo.user_service.controller;

import com.todo.user_service.model.User;
import com.todo.user_service.service.JwtService;
import com.todo.user_service.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.AuthenticationException;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {
    try {
        service.save(user); // on sauvegarde l'utilisateur

        String token = jwtService.generateToken(user.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));

    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
    try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
    } catch (AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    String token = jwtService.generateToken(authRequest.getUsername());
    return ResponseEntity.ok(new AuthResponse(token));
}

    @GetMapping
    public List<User> getAllUsers() {
        return service.getAll();
    }
}

@Data
class AuthRequest {
    private String username;
    private String password;
}

@Data
class AuthResponse {
    private final String token;
}