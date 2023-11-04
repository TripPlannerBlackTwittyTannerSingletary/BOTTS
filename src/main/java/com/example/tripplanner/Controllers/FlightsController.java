package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.ActivityRepository;
import com.example.tripplanner.Repositories.SearchRepository;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FlightsController {
    UserRepository userDao;
    ActivityRepository activityDao;
    SearchRepository searchDao;

    public FlightsController(UserRepository userDao, ActivityRepository activityDao, SearchRepository searchDao) {
        this.userDao = userDao;
        this.activityDao = activityDao;
        this.searchDao = searchDao;
    }

    @GetMapping("/flights")
    public String landingPage() {
        return "users/flights";
    }

}
