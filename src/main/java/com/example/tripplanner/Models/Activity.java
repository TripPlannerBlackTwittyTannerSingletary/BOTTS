package com.example.tripplanner.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "activitys")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned")
    private long id;

    @Column
    private String name;

    @Column(length = 220)
    private String description;

    @Column
    private double rating;

    @Column(length = 220)
    private String bookingLink;

    @Column(length = 200)
    private String address;

    @Column
    private double latitude;

    @Column
    private double longitude;

    @Column
    private String amadeusApiId;

    // Constructor

    public Activity(long id, String name, String description, double rating, String bookingLink, String address, double latitude, double longitude, String amadeusApiId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.bookingLink = bookingLink;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.amadeusApiId = amadeusApiId;
    }

    public Activity(String name, String description, double rating, String bookingLink, String address, double latitude, double longitude, String amadeusApiId) {
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.bookingLink = bookingLink;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.amadeusApiId = amadeusApiId;
    }

    public Activity() {

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getBookingLink() {
        return bookingLink;
    }

    public void setBookingLink(String bookingLink) {
        this.bookingLink = bookingLink;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getAmadeusApiId() {
        return amadeusApiId;
    }

    public void setAmadeusApiId(String amadeusApiId) {
        this.amadeusApiId = amadeusApiId;
    }
}
