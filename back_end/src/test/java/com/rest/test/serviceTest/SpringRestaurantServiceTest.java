package com.rest.test.serviceTest;

import com.rest.service.RestaurantService;
import com.rest.util.HMUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring-mybatis-config.xml"})
public class SpringRestaurantServiceTest {

    @Autowired
    private RestaurantService restaurantService;

    @Test
    public void testCheckLogin() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("password", "9876");
        HashMap<String, Object> result = restaurantService.login(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testAddNewRestaurant() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("restaurantName", "restaurantName");
        param.put("restaurantAbbrName", "restaurantAbbrName");
        param.put("password", "19");
        param.put("securityQuestion", "1");
        param.put("securityAnswer", "1");
        param.put("address", "address");
        param.put("phone", "1111111");
        param.put("bgPhoto", "base 64, photo");
        param.put("rateValue", 4.2);
        HashMap<String, Object> result = restaurantService.addNewRestaurant(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testCheckForgetPassword() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("password", "2468");
        param.put("newPassword", "2468");
        HashMap<String, Object> result = restaurantService.checkForgetPassword(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testGetAllRest() {
        HashMap<String, Object> param = new HashMap<String, Object>();
//        param.put("serviceType", "Delivery");
//        param.put("serviceType", "Pickup");
//        param.put("serviceType", "Reservation");
        HashMap<String, Object> restaurant = restaurantService.getAllRest(param);
        System.out.println(restaurant);
    }

    @Test
    public void testGetRestaurantList() {
        HashMap<String, Object> restaurant = restaurantService.getRestaurantList();
        System.out.println(restaurant);
    }

    @Test
    public void testGetRestSecurityProfile() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        HashMap<String, Object> result = restaurantService.getProfileByEmail(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testGetRestListProfileByRestId() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        HashMap<String, Object> result = restaurantService.getProfileByEmail(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testCheckUpdatePassword() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("password", "2468");
        param.put("newPassword", "1234567890");
        HashMap<String, Object> result = restaurantService.updatePassword(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testCheckUpdateResAccSecurityProfile() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("securityQuestion", "1");
        param.put("securityAnswer", "1");
        HashMap<String, Object> result = restaurantService.updateSecurityProfile(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testCheckUpdateRestListProfile() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("restaurantName", "restaurantName");
        param.put("restaurantAbbrName", "restaurantAbbrName");
        param.put("address", "address");
        param.put("phone", "1111111");
        param.put("bgPhoto", "base 64, photo");
        param.put("rateValue", 4.2);
        HashMap<String, Object> result = restaurantService.updateProfile(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testGetPhoto() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        HashMap<String, Object> result = restaurantService.getPhoto(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testAddPhoto() {
        HashMap<String, Object> param = new HashMap<String, Object>();
        param.put("email", "1@gmail.com");
        param.put("bgPhoto", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAAtCAMAAAAOeonsAAAAOVBMVEVAREtFUYfY0LVyR0tSkL3SuI6nxts2OT+5vL/Q19eAq8+6m1hrbW6BipSnpaSmflCOZ0u0ExL0AADhoDI+AAAC9UlEQVRo3u2bi5KrIAyG5SIFBbXn/R/2JICIQu1tV51z8s/sdkxTCJ9JUDttbrdbQ/pWxJBEIpFIJBKJRCKR/m9ZN2g9OEskvmAICIMG4vipnM7kiMf3EB9iZG5aHb06euG5NazGfTbYWPqzdwb4vXLWG1WLWhrdM9WnQy521pqPUHhuDcugjVTGmH4nVtmu/OfAdgM4RnNPbJq5Nz6Kn3XjSxS79kOKXY9U+vcotk8CODYVE8VqMm6C/R2KTxFclqIrKbpaQRs9sgE6UGc4vEhutWlFbEzaaHhHjtLbwEOHpGWd1gqhSc0HUTMEipiDgENkVNkgpBYNgxGnbIp28Wd+AB8YLMJwP4bGoyWAwws6o1gpaaeAHVMQIYdLyxGDH5wKp1xqZzvu6TkH9eh9PQnVWofQOj5afC0MkZpPT59A4W3/WeTMTOuHnqeIFBf/GBhcoeHM0A1slwVwnCLBB4frvogUIzk+rYopAI5rmwvKLxb+MTOiR18aIkU8Dra0uzCVSKk+TREpev9oTkGA79wsjq/oNylKSLgEKAYLdWpMBJxT9OsEz7A4sBaG2UstBFjAGCApDtGYNk0x98WMWAgCShrcAP0gTqH4WkUnirAev5yMooSyS2n6GUUwpE0jmCPF3qLSFDNF8E8J7wPjzhuYU6a97u6yUMR18hVFXFadYhuhmSm4FYbl44OZVptuoJifj5wi+MdYvCnrk5DL07WvdHAdTiz1lFHsahWNzdP3N6SH5ApDytjOly2WY+x3LOYttt8+TZGudKCxiDVFiRWN2zk/g+I7V92YcND/+baioSfluSjnLQKdB783G2wDFUOqe+MzzOBQYqEYppvSFIkiS9fmITDwwnNrwu4k9++AzrsDzPzL9+1Dg93ek9mdm7RbbXAralMwPdW80rDH3wK+9jRitdjTdULNXvrJ2J97c9/8iaePdgwXl6N47lPae8HxgoRe5EjfGJBIJBKJRCKRSCTSPyf61dCPUKRfsP0MRdK3+gtjAS+TEkHM+gAAAABJRU5ErkJggg==");
        HashMap<String, Object> result = restaurantService.addPhoto(param);
        System.out.println("result: "+result);
    }

    @Test
    public void testGetFieldFromJsonStr() {
        String jsonStr = "{\n" +
                "                \"restaurantId\": 37,\n" +
                "                \"restaurantName\": \"McDonald\",\n" +
                "                \"address\": \"r street\",\n" +
                "                \"bgPhoto\": \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAAtCAMAAAAOeonsAAAAOVBMVEVAREtFUYfY0LVyR0tSkL3SuI6nxts2OT+5vL/Q19eAq8+6m1hrbW6BipSnpaSmflCOZ0u0ExL0AADhoDI+AAAC9UlEQVRo3u2bi5KrIAyG5SIFBbXn/R/2JICIQu1tV51z8s/sdkxTCJ9JUDttbrdbQ/pWxJBEIpFIJBKJRCKR/m9ZN2g9OEskvmAICIMG4vipnM7kiMf3EB9iZG5aHb06euG5NazGfTbYWPqzdwb4vXLWG1WLWhrdM9WnQy521pqPUHhuDcugjVTGmH4nVtmu/OfAdgM4RnNPbJq5Nz6Kn3XjSxS79kOKXY9U+vcotk8CODYVE8VqMm6C/R2KTxFclqIrKbpaQRs9sgE6UGc4vEhutWlFbEzaaHhHjtLbwEOHpGWd1gqhSc0HUTMEipiDgENkVNkgpBYNgxGnbIp28Wd+AB8YLMJwP4bGoyWAwws6o1gpaaeAHVMQIYdLyxGDH5wKp1xqZzvu6TkH9eh9PQnVWofQOj5afC0MkZpPT59A4W3/WeTMTOuHnqeIFBf/GBhcoeHM0A1slwVwnCLBB4frvogUIzk+rYopAI5rmwvKLxb+MTOiR18aIkU8Dra0uzCVSKk+TREpev9oTkGA79wsjq/oNylKSLgEKAYLdWpMBJxT9OsEz7A4sBaG2UstBFjAGCApDtGYNk0x98WMWAgCShrcAP0gTqH4WkUnirAev5yMooSyS2n6GUUwpE0jmCPF3qLSFDNF8E8J7wPjzhuYU6a97u6yUMR18hVFXFadYhuhmSm4FYbl44OZVptuoJifj5wi+MdYvCnrk5DL07WvdHAdTiz1lFHsahWNzdP3N6SH5ApDytjOly2WY+x3LOYttt8+TZGudKCxiDVFiRWN2zk/g+I7V92YcND/+baioSfluSjnLQKdB783G2wDFUOqe+MzzOBQYqEYppvSFIkiS9fmITDwwnNrwu4k9++AzrsDzPzL9+1Dg93ek9mdm7RbbXAralMwPdW80rDH3wK+9jRitdjTdULNXvrJ2J97c9/8iaePdgwXl6N47lPae8HxgoRe5EjfGJBIJBKJRCKRSCTSPyf61dCPUKRfsP0MRdK3+gtjAS+TEkHM+gAAAABJRU5ErkJggg==\",\n" +
                "                \"openStatus\": \"open\",\n" +
                "                \"rateValue\": 4.2,\n" +
                "                \"deliveryTime\": \"10\",\n" +
                "                \"foodType\": \"Mix\"\n" +
                "            }";
        HashMap<String, Object> result = HMUtil.jsonStrOfRestaurant2HM(jsonStr);
        Set<Map.Entry<String, Object>> resultSet = result.entrySet();
        for (Map.Entry<String, Object> e : resultSet) {
            System.out.println(e.getKey()+": "+e.getValue());
        }
    }

    @Test
    public void testFilter() {
        List<String> restaurantTypeFilter = new ArrayList<String>();
        String rateValueFilter = "descending";
        String deliveryTimeFilter = null;
//        String foodTypeFilter = new String("Non-Veg,Gluten-Free");
        String foodTypeFilter = null;


        HashMap<String, Object> result = restaurantService.filter(restaurantTypeFilter, rateValueFilter, deliveryTimeFilter, foodTypeFilter);

        System.out.println(result);
    }
}
