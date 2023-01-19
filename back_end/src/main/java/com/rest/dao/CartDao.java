package com.rest.dao;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface CartDao {

    public boolean isCartExist(HashMap<String, Object> param);

    public boolean isDIshInCart(HashMap<String, Object> param);

    public Integer getMaxCartId(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getCartByCustomerEmail(HashMap<String, Object> param);

    public String getPriceByDishId(HashMap<String, Object> param);

    public void addCartToCartList(HashMap<String, Object> param);

    public void addDishToCartItem(HashMap<String, Object> param);

    public void deleteDishFromCart(HashMap<String, Object> param);

    public int getDishCount(HashMap<String, Object> param);

    public void updateDishCount(HashMap<String, Object> param);

    public String getTotalPrice(HashMap<String, Object> param);

    public void updateTotalPrice(HashMap<String, Object> param);

    public boolean isCartActive(HashMap<String, Object> param);

    public boolean isCartToInactive(HashMap<String, Object> param);

    public void updateIsActive(HashMap<String, Object> param);

    public void deleteCart(HashMap<String, Object> param);

    public void deleteAllItemInCart(HashMap<String, Object> param);

}
