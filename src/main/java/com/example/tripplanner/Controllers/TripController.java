package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Repositories.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trips")
public class TripController {


    private TripRepository tripRepository;

    public TripController(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    @PostMapping("/createTrip")
    public ResponseEntity<String> createTrip(@RequestBody Trip trip) {
        try {
            // Perform data validation and save the trip to the database
            tripRepository.save(trip);
            return ResponseEntity.ok("Trip signed up successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error signing up for the trip");
        }
    }
}
//    @GetMapping("/trip")
//    public String showTrips() {
//        return "user/profile";
//    }
//
//    @PostMapping()
//    public String addTrip() {
//        return "user/profile";
//    }