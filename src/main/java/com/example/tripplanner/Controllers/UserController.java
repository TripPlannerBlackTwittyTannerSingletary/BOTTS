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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private UserRepository userDao;

    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    ;


    public UserController(UserRepository userDao) {
        this.userDao = userDao;
    }

    @GetMapping("user/edit")
    public String editUser(@PathVariable long id, Model model) {
        User userToEdit = userDao.findById(id).get();
        model.addAttribute("user", userToEdit);
        return "user/edit";
    }

    @PostMapping("/user/edit")
    public String insertEdit(@ModelAttribute User user, @PathVariable long id) {
        User userToEdit = userDao.findById(id).get();
        userToEdit.setEmail(user.getEmail());
        userToEdit.setLocation(user.getLocation());
        userDao.save(userToEdit);
        return "redirect:/user/profile";
    }
}
