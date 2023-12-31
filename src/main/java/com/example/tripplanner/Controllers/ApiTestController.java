package com.example.tripplanner.Controllers;

import com.example.tripplanner.Models.Activity;
import com.example.tripplanner.Models.Search;
import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.ActivityRepository;
import com.example.tripplanner.Repositories.SearchRepository;
import com.example.tripplanner.Repositories.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
	public String showApiTest(Model model) {
		User loggedInUser = userDao.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		model.addAttribute("user", loggedInUser);
		return "users/activities";
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
	@PostMapping("/api/search")
	@ResponseBody
	public List<Activity> getAllSearches(@RequestBody Search searchObject) {
		System.out.println("inside getAllSearches");
		if(searchDao.existsBySearch(searchObject.getSearch())) {
			Search serverResult =searchDao.findBySearch(searchObject.getSearch());
			return serverResult.getActivities();

		}
		else {
			return new ArrayList<>();
		}
	}
	@PostMapping("/api/test")
	@ResponseBody
	public Search saveSearch(@RequestBody Search searchObject) throws JsonProcessingException {
		searchDao.save(searchObject);
		return searchObject;
	}
}
