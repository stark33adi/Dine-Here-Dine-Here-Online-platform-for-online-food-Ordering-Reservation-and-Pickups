package com.rest.controller;

import com.rest.service.DishService;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/dish")
public class DishController {

    @Autowired
    private DishService dishService;

    @RequestMapping(value = "/getAllDish.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getAllDish(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDish2HM(jsonStr);
        return dishService.getAllDishOfOneRestaurantByEmailAndDishType(param);
    }

    @RequestMapping(value = "/get.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getAllDishOfAllRestaurant() {
        return dishService.getAllDishOfAllRestaurantByDishType();
    }

    @RequestMapping(value = "/getAllDishByRestaurantEmail.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getAllDishByRestaurantEmail(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDish2HM(jsonStr);
        return dishService.getAllDishByRestaurantEmail(param);
    }

    @RequestMapping(value = "/getProfileByDishId.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getProfileByDishId(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDish2HM(jsonStr);
        return dishService.getProfileByDishId(param);
    }

    @RequestMapping(value = "/addNewDish.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addNewDish(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDish2HM(jsonStr);
        return dishService.addNewDish(param);
    }

    @RequestMapping(value = "/updateDish.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> updateDish(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDish2HM(jsonStr);
        return dishService.updateDishProfileByEmailAndDishId(param);
    }

    @RequestMapping(value = "/deleteDish.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> deleteDish(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDish2HM(jsonStr);
        return dishService.deleteDishProfileByEmailAndDishId(param);
    }
}
