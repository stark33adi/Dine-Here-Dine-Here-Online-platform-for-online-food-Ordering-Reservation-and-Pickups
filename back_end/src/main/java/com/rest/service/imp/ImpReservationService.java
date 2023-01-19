package com.rest.service.imp;

import com.rest.dao.ReservationDao;
import com.rest.service.ReservationService;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Service("reservationService")
public class ImpReservationService implements ReservationService {

    @Autowired
    private ReservationDao reservationDao;

    @Override
    public HashMap<String, Object> getAllReservationOfOneCustomer(HashMap<String, Object> param) {
        try {
            List<LinkedHashMap<String, Object>> reservation = reservationDao.getReservationByCustomerEmail(param);
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "reservation", reservation));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getAllReservationOfOneRestaurant(HashMap<String, Object> param) {
        try {
            List<LinkedHashMap<String, Object>> reservation = reservationDao.getReservationByRestaurantEmail(param);
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "reservation", reservation));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> applyReservation(HashMap<String, Object> param) {
        try {
            param.put("reservationState", 0);
            reservationDao.addNewReservation(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> confirmReservation(HashMap<String, Object> param) {
        try {
            param.put("reservationState", 2);
            reservationDao.updateReservation(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> cancelReservation(HashMap<String, Object> param) {
        try {
            param.put("reservationState", 1);
            reservationDao.updateReservation(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }
}
