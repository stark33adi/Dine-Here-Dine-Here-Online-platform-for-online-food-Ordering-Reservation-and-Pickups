package com.rest.model;

public class Reservation {
    private Integer reservationId;
    private String customerEmail;
    private String restaurantEmail;
    private Integer reservationState;
    private String reservationTime;
    private String note;
    private String genDate;

    public Reservation(Integer reservationId, String customerEmail, String restaurantEmail, Integer reservationState, String reservationTime, String note, String genDate) {
        this.reservationId = reservationId;
        this.customerEmail = customerEmail;
        this.restaurantEmail = restaurantEmail;
        this.reservationState = reservationState;
        this.reservationTime = reservationTime;
        this.note = note;
        this.genDate = genDate;
    }

    public Integer getReservationId() {
        return reservationId;
    }

    public void setReservationId(Integer reservationId) {
        this.reservationId = reservationId;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getRestaurantEmail() {
        return restaurantEmail;
    }

    public void setRestaurantEmail(String restaurantEmail) {
        this.restaurantEmail = restaurantEmail;
    }

    public Integer getReservationState() {
        return reservationState;
    }

    public void setReservationState(Integer reservationState) {
        this.reservationState = reservationState;
    }

    public String getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(String reservationTime) {
        this.reservationTime = reservationTime;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getGenDate() {
        return genDate;
    }

    public void setGenDate(String genDate) {
        this.genDate = genDate;
    }

    @Override
    public String toString() {
        return "Reservation{" + "reservationId=" + reservationId + ", customerEmail='" + customerEmail + '\'' + ", restaurantEmail='" + restaurantEmail + '\'' + ", reservationState=" + reservationState + ", reservationTime='" + reservationTime + '\'' + ", note='" + note + '\'' + ", genDate='" + genDate + '\'' + '}';
    }
}


