package com.rest.test;

import com.rest.dao.CartDao;
import com.rest.util.DatetimeUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringCartTest {

    @Autowired
    private CartDao cartDao;

    @Test
    public void testGetCartByCustomerEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        List<LinkedHashMap<String, Object>> cart = cartDao.getCartByCustomerEmail(param);
        System.out.println(cart);
    }

    @Test
    public void testGetDishCount() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("dishId", 1);
        int dishCount = cartDao.getDishCount(param);
        System.out.println(dishCount);
    }

    @Test
    public void testIsCartActive() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("dishId", 3);
        boolean result = cartDao.isCartToInactive(param);
        System.out.println(result);
    }

    @Test
    public void testAddDishToCart() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "tim@gmail.com");
        param.put("restaurantEmail", "2@gmail.com");
        param.put("dishId", 1);


        String genDate = DatetimeUtil.getCurrentDatetime();
        param.put("genDate", genDate);
        BigDecimal deltaPrice = new BigDecimal(cartDao.getPriceByDishId(param));
        BigDecimal totalPrice = new BigDecimal("0");


        if (cartDao.isCartExist(param)) {
            List<LinkedHashMap<String, Object>> cart = cartDao.getCartByCustomerEmail(param);
            param.put("cartId", cart.get(0).get("cartId"));
            if (cartDao.isDIshInCart(param)) {
                int dishCount = cartDao.getDishCount(param);
                param.put("dishCount", dishCount + 1);
                cartDao.updateDishCount(param);
                System.out.println("2");
            } else {
                param.put("dishCount", 1);
                cartDao.addDishToCartItem(param);
                System.out.println("3");
            }
            totalPrice = new BigDecimal(cartDao.getTotalPrice(param));

        } else {
            int maxId = cartDao.getMaxCartId(param) + 1;
            param.put("cartId", maxId);
            param.put("isActive", 1);
            param.put("totalPrice", "0");

            cartDao.addCartToCartList(param);

            param.put("dishCount", 1);
            cartDao.addDishToCartItem(param);
            System.out.println("1");
        }

        totalPrice = totalPrice.add(deltaPrice);
        param.put("totalPrice", totalPrice);
        cartDao.updateTotalPrice(param);

        System.out.println("param: "+param);

    }

    @Test
    public void testRemoveDishFromCart() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("customerEmail", "jack@gmail.com");
        param.put("restaurantEmail", "1@gmail.com");
        param.put("dishId", 1);

        String genDate = DatetimeUtil.getCurrentDatetime();
        param.put("genDate", genDate);
        if (cartDao.isCartActive(param)) {
            BigDecimal deltaPrice = new BigDecimal(cartDao.getPriceByDishId(param));
            BigDecimal totalPrice = new BigDecimal(cartDao.getTotalPrice(param));

            List<LinkedHashMap<String, Object>> cart = cartDao.getCartByCustomerEmail(param);
            param.put("cartId", cart.get(0).get("cartId"));
            if (cartDao.isDIshInCart(param)) {
                System.out.println("3");
                if (cartDao.getDishCount(param) > 1) {
                    int dishCount = cartDao.getDishCount(param) - 1;
                    param.put("dishCount", dishCount);
                    cartDao.updateDishCount(param);
                    System.out.println("1");
                } else {
                    cartDao.deleteDishFromCart(param);
                    System.out.println("2");
                }

                totalPrice = totalPrice.subtract(deltaPrice);
                param.put("totalPrice", totalPrice);
                System.out.println("totalPrice: "+totalPrice);
                cartDao.updateTotalPrice(param);
            }
        }


        if (!cartDao.isCartToInactive(param)) {
            cartDao.updateIsActive(param);
            System.out.println("4");
        }

        System.out.println(cartDao.getCartByCustomerEmail(param));

    }

}
