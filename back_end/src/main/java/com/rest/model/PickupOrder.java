package com.rest.model;

public class PickupOrder {
    private Integer orderId;
    private String orderNumber;
    private String orderState;
    private String customerEmail;
    private String restaurantEmail;
    private String totalPrice;
    private String note;
    private Integer dishId;
    private Integer dishCount;
    private String genDateFromOrderList;
    private String genDateFromOrderItem;
    private String genDateFromOrderStateLog;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getOrderState() {
        return orderState;
    }

    public void setOrderState(String orderState) {
        this.orderState = orderState;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getGenDateFromOrderList() {
        return genDateFromOrderList;
    }

    public void setGenDateFromOrderList(String genDateFromOrderList) {
        this.genDateFromOrderList = genDateFromOrderList;
    }

    public String getGenDateFromOrderItem() {
        return genDateFromOrderItem;
    }

    public void setGenDateFromOrderItem(String genDateFromOrderItem) {
        this.genDateFromOrderItem = genDateFromOrderItem;
    }

    public String getGenDateFromOrderStateLog() {
        return genDateFromOrderStateLog;
    }

    public void setGenDateFromOrderStateLog(String genDateFromOrderStateLog) {
        this.genDateFromOrderStateLog = genDateFromOrderStateLog;
    }

    @Override
    public String toString() {
        return "PickupOrder{" + "orderId=" + orderId + ", orderNumber='" + orderNumber + '\'' + ", orderState='" + orderState + '\'' + ", customerEmail='" + customerEmail + '\'' + ", restaurantEmail='" + restaurantEmail + '\'' + ", totalPrice='" + totalPrice + '\'' + ", note='" + note + '\'' + ", dishId=" + dishId + ", dishCount=" + dishCount + ", genDateFromOrderList='" + genDateFromOrderList + '\'' + ", genDateFromOrderItem='" + genDateFromOrderItem + '\'' + ", genDateFromOrderStateLog='" + genDateFromOrderStateLog + '\'' + '}';
    }
}
