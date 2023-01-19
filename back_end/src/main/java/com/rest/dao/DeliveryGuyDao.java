package com.rest.dao;

import com.rest.model.DeliveryGuy;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface DeliveryGuyDao {

    public boolean deliveryGuyEmailIsExist(HashMap<String, Object> param);

    public LinkedHashMap<String, Object> getPasswordByDeliveryGuyEmail(HashMap<String, Object> param);

    public LinkedHashMap<String, Object> getProfileByDeliveryGuyEmail(HashMap<String, Object> param);

    public void addProfile(HashMap<String, Object> param);

    public void updatePassword(HashMap<String, Object> param);

    public void updateProfile(HashMap<String, Object> param);


}
