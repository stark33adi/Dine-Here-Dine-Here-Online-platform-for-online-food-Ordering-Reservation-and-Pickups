package com.rest.dao;

import com.rest.model.Customer;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public interface CustomerDao {
    // admin
    public List<Customer> findAll();

    public void addProfile(Customer customer);

    public void deleteProfile(String email);

    // user
    public boolean CustomerIsExist(String email);

    public List<LinkedHashMap<String, Object>> getPwdByEmail(String email);

    public void signUp(Customer customer);

    public void updatePassword(Customer customer);

    public void updateProfile(HashMap<String,Object> param);

    public Integer checkPhone(String phone);

    public HashMap<String,String> getProfile(String email);

    public HashMap<String,String> testPhoto();

}
