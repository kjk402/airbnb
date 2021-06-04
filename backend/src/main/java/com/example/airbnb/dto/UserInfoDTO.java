package com.example.airbnb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserInfoDTO {

    @JsonProperty("login")
    private String userId;
    private String name;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "UserInfoDTO{" +
                "login='" + userId + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
