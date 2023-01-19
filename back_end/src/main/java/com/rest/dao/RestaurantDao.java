package com.rest.dao;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface RestaurantDao {

    public List<LinkedHashMap<String,Object>> findAllFromAcc();

    public List<LinkedHashMap<String,Object>> findAllFromList();

    // Restaurant
    public List<String> getAllRestaurantType();

    public List<String> getAllFoodType();

    public boolean restEmailIsExist(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getRestaurantList();

    public List<LinkedHashMap<String,Object>> getRestFromListByRestType(HashMap<String, Object> param);

    public List<LinkedHashMap<String,Object>> getPwdByEmail(HashMap<String, Object> param);

    public List<LinkedHashMap<String,Object>> getRestAccSecurityProfileByEmail(HashMap<String, Object> param);

    public List<LinkedHashMap<String,Object>> getRestListProfileByEmail(HashMap<String, Object> param);

    public boolean restPhoneIsExist(HashMap<String, Object> param);

    public void addNewRestAcc(HashMap<String, Object> param);

    public Integer getMaxId();

    public void addNewRestList(HashMap<String, Object> param);

//    public void addNewRestMenu(RestaurantAccount restaurantAccount);

    public void updateRestAccPassword(HashMap<String, Object> param);

    public void updateRestAccSecurityProfile(HashMap<String, Object> param);

    public void updateRestListProfile(HashMap<String, Object> param);

    public List<LinkedHashMap<String,Object>> getAllPhoto();

    public List<LinkedHashMap<String,Object>> getPhoto(HashMap<String, Object> param);

    public void addPhoto(HashMap<String, Object> param);

    public List<LinkedHashMap<String,Object>> filter(HashMap<String, Object> param);
}
