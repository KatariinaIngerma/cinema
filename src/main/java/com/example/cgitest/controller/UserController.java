package com.example.cgitest.controller;
import com.example.cgitest.SecurityConfig.ApplicationConfig.JwtProvider;
import com.example.cgitest.Service.UserService;
import com.example.cgitest.Service.UserServiceImplementation;
import com.example.cgitest.model.User;
import com.example.cgitest.repository.UserRepository;
import com.example.cgitest.response.AuthResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserServiceImplementation userService;
    //@Autowired
    //private UserService userService;

    // Tagastaame kõik kasutajad
    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }

    // Tagastame kasutaja emaili põhjal
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Filmi lisamine kasutajale
    @PostMapping("/{userId}/addMovie/{movieId}")
    public void addMovieToUserHistory(@PathVariable Long userId, @PathVariable Long movieId) {
        System.out.println(String.format("Adding movie with %d to user %d history.", movieId, userId));
        userService.addMovieToUserHistory(userId, movieId);
        System.out.println(String.format("Movie with %d added to user %d history.", movieId, userId));
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {
        String email = user.getEmail();
        String password = user.getPassword();

        User isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            throw new Exception("Email Is Already Used With Another Account");

        }
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setHistory(new ArrayList<>());

        User savedUser = userRepository.save(createdUser);
        //userRepository.save(savedUser);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = JwtProvider.generateToken(authentication);


        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println(username+"-------"+password);

        UsernamePasswordAuthenticationToken authentication = authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(null);
        return ResponseEntity.ok("Logout successful");
    }

    // Tagastab kasutaja
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUserEmail(HttpServletRequest request) {
        // Võtame jwt küpsistest
        String jwt = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    jwt = cookie.getValue();
                    System.out.println("extracted cookie"+ jwt);
                    break;
                }
            }
        }

        if (jwt != null) {
            String email = JwtProvider.getEmailFromJwtToken(jwt);

            if (email != null) {
                User user = userRepository.findByEmail(email);
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }



    private UsernamePasswordAuthenticationToken authenticate(String username, String password) {

        System.out.println(username+"---++----"+password);

        UserDetails userDetails = userService.loadUserByUsername(username);

        System.out.println("Sig in in user details"+ userDetails);

        if(userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid username and password");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch"+userDetails);

            throw new BadCredentialsException("Invalid password");

        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }


}
