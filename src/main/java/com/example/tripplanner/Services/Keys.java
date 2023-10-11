package com.example.tripplanner.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class Keys {
    @Value("${api.key.one}")
    private String API_KEY_ONE;


    public String getAPI_KEY_ONE() {
        return API_KEY_ONE;
    }

    public void setAPI_KEY_ONE(String API_KEY_ONE) {
        this.API_KEY_ONE = API_KEY_ONE;
    }

}
