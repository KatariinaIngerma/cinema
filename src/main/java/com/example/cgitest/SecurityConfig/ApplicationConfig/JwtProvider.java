package com.example.cgitest.SecurityConfig.ApplicationConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
//  https://www.geeksforgeeks.org/spring-security-login-page-with-react/
public class JwtProvider {
    static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
    /**
     * Genereerib JWT tokeni autentimise objekti põhjal.
     * @param auth autentimise objekt
     * @return genereeritud JWT token
     */
    public static String generateToken(Authentication auth) {
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);
        @SuppressWarnings("deprecation")
        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+86400000))
                .claim("email", auth.getName())
                .claim( "authorities",roles)
                .signWith(key)
                .compact();
        System.out.println("Token for parsing in JwtProvider: " + jwt);
        return jwt;

    }

    private static String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auths = new HashSet<>();
        for(GrantedAuthority authority: authorities) {
            auths.add(authority.getAuthority());
        }
        return String.join(",",auths);
    }

    /**
     * Võtab JWT tokenist emaili.
     * @param jwt JWT token
     * @return saadud e-posti aadress
     */
    @SuppressWarnings("deprecation")
    public static String getEmailFromJwtToken(String jwt) {
        // Remove "Bearer " prefix if present
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }
        try {
            // Parse the JWT token and extract the claims
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

            // Extract email claim from the claims map
            String email = (String) claims.get("email");
            System.out.println("Email extracted from JWT: " + email);
            return email;
        } catch (JwtException e) {
            // Handle JWT parsing exceptions
            System.err.println("Error extracting email from JWT: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

}
