package com.rest.controller;

import com.rest.service.DeliveryOrderService;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/deliveryOrder")
public class DeliveryOrderController {

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    @RequestMapping(value = "/getOrderCustomer.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getOrderCustomer(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.getOrderByCustomerEmail(param);
    }

    @RequestMapping(value = "/getOrderRestaurant.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getOrderRestaurant(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.getOrderByRestaurantEmail(param);
    }

    @RequestMapping(value = "/getOrderDeliveryGuy.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getOrderDeliveryGuy(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.getOrderByDeliveryGuyEmail(param);
    }

    @RequestMapping(value = "/getOrderByOrderNumber.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getOrderByOrderNumber(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.getOrderByOrderNumber(param);
    }

    @RequestMapping(value = "/getNotTakenDeliveryOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getNotTakenDeliveryOrder(@RequestBody String jsonStr) {
        return deliveryOrderService.getNotTakenDeliveryOrder();
    }

    @RequestMapping(value = "/takeDeliveryOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> takeDeliveryOrder(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        System.out.println(param);
        return deliveryOrderService.takeDeliveryOrder(param);
    }

    @RequestMapping(value = "/addOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addOrder(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.addNewOrder(param);
    }

    @RequestMapping(value = "/trackOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> trackOrder(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.trackOrder(param);
    }

    @RequestMapping(value = "/updateOrderState.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> updateOrderState(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.updateOrderState(param);
    }

    @RequestMapping(value = "/restaurantCancelOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> restaurantCancelOrder(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.restaurantCancelOrder(param);
    }

    @RequestMapping(value = "/deliveryGuyGetTips.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> deliveryGuyGetTips(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryOrder2HM(jsonStr);
        return deliveryOrderService.deliveryGuyGetTips(param);
    }
}
