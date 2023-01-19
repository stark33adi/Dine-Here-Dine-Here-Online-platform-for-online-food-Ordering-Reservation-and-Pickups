package com.rest.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rest.dao.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

import java.util.*;

public class HMUtil {

    public static HashMap<String, Object> integerToHM(Integer result) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("result", result);
        return map;
    }

    public static String trimSpace(String restaurantType) {
        return restaurantType.replace(" ", "");
    }

    public static HashMap<String, Object> jsonStrOfCustomer2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        Integer customerId = jsonObject.getInteger("customerId");
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
        String newPassword = jsonObject.getString("newPassword");
        String firstName = jsonObject.getString("firstName");
        String lastName = jsonObject.getString("lastName");
        String address = jsonObject.getString("address");
        String zipcode = jsonObject.getString("zipcode");
        String phone = jsonObject.getString("phone");
        String photo = jsonObject.getString("photo");

        map.put("customerId", customerId);
        map.put("email", email);
        map.put("password", password);
        map.put("newPassword", newPassword);
        map.put("firstName", firstName);
        map.put("lastName", lastName);
        map.put("address", address);
        map.put("zipcode", zipcode);
        map.put("phone", phone);
        map.put("photo", photo);

        return map;
    }

    public static HashMap<String, Object> jsonStrOfRestaurant2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        Integer restaurantId = jsonObject.getInteger("restaurantId");
        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
        String newPassword = jsonObject.getString("newPassword");
        String securityQuestion = jsonObject.getString("securityQuestion");
        String securityAnswer = jsonObject.getString("securityAnswer");
        String restaurantName = jsonObject.getString("restaurantName");
        String restaurantAbbrName = jsonObject.getString("restaurantAbbrName");
        String address = jsonObject.getString("address");
        String phone = jsonObject.getString("phone");
        String bgPhoto = jsonObject.getString("bgPhoto");
        String restaurantType = jsonObject.getString("restaurantType");
        String openStatus = jsonObject.getString("openStatus");
        String rateValue = jsonObject.getString("rateValue");
        String deliveryTime = jsonObject.getString("deliveryTime");
        String foodType = jsonObject.getString("foodType");
        String serviceType = jsonObject.getString("serviceType");

        if (restaurantType != null) {
            restaurantType = HMUtil.trimSpace(restaurantType);
        }

        if (serviceType != null) {
            serviceType = HMUtil.trimSpace(serviceType);
        }

        map.put("restaurantId", restaurantId);
        map.put("email", email);
        map.put("password", password);
        map.put("newPassword", newPassword);
        map.put("securityQuestion", securityQuestion);
        map.put("securityAnswer", securityAnswer);
        map.put("restaurantName", restaurantName);
        map.put("restaurantAbbrName", restaurantAbbrName);
        map.put("address", address);
        map.put("phone", phone);
        map.put("bgPhoto", bgPhoto);
        map.put("restaurantType", restaurantType);
        map.put("openStatus", openStatus);
        map.put("rateValue", rateValue);
        map.put("deliveryTime", deliveryTime);
        map.put("foodType", foodType);
        map.put("serviceType", serviceType);

        return map;
    }

    public static HashMap<String, Object> jsonStrOfDish2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        Integer dishId = jsonObject.getInteger("dishId");
        String restaurantEmail = jsonObject.getString("restaurantEmail");
        String dishType = jsonObject.getString("dishType");
        String dishName = jsonObject.getString("dishName");
        String dishPrice = jsonObject.getString("dishPrice");
        String dishPhoto = jsonObject.getString("dishPhoto");

        map.put("dishId", dishId);
        map.put("restaurantEmail", restaurantEmail);
        map.put("dishType", dishType);
        map.put("dishName", dishName);
        map.put("dishPrice", dishPrice);
        map.put("dishPhoto", dishPhoto);

        return map;
    }

    public static HashMap<String, Object> jsonStrOfDeliveryOrder2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        String orderNumber = jsonObject.getString("orderNumber");
        String orderState = jsonObject.getString("orderState");
        String customerEmail = jsonObject.getString("customerEmail");
        String restaurantEmail = jsonObject.getString("restaurantEmail");
        String deliveryGuyEmail = jsonObject.getString("deliveryGuyEmail");
        String subTotal = jsonObject.getString("subTotal");
        String deliveryFee = jsonObject.getString("deliveryFee");
        String tip = jsonObject.getString("tip");
        String tax = jsonObject.getString("tax");
        String totalPrice = jsonObject.getString("totalPrice");
        String note = jsonObject.getString("note");
        JSONArray jsonArray = jsonObject.getJSONArray("dish");

        List<Integer> dishIdList = new ArrayList<>();
        List<Integer> dishCountList = new ArrayList<>();
        if (jsonArray != null && jsonArray.size() > 0) {
            for (Object object : jsonArray) {
                JSONObject jObject = (JSONObject) object;
                dishIdList.add(jObject.getInteger("dishId"));
                dishCountList.add(jObject.getInteger("dishCount"));
            }
        }

        map.put("orderNumber", orderNumber);
        map.put("orderState", orderState);
        map.put("customerEmail", customerEmail);
        map.put("restaurantEmail", restaurantEmail);
        map.put("deliveryGuyEmail", deliveryGuyEmail);
        map.put("subTotal", subTotal);
        map.put("deliveryFee", deliveryFee);
        map.put("tip", tip);
        map.put("tax", tax);
        map.put("totalPrice", totalPrice);
        map.put("note", note);
        List<HashMap<String, Object>> dishHashMap = new ArrayList<>();

        if (jsonArray != null && jsonArray.size() > 0) {
            for (int i = 0; i < dishIdList.size(); i++) {
                HashMap<String, Object> item = new HashMap<String, Object>();
                item.put("dishId", dishIdList.get(i));
                item.put("dishCount", dishCountList.get(i));
                dishHashMap.add(item);
            }
            map.put("dish", dishHashMap);
        }

        return map;
    }

    public static HashMap<String, Object> jsonStrOfPickupOrder2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        String orderNumber = jsonObject.getString("orderNumber");
        String orderState = jsonObject.getString("orderState");
        String customerEmail = jsonObject.getString("customerEmail");
        String restaurantEmail = jsonObject.getString("restaurantEmail");
        String subTotal = jsonObject.getString("subTotal");
        String tax = jsonObject.getString("tax");
        String totalPrice = jsonObject.getString("totalPrice");
        String note = jsonObject.getString("note");
        JSONArray jsonArray = jsonObject.getJSONArray("dish");

        List<Integer> dishIdList = new ArrayList<>();
        List<Integer> dishCountList = new ArrayList<>();
        if (jsonArray != null && jsonArray.size() > 0) {
            for (Object object : jsonArray) {
                JSONObject jObject = (JSONObject) object;
                dishIdList.add(jObject.getInteger("dishId"));
                dishCountList.add(jObject.getInteger("dishCount"));
            }
        }

        map.put("orderNumber", orderNumber);
        map.put("orderState", orderState);
        map.put("customerEmail", customerEmail);
        map.put("restaurantEmail", restaurantEmail);
        map.put("subTotal", subTotal);
        map.put("tax", tax);
        map.put("totalPrice", totalPrice);
        map.put("note", note);
        List<HashMap<String, Object>> dishHashMap = new ArrayList<>();

        if (jsonArray != null && jsonArray.size() > 0) {
            for (int i = 0; i < dishIdList.size(); i++) {
                HashMap<String, Object> item = new HashMap<String, Object>();
                item.put("dishId", dishIdList.get(i));
                item.put("dishCount", dishCountList.get(i));
                dishHashMap.add(item);
            }
            map.put("dish", dishHashMap);
        }

        return map;
    }

    public static HashMap<String, Object> jsonStrOfCart2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        String customerEmail = jsonObject.getString("customerEmail");
        String restaurantEmail = jsonObject.getString("restaurantEmail");
        Integer dishId = jsonObject.getInteger("dishId");

        map.put("customerEmail", customerEmail);
        map.put("restaurantEmail", restaurantEmail);
        map.put("dishId", dishId);

        return map;
    }

    public static HashMap<String, Object> jsonStrOfReservation2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        Integer reservationId = jsonObject.getInteger("reservationId");
        String customerEmail = jsonObject.getString("customerEmail");
        String restaurantEmail = jsonObject.getString("restaurantEmail");
        String reservationState = jsonObject.getString("reservationState");
        String reservationTime = jsonObject.getString("reservationTime");
        String partySize = jsonObject.getString("partySize");
        String note = jsonObject.getString("note");


        map.put("reservationId", reservationId);
        map.put("customerEmail", customerEmail);
        map.put("restaurantEmail", restaurantEmail);
        map.put("reservationState", reservationState);
        map.put("reservationTime", reservationTime);
        map.put("partySize", partySize);
        map.put("note", note);

        return map;
    }

    public static HashMap<String, Object> jsonStrOfDeliveryGuy2HM(String jsonStr) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        JSONObject jsonObject = JSON.parseObject(jsonStr);

        String email = jsonObject.getString("email");
        String password = jsonObject.getString("password");
        String newPassword = jsonObject.getString("newPassword");
        String firstName = jsonObject.getString("firstName");
        String lastName = jsonObject.getString("lastName");
        String address = jsonObject.getString("address");
        String zipcode = jsonObject.getString("zipcode");
        String phone = jsonObject.getString("phone");
        String photo = jsonObject.getString("photo");

        map.put("email", email);
        map.put("password", password);
        map.put("newPassword", newPassword);
        map.put("firstName", firstName);
        map.put("lastName", lastName);
        map.put("address", address);
        map.put("zipcode", zipcode);
        map.put("phone", phone);
        map.put("photo", photo);

        return map;
    }

//    public static String linkedHashmapToJsonString(LinkedHashMap<String, Object> restaurant) {
//        return JSON.toJSONString(restaurant, SerializerFeature.DisableCircularReferenceDetect);
//    }
//
//    public static String listLinkedHashmapToJsonString(List<LinkedHashMap<String, Object>> restaurant) {
//        return JSON.toJSONString(restaurant, SerializerFeature.DisableCircularReferenceDetect);
//    }

    public static LinkedHashMap<String, Object> params2SubDataList(LinkedHashMap<String,Object> data, String subDataKey, List<LinkedHashMap<String, Object>> subDataValue) {
        data.put(subDataKey, subDataValue);
        return data;
    }

    public static HashMap<String, Object> params2HM(Integer resultValue, LinkedHashMap<String, Object> dataValue) {
        HashMap<String,Object> params = new HashMap<String, Object>();

        params.put("result", resultValue);
        params.put("data", dataValue);
        return params;
    }

    public static HashMap<String, Object> paramsList2HM(Integer resultValue, List<LinkedHashMap<String, Object>> dataValue) {
        HashMap<String,Object> params = new HashMap<String, Object>();

        params.put("result", resultValue);
        params.put("data", dataValue);
        return params;
    }

    public static HashMap<String, Object> getItemsByRestaurantType(RestaurantDao restaurantDao, List<String> type, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> restaurant = new LinkedHashMap<String, Object>();
        for (String s : type) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            if (param.get("serviceType") != null) {
                p_t.put("serviceType", param.get("serviceType"));
            }
            p_t.put("restaurantType", s);
            List<LinkedHashMap<String, Object>> rest_t = restaurantDao.getRestFromListByRestType(p_t);
            HMUtil.params2SubDataList(restaurant, s, rest_t);
        }
        return HMUtil.params2HM(0, restaurant);
    }

    public static HashMap<String, Object> getItemsByDishType(DishDao dishDao, List<String> type, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> dish = new LinkedHashMap<String, Object>();
        for (String s : type) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            p_t.put("restaurantEmail", param.get("restaurantEmail"));
            p_t.put("dishType", s);
            List<LinkedHashMap<String, Object>> dish_t = dishDao.getDishProfileByEmailAndDishType(p_t);
            HMUtil.params2SubDataList(dish, s, dish_t);
        }
        return HMUtil.params2HM(0, dish);
    }

    public static HashMap<String, Object> getItemsByDeliveryOrderStateCustomerEmail(DeliveryOrderDao deliveryOrderDao, String[] state, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> order = new LinkedHashMap<String, Object>();
        for (String s : state) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            p_t.put("customerEmail", param.get("customerEmail"));
            p_t.put("orderState", s);
            List<LinkedHashMap<String, Object>> order_t = deliveryOrderDao.getOrderByCustomerEmailAndOrderState(p_t);
            HMUtil.params2SubDataList(order, s, order_t);
        }
        return HMUtil.params2HM(0, order);
    }

    public static HashMap<String, Object> getItemsByPickupOrderStateCustomerEmail(PickupOrderDao pickupOrderDao, String[] state, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> order = new LinkedHashMap<String, Object>();
        for (String s : state) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            p_t.put("customerEmail", param.get("customerEmail"));
            p_t.put("orderState", s);
            List<LinkedHashMap<String, Object>> order_t = pickupOrderDao.getOrderByCustomerEmailAndOrderState(p_t);
            HMUtil.params2SubDataList(order, s, order_t);
        }
        return HMUtil.params2HM(0, order);
    }

    public static HashMap<String, Object> getItemsByDeliveryOrderStateRestaurantEmail(DeliveryOrderDao deliveryOrderDao, String[] state, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> order = new LinkedHashMap<String, Object>();
        for (String s : state) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            p_t.put("restaurantEmail", param.get("restaurantEmail"));
            p_t.put("orderState", s);
            List<LinkedHashMap<String, Object>> order_t = deliveryOrderDao.getOrderByRestaurantEmailAndOrderState(p_t);
            HMUtil.params2SubDataList(order, s, order_t);
        }
        return HMUtil.params2HM(0, order);
    }

    public static HashMap<String, Object> getItemsByPickupOrderStateRestaurantEmail(PickupOrderDao pickupOrderDao, String[] state, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> order = new LinkedHashMap<String, Object>();
        for (String s : state) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            p_t.put("restaurantEmail", param.get("restaurantEmail"));
            p_t.put("orderState", s);
            List<LinkedHashMap<String, Object>> order_t = pickupOrderDao.getOrderByRestaurantEmailAndOrderState(p_t);
            HMUtil.params2SubDataList(order, s, order_t);
        }
        return HMUtil.params2HM(0, order);
    }

    public static HashMap<String, Object> getItemsByDeliveryOrderStateDeliveryGuyEmail(DeliveryOrderDao deliveryOrderDao, String[] state, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> order = new LinkedHashMap<String, Object>();
        for (String s : state) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            p_t.put("deliveryGuyEmail", param.get("deliveryGuyEmail"));
            p_t.put("orderState", s);
            List<LinkedHashMap<String, Object>> order_t = deliveryOrderDao.getOrderByDeliveryGuyEmailAndOrderState(p_t);
            HMUtil.params2SubDataList(order, s, order_t);
        }
        return HMUtil.params2HM(0, order);
    }

    public static HashMap<String, Object> getItemsByActiveStateCustomerEmail(ReservationDao reservationDao, HashMap<String, Object> param) {
        LinkedHashMap<String, Object> reservation = new LinkedHashMap<String, Object>();
        HMUtil.params2SubDataList(reservation, "active", reservationDao.getActiveReservationByCustomerEmail(param));
        HMUtil.params2SubDataList(reservation, "inactive", reservationDao.getInactiveReservationByCustomerEmail(param));

        return HMUtil.params2HM(0, reservation);
    }

    public static <K, V> List<HashMap<K, V>> objectDish2ListHM(HashMap<String, Object> param, Class<K> kClass, Class<V> vClass) {
        Object object = param.get("dish");

        List<HashMap<K, V>> result = new ArrayList<>();
        if (object instanceof List<?>) {
            for (Object o : (List<?>) object) {
                if (o instanceof HashMap<?, ?>) {
                    HashMap<K, V> map = new HashMap<>();
                    for (Map.Entry<?, ?> entry : ((HashMap<?, ?>) o).entrySet()) {
                        map.put(kClass.cast(entry.getKey()), vClass.cast(entry.getValue()));
                    }
                    result.add(map);
                }
            }
            return result;
        }
        return null;
    }
}
