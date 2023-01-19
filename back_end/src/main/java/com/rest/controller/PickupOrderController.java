package com.rest.controller;

import com.rest.service.PickupOrderService;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/pickupOrder")
public class PickupOrderController {

    @Autowired
    private PickupOrderService pickupOrderService;

    @RequestMapping(value = "/getOrderCustomer.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getOrderCustomer(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfPickupOrder2HM(jsonStr);
        return pickupOrderService.getOrderByCustomerEmail(param);
    }

    @RequestMapping(value = "/getOrderRestaurant.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getOrderRestaurant(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfPickupOrder2HM(jsonStr);
        return pickupOrderService.getOrderByRestaurantEmail(param);
    }

    @RequestMapping(value = "/getOrderByOrderNumber.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getOrderByOrderNumber(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfPickupOrder2HM(jsonStr);
        return pickupOrderService.getOrderByOrderNumber(param);
    }

    @RequestMapping(value = "/addOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addOrder(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfPickupOrder2HM(jsonStr);
        return pickupOrderService.addNewOrder(param);
    }

    @RequestMapping(value = "/trackOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> trackOrder(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfPickupOrder2HM(jsonStr);
        return pickupOrderService.trackOrder(param);
    }

    @RequestMapping(value = "/updateOrderState.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> updateOrderState(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfPickupOrder2HM(jsonStr);
        return pickupOrderService.updateOrderState(param);
    }

    @RequestMapping(value = "/restaurantCancelOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantCancelOrder(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfPickupOrder2HM(jsonStr);
        return pickupOrderService.restaurantCancelOrder(param);
    }
}
