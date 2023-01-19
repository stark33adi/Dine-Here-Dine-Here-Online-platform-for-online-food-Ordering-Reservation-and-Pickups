package com.rest.test;

import com.alibaba.fastjson.JSON;
import com.rest.dao.RestaurantDao;
import com.rest.model.Restaurant;
import com.rest.util.Base64Util;
import com.rest.util.DatetimeUtil;

import com.rest.util.HMUtil;
import jdk.nashorn.internal.codegen.ObjectClassGenerator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringRestaurantTest {
    @Autowired
    private RestaurantDao restaurantDao;

    @Test
    public void testFindAllAcc() {
        LinkedHashMap<String,Object> params = new LinkedHashMap<String, Object>();
        LinkedHashMap<String,Object> map = new LinkedHashMap<String, Object>();

        List<LinkedHashMap<String,Object>> rest_acc = restaurantDao.findAllFromAcc();
        System.out.println(rest_acc);
        map.put("rest", rest_acc);
//        map.put("rest1", rest_acc);
//        map.put("rest2", rest_acc);
        params.put("result", 0);
        params.put("date", map);
//        System.out.println(map);
//        System.out.println(params);
        System.out.println(params);

    }

    @Test
    public void testFindAllList() {
        List<LinkedHashMap<String,Object>> rest_list = restaurantDao.findAllFromList();
        System.out.println(HMUtil.params2HM(0, HMUtil.params2SubDataList(HMUtil.params2SubDataList(new LinkedHashMap<String,Object>(), "rest1", rest_list), "rest2", rest_list)));
    }

    @Test
    public void testGetAllRestaurantType() {
        List<String> restaurantType = restaurantDao.getAllRestaurantType();
        for (String i : restaurantType) {
            System.out.println(i);
        }
    }

    @Test
    public void testGetAllFoodType() {
//        List<String> foodType = restaurantDao.getAllFoodType();
//        for (String i : foodType) {
//            System.out.println(i);
//        }

        String foodTypeFilter = new String("Non-Veg,Gluten-Free");

        if (foodTypeFilter == null || foodTypeFilter.length() == 0) {
            List<String> allFoodType = restaurantDao.getAllFoodType();
            StringBuilder sb = new StringBuilder();
            for (String s : allFoodType) {
                sb.append(s);
            }
            foodTypeFilter = sb.toString();
        }

        System.out.println("foodTypeFilter: "+foodTypeFilter);

    }

    @Test
    public void testRestAccIsExist() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        boolean result = restaurantDao.restEmailIsExist(param);
        System.out.println(result);

    }

    @Test
    public void testFindRestFromListByRestType() {
//        String restaurantType = "pizza";
//        List<LinkedHashMap<String, Object>> restuarant = restaurantDao.findRestFromListByRestType(restaurantType);
//        System.out.println(restuarant);
//        String[] restaurantType1 = new String[]{"pizza", "burger"};
        HashMap<String, Object> param = new HashMap<String, Object>();
//        param.put("serviceType", "Delivery");
//        param.put("serviceType", "Pickup");
//        param.put("serviceType", "Reservation");
        List<String> restaurantType = restaurantDao.getAllRestaurantType();
//        System.out.println("result: "+restaurantType);
        HashMap<String, Object> result = HMUtil.getItemsByRestaurantType(restaurantDao, restaurantType, param);
        System.out.println("result: "+result);
    }

    @Test
    public void testRestPhoneIsExist() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("phone", "1111111");
        boolean result = restaurantDao.restPhoneIsExist(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testGetRestAccIdAndPwdByEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        List<LinkedHashMap<String,Object>> restaurant = restaurantDao.getPwdByEmail(param);
        String password = (String) restaurantDao.getPwdByEmail(param).get(0).get("password");
        String result = JSON.toJSONString(restaurant);
        System.out.println(result);

        System.out.println(HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "rest", restaurant));
//        System.out.println(JsonUtil.paramsJsonString(0, JsonUtil.paramsSubData(new LinkedHashMap<String, Object>(), "rest", restaurant)));
    }

    @Test
    public void testGetRestAccSecurityProfileByEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        List<LinkedHashMap<String,Object>> restaurant = restaurantDao.getRestAccSecurityProfileByEmail(param);
        System.out.println(HMUtil.params2HM(0, HMUtil.params2SubDataList(new LinkedHashMap<String, Object>(), "rest", restaurant)));
//        String result = JSON.toJSONString(restaurant);
//        System.out.println(result);

    }

    @Test
    public void testAddNewRestAcc() {
        String regDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("restaurantId", 0);
        param.put("email", "1@gmail.com");
        param.put("password", "19");
        param.put("securityQuestion", "1");
        param.put("securityAnswer", "1");
        param.put("genDate", null);
        param.put("regDate", regDate);
        restaurantDao.addNewRestAcc(param);
    }

    @Test
    public void testGetMaxId() {
        Integer id = restaurantDao.getMaxId();
        System.out.println("id: "+id);

    }

    @Test
    public void testAddNewRestaurant() {
        String regDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("password", "19");
        param.put("securityQuestion", "1");
        param.put("securityAnswer", "1");
        param.put("genDate", null);
        param.put("regDate", regDate);
        restaurantDao.addNewRestAcc(param);
        Integer maxId = restaurantDao.getMaxId();
        System.out.println("maxId: "+maxId);
        param.put("restaurantId", maxId);
        param.put("email", "1@gmail.com");
        param.put("restaurantName", "restaurantName");
        param.put("restaurantAbbrName", "restaurantAbbrName");
        param.put("address", "address");
        param.put("phone", "1111111");
        param.put("bgPhoto", "base 64, photo");
        param.put("rateValue", 4.2);
        param.put("genDate", null);
        restaurantDao.addNewRestList(param);
    }

    @Test
    public void testGetRestListProfileByEmail() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        List<LinkedHashMap<String,Object>> restaurant = restaurantDao.getRestListProfileByEmail(param);
        double rateValue = (double) restaurant.get(0).get("rateValue");
        System.out.println("rateValue: "+rateValue);
        String result = JSON.toJSONString(restaurant);
        System.out.println(result);
    }

    @Test
    public void testUpdateRestAccPassword() {
        String genDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("password", "9876");
        param.put("genDate", genDate);
        restaurantDao.updateRestAccPassword(param);
    }

    @Test
    public void testUpdateRestAccSecurityProfile() {
        String genDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("securityQuestion", "1");
        param.put("securityAnswer", "1");
        param.put("genDate", genDate);
        restaurantDao.updateRestAccSecurityProfile(param);
    }

    @Test
    public void testUpdateRestListProfile() {
        String genDate = DatetimeUtil.getCurrentDate();
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("restaurantName", "restaurantName");
        param.put("restaurantAbbrName", "restaurantAbbrName");
        param.put("address", "address");
        param.put("phone", "1111111");
        param.put("bgPhoto", "base 64, photo");
        param.put("rateValue", 4.2);
        param.put("genDate", genDate);
        restaurantDao.updateRestListProfile(param);
    }

    @Test
    public void testAddPhoto() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("bgPhoto", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAAtCAMAAAAOeonsAAAAOVBMVEVAREtFUYfY0LVyR0tSkL3SuI6nxts2OT+5vL/Q19eAq8+6m1hrbW6BipSnpaSmflCOZ0u0ExL0AADhoDI+AAAC9UlEQVRo3u2bi5KrIAyG5SIFBbXn/R/2JICIQu1tV51z8s/sdkxTCJ9JUDttbrdbQ/pWxJBEIpFIJBKJRCKR/m9ZN2g9OEskvmAICIMG4vipnM7kiMf3EB9iZG5aHb06euG5NazGfTbYWPqzdwb4vXLWG1WLWhrdM9WnQy521pqPUHhuDcugjVTGmH4nVtmu/OfAdgM4RnNPbJq5Nz6Kn3XjSxS79kOKXY9U+vcotk8CODYVE8VqMm6C/R2KTxFclqIrKbpaQRs9sgE6UGc4vEhutWlFbEzaaHhHjtLbwEOHpGWd1gqhSc0HUTMEipiDgENkVNkgpBYNgxGnbIp28Wd+AB8YLMJwP4bGoyWAwws6o1gpaaeAHVMQIYdLyxGDH5wKp1xqZzvu6TkH9eh9PQnVWofQOj5afC0MkZpPT59A4W3/WeTMTOuHnqeIFBf/GBhcoeHM0A1slwVwnCLBB4frvogUIzk+rYopAI5rmwvKLxb+MTOiR18aIkU8Dra0uzCVSKk+TREpev9oTkGA79wsjq/oNylKSLgEKAYLdWpMBJxT9OsEz7A4sBaG2UstBFjAGCApDtGYNk0x98WMWAgCShrcAP0gTqH4WkUnirAev5yMooSyS2n6GUUwpE0jmCPF3qLSFDNF8E8J7wPjzhuYU6a97u6yUMR18hVFXFadYhuhmSm4FYbl44OZVptuoJifj5wi+MdYvCnrk5DL07WvdHAdTiz1lFHsahWNzdP3N6SH5ApDytjOly2WY+x3LOYttt8+TZGudKCxiDVFiRWN2zk/g+I7V92YcND/+baioSfluSjnLQKdB783G2wDFUOqe+MzzOBQYqEYppvSFIkiS9fmITDwwnNrwu4k9++AzrsDzPzL9+1Dg93ek9mdm7RbbXAralMwPdW80rDH3wK+9jRitdjTdULNXvrJ2J97c9/8iaePdgwXl6N47lPae8HxgoRe5EjfGJBIJBKJRCKRSCTSPyf61dCPUKRfsP0MRdK3+gtjAS+TEkHM+gAAAABJRU5ErkJggg==");
        restaurantDao.addPhoto(param);

    }
    @Test
    public void testGetAllPhoto() {
        List<LinkedHashMap<String,Object>> map = restaurantDao.getAllPhoto();
        System.out.println("all photo:");
        for (LinkedHashMap<String,Object> m : map) {
            System.out.println(m);
        }
    }

    @Test
    public void testGetPhoto() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("bgPhoto", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAAtCAMAAAAOeonsAAAAOVBMVEVAREtFUYfY0LVyR0tSkL3SuI6nxts2OT+5vL/Q19eAq8+6m1hrbW6BipSnpaSmflCOZ0u0ExL0AADhoDI+AAAC9UlEQVRo3u2bi5KrIAyG5SIFBbXn/R/2JICIQu1tV51z8s/sdkxTCJ9JUDttbrdbQ/pWxJBEIpFIJBKJRCKR/m9ZN2g9OEskvmAICIMG4vipnM7kiMf3EB9iZG5aHb06euG5NazGfTbYWPqzdwb4vXLWG1WLWhrdM9WnQy521pqPUHhuDcugjVTGmH4nVtmu/OfAdgM4RnNPbJq5Nz6Kn3XjSxS79kOKXY9U+vcotk8CODYVE8VqMm6C/R2KTxFclqIrKbpaQRs9sgE6UGc4vEhutWlFbEzaaHhHjtLbwEOHpGWd1gqhSc0HUTMEipiDgENkVNkgpBYNgxGnbIp28Wd+AB8YLMJwP4bGoyWAwws6o1gpaaeAHVMQIYdLyxGDH5wKp1xqZzvu6TkH9eh9PQnVWofQOj5afC0MkZpPT59A4W3/WeTMTOuHnqeIFBf/GBhcoeHM0A1slwVwnCLBB4frvogUIzk+rYopAI5rmwvKLxb+MTOiR18aIkU8Dra0uzCVSKk+TREpev9oTkGA79wsjq/oNylKSLgEKAYLdWpMBJxT9OsEz7A4sBaG2UstBFjAGCApDtGYNk0x98WMWAgCShrcAP0gTqH4WkUnirAev5yMooSyS2n6GUUwpE0jmCPF3qLSFDNF8E8J7wPjzhuYU6a97u6yUMR18hVFXFadYhuhmSm4FYbl44OZVptuoJifj5wi+MdYvCnrk5DL07WvdHAdTiz1lFHsahWNzdP3N6SH5ApDytjOly2WY+x3LOYttt8+TZGudKCxiDVFiRWN2zk/g+I7V92YcND/+baioSfluSjnLQKdB783G2wDFUOqe+MzzOBQYqEYppvSFIkiS9fmITDwwnNrwu4k9++AzrsDzPzL9+1Dg93ek9mdm7RbbXAralMwPdW80rDH3wK+9jRitdjTdULNXvrJ2J97c9/8iaePdgwXl6N47lPae8HxgoRe5EjfGJBIJBKJRCKRSCTSPyf61dCPUKRfsP0MRdK3+gtjAS+TEkHM+gAAAABJRU5ErkJggg==");
        List<LinkedHashMap<String,Object>> restaurant = restaurantDao.getPhoto(param);
        System.out.println("restaurant: "+restaurant);
        LinkedHashMap<String,Object> rest = HMUtil.params2SubDataList(new LinkedHashMap<String,Object>(), "rest", restaurant);
        System.out.println("rest: "+ HMUtil.params2HM(0, rest));

    }

    @Test
    public void testBase64 () {
//        byte[] b = "89504e470d0a1a0a0000000d49484452000001450000002d08030000000e7a89ec00000039504c544540444b455187d8d0b572474b5290bdd2b88ea7c6db36393fb9bcbfd0d7d780abcfba9b586b6d6e818a94a7a5a4a67e508e674bb41312f40000e1a0323e000002f54944415468deed9b8b92ab200c86e5220505b5e7fd1ff624808842ed6d579d73f2cfec764c53089f49503b6d6eb75b43fa56c49044229148241289442291fe6f5937683d384b24be6008088306e2f8a99ccee488c7f7101f62646e5a1dbd3a7ae1b935acc67d36d858fab37706f8bd72d61b558b5a1add33d5a7432e76d69a8f50786e0dcba08d54c6987e2756d9aefce7c076033846734f6c9ab9373e8a9f75e34b14bbf6438a5d8f54faf728b64f0238361513c56a326e82fd1d8a4f115c96a22b29ba5a411b3db2013a506738bc486eb569456c4cda6878478ed2dbc04387a4659dd60aa149cd075133048a988380436454d920a4160d8311a76c8a76f1677e001f182cc2703f86c6a32580c30b3aa3582969a7801d531021874bcb11831f9c0aa75c6a673beee93907f5e87d3d09d55a87d03a3e5a7c2d0c919a4f4f9f40e16dff59e4cc4ceb879ea7881417ff18185ca1e1ccd00d6c9705709c22c10787ebbe881423393ead8a29008e6b9b0bca2f16fe3133a2475f1a22453c0eb6b4bb309548a93e4d11297aff684e4180efdc2c8eafe837294a48b80428060b756a4c049c53f4eb04cfb038b01686d94b2d0458c01820290ed198364d31f7c58c5808024a1adc00fd204ea1f85a45278ab01ebf9c8ca284b24b69fa194530a44d239823c5dea2d2143345f04f09ef03e3ce1b9853a6bdeeeeb250c475f215455c569d621ba19929b81586e5e38399569b6ea0989f8f9c22f8c758bc29eb9390cbd3b5af74701d4e2cf59451ec6a158dcdd3f737a487e40a43cad8ce972d9663ec772ce62db6df3e4d91ae74a0b188354589158ddb393f83e23b57dd9870d0fff9b6a2a127e5b928e72d029d07bf371b6c031543aa7be333cce05062a118a69bd21489224bd7e62130f0c2736bc2ee24f7ef80cebb03ccfccbf7ed4383ddde93d99d9bb45b6d702b6a53303dd5bcd2b0c7df02bef63462b5d8d37542cd5efac9d89f7b73dffc89a78f760c1797a378ee53da7bc1f182845ee448df1890482412894422914824d23f27fad5d08f50a45fb0fd0c45d2b7fa0b63012f931241ccfa0000000049454e44ae426082".getBytes();
//        System.out.println("byte: "+ Arrays.toString(b));
        String base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAAtCAMAAAAOeonsAAAAOVBMVEVAREtFUYfY0LVyR0tSkL3SuI6nxts2OT+5vL/Q19eAq8+6m1hrbW6BipSnpaSmflCOZ0u0ExL0AADhoDI+AAAC9UlEQVRo3u2bi5KrIAyG5SIFBbXn/R/2JICIQu1tV51z8s/sdkxTCJ9JUDttbrdbQ/pWxJBEIpFIJBKJRCKR/m9ZN2g9OEskvmAICIMG4vipnM7kiMf3EB9iZG5aHb06euG5NazGfTbYWPqzdwb4vXLWG1WLWhrdM9WnQy521pqPUHhuDcugjVTGmH4nVtmu/OfAdgM4RnNPbJq5Nz6Kn3XjSxS79kOKXY9U+vcotk8CODYVE8VqMm6C/R2KTxFclqIrKbpaQRs9sgE6UGc4vEhutWlFbEzaaHhHjtLbwEOHpGWd1gqhSc0HUTMEipiDgENkVNkgpBYNgxGnbIp28Wd+AB8YLMJwP4bGoyWAwws6o1gpaaeAHVMQIYdLyxGDH5wKp1xqZzvu6TkH9eh9PQnVWofQOj5afC0MkZpPT59A4W3/WeTMTOuHnqeIFBf/GBhcoeHM0A1slwVwnCLBB4frvogUIzk+rYopAI5rmwvKLxb+MTOiR18aIkU8Dra0uzCVSKk+TREpev9oTkGA79wsjq/oNylKSLgEKAYLdWpMBJxT9OsEz7A4sBaG2UstBFjAGCApDtGYNk0x98WMWAgCShrcAP0gTqH4WkUnirAev5yMooSyS2n6GUUwpE0jmCPF3qLSFDNF8E8J7wPjzhuYU6a97u6yUMR18hVFXFadYhuhmSm4FYbl44OZVptuoJifj5wi+MdYvCnrk5DL07WvdHAdTiz1lFHsahWNzdP3N6SH5ApDytjOly2WY+x3LOYttt8+TZGudKCxiDVFiRWN2zk/g+I7V92YcND/+baioSfluSjnLQKdB783G2wDFUOqe+MzzOBQYqEYppvSFIkiS9fmITDwwnNrwu4k9++AzrsDzPzL9+1Dg93ek9mdm7RbbXAralMwPdW80rDH3wK+9jRitdjTdULNXvrJ2J97c9/8iaePdgwXl6N47lPae8HxgoRe5EjfGJBIJBKJRCKRSCTSPyf61dCPUKRfsP0MRdK3+gtjAS+TEkHM+gAAAABJRU5ErkJggg==";
//        System.out.println("base64: "+ ByteUtil.byteArrayToHex(Base64Util.Base642byteArray(base64)));
        System.out.println("de-suffix: "+Base64Util.delBase64Suffix(base64));
//        Integer targetId = 1;
//        Restaurant restaurant = new Restaurant(targetId, Base64Util.Base642byteArray(base64));
//        restaurantDao.addPhoto(restaurant);
    }
    
    @Test
    public void testFilter () {
        HashMap<String, Object> param = new HashMap<String, Object>();
//        param.put("deliveryTimeFilter", "30");
        param.put("rateValueFilter", "des");

        List<String> restaurantTypeFilter = new ArrayList<String>();
//        restaurantTypeFilter.add("African");
//        restaurantTypeFilter.add("Chinese");

//        System.out.println(param.get("deliveryTimeFilter"));
        LinkedHashMap<String, Object> restaurant = new LinkedHashMap<String, Object>();
        if (restaurantTypeFilter == null || restaurantTypeFilter.size() == 0) {
            restaurantTypeFilter = restaurantDao.getAllRestaurantType();
        }
        for (String s : restaurantTypeFilter) {
            HashMap<String, Object> p_t = new HashMap<String, Object>();
            p_t.put("restaurantTypeFilter", s);
            p_t.put("rateValueFilter", param.get("rateValueFilter"));
            p_t.put("deliveryTimeFilter", param.get("deliveryTimeFilter"));
            List<LinkedHashMap<String, Object>> rest_t = restaurantDao.filter(p_t);
            HMUtil.params2SubDataList(restaurant, s, rest_t);

        }

        HashMap<String, Object> result = HMUtil.params2HM(0, restaurant);

//        List<LinkedHashMap<String, Object>> result = restaurantDao.filter(param);

        System.out.println(result);
    }
    
}
