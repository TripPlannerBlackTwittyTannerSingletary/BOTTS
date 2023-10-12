package com.example.tripplanner.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 120, nullable = false)
    private String name;

    @Column
    private Date depatureDate;

    @Column
    private Date returnDate;

    @Column
    private String location;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name ="user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name="trip_activities",
            joinColumns={@JoinColumn(name="trip_id")},
            inverseJoinColumns={@JoinColumn(name="activity_id")}
    )
    private List<Activity> activities = new ArrayList<>();
    // Constructors


    public Trip(String name, Date depatureDate, Date returnDate, String location, User user, List<Activity> activities) {
        this.name = name;
        this.depatureDate = depatureDate;
        this.returnDate = returnDate;
        this.location = location;
        this.user = user;
        this.activities = activities;
    }

    public Trip(long id, String name, Date depatureDate, Date returnDate, String location, User user, List<Activity> activities) {
        this.id = id;
        this.name = name;
        this.depatureDate = depatureDate;
        this.returnDate = returnDate;
        this.location = location;
        this.user = user;
        this.activities = activities;
    }

    public Trip(long id, String name, Date depatureDate, Date returnDate, String location, User user) {
        this.id = id;
        this.name = name;
        this.depatureDate = depatureDate;
        this.returnDate = returnDate;
        this.location = location;
        this.user = user;
    }

    public Trip(String name, Date depatureDate, Date returnDate, String location, User user) {
        this.name = name;
        this.depatureDate = depatureDate;
        this.returnDate = returnDate;
        this.location = location;
        this.user = user;
    }

    public Trip() {

    }

    public Trip(String name, Date returnDate, Date depatureDate, double latitude, double longitude) {
    }




    // Getters and Setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDepatureDate() {
        return depatureDate;
    }

    public void setDepatureDate(Date depatureDate) {
        this.depatureDate = depatureDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Trip(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public void addActivity(Activity activity) {
        this.activities.add(activity);
    }
}
