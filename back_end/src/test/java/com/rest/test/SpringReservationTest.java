package com.rest.test;

import com.rest.dao.ReservationDao;
import com.rest.model.Reservation;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringReservationTest {

    @Autowired
    private ReservationDao reservationDao;

    @Test
    public void testGetReservationByCustomerEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        List<LinkedHashMap<String, Object>> result = reservationDao.getReservationByCustomerEmail(param);
        System.out.println("result: " + result);
    }

    @Test
    public void testAddNewReservation() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "nancy@gmail.com");
        param.put("restaurantEmail", "sturrell2@gmail.com");
        param.put("reservationTime", "2022-3-23 18:00:00");
        param.put("partySize", 3);
        String genDate = DatetimeUtil.getCurrentDate();
//        param.put("genDate", genDate);
        System.out.println("result: " + param);
        reservationDao.addNewReservation(param);
    }

    @Test
    public void testUpdateReservation() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("reservationId", 11);
        param.put("reservationState", "2");
//        param.put("reservationTime", "2022-3-24 12:00:00");
        reservationDao.updateReservation(param);
    }

    @Test
    public void testDeleteReservation() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("reservationId", 5);
        reservationDao.deleteReservation(param);
    }

    @Test
    public void testGetActiveReservation() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("interval", 2);
        String datetime = DatetimeUtil.getCurrentDatetime();
        param.put("time", "2022-3-24 5:00:00");
        List<LinkedHashMap<String, Object>> result = reservationDao.getActiveReservationByCustomerEmail(param);
        System.out.println("result:" + result);
    }

    @Test
    public void testGetInactiveReservation() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("interval", 2);
        String datetime = DatetimeUtil.getCurrentDatetime();
        param.put("time", "2022-3-24 5:00:00");
        List<LinkedHashMap<String, Object>> result = reservationDao.getInactiveReservationByCustomerEmail(param);
        System.out.println("result:" + result);
    }

    @Test
    public void testGetItemsByActiveStateCustomerEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("interval", 120);
        param.put("time", "2022-3-24 5:00:00");
        HashMap<String, Object> result = HMUtil.getItemsByActiveStateCustomerEmail(reservationDao, param);
        System.out.println("result:" + result);
    }

}
