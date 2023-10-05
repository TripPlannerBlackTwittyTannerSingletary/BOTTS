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

    @Column(unique = true)
    private String search;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name="search_activities",
            joinColumns={@JoinColumn(name="search_id")},
            inverseJoinColumns={@JoinColumn(name="activity_id")}
    )
    private List<Activity> activities;

    public Search() {
    }

    public Search(long id, String search, List<Activity> activities) {
        this.id = id;
        this.search = search;
        this.activities = activities;
    }

    public Search(String search, List<Activity> activities) {
        this.search = search;
        this.activities = activities;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }
}

