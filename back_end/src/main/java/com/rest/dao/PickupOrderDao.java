package com.rest.dao;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface PickupOrderDao {
    public List<LinkedHashMap<String, Object>> getOrderByCustomerEmailAndOrderState(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getOrderByRestaurantEmailAndOrderState(HashMap<String, Object> param);

//    public List<LinkedHashMap<String, Object>> getOrderByDeliveryGuyEmailAndOrderState(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> getOrderByOrderNumber(HashMap<String, Object> param);

//    public List<LinkedHashMap<String, Object>> getNotTokenOrder();

//    public void takeDeliveryOrder(HashMap<String, Object> param);

    public List<LinkedHashMap<String, Object>> trackOrder(HashMap<String, Object> param);

    public String getMaxOrderNumber();

    public Integer getMaxOrderStateOfSingleOrder(HashMap<String, Object> param);

    public void addToOrderList(HashMap<String, Object> param);

    public void addDishToOrder(HashMap<String, Object> param);

    public void addInitialOrderStateToOrder(HashMap<String, Object> param);

    public void updateOrderState(HashMap<String, Object> param);

}
