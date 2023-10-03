package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
public class ApiTestController {

	UserRepository userDao;

	public ApiTestController(UserRepository userDao) {
		this.userDao = userDao;
	}

	@GetMapping("/api-test")
	public String showApiTest() {
		return "users/api-test";
	}

	@GetMapping("/api/users")
	@ResponseBody
	public List<User> getAllUsers() {
		return userDao.findAll();
	}
}
