package com.rest.controller;

import com.rest.service.DeliveryGuyService;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/deliveryGuy")
public class DeliveryGuyController {

    @Autowired
    private DeliveryGuyService deliveryGuyService;

    @RequestMapping(value = "/login.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> login(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryGuy2HM(jsonStr);
        return deliveryGuyService.login(param);
    }

    @RequestMapping(value = "/signUp.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> signUp(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryGuy2HM(jsonStr);
        return deliveryGuyService.signUp(param);
    }

    @RequestMapping(value = "/getProfile.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getProfileByDeliveryGuyEmail(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryGuy2HM(jsonStr);
        return deliveryGuyService.getProfileByDeliveryGuyEmail(param);
    }

    @RequestMapping(value = "/updatePassword.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> updatePassword(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryGuy2HM(jsonStr);
        return deliveryGuyService.updatePassword(param);
    }

    @RequestMapping(value = "/updateProfile.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> updateProfile(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfDeliveryGuy2HM(jsonStr);
        return deliveryGuyService.updateProfile(param);
    }

    @RequestMapping(value = "/test.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> test(@RequestBody HashMap<String, Object> param) {
        System.out.println(param);


        return param;
    }


}
