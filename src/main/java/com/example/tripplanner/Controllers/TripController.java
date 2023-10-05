package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.TripRepository;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trips")
public class TripController {


    private TripRepository tripRepository;
    private UserRepository userRepository;

    public TripController(TripRepository tripRepository, UserRepository userRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/createTrip")
    public ResponseEntity<String> createTrip(@CurrentSecurityContext(expression = "authentication?.name") String username , @RequestBody Trip trip) {
        User user = userRepository.findByUsername(username);
        try {
            // Perform data validation and save the trip to the database
            trip.setUser(user);
            tripRepository.save(trip);
            return ResponseEntity.ok("Trip signed up successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error signing up for the trip");
        }
    }
}
