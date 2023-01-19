package com.rest.service;

import java.util.HashMap;

public interface ReservationService {

    public HashMap<String, Object> getAllReservationOfOneCustomer(HashMap<String, Object> param);

    public HashMap<String, Object> getAllReservationOfOneRestaurant(HashMap<String, Object> param);

    public HashMap<String, Object> applyReservation(HashMap<String, Object> param);

    public HashMap<String, Object> confirmReservation(HashMap<String, Object> param);

    public HashMap<String, Object> cancelReservation(HashMap<String, Object> param);
}
