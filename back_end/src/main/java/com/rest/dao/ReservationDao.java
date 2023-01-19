package com.rest.dao;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface ReservationDao {

//    With Time Interval
    public List<LinkedHashMap<String, Object>> getActiveReservationByCustomerEmail(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getInactiveReservationByCustomerEmail(HashMap<String, Object> param);

//    Without Time Interval
    public List<LinkedHashMap<String, Object>> getReservationByCustomerEmail(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getReservationByRestaurantEmail(HashMap<String, Object> param);

    public void addNewReservation(HashMap<String, Object> param);

    public void updateReservation(HashMap<String, Object> param);

    public void deleteReservation(HashMap<String, Object> param);
}
