package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.Activity;
import com.example.tripplanner.Models.Search;
import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.ActivityRepository;
import com.example.tripplanner.Repositories.SearchRepository;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ApiTestController {

	UserRepository userDao;
	ActivityRepository activityDao;

	SearchRepository searchDao;

	public ApiTestController(UserRepository userDao, ActivityRepository activityDao, SearchRepository searchDao) {
		this.userDao = userDao;
		this.activityDao = activityDao;
		this.searchDao = searchDao;
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

	@GetMapping("/api/activities")
	@ResponseBody
	public List<Activity> getAllActivities() {
		return activityDao.findAll();
	}

	@GetMapping("/api/search")
	@ResponseBody
	public List<Search> getAllSearches() {
		return searchDao.findAll();
	}
	@PostMapping("/api/test")
	public Search saveSearch(@RequestBody Search searchObject){
		System.out.println(searchObject);
		return searchDao.save(searchObject);
	}
}
