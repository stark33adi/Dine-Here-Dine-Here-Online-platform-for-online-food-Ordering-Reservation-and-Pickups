package com.rest.controller;

import com.rest.service.ReservationService;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @RequestMapping(value = "/getAllReservationByCustomer.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getAllReservationOfOneCustomer(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfReservation2HM(jsonStr);
        return reservationService.getAllReservationOfOneCustomer(param);
    }

    @RequestMapping(value = "/getAllReservationByRestaurant.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getAllReservationOfOneRestaurant(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfReservation2HM(jsonStr);
        return reservationService.getAllReservationOfOneRestaurant(param);
    }

    @RequestMapping(value = "/addReservation.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> addReservation(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfReservation2HM(jsonStr);
        return reservationService.applyReservation(param);
    }

    @RequestMapping(value = "/confirmReservation.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> confirmReservation(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfReservation2HM(jsonStr);
        return reservationService.confirmReservation(param);
    }

    @RequestMapping(value = "/cancelReservation.do", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> cancelReservation(@RequestBody String jsonStr) {
        HashMap<String, Object> param = HMUtil.jsonStrOfReservation2HM(jsonStr);
        return reservationService.cancelReservation(param);
    }
}
