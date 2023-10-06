package com.example.tripplanner.Services;

import com.example.tripplanner.Models.Trip;
import com.example.tripplanner.Models.User;
import com.example.tripplanner.Repositories.TripRepository;
import com.example.tripplanner.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    private TripRepository tripRepository;

    public UserService(UserRepository userRepository, TripRepository tripRepository) {
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    public User addTripToUser(Long userId, Trip trip) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            trip.setUser(user);
            tripRepository.save(trip);
            user.getTrips().add(trip);
            return userRepository.save(user);
        }
        return null;
    }
}
