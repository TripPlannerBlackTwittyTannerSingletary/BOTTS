package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthenticationController {
    private UserRepository userDao;

    public AuthenticationController(UserRepository userDao) {
        this.userDao = userDao;
    }

    @GetMapping("/login")
    public String showLoginForm(Model model) {
//        User loggedInUser = userDao.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
//        model.addAttribute("user", loggedInUser);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if ((authentication instanceof AnonymousAuthenticationToken)) {
            return "users/login";
        } else {

            return "redirect:/profile";
        }
    }
}