package com.rest.service.imp;

import com.rest.dao.DeliveryOrderDao;
import com.rest.service.DeliveryOrderService;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Service("deliveryOrderService")
public class ImpDeliveryOrderService implements DeliveryOrderService {

    @Autowired
    private DeliveryOrderDao deliveryOrderDao;

    @Override
    public HashMap<String, Object> getOrderByCustomerEmail(HashMap<String, Object> param) {
        try {
            String[] orderState = new String[]{"0", "1", "2", "3", "4", "5"};
            return HMUtil.getItemsByDeliveryOrderStateCustomerEmail(deliveryOrderDao, orderState, param);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getOrderByRestaurantEmail(HashMap<String, Object> param) {
        try {
            String[] orderState = new String[]{"0", "1", "2"};
            return HMUtil.getItemsByDeliveryOrderStateRestaurantEmail(deliveryOrderDao, orderState, param);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getOrderByDeliveryGuyEmail(HashMap<String, Object> param) {
        try {
            String[] orderState = new String[]{"3", "4"};
            return HMUtil.getItemsByDeliveryOrderStateDeliveryGuyEmail(deliveryOrderDao, orderState, param);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getOrderByOrderNumber(HashMap<String, Object> param) {
        try {
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", deliveryOrderDao.getOrderByOrderNumber(param)));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getNotTakenDeliveryOrder() {
        try {
            HashMap<String, Object> param = new HashMap<String, Object>();
            param.put("orderState", 2);
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", deliveryOrderDao.getNotTakenOrder(param)));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }

    }

    @Override
    public HashMap<String, Object> takeDeliveryOrder(HashMap<String, Object> param) {
        /*for deliveryGuy
        they already get all orders whose order states are 2
        if they take them: 2 -> 3
        not take: 2(do nothing)
        */
        try {
            deliveryOrderDao.takeDeliveryOrder(param);
            param.put("orderState", 3);
            String genDate = DatetimeUtil.getCurrentDatetime();
            param.put("genDate", genDate);
            deliveryOrderDao.updateOrderState(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> addNewOrder(HashMap<String, Object> param) {
        try {
            String maxOrderNumber = deliveryOrderDao.getMaxOrderNumber();
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
            deliveryOrderDao.addInitialOrderStateToOrder(param);
            deliveryOrderDao.addToOrderList(param);

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
                    deliveryOrderDao.addDishToOrder(param_t);
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
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "order", deliveryOrderDao.trackOrder(param)));
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
                searching for all the order whose orderState is 4
                place order success: 0
                confirm order is delivered: 5
                */
                if (deliveryOrderDao.getMaxOrderStateOfSingleOrder(param) == 4) {
                    param.put("orderState", 5);
                    deliveryOrderDao.updateOrderState(param);
                    errorCode = 0;
                }
            } else if ((String)param.get("restaurantEmail") != null) {
                /* for restaurant
                searching for all the order whose orderState is 0
                dish ready: 2
                */
                if (deliveryOrderDao.getMaxOrderStateOfSingleOrder(param) == 0) {
                    param.put("orderState", 2);
                    deliveryOrderDao.updateOrderState(param);
                    errorCode = 0;
                }
            } else if ((String)param.get("deliveryGuyEmail") != null) {
                /* for delivery guy
                searching for all the order whose orderState is 3
                on delivery: 3
                delivered: 4
                */
                if (deliveryOrderDao.getMaxOrderStateOfSingleOrder(param) == 3) {
                    param.put("orderState", 4);
                    deliveryOrderDao.updateOrderState(param);
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
                if (deliveryOrderDao.getMaxOrderStateOfSingleOrder(param) == 0) {
                    param.put("orderState", 1);
                    deliveryOrderDao.updateOrderState(param);
                    errorCode = 0;
                }
            }
            return HMUtil.integerToHM(errorCode);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    public HashMap<String, Object> deliveryGuyGetTips(HashMap<String, Object> param) {
        try {
            LinkedHashMap<String, Object> deliveryGuyTips = deliveryOrderDao.getTip(param);
            return HMUtil.params2HM(0, deliveryGuyTips);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }
}
