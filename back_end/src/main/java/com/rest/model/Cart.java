package com.rest.model;

public class Cart {
    private Integer cartId;
    private String customerEmail;
    private String restaurantEmail;
    private String totalPrice;
    private Integer dishId;
    private Integer dishCount;
    private String genDateFromCartList;
    private String genDateFromCartItem;

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getRestaurantEmail() {
        return restaurantEmail;
    }

    public void setRestaurantEmail(String restaurantEmail) {
        this.restaurantEmail = restaurantEmail;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getDishId() {
        return dishId;
    }

    public void setDishId(Integer dishId) {
        this.dishId = dishId;
    }

    public Integer getDishCount() {
        return dishCount;
    }

    public void setDishCount(Integer dishCount) {
        this.dishCount = dishCount;
    }

    public String getGenDateFromCartList() {
        return genDateFromCartList;
    }

    public void setGenDateFromCartList(String genDateFromCartList) {
        this.genDateFromCartList = genDateFromCartList;
    }

    public String getGenDateFromCartItem() {
        return genDateFromCartItem;
    }

    public void setGenDateFromCartItem(String genDateFromCartItem) {
        this.genDateFromCartItem = genDateFromCartItem;
    }

    @Override
    public String toString() {
        return "cart{" + "cartId=" + cartId + ", customerEmail='" + customerEmail + '\'' + ", restaurantEmail='" + restaurantEmail + '\'' + ", totalPrice='" + totalPrice + '\'' + ", dishId=" + dishId + ", dishCount=" + dishCount + ", genDateFromCartList='" + genDateFromCartList + '\'' + ", genDateFromCartItem='" + genDateFromCartItem + '\'' + '}';
    }
}
