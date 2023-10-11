package com.example.tripplanner.Repositories;

import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByUser(User user);
}
