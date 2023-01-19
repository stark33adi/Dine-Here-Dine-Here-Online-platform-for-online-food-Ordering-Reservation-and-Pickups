package com.rest.test;

import com.rest.dao.CustomerDao;
import com.rest.util.HMUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringCustomerTest {

    @Autowired
    private CustomerDao customerDao;

//    @Test
//    public void testEmailIsExist() {
//        HashMap<String, Object> param = new HashMap<String, Object>();
//        param.put("email", "jack@gmail.com");
//        boolean user = customerDao.emailIsExist(param);
//        System.out.println(user);
//    }
//
//    @Test
//    public void testGetUserPwdByEmail() {
//        HashMap<String, Object> param = new HashMap<String, Object>();
//        param.put("email", "jack@gmail.com");
//        List<LinkedHashMap<String, Object>> user = customerDao.getPwdByEmail(param);
//        System.out.println(HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "user", user)));
//    }
//
//    @Test
//    public void testGetProfileByUserId() {
//        HashMap<String, Object> param = new HashMap<String, Object>();
//        param.put("email", "jack@gmail.com");
//        List<LinkedHashMap<String, Object>> user = customerDao.getProfileByEmail(param);
//        System.out.println("User: "+ HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "user", user)));
//    }

    @Test
    public void testUpdateProfile() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "emily@gmail.com");
        param.put("address", "175 Freeman street");
        param.put("firstName", "emily");
        param.put("lastName", "fouler");
        param.put("phone", "phone");
        param.put("photo", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAAtCAMAAAAOeonsAAAAOVBMVEVAREtFUYfY0LVyR0tSkL3SuI6nxts2OT+5vL/Q19eAq8+6m1hrbW6BipSnpaSmflCOZ0u0ExL0AADhoDI+AAAC9UlEQVRo3u2bi5KrIAyG5SIFBbXn/R/2JICIQu1tV51z8s/sdkxTCJ9JUDttbrdbQ/pWxJBEIpFIJBKJRCKR/m9ZN2g9OEskvmAICIMG4vipnM7kiMf3EB9iZG5aHb06euG5NazGfTbYWPqzdwb4vXLWG1WLWhrdM9WnQy521pqPUHhuDcugjVTGmH4nVtmu/OfAdgM4RnNPbJq5Nz6Kn3XjSxS79kOKXY9U+vcotk8CODYVE8VqMm6C/R2KTxFclqIrKbpaQRs9sgE6UGc4vEhutWlFbEzaaHhHjtLbwEOHpGWd1gqhSc0HUTMEipiDgENkVNkgpBYNgxGnbIp28Wd+AB8YLMJwP4bGoyWAwws6o1gpaaeAHVMQIYdLyxGDH5wKp1xqZzvu6TkH9eh9PQnVWofQOj5afC0MkZpPT59A4W3/WeTMTOuHnqeIFBf/GBhcoeHM0A1slwVwnCLBB4frvogUIzk+rYopAI5rmwvKLxb+MTOiR18aIkU8Dra0uzCVSKk+TREpev9oTkGA79wsjq/oNylKSLgEKAYLdWpMBJxT9OsEz7A4sBaG2UstBFjAGCApDtGYNk0x98WMWAgCShrcAP0gTqH4WkUnirAev5yMooSyS2n6GUUwpE0jmCPF3qLSFDNF8E8J7wPjzhuYU6a97u6yUMR18hVFXFadYhuhmSm4FYbl44OZVptuoJifj5wi+MdYvCnrk5DL07WvdHAdTiz1lFHsahWNzdP3N6SH5ApDytjOly2WY+x3LOYttt8+TZGudKCxiDVFiRWN2zk/g+I7V92YcND/+baioSfluSjnLQKdB783G2wDFUOqe+MzzOBQYqEYppvSFIkiS9fmITDwwnNrwu4k9++AzrsDzPzL9+1Dg93ek9mdm7RbbXAralMwPdW80rDH3wK+9jRitdjTdULNXvrJ2J97c9/8iaePdgwXl6N47lPae8HxgoRe5EjfGJBIJBKJRCKRSCTSPyf61dCPUKRfsP0MRdK3+gtjAS+TEkHM+gAAAABJRU5ErkJggg==");
        param.put("zipcode", "51234");

        customerDao.updateProfile(param);


    }
}
