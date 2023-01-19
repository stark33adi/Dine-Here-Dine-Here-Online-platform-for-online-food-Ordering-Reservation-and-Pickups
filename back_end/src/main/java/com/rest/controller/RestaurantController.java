package com.rest.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rest.service.RestaurantService;

import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @RequestMapping(value = "/login.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantLogin(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.login(param);
    }

    @RequestMapping(value = "/loginForPhone.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantPhoneIsExist(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.phoneIsExist(param);
    }

    @RequestMapping(value = "/signUp.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantSignUp(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.addNewRestaurant(param);
    }

    @RequestMapping(value = "/forgetPassword.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantForgetPassword(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.checkForgetPassword(param);
    }

    @RequestMapping(value = "/getAllRestaurant.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantGetAllRestaurant(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.getAllRest(param);
    }

    @RequestMapping(value = "/getRestaurantList.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantGetRestaurantList() {
        return restaurantService.getRestaurantList();
    }

    @RequestMapping(value = "/getSecurityProfile.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantGetSecurityProfileByEmail(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.getSecurityProfileByEmail(param);
    }

    @RequestMapping(value = "/getProfile.do")
    @ResponseBody
    public HashMap<String, Object> restaurantGetProfileByEmail(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.getProfileByEmail(param);
    }

    @RequestMapping(value = "/updatePassword.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantUpdatePassword(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.updatePassword(param);
    }

    @RequestMapping(value = "/updateSecurityProfile.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantUpdateSecurityProfile(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.updateSecurityProfile(param);
    }

    @RequestMapping(value = "/updateProfile.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantUpdateProfile(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.updateProfile(param);
    }

    @RequestMapping(value = "/getPhoto.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getPhoto(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.getPhoto(param);
    }

    @RequestMapping(value = "/addPhoto.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addPhoto(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        return restaurantService.addPhoto(param);
    }

    @RequestMapping(value = "/filter.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantFilter(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        List<String> restaurantTypeFilter = new ArrayList<String>();

        // deal with value of restaurantTypeFilter: null | [] | ""
        String restaurantType_t = jsonObject.getString("restaurantTypeFilter");
        if (restaurantType_t != null && restaurantType_t.length() > 0) {
            // parse json array
            JSONArray arrayRestaurantType_t = jsonObject.getJSONArray("restaurantTypeFilter");
            for (Object o : arrayRestaurantType_t) {
                restaurantTypeFilter.add(o.toString());
            }
        }
        
        String rateValueFilter = jsonObject.getString("rateValueFilter");
        String deliveryTimeFilter = jsonObject.getString("deliveryTimeFilter");


        // deal with space in foodTypeFilter
        String foodTypeFilter = jsonObject.getString("foodTypeFilter");
        if (foodTypeFilter != null && foodTypeFilter.length() > 0) {
            foodTypeFilter = HMUtil.trimSpace(foodTypeFilter);
        }

        return restaurantService.filter(restaurantTypeFilter, rateValueFilter, deliveryTimeFilter, foodTypeFilter);
    }
}
