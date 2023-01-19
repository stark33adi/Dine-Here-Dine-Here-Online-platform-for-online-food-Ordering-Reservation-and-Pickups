package com.rest.test;

import com.rest.dao.DeliveryGuyDao;
import com.rest.model.DeliveryGuy;
import com.rest.util.DatetimeUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.TransactionScoped;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringDeliveryGuyTest {

    @Autowired
    private DeliveryGuyDao deliveryGuyDao;

    @Test
    public void testDeliveryGuyEmailIsExist() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "deliveryguy3@gmail.com");

        boolean result = deliveryGuyDao.deliveryGuyEmailIsExist(param);
        System.out.println(result);
    }

    @Test
    public void testGetPasswordByDeliveryGuyEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "deliveryguy3@gmail.com");

        LinkedHashMap<String, Object> result = deliveryGuyDao.getPasswordByDeliveryGuyEmail(param);
        System.out.println(result);
    }

    @Test
    public void testGetProfileByDeliveryGuyEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "deliveryguy3@gmail.com");

        LinkedHashMap<String, Object> result = deliveryGuyDao.getProfileByDeliveryGuyEmail(param);
        System.out.println(result);
    }

    @Test
    public void testAddProfile() {
        String regDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "deliveryguy3@gmail.com");
        param.put("password", "pwd3");
        param.put("firstName", "tom");
        param.put("lastName", "borne");
        param.put("address", "345 street");
        param.put("zipcode", "01234");
        param.put("phone", "phone3");
        param.put("photo", "photo3");
        param.put("genDate", null);
        param.put("regDate", regDate);

        deliveryGuyDao.addProfile(param);
    }

    @Test
    public void testUpdatePassword() {
        String genDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "deliveryguy3@gmail.com");
        param.put("genDate", genDate);

        param.put("newPassword", "");

        deliveryGuyDao.updatePassword(param);
    }

    @Test
    public void testUpdateProfile() {
        String genDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "deliveryguy3@gmail.com");
        param.put("genDate", genDate);

        param.put("firstName", "");
        param.put("lastName", "borne");
        param.put("address", "345 street");
        param.put("zipcode", "01234");
        param.put("phone", "phone4");
        param.put("photo", "photo4");


        deliveryGuyDao.updateProfile(param);
    }


}
