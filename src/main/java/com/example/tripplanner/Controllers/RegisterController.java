package com.example.tripplanner.Controllers;


import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class RegisterController {

    UserRepository usersDao;

    public RegisterController(UserRepository usersDao) {
        this.usersDao = usersDao;
    }

    @GetMapping("/register")
    public String showSignupForm(Model model) {
        model.addAttribute("user", new User());
        return "users/register";
    }

    @PostMapping("/register")
    public String createPost(@ModelAttribute User user) {

        User userToAdd = new User(
                user.getEmail(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getPassword(),
                user.getLatitude(),
                user.getLongitude()
        );
        usersDao.save(userToAdd);
//        emailSvc.prepareAndSend(post, "You have created an Ad", "Here is information regarding your ad");
        return "redirect:/profile";
    }

}
