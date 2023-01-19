package com.rest.service.imp;

import com.rest.dao.CartDao;
import com.rest.service.CartService;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Service("cartService")
public class ImpCartService implements CartService {

    @Autowired
    private CartDao cartDao;

    @Override
    public HashMap<String, Object> getCartByCustomerEmail(HashMap<String, Object> param) {
        try {
            if (cartDao.isCartExist(param)) {
//                return cart
                return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "cart", cartDao.getCartByCustomerEmail(param)));
            } else {
//                cart is empty
                return HMUtil.integerToHM(2);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> addDishToCart(HashMap<String, Object> param) {
        try {
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
                totalPrice = new BigDecimal(cart.get(0).get("totalPrice").toString());

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

            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "cart", cartDao.getCartByCustomerEmail(param)));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> removeDishFromCart(HashMap<String, Object> param) {
        try {
            String genDate = DatetimeUtil.getCurrentDatetime();
            param.put("genDate", genDate);

            if (cartDao.isCartActive(param)) {
                BigDecimal deltaPrice = new BigDecimal(cartDao.getPriceByDishId(param));
                BigDecimal totalPrice = new BigDecimal(cartDao.getTotalPrice(param));

                List<LinkedHashMap<String, Object>> cart = cartDao.getCartByCustomerEmail(param);
                param.put("cartId", cart.get(0).get("cartId"));
                if (cartDao.isDIshInCart(param)) {
                    if (cartDao.getDishCount(param) > 1) {
                        int dishCount = cartDao.getDishCount(param) - 1;
                        param.put("dishCount", dishCount);
                        cartDao.updateDishCount(param);
                    } else {
                        cartDao.deleteDishFromCart(param);
                    }

                    totalPrice = totalPrice.subtract(deltaPrice);
                    param.put("totalPrice", totalPrice);
                    System.out.println("totalPrice: "+totalPrice);
                    cartDao.updateTotalPrice(param);
                }
            }


            if (!cartDao.isCartToInactive(param)) {
//                cartDao.updateIsActive(param);
                cartDao.deleteCart(param);
            }

            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "cart", cartDao.getCartByCustomerEmail(param)));

        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> cartCheckOut(HashMap<String, Object> param) {
        try {
            cartDao.updateIsActive(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> deleteCart(HashMap<String, Object> param) {
        try {
            cartDao.deleteCart(param);
            cartDao.deleteAllItemInCart(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }


}
