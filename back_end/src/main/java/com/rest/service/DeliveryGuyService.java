package com.rest.service;

import java.util.HashMap;

public interface DeliveryGuyService {

    public HashMap<String, Object> login(HashMap<String, Object> param);

    public HashMap<String, Object> signUp(HashMap<String, Object> param);

    public HashMap<String, Object> getProfileByDeliveryGuyEmail(HashMap<String, Object> param);

//    public HashMap<String, Object> forgetPassword(HashMap<String, Object> param);

    public HashMap<String, Object> updatePassword(HashMap<String, Object> param);

    public HashMap<String, Object> updateProfile(HashMap<String, Object> param);


}
