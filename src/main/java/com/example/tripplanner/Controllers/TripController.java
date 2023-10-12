package com.example.tripplanner.Controllers;

import com.example.tripplanner.Repositories.TripRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class TripController {
	private TripRepository tripRepository;

	public TripController(TripRepository tripRepository) {
		this.tripRepository = tripRepository;
	}

	@GetMapping("/trips/{id}")
	public String showTripPage(@PathVariable long id, Model model ) {
		model.addAttribute("trip", tripRepository.findById(id).get());
		return "users/see-more";
	}


}
