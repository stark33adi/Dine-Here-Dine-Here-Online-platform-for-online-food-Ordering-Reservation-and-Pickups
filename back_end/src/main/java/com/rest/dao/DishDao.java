package com.rest.dao;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface DishDao {
    public List<String> getAllDishTypeByEmail(HashMap<String, Object> param);

    public List<String> getAllDishType();

    public List<LinkedHashMap<String, Object>> getDishProfileByEmailAndDishType(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getDishProfileByDishType(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getDishProfileByRestaurantEmail(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getProfileByDishId(HashMap<String, Object> param);

    public boolean dishIsExist(HashMap<String, Object> param);

    public void addNewDish(HashMap<String, Object> param);

    public void updateDishProfileByEmailAndDishId(HashMap<String, Object> param);

    public void deleteDishProfileByEmailAndDishId(HashMap<String, Object> param);
}
