package com.example.tripplanner.Controllers;

import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.stereotype.Controller;

@Controller
public class AboutController {

    private UserRepository userDao;

    public AboutController(UserRepository userDao) {
        this.userDao = userDao;
    }
}


