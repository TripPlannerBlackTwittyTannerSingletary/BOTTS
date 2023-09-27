package com.example.tripplanner.Models;


import jakarta.persistence.*;

import java.util.Date;

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
    private double latitude;

    @Column
    private double longitude;

    @ManyToOne
    @JoinColumn(name ="user_id")
    private User user;


    // Constructors

    public Trip(long id, String name, Date depatureDate, Date returnDate, double latitude, double longitude, User user) {
        this.id = id;
        this.name = name;
        this.depatureDate = depatureDate;
        this.returnDate = returnDate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.user = user;
    }

    public Trip(String name, Date depatureDate, Date returnDate, double latitude, double longitude, User user) {
        this.name = name;
        this.depatureDate = depatureDate;
        this.returnDate = returnDate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.user = user;
    }

    public Trip() {

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

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
