package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.TripRepository;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;


@Controller
@RequestMapping("/trip")
public class TripController {
    private final UserRepository userDao;
    private final TripRepository tripDao;

    public TripController(TripRepository tripDao, UserRepository userDao) {
        this.tripDao = tripDao;
        this.userDao = userDao;
    }

    @GetMapping("/create")
    public String showTripCreationForm(Model model) {

        model.addAttribute("trip", new Trip());
        return "users/createTrip"; // Assuming you have a "create" view for trip creation
    }

    @PostMapping("/create")
    public String createTrip(@ModelAttribute Trip trip, Principal principal) {
        // Get the currently logged-in user from Principal
        String username = principal.getName();
        User user = userDao.findByUsername(username);
        // Set the user as the owner of the trip
        trip.setUser(user);
        Trip tripToPost = new Trip(
                trip.getName(),
                trip.getReturnDate(),
                trip.getDepatureDate(),
                trip.getLatitude(),
                trip.getLongitude()
        );


        // Save the trip to the database
        tripDao.save(tripToPost);

        // Redirect to the user's profile page or another appropriate page
        return "redirect:/user/profile"; // Change to the actual profile page URL
    }
}
