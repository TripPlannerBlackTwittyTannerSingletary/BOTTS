package com.example.tripplanner.Controllers;

import com.example.tripplanner.Repositories.TripRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

public class TripController {
    private TripRepository tripDao;

    public TripController(TripRepository tripDao) {
        this.tripDao = tripDao;
    }
    @GetMapping("/trip")
    public String showTrips() {
        return "user/profile";
    }

    @PostMapping()
    public String addTrip() {
        return "user/profile";
    }

}
