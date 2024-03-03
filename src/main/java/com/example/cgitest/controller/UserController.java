
package com.example.cgitest.controller;

import com.example.cgitest.Service.UserService;
import com.example.cgitest.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Get User by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    // Add movie to User's history
    @PostMapping("/{userId}/addMovie/{movieId}")
    public void addMovieToUserHistory(@PathVariable Long userId, @PathVariable Long movieId) {
        userService.addMovieToUserHistory(userId, movieId);
    }
}
