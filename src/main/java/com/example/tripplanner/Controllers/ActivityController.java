package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.Activity;
import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Repositories.ActivityRepository;
import com.example.tripplanner.Repositories.TripRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/api/activities")
public class ActivityController {

    private ActivityRepository activityRepository;

    private TripRepository tripRepository;

    public ActivityController(ActivityRepository activityDao, TripRepository tripDao) {
        this.activityRepository = activityDao;
        this.tripRepository = tripDao;
    }

    @PostMapping("/addActivity/{activityApiId}")
//    public ResponseEntity<String> addActivityToTrip(@RequestParam Long tripId, @RequestParam Long activityId) {
    public ResponseEntity<String> addActivityToTrip(@RequestBody Trip inputtedTrip, @PathVariable String activityApiId) {
        Trip trip = tripRepository.findById(inputtedTrip.getId()).get();
        Activity activity = activityRepository.findAllByAmadeusApiId(activityApiId).get(0);

        try {
            // Retrieve the Trip and Activity objects from the database using the IDs
//            Trip trip = tripRepository.findById(tripId).orElse(null);
//            Activity activity = activityRepository.findById(String.valueOf(activityId)).orElse(null);

            // Check if both Trip and Activity objects exist
            if (trip != null && activity != null) {
                // Add the activity to the trip and save the updated trip to the database
                trip.addActivity(activity);
                tripRepository.save(trip);
                return ResponseEntity.ok("Activity added to the trip successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trip or Activity not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding activity to the trip");
        }
    }

}
