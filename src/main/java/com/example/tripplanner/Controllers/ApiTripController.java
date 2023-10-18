package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.TripRepository;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class ApiTripController {


    private TripRepository tripRepository;
    private UserRepository userRepository;

    public ApiTripController(TripRepository tripRepository, UserRepository userRepository) {
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

    @DeleteMapping("/deleteTrip{tripId}")
    public ResponseEntity<String> deleteTrip(@CurrentSecurityContext(expression = "authentication?.name") String username , @PathVariable String tripId) {
        User user = userRepository.findByUsername(username);
        try {
            System.out.println(user);
            tripRepository.deleteById(Long.valueOf(tripId));
            return ResponseEntity.ok("Trip deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting the trip");
        }
    }


    @GetMapping("/trips")
    public ResponseEntity<List<Trip>> getUserTrips(@CurrentSecurityContext(expression = "authentication?.name") String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        List<Trip> userTrips = tripRepository.findByUser(user);
        if (userTrips.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userTrips);
        } else {
            return ResponseEntity.ok(userTrips);
        }
    }

}
