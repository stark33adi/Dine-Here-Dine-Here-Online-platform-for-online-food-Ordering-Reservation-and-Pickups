package com.rest.service.imp;

import com.rest.dao.RestaurantDao;
import com.rest.model.Restaurant;
import com.rest.service.RestaurantService;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Service("restaurantService")
public class ImpRestaurantService implements RestaurantService {

    @Autowired
    private RestaurantDao restaurantDao;

    @Override
    public HashMap<String, Object> login(HashMap<String, Object> param) {
        try {
            if (!restaurantDao.restEmailIsExist(param)) {
                return HMUtil.integerToHM(3);
            } else {
                String password_t = (String) restaurantDao.getPwdByEmail(param).get(0).get("password");
                if (password_t.equals(param.get("password"))) {
                    return HMUtil.integerToHM(0);
                } else {
                    return HMUtil.integerToHM(2);
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> phoneIsExist(HashMap<String, Object> param) {
        try {
            if (restaurantDao.restPhoneIsExist(param)) {
                return HMUtil.integerToHM(0);
            } else {
                return HMUtil.integerToHM(2);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> addNewRestaurant(HashMap<String, Object> param) {
        try {
            if (restaurantDao.restEmailIsExist(param)) {
                return HMUtil.integerToHM(2);
            } else {
                String regDate = DatetimeUtil.getCurrentDate();
                param.put("regDate", regDate);
                restaurantDao.addNewRestAcc(param);
                Integer maxId = restaurantDao.getMaxId();
                param.put("restaurantId", maxId);
                restaurantDao.addNewRestList(param);
                return HMUtil.integerToHM(0);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> checkForgetPassword(HashMap<String, Object> param) {
        try {
            if (!restaurantDao.restEmailIsExist(param)) {
                return HMUtil.integerToHM(2);
            } else {
                String genDate = DatetimeUtil.getCurrentDate();
                param.put("genDateFromAcc", genDate);
                restaurantDao.updateRestAccPassword(param);
                return HMUtil.integerToHM(0);

            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getAllRest(HashMap<String, Object> param) {
        try {
//            String[] restaurantType = new String[]{"pizza", "burger"};
            List<String> restaurantType = restaurantDao.getAllRestaurantType();
            return HMUtil.getItemsByRestaurantType(restaurantDao, restaurantType, param);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getRestaurantList() {
        try {
            List<LinkedHashMap<String, Object>> restaurantList = restaurantDao.getRestaurantList();
            return HMUtil.paramsList2HM(0, restaurantList);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getSecurityProfileByEmail(HashMap<String, Object> param) {
        try {
            List<LinkedHashMap<String,Object>> restaurant = restaurantDao.getRestAccSecurityProfileByEmail(param);
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "rest", restaurant));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getProfileByEmail(HashMap<String, Object> param) {
        /*
        some thoughts:

            incoming params: email
                sign up -> rest profile
                after login: rest profile
        */

        try {
            List<LinkedHashMap<String,Object>> restaurant = restaurantDao.getRestListProfileByEmail(param);
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "rest", restaurant));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> updatePassword(HashMap<String, Object> param) {
        try {
            String password_t = (String) restaurantDao.getPwdByEmail(param).get(0).get("password");
            if (password_t.equals(param.get("password"))) {
                String genDate = DatetimeUtil.getCurrentDate();
                param.put("genDateFromAcc", genDate);
                restaurantDao.updateRestAccPassword(param);
                return HMUtil.integerToHM(0);
            } else {
                return HMUtil.integerToHM(2);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> updateSecurityProfile(HashMap<String, Object> param) {
        try {
            String genDate = DatetimeUtil.getCurrentDate();
            param.put("genDateFromAcc", genDate);
            restaurantDao.updateRestAccSecurityProfile(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> updateProfile(HashMap<String, Object> param) {
        try {
            String genDate = DatetimeUtil.getCurrentDate();
            param.put("genDateFromList", genDate);
            restaurantDao.updateRestListProfile(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getPhoto(HashMap<String, Object> param) {
        try {
            List<LinkedHashMap<String,Object>> restaurant = restaurantDao.getPhoto(param);
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String,Object>(), "rest", restaurant));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> addPhoto(HashMap<String, Object> param) {
        try {
            restaurantDao.addPhoto(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> filter(List<String> restaurantTypeFilter, String rateValueFilter, String deliveryTimeFilter, String foodTypeFilter) {
        try {
            LinkedHashMap<String, Object> restaurant = new LinkedHashMap<String, Object>();
            if (restaurantTypeFilter == null || restaurantTypeFilter.size() == 0) {
                restaurantTypeFilter = restaurantDao.getAllRestaurantType();
            }
            if (foodTypeFilter == null || foodTypeFilter.length() == 0) {
                List<String> allFoodType = restaurantDao.getAllFoodType();
                StringBuilder sb = new StringBuilder();
                boolean flag = false;
                for (String s : allFoodType) {
                    if (flag) {
                        sb.append(",");
                    }
                    if (!flag) {
                        flag = true;
                    }
                    sb.append(s);
                }
                foodTypeFilter = sb.toString();
            }
            System.out.println("foodTypeFilter: " + foodTypeFilter);
            for (String s : restaurantTypeFilter) {
                HashMap<String, Object> p_t = new HashMap<String, Object>();
                p_t.put("restaurantTypeFilter", s);
                p_t.put("rateValueFilter", rateValueFilter);
                p_t.put("deliveryTimeFilter", deliveryTimeFilter);
                p_t.put("foodTypeFilter", foodTypeFilter);
                List<LinkedHashMap<String, Object>> rest_t = restaurantDao.filter(p_t);
                HMUtil.params2SubDataList(restaurant, s, rest_t);

            }
            return HMUtil.params2HM(0, restaurant);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }

    }
}
