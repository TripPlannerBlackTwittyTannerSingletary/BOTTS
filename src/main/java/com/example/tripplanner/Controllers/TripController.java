package com.example.tripplanner.Controllers;

import com.example.tripplanner.Repositories.TripRepository;

public class TripController {
    private TripRepository tripDao;

    public TripController(TripRepository tripDao) {
        this.tripDao = tripDao;
    }


}
