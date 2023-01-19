package com.rest.service.imp;

import com.rest.dao.DeliveryGuyDao;
import com.rest.service.DeliveryGuyService;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;

@Service("deliveryGuyService")
public class ImpDeliveryGuyService implements DeliveryGuyService {

    @Autowired
    private DeliveryGuyDao deliveryGuyDao;

    @Override
    public HashMap<String, Object> login(HashMap<String, Object> param) {
        try {
            if (!deliveryGuyDao.deliveryGuyEmailIsExist(param)) {
                return HMUtil.integerToHM(3);
            } else {
                LinkedHashMap<String, Object> deliveryGuy = deliveryGuyDao.getPasswordByDeliveryGuyEmail(param);
                if (deliveryGuy.get("password").equals(param.get("password"))) {
                    return HMUtil.integerToHM(0);
                } else {
                    return HMUtil.integerToHM(2);
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> signUp(HashMap<String, Object> param) {
        try {
            if (deliveryGuyDao.deliveryGuyEmailIsExist(param)) {
                return HMUtil.integerToHM(2);
            } else {
                String regDate = DatetimeUtil.getCurrentDate();
                param.put("regDate", regDate);
                deliveryGuyDao.addProfile(param);
                return HMUtil.integerToHM(0);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getProfileByDeliveryGuyEmail(HashMap<String, Object> param) {
        try {
            LinkedHashMap<String, Object> deliveryGuy = deliveryGuyDao.getProfileByDeliveryGuyEmail(param);
            return HMUtil.params2HM(0, deliveryGuy);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> updatePassword(HashMap<String, Object> param) {
        try {
            LinkedHashMap<String, Object> deliveryGuy = deliveryGuyDao.getPasswordByDeliveryGuyEmail(param);
            if (deliveryGuy.get("password").equals(param.get("password"))) {
                String genDate = DatetimeUtil.getCurrentDate();
                param.put("genDate", genDate);
                deliveryGuyDao.updatePassword(param);
                return HMUtil.integerToHM(0);
            } else {
                return HMUtil.integerToHM(2);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> updateProfile(HashMap<String, Object> param) {
        try {
            String genDate = DatetimeUtil.getCurrentDate();
            param.put("genDate", genDate);
            deliveryGuyDao.updateProfile(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

}
