package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.TripRepository;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    private TripRepository tripsDao;
    private UserRepository usersDao;

    public ProfileController(TripRepository tripsDao, UserRepository usersDao) {
        this.tripsDao = tripsDao;
        this.usersDao = usersDao;
    }

    @GetMapping("")
    public String indexPage(Model model) {
        User loggedInUser = usersDao.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        model.addAttribute("user", loggedInUser);
        return "users/profile";
    }
}
