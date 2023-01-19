package com.rest.model;

public class Restaurant {
    Integer restaurantId;
    String password;
    String securityQuestion;
    String securityAnswer;
    String restaurantName;
    String restaurantAbbrName;
    String address;
    String email;
    String phone;
    String bgPhoto;
    String restaurantType;
    String openStatus;
    double rateValue;
    String deliveryTime;
    String foodType;
//    byte[] photo;
//    MultipartFile photo;
//    String date;
    String regDate;
    String genDateFromAcc;
    String genDateFromList;


//    public Restaurant(Integer restaurantId, byte[] photo) {
//        this.restaurantId = restaurantId;
//        this.photo = photo;
//    }


    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSecurityQuestion() {
        return securityQuestion;
    }

    public void setSecurityQuestion(String securityQuestion) {
        this.securityQuestion = securityQuestion;
    }

    public String getSecurityAnswer() {
        return securityAnswer;
    }

    public void setSecurityAnswer(String securityAnswer) {
        this.securityAnswer = securityAnswer;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getRestaurantAbbrName() {
        return restaurantAbbrName;
    }

    public void setRestaurantAbbrName(String restaurantAbbrName) {
        this.restaurantAbbrName = restaurantAbbrName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBgPhoto() {
        return bgPhoto;
    }

    public void setBgPhoto(String bgPhoto) {
        this.bgPhoto = bgPhoto;
    }

    public String getRestaurantType() {
        return restaurantType;
    }

    public void setRestaurantType(String restaurantType) {
        this.restaurantType = restaurantType;
    }

    public String getOpenStatus() {
        return openStatus;
    }

    public void setOpenStatus(String openStatus) {
        this.openStatus = openStatus;
    }

    public double getRateValue() {
        return rateValue;
    }

    public void setRateValue(double rateValue) {
        this.rateValue = rateValue;
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getGenDateFromAcc() {
        return genDateFromAcc;
    }

    public void setGenDateFromAcc(String genDateFromAcc) {
        this.genDateFromAcc = genDateFromAcc;
    }

    public String getGenDateFromList() {
        return genDateFromList;
    }

    public void setGenDateFromList(String genDateFromList) {
        this.genDateFromList = genDateFromList;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "restaurantId=" + restaurantId +
                ", password='" + password + '\'' +
                ", securityQuestion='" + securityQuestion + '\'' +
                ", securityAnswer='" + securityAnswer + '\'' +
                ", restaurantName='" + restaurantName + '\'' +
                ", restaurantAbbrName='" + restaurantAbbrName + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", bgPhoto='" + bgPhoto + '\'' +
                ", restaurantType='" + restaurantType + '\'' +
                ", openStatus='" + openStatus + '\'' +
                ", rateValue=" + rateValue +
                ", deliveryTime='" + deliveryTime + '\'' +
                ", foodType='" + foodType + '\'' +
                ", regDate='" + regDate + '\'' +
                ", genDateFromAcc='" + genDateFromAcc + '\'' +
                ", genDateFromList='" + genDateFromList + '\'' +
                '}';
    }
}
