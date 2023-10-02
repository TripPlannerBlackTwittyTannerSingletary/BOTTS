package com.example.tripplanner.Controllers;

import com.example.tripplanner.Repositories.ActivityRepository;
import com.example.tripplanner.Repositories.TripRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ActivityController {

    private ActivityRepository activityDao;

    private TripRepository tripDao;

    public ActivityController(ActivityRepository activityDao, TripRepository tripDao) {
        this.activityDao = activityDao;
        this.tripDao = tripDao;
    }

//    @GetMapping("/activity")
//    public String showActivityForm() {
//        return "trips/activity";
//    }
//
//    @PostMapping()
//    public String addActivity() {
//        return "user/profile";
//    }
}
