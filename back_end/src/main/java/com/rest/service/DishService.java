package com.rest.service;

import java.util.HashMap;

public interface DishService {
    public HashMap<String, Object> getAllDishOfOneRestaurantByEmailAndDishType(HashMap<String, Object> param);

    public HashMap<String, Object> getAllDishOfAllRestaurantByDishType();

    public HashMap<String, Object> getAllDishByRestaurantEmail(HashMap<String, Object> param);

    public HashMap<String, Object> getProfileByDishId(HashMap<String, Object> param);

    public HashMap<String, Object> addNewDish(HashMap<String, Object> param);

    public HashMap<String, Object> updateDishProfileByEmailAndDishId(HashMap<String, Object> param);

    public HashMap<String, Object> deleteDishProfileByEmailAndDishId(HashMap<String, Object> param);
}