package com.example.tripplanner.Controllers;

import com.example.tripplanner.Repositories.TripRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    private TripRepository tripsDao;
    @GetMapping("")
    public String indexPage(Model model) {
//        model.addAttribute("trips", tripsDao.findAll());
        return "users/profile";
    }
}
