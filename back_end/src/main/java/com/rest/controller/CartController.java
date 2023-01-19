package com.rest.controller;

import com.rest.service.CartService;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping(value = "/getCart.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getCart(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfCart2HM(jsonStr);
        return cartService.getCartByCustomerEmail(param);
    }

    @RequestMapping(value = "/addToCart.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addToCart(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfCart2HM(jsonStr);
        return cartService.addDishToCart(param);
    }

    @RequestMapping(value = "/removeFromCart.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> removeFromCart(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfCart2HM(jsonStr);
        return cartService.removeDishFromCart(param);
    }

    @RequestMapping(value = "/cartCheckOut.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> cartCheckOut(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfCart2HM(jsonStr);
        return cartService.cartCheckOut(param);
    }

    @RequestMapping(value = "/deleteCart.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> deleteCart(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfCart2HM(jsonStr);
        return cartService.deleteCart(param);
    }
}
