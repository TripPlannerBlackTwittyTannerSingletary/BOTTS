package com.example.tripplanner.Controllers;


import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.UserRepository;
import jakarta.persistence.Column;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private UserRepository userDao;
    private PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    };



    public UserController(UserRepository userDao) {
        this.userDao = userDao;
    }


    @PostMapping("/sign-up")
    public String saveUser(@ModelAttribute User user){
        String hash = passwordEncoder().encode(user.getPassword());
        user.setPassword(hash);
        userDao.save(user);
        return "redirect:/login";
    }


}
