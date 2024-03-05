package com.example.cgitest.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_movie_history",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_id"),
            foreignKey = @ForeignKey(name = "fk_user_movie_history_user"),
            inverseForeignKey = @ForeignKey(name = "fk_user_movie_history_movie")
    )
    private List<Movie> history;

    public User(Long id, String email, String password, List<Movie> history) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.history = history;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String userName) {
        this.email = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Movie> getHistory() {
        return history;
    }

    public void setHistory(List<Movie> history) {
        this.history = history;
    }
}
