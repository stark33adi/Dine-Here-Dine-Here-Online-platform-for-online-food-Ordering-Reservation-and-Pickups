package com.rest.service.imp;

import com.rest.dao.DishDao;
import com.rest.service.DishService;
import com.rest.util.DatetimeUtil;
import com.rest.util.HMUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Link;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@Service("dishService")
public class ImpDishService implements DishService {

    @Autowired
    private DishDao dishDao;

    @Override
    public HashMap<String, Object> getAllDishOfOneRestaurantByEmailAndDishType(HashMap<String, Object> param) {
        try {
//            String[] dishType = new String[]{"maincourse", "slides"};
            List<String> dishType = dishDao.getAllDishTypeByEmail(param);
            return HMUtil.getItemsByDishType(dishDao, dishType, param);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getAllDishOfAllRestaurantByDishType() {
        try {
            LinkedHashMap<String, Object> dish = new LinkedHashMap<String, Object>();
//            String[] dishType = new String[]{"PIZZA", "slides"};
            List<String> dishType = dishDao.getAllDishType();
            for (String s : dishType) {
                HashMap<String, Object> p_t = new HashMap<String, Object>();
                p_t.put("dishType", s);
                List<LinkedHashMap<String, Object>> dish_t = dishDao.getDishProfileByDishType(p_t);
                HMUtil.params2SubDataList(dish, s, dish_t);
            }
            return HMUtil.params2HM(0, dish);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getAllDishByRestaurantEmail(HashMap<String, Object> param) {
        try {
            List<LinkedHashMap<String, Object>> dishList = dishDao.getDishProfileByRestaurantEmail(param);
            return HMUtil.paramsList2HM(0, dishList);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> getProfileByDishId(HashMap<String, Object> param) {
        try {
            return HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "dish", dishDao.getProfileByDishId(param)));
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> addNewDish(HashMap<String, Object> param) {
        try {
            String regDate = DatetimeUtil.getCurrentDate();
            param.put("regDate", regDate);
            if (dishDao.dishIsExist(param)) {
                return HMUtil.integerToHM(2);
            } else {
                dishDao.addNewDish(param);
                return HMUtil.integerToHM(0);
            }
        }catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> updateDishProfileByEmailAndDishId(HashMap<String, Object> param) {
        try {
            String genDate = DatetimeUtil.getCurrentDate();
            param.put("genDate", genDate);
            dishDao.updateDishProfileByEmailAndDishId(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }

    @Override
    public HashMap<String, Object> deleteDishProfileByEmailAndDishId(HashMap<String, Object> param) {
        try {
            dishDao.deleteDishProfileByEmailAndDishId(param);
            return HMUtil.integerToHM(0);
        } catch(Exception e) {
            e.printStackTrace();
            return HMUtil.integerToHM(1);
        }
    }
}
