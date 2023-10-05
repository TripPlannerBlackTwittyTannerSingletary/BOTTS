package com.example.tripplanner.Repositories;

import com.example.tripplanner.Models.Search;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRepository extends JpaRepository<Search, Long> {
//   Search findbySearch(String search);
}
