package com.rest.model;

public class Dish {
    Integer dishId;
    String email;
    String dishType;
    String dishName;
    String dishPrice;
    String dishPhoto;
    String genDate;
    String regDate;

    public Integer getDishId() {
        return dishId;
    }

    public void setDishId(Integer dishId) {
        this.dishId = dishId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDishType() {
        return dishType;
    }

    public void setDishType(String dishType) {
        this.dishType = dishType;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public String getDishPrice() {
        return dishPrice;
    }

    public void setDishPrice(String dishPrice) {
        this.dishPrice = dishPrice;
    }

    public String getDishPhoto() {
        return dishPhoto;
    }

    public void setDishPhoto(String dishPhoto) {
        this.dishPhoto = dishPhoto;
    }

    public String getGenDate() {
        return genDate;
    }

    public void setGenDate(String genDate) {
        this.genDate = genDate;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    @Override
    public String toString() {
        return "Dish{" + "dishId=" + dishId + ", email='" + email + '\'' + ", dishType='" + dishType + '\'' + ", dishName='" + dishName + '\'' + ", dishPrice='" + dishPrice + '\'' + ", dishPhoto='" + dishPhoto + '\'' + ", genDate='" + genDate + '\'' + ", regDate='" + regDate + '\'' + '}';
    }
}
