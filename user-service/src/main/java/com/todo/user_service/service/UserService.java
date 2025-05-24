package com.todo.user_service.service;

import com.todo.user_service.model.User;
import com.todo.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User save(User user) {
    if (repository.findByEmail(user.getEmail()).isPresent()) {
        throw new RuntimeException("Email already exists");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return repository.save(user);
}

    public List<User> getAll() {
        return repository.findAll();
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }
}