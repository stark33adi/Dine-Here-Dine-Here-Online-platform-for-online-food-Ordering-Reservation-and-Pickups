$(function () {
    let testCart = [
        {
            "dishId": 1,
            "dishName": "name_1",
            "dishCount": 2,
            "dishPrice": 1.06
        },
        {
            "dishId": 2,
            "dishName": "name_2",
            "dishCount": 3,
            "dishPrice": 3.12
        },
        {
            "dishId": 3,
            "dishName": "name_3",
            "dishCount": 4,
            "dishPrice": 0.6
        },
        {
            "dishId": 4,
            "dishName": "name_4",
            "dishCount": 1,
            "dishPrice": 10.3
        },
        {
            "dishId": 5,
            "dishName": "name_5",
            "dishCount": 2,
            "dishPrice": 3.2
        },
        {
            "dishId": 6,
            "dishName": "name_6",
            "dishCount": 1,
            "dishPrice": 4.0
        },
        {
            "dishId": 7,
            "dishName": "name_7",
            "dishCount": 1,
            "dishPrice": 2.2
        },
        {
            "dishId": 8,
            "dishName": "name_8",
            "dishCount": 2,
            "dishPrice": 3.2
        },
        {
            "dishId": 9,
            "dishName": "name_9",
            "dishCount": 1,
            "dishPrice": 8.2
        },
        {
            "dishId": 10,
            "dishName": "name_10",
            "dishCount": 2,
            "dishPrice": 20.0
        }
    ];

    let orderTabOption = sessionStorage.getItem("OrderTabOption") ? sessionStorage.getItem("OrderTabOption") : 0;
    let orderNumber = sessionStorage.getItem("orderNumber") ? sessionStorage.getItem("orderNumber") : "00001";
    let paramOrder = {
        orderNumber: orderNumber
    };

    $("#headingOne").click(function () {
        if ($("#headingOne").hasClass("collapsed")) {
            console.log("yes");
        } else {
            console.log("no");
        }
        // console.log("hi");
    });

    // animate(10, 50);

    showOrder(paramOrder, orderTabOption);


});

function showOrder(param, orderTabOption) {
    let arrowCount = 0;

    $("#headingOne").click(function () {
        if (arrowCount % 2 == 0) {
            $("#more").attr("class", "rotate-odd");
        }
        if (arrowCount % 2 == 1) {
            $("#more").attr("class", "rotate-even");
        }
        arrowCount++;
    });

    let deliveryGuy = {};
    let order = {};
    let restaurant = {};

    $("#deliveryGuyInfo").hide();
    $("#restaurantAddressInfo").hide();
    $("#deliveryIcons").hide();
    $("#pickupIcons").hide();

    if (orderTabOption == 0) {
        $("#deliveryIcons").show();
        $("#orderType").text("Delivery");
        order = getDeliveryOrderProfile(param);
        $("#subTotalValue").text(order.subTotal);
        $("#deliveryFeeValue").text(order.deliveryFee);
        $("#tipValue").text(order.tip);
        $("#taxValue").text(order.tax);
        $("#totalValue").text(order.totalPrice);

        if (order.deliveryGuyEmail != undefined) {
            $("#deliveryGuyInfo").show();
            let paramDeliveryGuy = {
                email: order.deliveryGuyEmail
            }
            deliveryGuy = getDeliveryGuyProfile(paramDeliveryGuy);
            $("#deliveryGuyValue").text(deliveryGuy.phone);
        } else {
            $("#deliveryGuyInfo").show();
            $("#deliveryGuyValue").text("awaiting...");
        }

        // delivery order stage settings
        let stageZero = 0;
        let stageOne = 4;
        let stageTwo = 27;
        let stageThree = 49;
        let stageFour = 73;
        let stageFive = 100;

        if (order.orderState == 0) {
            $("#orderStateValue").text("order placed").delay(2000).queue(function () {
                $(this).text("preparing your food");
            });
            animate(stageZero, stageOne);
            setTimeout(function () {
                animate(stageOne, stageTwo);
            }, 2000);
        } else if (order.orderState == 1) {
            $("#orderStateValue").text("order cancelled");
            $("#bar").css("width", stageTwo + "%");
            $("#bar").attr("class", "progress-bar progress-bar-striped progress-bar-disable");
        } else if (order.orderState == 2) {
            $("#orderStateValue").text("ready for delivery");
            animate(stageZero, stageThree);
        } else if (order.orderState == 3) {
            $("#orderStateValue").text("on delivery");
            animate(stageZero, stageFour);
        } else if (order.orderState == 4) {
            $("#orderStateValue").text("order delivered");
            animate(stageZero, stageFive);
        }

    }
    if (orderTabOption == 1) {
        $("#restaurantAddressInfo").show();
        $("#pickupIcons").show();
        $("#orderType").text("Pickup");
        order = getPickupOrderProfile(param);
        $("#restaurantAddressValue").text(order.restaurantAddress);
        $("#subTotalValue").text(order.subTotal);
        $("#deliveryFeeGroup").hide();
        $("#tipGroup").hide();
        $("#taxValue").text(order.tax);
        $("#totalValue").text(order.totalPrice);

        // pickup order stage settings
        let stageZero = 0;
        let stageOne = 4;
        let stageTwo = 42;
        let stageThree = 100;

        if (order.orderState) {
            $("#orderStateValue").text("order placed").delay(2000).queue(function () {
                $(this).text("preparing your food");
            });
            animate(stageZero, stageOne);
            setTimeout(function () {
                animate(stageOne, stageTwo);
            }, 2000);
        } else if (order.orderState == 1) {
            $("#orderStateValue").text("order cancelled");
            $("#bar").css("width", stageTwo + "%");
            $("#bar").attr("class", "progress-bar progress-bar-striped progress-bar-disable");
        } else if (order.orderState == 2) {
            $("#orderStateValue").text("ready for pickup");
            animate(stageZero, stageThree);
        }
    }

    let paramRestaurant = {
        email: order.restaurantEmail
    }

    restaurant = getRestaurantProfile(paramRestaurant);

    $("#orderNumberValue").text(order.orderNumber);
    $("#orderRestaurantNameValue").text(restaurant.restaurantName);
    $("#notesValue").text(order.note);
    $("#welcome").text(restaurant.restaurantName);
    $("#orderCustomerAddressValue").text(order.customerAddress);
    $("#dishPlaceholder").hide();






    $("#orderRestaurantPhoneValue").html(
        "<p>" + "phone: " + restaurant.phone + "</p>" +
        "<p>" + "email: " + restaurant.email + "</p>"
    );




    // console.log(order.orderNumber);
    // console.log(order.orderState);
    // console.log(order);
    // console.log(order.dish);

    $("#dish").empty();
    let dishStr = "";
    $.each(order.dish, function (index, element) {
        dishStr =
            "<div style='display: flex; flex-direction: row;'>" +
            "<p class='dishCount'>" +
            element.dishCount + "x" +
            "</p>" +
            "<p class='dishName'>" +
            element.dishName +
            "</p>" +
            "</div>";

        $("#dish").append(dishStr);
    });
}

function getDeliveryOrderProfile(param) {
    let order = {};
    $.ajax({
        type: "POST",
        async: false,
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/getOrderByOrderNumber.do",
        //url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/getOrderByOrderNumber.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(response){
            if (response.result == 0) {
                order = response.data.order[0];
            }

            if (response.result == 1) {
                alert("back-end error: deliveryOrder");
            }
        }
    });
    return order;
}

function getPickupOrderProfile(param) {
    let order = {};
    $.ajax({
        type: "POST",
        async: false,
        url: "http://47.89.231.231/Restaurant_Automation/pickupOrder/getOrderByOrderNumber.do",
        //url: "http://localhost:8080/Restaurant_Automation/pickupOrder/getOrderByOrderNumber.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(response){
            if (response.result == 0) {

                order = response.data.order[0];
            }

            if (response.result == 1) {
                alert("back-end error: pickupOrder");
            }
        }
    });
    return order;
}

function getDeliveryGuyProfile(param) {
    let deliveryGuy = {};
    $.ajax({
        type: "POST",
        async: false,
        url: "http://47.89.231.231/Restaurant_Automation/deliveryGuy/getProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/deliveryGuy/getProfile.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(response){
            if (response.result == 0) {

                deliveryGuy = response.data;
            }

            if (response.result == 1) {
                alert("back-end error: deliveryGuy");
            }
        }
    });
    return deliveryGuy;
}

function getRestaurantProfile(param) {
    let restaurant = {};
    $.ajax({
        type: "POST",
        async: false,
        url: "http://47.89.231.231/Restaurant_Automation/restaurant/getProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/restaurant/getProfile.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(response){
            if (response.result == 0) {

                restaurant = response.data.rest[0];
            }

            if (response.result == 1) {
                alert("back-end error: restaurant");
            }
        }
    });
    return restaurant;
}

function animate(start, end) {
    let timer;
    let increment = 0.5;
    let timeout = 10;
    let progress = start;
    $("#bar").css("width", progress + "%");

    clearInterval(timer);

    timer = setInterval(function () {
        progress += increment;
        if (progress <= end) {
            $("#bar").css("width", progress + "%");
        }
    }, timeout);
}