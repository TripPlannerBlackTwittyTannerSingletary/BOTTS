package com.example.tripplanner.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class ApiTestController {

	@GetMapping("/api-test")
	public String showApiTest() {
		return "users/api-test";
	}
}
