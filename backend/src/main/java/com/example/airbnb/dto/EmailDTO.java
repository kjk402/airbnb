package com.example.airbnb.dto;

public class EmailDTO {

    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "emailDTO{" +
                "email='" + email + '\'' +
                '}';
    }
}

