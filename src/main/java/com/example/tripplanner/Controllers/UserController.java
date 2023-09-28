package com.example.tripplanner.Controllers;


import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.UserRepository;
import jakarta.persistence.Column;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    private UserRepository userDao;


    public UserController(UserRepository userDao) {
        this.userDao = userDao;
    }


}
