package com.example.tripplanner.Models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "int unsigned")
    private long id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String password;
    @Column
    private double latitude;
    @Column
    private double longitude;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "user")
    private List<Trip> trips;

    public User() {
    }
    public User(User copy) {
        id = copy.id; // This line is SUPER important! Many things won't work if it's absent
        email = copy.email;
        username = copy.username;
        password = copy.password;
        trips = copy.trips;
    }
    public User(String username, String email, String password, List<Trip> trips) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.trips = trips;
    }

    public User(long id, String username, String email, String password, List<Trip> trips) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.trips = trips;
    }

    public User(long id, String email, String username, String firstName, String lastName, String password, double latitude, double longitude, List<Trip> trips) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.latitude = latitude;
        this.longitude = longitude;
        this.trips = trips;
    }

    public User(String email, String username, String firstName, String lastName, String password, double latitude, double longitude, List<Trip> trips) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.latitude = latitude;
        this.longitude = longitude;
        this.trips = trips;
    }

    public User(String email, String username, String firstName, String lastName, String password, double latitude, double longitude) {
        this.email = email;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public List<Trip> getTrips() {
        return trips;
    }

    public void setTrips(List<Trip> trips) {
        this.trips = trips;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
