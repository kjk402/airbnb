package com.example.airbnb.dto;

import java.time.LocalDate;

public class ReservationList {

    private Long reservationId;
    private String userId;
    private String city;
    private Long roomId;
    private String title;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private int totalPrice;
    private int numberOfGuest;
    private String thumbImage;


    public ReservationList(Long reservationId, String userId, String city,Long roomId, String title, LocalDate checkIn, LocalDate checkOut, int totalPrice, int numberOfGuest,String thumbImage) {
        this.reservationId = reservationId;
        this.userId = userId;
        this.roomId = roomId;
        this.title = title;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.totalPrice = totalPrice;
        this.numberOfGuest = numberOfGuest;
        this.city = city;
        this.thumbImage = thumbImage;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public String getUserId() {
        return userId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public String getTitle() {
        return title;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public int getNumberOfGuest() {
        return numberOfGuest;
    }

    public String getCity() {
        return city;
    }

    public String getThumbImage() {
        return thumbImage;
    }
}
