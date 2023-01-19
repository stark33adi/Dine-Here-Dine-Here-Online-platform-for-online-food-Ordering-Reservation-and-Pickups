package com.rest.test;

import com.rest.dao.DeliveryOrderDao;
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
public class SpringDeliveryOrderTest {

    @Autowired
    private DeliveryOrderDao deliveryOrderDao;

    @Test
    public void testGetOrder() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("orderState", "1");
        List<LinkedHashMap<String, Object>> order = deliveryOrderDao.getOrderByCustomerEmailAndOrderState(param);
        System.out.println(HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", order)));
    }

    @Test
    public void testTrackOrder() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("orderNumber", "00001");
        List<LinkedHashMap<String, Object>> order = deliveryOrderDao.trackOrder(param);
        System.out.println(HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", deliveryOrderDao.trackOrder(param))));
    }

    @Test
    public void testGetMaxOrderNumberByCustomerEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        String[] orderState = new String[]{"0", "1", "2", "3", "4", "5"};
        param.put("customerEmail", "jack@gmail.com");
//        List<LinkedHashMap<String, Object>> orderNumber = deliveryOrderDao.getOrderByCustomerEmail(param);
        HashMap<String, Object> orderNumber = HMUtil.getItemsByDeliveryOrderStateCustomerEmail(deliveryOrderDao, orderState, param);
        System.out.println(orderNumber);
    }

    @Test
    public void testGetMaxOrderNumber() {
        String max = deliveryOrderDao.getMaxOrderNumber();
        String num = String.valueOf(Integer.parseInt(max) + 1);
        int length = num.length();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5 - length; i++) {
            sb.append("0");
        }
        num = sb.toString() + num;
        System.out.println(max);
        System.out.println(num);
    }

    @Test
    public void testUpdateOrderState() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("orderNumber", "0000");
    }

    @Test
    public void testGetMaxOrderStateOfSingleOrder() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("orderNumber", "00005");
        Integer maxOrderState = deliveryOrderDao.getMaxOrderStateOfSingleOrder(param);
        System.out.println(maxOrderState);
    }

    @Test
    public void testGetNotTokenOrder() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("orderState", 2);
        System.out.println(HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", deliveryOrderDao.getNotTakenOrder(param))));
    }

    @Test
    public void testTakeDeliveryOrder() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("orderNumber", "00002");
        param.put("deliveryGuyEmail", "d1");
        System.out.println(param);
        deliveryOrderDao.takeDeliveryOrder(param);
    }

    @Test
    public void testGetTip() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("deliveryGuyEmail", "deliveryguy3@gmail.com");

        HashMap<String, Object> tipSum = deliveryOrderDao.getTip(param);
        System.out.println(tipSum);
    }

    @Test
    public void testGetOrderByOrderNumber () {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("orderNumber", "00007");

        List<LinkedHashMap<String, Object>> result = deliveryOrderDao.getOrderByOrderNumber(param);
        System.out.println(result);
    }
}
