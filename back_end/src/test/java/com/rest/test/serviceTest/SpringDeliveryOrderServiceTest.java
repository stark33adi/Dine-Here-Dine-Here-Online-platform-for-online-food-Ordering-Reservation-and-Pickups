package com.rest.test.serviceTest;

import com.rest.service.DeliveryOrderService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringDeliveryOrderServiceTest {

    @Autowired
    private DeliveryOrderService deliveryOrderService;

    @Test
    public void testGet() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        String[] orderState = new String[]{"0", "1", "2", "3", "4", "5"};
        HashMap<String, Object> order = deliveryOrderService.getOrderByCustomerEmail(param);
        System.out.println("order: "+order);
    }

    @Test
    public void testAddNewOrder() throws IllegalAccessException {
        HashMap<String, Object> param = new HashMap<String, Object>();
        LinkedHashMap<String, Object> dish_list1 = new LinkedHashMap<String, Object>();
        LinkedHashMap<String, Object> dish_list2 = new LinkedHashMap<String, Object>();
        List<LinkedHashMap<String, Object>> list = new ArrayList<>();
        param.put("orderState", 0);
        param.put("customerEmail", "jack@gmail.com");
        param.put("restaurantEmail", "1@gmail.com");
        param.put("totalPrice", "100");
                dish_list1.put("dishId", 3);
                dish_list1.put("dishCount", 1);
                dish_list2.put("dishId", 3);
                dish_list2.put("dishCount", 2);
            list.add(dish_list1);
            list.add(dish_list2);
        param.put("dish", list);
        param.put("note", "special");
        param.put("orderState", 0);

        System.out.println(deliveryOrderService.addNewOrder(param));

    }

    @Test
    public void testGetOrderByRestaurantEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("restaurantEmail", "2@gmail.com");
        System.out.println(deliveryOrderService.getOrderByRestaurantEmail(param));
    }

    @Test
    public void testGetOrderByDeliveryGuyEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("deliveryGuyEmail", "deliveryguy3@gmail.com");
        System.out.println(deliveryOrderService.getOrderByDeliveryGuyEmail(param));
    }

    @Test
    public void testGetNotTokenOrder() {
        System.out.println(deliveryOrderService.getNotTakenDeliveryOrder());
    }

    @Test
    public void testTakeDeliveryOrder() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("orderNumber", "00001");
        param.put("deliveryGuyEmail", "d1");
        System.out.println(deliveryOrderService.takeDeliveryOrder(param));
    }
}
