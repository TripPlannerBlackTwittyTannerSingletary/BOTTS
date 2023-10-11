package com.example.tripplanner.Repositories;

import com.example.tripplanner.Models.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SearchRepository extends JpaRepository<Search, Long> {
    Search findBySearch(String search);
   boolean existsBySearch(String search);
}
