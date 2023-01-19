package com.rest.service.imp;

import com.rest.dao.CustomerDao;
import com.rest.model.Customer;
import com.rest.service.CustomerService;
import com.rest.util.DatetimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service("customerService")
public class ImpCustomerService implements CustomerService {

    @Autowired
    CustomerDao customerDao;

    @Override
    public HashMap<String,Object> loginByEmail(String email, String password) {
        HashMap<String,Object> return_data = new HashMap<>();
        try{
            if (!customerDao.CustomerIsExist(email)) {
                // customer not exist
                return_data.put("result",2);
            } else {
                String password_t = (String) customerDao.getPwdByEmail(email).get(0).get("password");
                if (password_t.equals(password)) {
                    // login success
                    return_data.put("result",0);
                } else {
                    // wrong password
                    return_data.put("result",3);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return_data.put("result",1);
        }

        return return_data;
    }

    @Override
    public HashMap<String,Object> signUp(String email, String password, String firstName, String lastName, String address, String zipcode, String phone, String photo) {
        HashMap<String,Object> return_data = new HashMap<>();
        if (customerDao.CustomerIsExist(email)) {
            return_data.put("result",2);
        } else {
            try {
                String regDate = DatetimeUtil.getCurrentDate();
                Customer customer_t = new Customer(0, email, password, firstName, lastName, address, zipcode, phone, photo, regDate, regDate);
                customerDao.signUp(customer_t);
                return_data.put("result",0);
            } catch (Exception e) {
                e.printStackTrace();
                return_data.put("result",1);
            }
        }
        return return_data;
    }

    @Override
    public HashMap<String,Object> forgetPassword(String email, String newPassword) {
        HashMap<String,Object> return_data = new HashMap<>();
        if (!customerDao.CustomerIsExist(email)) {
            return_data.put("result",2);
            return return_data;
        } else {
            try {
                String genDate = DatetimeUtil.getCurrentDate();
                Customer customer_t = new Customer(0, email, newPassword, null, null, null, null, null, null, genDate, null);
                customerDao.updatePassword(customer_t);
                return_data.put("result",0);
                return return_data;
            } catch (Exception e) {
                e.printStackTrace();
                return_data.put("result",1);
                return return_data;
            }
        }
    }

    @Override
    public HashMap<String,Object> updatePassword(String email, String oldPassword, String newPassword) {
        HashMap<String,Object> return_data = new HashMap<>();
        String oldPassword_t = (String) customerDao.getPwdByEmail(email).get(0).get("password");
        if (oldPassword_t.equals(oldPassword)) {
            try {
                String genDate = DatetimeUtil.getCurrentDate();
                Customer customer_t = new Customer(0, email, newPassword, null, null, null, null, null, null, genDate, null);
                customerDao.updatePassword(customer_t);
                return_data.put("result",0);
                return return_data;
            } catch (Exception e) {
                e.printStackTrace();
                return_data.put("result",1);
                return return_data;
            }
        } else {
            return_data.put("result",2);
            return return_data;
        }
    }

    @Override
    public HashMap<String,Object> updateProfile(String email,String firstName,String lastName,String address,String zipcode,String phone,String photo) {
        HashMap<String,Object> return_data = new HashMap<>();
        try {
            if (!customerDao.CustomerIsExist(email)) {
                //email exist
                return_data.put("result",2);
            }else{
                HashMap<String,Object> param = new HashMap<>();
                param.put("email", email);
                param.put("firstName",firstName);
                param.put("lastName",lastName);
                param.put("address",address);
                param.put("zipcode",zipcode);
                param.put("phone",phone);
                param.put("photo",photo);
                customerDao.updateProfile(param);
                return_data.put("result",0);
            }
            return return_data;
        } catch (Exception e) {
            e.printStackTrace();
            return_data.put("result",1);
            return return_data;
        }
    }

    @Override
    public HashMap<String,Object> checkPhone(String phone) {
        HashMap<String,Object> return_data = new HashMap<>();
        try {
            Integer result = customerDao.checkPhone(phone);
            if(result == 1){
                // find one
                return_data.put("result",0);
            }else if(result == 0){
                // doesn't find phone
                return_data.put("result",2);
            }else{
                // trap state
                return_data.put("result",3);
            }
            return return_data;

        } catch (Exception e) {
            e.printStackTrace();
            return_data.put("result",1);
            return return_data;
        }
    }

    @Override
    public HashMap<String,Object> getProfile(String email) {
        HashMap<String,Object> return_data = new HashMap<>();
        try {
            HashMap<String,String> customer_profile = customerDao.getProfile(email);
            return_data.put("result",0);
            return_data.put("data",customer_profile);
        }catch (Exception e){
            e.printStackTrace();
            return_data.put("result",1);
        }
        return return_data;
    }

    @Override
    public HashMap<String,Object> testPhoto(){
        HashMap<String,Object> return_data = new HashMap<>();
        try{
            HashMap<String,String> photos = customerDao.testPhoto();
            return_data.put("result",0);
            return_data.put("data",photos);
        }catch (Exception e){
            e.printStackTrace();
            return_data.put("result",1);
        }
        return return_data;
    }
}
