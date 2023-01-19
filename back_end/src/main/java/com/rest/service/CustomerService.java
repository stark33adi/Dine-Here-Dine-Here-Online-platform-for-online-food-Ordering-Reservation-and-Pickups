package com.rest.service;

import java.util.HashMap;

public interface CustomerService {

    public HashMap<String,Object> loginByEmail(String email, String password);

    public HashMap<String,Object> signUp(String email, String password, String firstName, String lastName, String address, String zipcode, String phone, String photo);

    public HashMap<String,Object> forgetPassword(String email, String password);

    //public String getProfileByCustomerId(Integer CustomerId);

    public HashMap<String,Object> updatePassword(String email, String oldPassword, String newPassword);

    public HashMap<String,Object> updateProfile(String email,String firstName,String lastName,String address,String zipcode,String phone,String photo);

    public HashMap<String,Object> checkPhone(String phone);

    public HashMap<String,Object> getProfile(String email);

    public HashMap<String,Object> testPhoto();

}
