package com.rest.test.serviceTest;

import com.rest.service.CartService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringCartServiceTest {

    @Autowired
    private CartService cartService;

    @Test
    public void testGetCartByCustomerEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        HashMap<String, Object> result = cartService.getCartByCustomerEmail(param);
        System.out.println(result);
    }

    @Test
    public void testAddDishToCart() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");

    }
}
