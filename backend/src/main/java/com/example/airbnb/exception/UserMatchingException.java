package com.example.airbnb.exception;

public class UserMatchingException extends RuntimeException{
    public UserMatchingException() {
    }

    public UserMatchingException(String message) {
        super(message);
    }

}
