package com.rest.test;

import com.rest.dao.DishDao;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringDishTest {

    @Autowired
    private DishDao dishDao;

    @Test
    public void testGetAllDishOfOneRestaurant() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("restaurantEmail", "cdougane@hibu.com");
        List<String> dishType = dishDao.getAllDishTypeByEmail(param);
        HashMap<String, Object> result = HMUtil.getItemsByDishType(dishDao, dishType, param);
        System.out.println("result: " + result);
    }

    @Test
    public void testGetAllDishTypeByEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("restaurantEmail", "cdougane@hibu.com");
        List<String> dishType = dishDao.getAllDishTypeByEmail(param);
        for (String i : dishType) {
            System.out.println(i);
        }
    }

    @Test
    public void testGetAllDishType() {
        List<String> dishType = dishDao.getAllDishType();
        for (String i : dishType) {
            System.out.println(i);
        }
    }

    @Test
    public void testGetDishProfileByEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("restaurantEmail", "1@gmail.com");
        param.put("dishType", "maincourse");
        List<LinkedHashMap<String, Object>> map = dishDao.getDishProfileByEmailAndDishType(param);
        System.out.println("dish: "+map);
    }

    @Test
    public void testDishIsExist() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("restaurantEmail", "2@gmail.com");
        param.put("dishName", "big pizza");
        param.put("dishPrice", "8.00");
        param.put("dishPhoto", "base64 photo");
        boolean result = dishDao.dishIsExist(param);
        System.out.println("result:"+result);
    }

    @Test
    public void testAddNewDish() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        String date = DatetimeUtil.getCurrentDate();
        param.put("restaurantEmail", "2@gmail.com");
        param.put("dishType", "slides");
        param.put("dishName", "big pizza");
        param.put("dishPrice", "38.02");
        param.put("dishPhoto", "base64 photo");
        param.put("regDate", date);
//        System.out.println("param: "+param);
        dishDao.addNewDish(param);
    }

    @Test
    public void testUpdateDishProfileByEmailAndDishId() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        String date = DatetimeUtil.getCurrentDate();
        param.put("dishId", "7");
        param.put("restaurantEmail", "2@gmail.com");
        param.put("dishType", "beverage");
        param.put("dishName", "grape juice");
        param.put("dishPrice", "44.00");
        param.put("dishPhoto", "base64 photo");
        param.put("genDate", date);
//        System.out.println("param: "+param);
        dishDao.updateDishProfileByEmailAndDishId(param);
    }

    @Test
    public void testDeleteDishProfileByEmailAndDishId() {
        HashMap<String, Object> params = new HashMap<String, Object>();
        String date = DatetimeUtil.getCurrentDate();
        params.put("dishId", "8");
        params.put("restaurantEmail", "2@gmail.com");
//        System.out.println("params: "+params);
        dishDao.deleteDishProfileByEmailAndDishId(params);
    }
}
