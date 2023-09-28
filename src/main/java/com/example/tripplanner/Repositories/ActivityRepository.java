package com.example.tripplanner.Repositories;

import com.example.tripplanner.Models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, String> {

}
