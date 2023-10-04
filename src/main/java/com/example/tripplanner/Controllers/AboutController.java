package com.example.tripplanner.Controllers;

import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AboutController {

    @GetMapping("/About")
    public String aboutPage() {
        return "About";
    }

}


