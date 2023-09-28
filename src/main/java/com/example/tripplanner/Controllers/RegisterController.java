package com.example.tripplanner.Controllers;


import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller

public class RegisterController {

    UserRepository usersDao;
    private PasswordEncoder passwordEncoder;

    public RegisterController(UserRepository usersDao, PasswordEncoder passwordEncoder) {
        this.usersDao = usersDao;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/register")
    public String showSignupForm(Model model) {
        model.addAttribute("user", new User());
        return "users/register";
    }

    @PostMapping("/register")
    public String createPost(@ModelAttribute User user) {
        String hash = passwordEncoder.encode(user.getPassword());
        User userToAdd = new User(
                user.getEmail(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                hash,
                user.getLatitude(),
                user.getLongitude()
        );
        usersDao.save(userToAdd);
//        emailSvc.prepareAndSend(post, "You have created an Ad", "Here is information regarding your ad");
        return "redirect:/profile";
    }

}
