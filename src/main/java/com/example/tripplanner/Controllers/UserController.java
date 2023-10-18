package com.example.tripplanner.Controllers;


import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.UserRepository;
import com.example.tripplanner.Services.UserService;
import jakarta.persistence.Column;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
public class UserController {

    private UserRepository userDao;
    private UserService userService;
    private PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    };

    public UserController(UserRepository userDao, UserService userService) {
        this.userDao = userDao;
        this.userService = userService;
    }

    @PostMapping("/save-profile")
    @ResponseBody
    public String userProfile (
            @RequestBody User user
    ) {
        User loggedInUser = userDao.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        loggedInUser.setEmail(user.getEmail());
        loggedInUser.setLocation(user.getLocation());
        System.out.println(loggedInUser.getEmail());
        System.out.println(loggedInUser.getLocation());
        userDao.save(loggedInUser);

        return "user/profile";
    }

}
