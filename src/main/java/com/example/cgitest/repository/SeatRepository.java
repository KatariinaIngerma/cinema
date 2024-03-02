package com.example.cgitest.repository;

import com.example.cgitest.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    // Add custom query methods if needed
}
