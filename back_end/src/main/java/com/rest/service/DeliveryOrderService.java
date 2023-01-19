package com.rest.service;

import java.util.HashMap;

public interface DeliveryOrderService {
    public HashMap<String, Object> getOrderByCustomerEmail(HashMap<String, Object> param);

    public HashMap<String, Object> getOrderByRestaurantEmail(HashMap<String, Object> param);

    public HashMap<String, Object> getOrderByDeliveryGuyEmail(HashMap<String, Object> param);

    public HashMap<String, Object> getOrderByOrderNumber(HashMap<String, Object> param);

    public HashMap<String, Object> getNotTakenDeliveryOrder();

    public HashMap<String, Object> takeDeliveryOrder(HashMap<String, Object> param);

    public HashMap<String, Object> addNewOrder(HashMap<String, Object> param);

    public HashMap<String, Object> trackOrder(HashMap<String, Object> param);

    public HashMap<String, Object> updateOrderState(HashMap<String, Object> param);

    public HashMap<String, Object> restaurantCancelOrder(HashMap<String, Object> param);

    public HashMap<String, Object> deliveryGuyGetTips(HashMap<String, Object> param);

}
