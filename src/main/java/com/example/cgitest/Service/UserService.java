package com.example.cgitest.Service;

import com.example.cgitest.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

public interface UserService {

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    public List<User> getAllUsers();

    User getUserById(Long id);

    void addMovieToUserHistory(Long userId, Long movieId);
}
