package com.rest.test.serviceTest;

import com.rest.service.DishService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringDishServiceTest {

    @Autowired
    private DishService dishService;

    @Test
    public void testGetAllDishOfOneRestaurantByEmailAndDishType() {
        String[] dishType = new String[]{"maincourse", "slides"};

    }

    @Test
    public void testGetAllDish() {
        HashMap<String, Object> dish = dishService.getAllDishOfAllRestaurantByDishType();
        System.out.println(dish);
    }
}
