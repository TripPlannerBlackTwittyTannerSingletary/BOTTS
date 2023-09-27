package com.example.tripplanner.Repositories;

import com.example.tripplanner.Models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {

}
