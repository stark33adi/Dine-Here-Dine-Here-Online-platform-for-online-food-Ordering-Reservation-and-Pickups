package com.rest.service;

import java.util.HashMap;

public interface CartService {

    public HashMap<String, Object> getCartByCustomerEmail(HashMap<String, Object> param);

    public HashMap<String, Object> addDishToCart(HashMap<String, Object> param);

    public HashMap<String, Object> removeDishFromCart(HashMap<String, Object> param);

    public HashMap<String, Object> cartCheckOut(HashMap<String, Object> param);
    
    public HashMap<String, Object> deleteCart(HashMap<String, Object> param);

}
