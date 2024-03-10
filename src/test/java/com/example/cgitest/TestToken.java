package com.example.cgitest;

import com.example.cgitest.SecurityConfig.ApplicationConfig.JwtProvider;

public class TestToken {

    public static void main(String[] args) {
        // Näidis token
        String jwtToken = "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTAwOTI0NjYsImV4cCI6MTcxMDE3ODg2NiwiZW1haWwiOiJrYXRhcmlpbmEuaW5nZXJtYUB1dC5lZSIsImF1dGhvcml0aWVzIjoiIn0.qkIfZcdPF7j6g276UpJyUxflJdThvOqkvLOJEwv2jnlDqQzvmyuZZLQFM68kK8A0";

        // Kutsume meetodi välja, et saada toeknist kätte kasutaja email
        String extractedEmail = JwtProvider.getEmailFromJwtToken(jwtToken);

        System.out.println("Extracted Email: " + extractedEmail);
    }
}

