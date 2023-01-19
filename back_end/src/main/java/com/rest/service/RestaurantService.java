package com.rest.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface RestaurantService {

    public HashMap<String, Object> login(HashMap<String, Object> param);

    public HashMap<String, Object> phoneIsExist(HashMap<String, Object> param);

    public HashMap<String, Object> addNewRestaurant(HashMap<String, Object> param);

    public HashMap<String, Object> checkForgetPassword(HashMap<String, Object> param);

    public HashMap<String, Object> getAllRest(HashMap<String, Object> param);

    public HashMap<String, Object> getRestaurantList();

    public HashMap<String, Object> getSecurityProfileByEmail(HashMap<String, Object> param);

    public HashMap<String, Object> getProfileByEmail(HashMap<String, Object> param);

    public HashMap<String, Object> updatePassword(HashMap<String, Object> param);

    public HashMap<String, Object> updateSecurityProfile(HashMap<String, Object> param);

    public HashMap<String, Object> updateProfile(HashMap<String, Object> param);

    public HashMap<String, Object> getPhoto(HashMap<String, Object> param);

    public HashMap<String, Object> addPhoto(HashMap<String, Object> param);

    public HashMap<String, Object> filter(List<String> restaurantTypeFilter, String rateValueFilter, String deliveryTimeFilter, String foodTypeFilter);
}
