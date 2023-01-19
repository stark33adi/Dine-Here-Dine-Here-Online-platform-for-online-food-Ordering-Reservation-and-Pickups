package com.rest.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.rest.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Controller
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/loginByEmail.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> login(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
        HashMap<String,Object> return_data = customerService.loginByEmail(email, password);
        return return_data;
    }


    @RequestMapping(value = "/signUp.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> signUp(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
        String firstName = jsonObject.getString("firstName");
        String lastName = jsonObject.getString("lastName");
        String address = jsonObject.getString("address");
        String zipcode = jsonObject.getString("zipcode");
        String phone = jsonObject.getString("phone");
        String photo = jsonObject.getString("photo");
        HashMap<String,Object> return_data = customerService.signUp(email, password, firstName, lastName, address, zipcode, phone, photo);
        return return_data;
    }

    @RequestMapping(value = "/forgetPassword.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> forgetPassword(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        String email = jsonObject.getString("email");
        String newPassword = jsonObject.getString("newPassword");
        HashMap<String,Object> return_data = customerService.forgetPassword(email, newPassword);
        return return_data;
    }

    @RequestMapping(value = "/updatePassword.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> updatePassword(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        String email = jsonObject.getString("email");
        String oldPassword = jsonObject.getString("oldPassword");
        String newPassword = jsonObject.getString("newPassword");
        HashMap<String,Object> return_data = customerService.updatePassword(email, oldPassword, newPassword);
        return return_data;
    }

    @RequestMapping(value = "/updateProfile.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> updateProfile(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        String email = jsonObject.getString("email");
        String firstName = jsonObject.getString("firstName");
        String lastName = jsonObject.getString("lastName");
        String address = jsonObject.getString("address");
        String zipcode = jsonObject.getString("zipcode");
        String phone = jsonObject.getString("phone");
        String photo = jsonObject.getString("photo");
        HashMap<String,Object> return_data = customerService.updateProfile(email,firstName,lastName,address,zipcode,phone,photo);
        return return_data;
    }

    @RequestMapping(value = "/checkPhone.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> checkPhone(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        String phone = jsonObject.getString("phone");
        HashMap<String,Object> return_data = customerService.checkPhone(phone);
        return return_data;
    }

    @RequestMapping(value = "/loginByOTC.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> loginByOTC() {
        //JSONObject jsonObject = JSON.parseObject(jsonStr);
        HashMap<String,Object> return_data = new HashMap<>();
        return_data.put("result",0);
        return return_data;
    }


    @RequestMapping(value = "/getProfile.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> getProfile(@RequestBody String jsonStr) {
        JSONObject jsonObject = JSON.parseObject(jsonStr);
        String email = jsonObject.getString("email");
        HashMap<String,Object> return_data = customerService.getProfile(email);
        return return_data;
    }

    @RequestMapping(value = "/testPhoto.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String,Object> testPhoto(@RequestBody String jsonStr) {
        HashMap<String,Object> return_data = customerService.testPhoto();
        return return_data;
    }

}
