package com.example.tripplanner.Models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "searches")
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned")
    private long id;

    @Column
    private String search;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name="search_activities",
            joinColumns={@JoinColumn(name="search_id")},
            inverseJoinColumns={@JoinColumn(name="activity_id")}
    )
    private List<Activity> activities;
}

