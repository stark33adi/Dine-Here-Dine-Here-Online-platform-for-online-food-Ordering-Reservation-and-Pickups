package com.rest.service.imp;

import com.rest.dao.PickupOrderDao;
import com.rest.service.PickupOrderService;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Service("pickupOrderService")
public class ImpPickupOrderService implements PickupOrderService {

    @Autowired
    private PickupOrderDao pickupOrderDao;

    @Override
    public HashMap<String, Object> getOrderByCustomerEmail(HashMap<String, Object> param) {
        try {
            String[] orderState = new String[]{"0", "1", "2", "3"};
            return HMUtil.getItemsByPickupOrderStateCustomerEmail(pickupOrderDao, orderState, param);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getOrderByRestaurantEmail(HashMap<String, Object> param) {
        try {
            String[] orderState = new String[]{"0", "1", "2"};
            return HMUtil.getItemsByPickupOrderStateRestaurantEmail(pickupOrderDao, orderState, param);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getOrderByOrderNumber(HashMap<String, Object> param) {
        try {
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", pickupOrderDao.getOrderByOrderNumber(param)));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> addNewOrder(HashMap<String, Object> param) {
        try {
            String maxOrderNumber = pickupOrderDao.getMaxOrderNumber();
            if (maxOrderNumber == null || maxOrderNumber.equals("99999")) {
                maxOrderNumber = "00001";
            } else {
                String num = String.valueOf(Integer.parseInt(maxOrderNumber) + 1);
                int length = num.length();
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < 5 - length; i++) {
                    sb.append("0");
                }
                maxOrderNumber = sb.toString() + num;
            }
            param.put("orderNumber", maxOrderNumber);
            param.put("orderState", 0);
            String genDate = DatetimeUtil.getCurrentDatetime();
            param.put("genDate", genDate);
            pickupOrderDao.addInitialOrderStateToOrder(param);
            pickupOrderDao.addToOrderList(param);

            List<HashMap<String, Object>> dish = HMUtil.objectDish2ListHM(param, String.class, Object.class);
            // might have bug below
            // List<HashMap<String, Object>> dish = (ArrayList<HashMap<String, Object>>) param.get("dish");
            if (dish != null) {
                for (HashMap<String, Object> hMap : dish) {
                    HashMap<String, Object> param_t = new HashMap<String, Object>();
                    param_t.put("orderNumber", maxOrderNumber);
                    param_t.put("dishId", hMap.get("dishId"));
                    param_t.put("dishCount", hMap.get("dishCount"));
                    param_t.put("genDate", genDate);
                    pickupOrderDao.addDishToOrder(param_t);
                }
            }

            LinkedHashMap<String, Object> data = new LinkedHashMap<String, Object>();
            data.put("orderNumber", maxOrderNumber);

            return HMUtil.params2HM(0, data);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    public HashMap<String, Object> trackOrder(HashMap<String, Object> param) {
        try {
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", pickupOrderDao.trackOrder(param)));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> updateOrderState(HashMap<String, Object> param) {

        try {
            int errorCode = 2;
            String genDate = DatetimeUtil.getCurrentDatetime();
            param.put("genDate", genDate);

            if ((String)param.get("customerEmail") != null) {
                /* for customer
                searching for all the order whose orderState is 2
                place order success: 0
                confirm order is picked up: 3
                */
                if (pickupOrderDao.getMaxOrderStateOfSingleOrder(param) == 2) {
                    param.put("orderState", 3);
                    pickupOrderDao.updateOrderState(param);
                    errorCode = 0;
                }
            } else if ((String)param.get("restaurantEmail") != null) {
                /* for restaurant
                searching for all the order whose orderState is 0
                dish ready: 2
                */
                if (pickupOrderDao.getMaxOrderStateOfSingleOrder(param) == 0) {
                    param.put("orderState", 2);
                    pickupOrderDao.updateOrderState(param);
                    errorCode = 0;
                }
            }
            return HMUtil.integerToHM(errorCode);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> restaurantCancelOrder(HashMap<String, Object> param) {
        try {
            int errorCode = 2;
            String genDate = DatetimeUtil.getCurrentDatetime();
            param.put("genDate", genDate);

            if ((String) param.get("restaurantEmail") != null) {
                /* for restaurant
                searching for all the order whose orderState is 0
                can't make the order: 1
                can make the order: 0(do nothing)
                */
                if (pickupOrderDao.getMaxOrderStateOfSingleOrder(param) == 0) {
                    param.put("orderState", 1);
                    pickupOrderDao.updateOrderState(param);
                    errorCode = 0;
                }
            }
            return HMUtil.integerToHM(errorCode);
        } catch (Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }
}
