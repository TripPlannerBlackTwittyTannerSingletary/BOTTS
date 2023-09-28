package com.example.tripplanner.Controllers;


import com.example.tripplanner.Repositories.UserRepository;
import jakarta.persistence.Column;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {

    private UserRepository userDao;

    public UserController(UserRepository userDao) {
        this.userDao = userDao;
    }

}
