
// Get email from login/signup session

let paramEmail={};
paramEmail.email = sessionStorage.getItem('restaurantEmail') ? sessionStorage.getItem('restaurantEmail') : "sturrell2@gmail.com";

var restProf ;

/* 
 * This ready function will execute every time the page loads
 * This will make sure that the restaurant profile will display first
*/
$(function () {

    let orderBar = sessionStorage.getItem('orderBar') ? sessionStorage.getItem('orderBar') : "0";
    // console.log(orderBar);

    $("#restaurantActionChoices").each(function (index, element) {
        $(this).click(function () {
            if (index == orderBar) {

            }
        });
    });

    if (orderBar == '1') {
        // console.log('1');
        $("#deliveryOrder").click();
        // console.log('3');
    } else if (orderBar == '2') {
        // console.log('2');
        $("#pickupOrder").click();
    } else {
        // Show restaurant profile page and hide the other 3 pages every time you open this page
        $("#displayingDeliveryOrder").hide();
        $("#displayingPickupOrder").hide();
        $("#displayingReservations").hide();
        $("#displayMenu").hide();
        $("#displayrestProf").show();

    }
        // Get the background image
        // var imageToBase64 = "adf";
        var readURL = function (input) {
            var fileData = input.files[0];
            var pettern = /^image/;
            if (pettern.test(fileData.type)) {
                var reader = new FileReader();

                reader.onload = function (e) {

                    $('.profile-pic').attr('src', e.target.result);
                    // imageToBase64 = e.target.result;

                }
                reader.readAsDataURL(input.files[0]);
            } else {
                alert("Your image cannot be uploaded because of the image format. Please select another image. ");
            }
        }
        $(".file-upload").on('change', function () {
            readURL(this);
        });
        $(".upload-button").on('click', function () {
            $(".file-upload").click();
        });

        // console.log(imageToBase64);


        $.ajax({
            type: "POST",
            url: "http://47.89.231.231/Restaurant_Automation/restaurant/getProfile.do",
            // url: "http://localhost:8080/Restaurant_Automation/restaurant/getProfile.do",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(paramEmail),
            dataType: "json",
            success: function (response) {

                // Get data from database
                restProf = response.data;
                console.log(restProf);

                if (response.result == 0) {

                    $("#bgImage").attr("src", restProf.rest[0].bgPhoto);
                    $("#displayRestaurantName").val(restProf.rest[0].restaurantName);
                    $("#displayRestaurantAddress").val(restProf.rest[0].address);
                    $("#displayRestaurantphone").val(restProf.rest[0].phone);
                    $("#displayRestaurantType").val(restProf.rest[0].restaurantType);
                    $("#displayFoodType").val(restProf.rest[0].foodType);

                } else if (response.result == 1) {
                    alert("Backend Failed");
                } else {
                    alert("back-end unknown error");
                }
            },
            error: function (message) {
                alert("Nothing on our record for this account");
            }
        });

        add_dish();


}); 


/* 
 * Restaurant Profile view/update/update info validation
*/
function display_Restaurant_Profile () {

    $("#restProf").siblings().attr("class", "list-group-item list-group-item-action");
    $("#restProf").attr("class", "list-group-item list-group-item-action active");

    sessionStorage.setItem('orderBar','0');

    $("#displayingDeliveryOrder").hide();
    $("#displayingPickupOrder").hide();
    $("#displayingReservations").hide();
    $("#displayMenu").hide();
    $("#displayrestProf").show();

    $("#displayRestaurantName").val(restProf.rest[0].restaurantName);
    $("#displayRestaurantAddress").val(restProf.rest[0].address);
    $("#displayRestaurantphone").val(restProf.rest[0].phone);
    $("#displayRestaurantType").val(restProf.rest[0].restaurantType);
    $("#displayFoodType").val(restProf.rest[0].foodType);

    // Needs to display photo as well
    $("#bgImage").attr("src", restProf.rest[0].bgPhoto);
}
function updateProfile () {
    let restName = $("#displayRestaurantName").val();
    let restAddress = $("#displayRestaurantAddress").val();
    let restPhone = $("#displayRestaurantphone").val();
    let restType = $("#displayRestaurantType").val();
    let foodType = $("#displayFoodType").val();
    let bgImage = $("#bgImage")[0].src;

    // console.log(bgImage);

    if (restName.length == 0) {
        alert("Please enter your Restaurant Name! ");
        return;
    } else if (restAddress.length == 0) {
        alert("Please enter your Restaurant Address! ");
        return;
    } else if (check_phone_number(restPhone)) {
        alert("You have not updated your profile. ");
        return;
    } else if (restType.length == 0) {
        alert("Please enter your restaurant type! ");
        return;
    } else if (foodType == "foodTypePlaceholder") {
        alert("Please select a food type. ");
        return;
    }

    let updateItems = {
        email: paramEmail.email,
        restaurantName: restName,
        address: restAddress,
        phone: restPhone,
        bgPhoto: bgImage,
        restaurantType: restType,
        foodType: foodType
    };

    // console.log(updateItems);

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/restaurant/updateProfile.do",
        // url: "http://localhost:8080/Restaurant_Automation/restaurant/updateProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(updateItems),
        dataType: "json",
        success: function (response) {
            if (response.result == 0) {
                alert("You updated your profile! ");
                return;
            } else if(response.result == 1){
                alert("Backend Failed");
                return;
            }else{
                alert("back-end unknown error");
                return;
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });
}
function check_phone_number (num) {
    if (num.length!=10) { 
        alert("Please enter a 10 digits number. ");
        return 1;
    } else if (isNaN(Number(num)) == true) {
        alert("Please enter a phone number. ");
        return 1;
    } else {
        return 0;
    }
}


/* 
 * This function will display the delivery orders
*/
function display_Restaurant_Delivery_Order () {

    $("#deliveryOrder").siblings().attr("class", "list-group-item list-group-item-action");
    $("#deliveryOrder").attr("class", "list-group-item list-group-item-action active");

    // Show restaurant Delivery order page and hide the other 3 pages
    $("#displayrestProf").hide();
    $("#displayingPickupOrder").hide();
    $("#displayingReservations").hide();
    $("#displayMenu").hide();
    $("#displayingDeliveryOrder").show();
    

    let data = {
        restaurantEmail: paramEmail.email
    };

    $.ajax({
        type: "POST", 
         url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/getOrderRestaurant.do",
         // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/getOrderRestaurant.do",
        contentType: "application/json; charset=utf-8", 
        data: JSON.stringify(data), 
        dataType: "json",
        success: function (response){

            if(response.result == 0){

                let deliveryOrder_backend = [];

                // indeces are "0", "1", ... elementouter is the elements in each of the "i"
                $.each(response.data, function(index, elementouter) {
                    // "index" are the index of the elements in the list. In this case, there is only one element (elementinner) in each of the "i"s
                    $.each(elementouter, function (index, elementinner){
                        // push is to copy the elementinner(hashmap content) to deliveryOrder_backend
                        deliveryOrder_backend.push(elementinner);
                    });
                });
                // Now the deliveryOrder_backend is a list of hashmap


                // iterate the deliveryOrder_backend list elements to show it in the table
                // empty the list before print the list; otherwise will repeatedly print the table every time you click the button
                $("#iterateDeliveryOrders").empty();
                for (let i = 0; i < deliveryOrder_backend.length; i++) {

                    let status = deliveryOrder_backend[i].orderState;
                    let statustxt = "";

                    // 0: order placed 
                    // 1: restaurant canceled order 
                    // 2: restaurant finished order
                    // 3: delivery guy take order
                    // 4: delivery guy delivered order
                    // 5: customer confirm delivered
                    if (status == "0") {
                        statustxt = "Order Placed";
                    } else if (status == "1") {
                        statustxt = "Order Cancelled";
                    } else if (status == "2") {
                        statustxt = "Order Completed";
                    } else {
                        statustxt = "error";
                    }

                    str = 
                        "<tr>" + 
                            "<td>" + deliveryOrder_backend[i].orderNumber + "</td>" +
                            "<td>" + deliveryOrder_backend[i].customerFirstName + " " + deliveryOrder_backend[i].customerLastName + "</td>" +
                            "<td>" + deliveryOrder_backend[i].customerPhone + "</td>" +
                            "<td>" + deliveryOrder_backend[i].totalPrice + "</td>" + 
                            "<td name='orderDetail'> Order Detail </td>" + 
                            "<td>" + deliveryOrder_backend[i].note + "</td>" + 
                            "<td id='statusDisplay" + i + "'>" + statustxt + "</td>" + 
                            "<td>" + 
                                "<button name='completeButton' class='btn btn-outline-dark'>Complete Order</button>" +
                            "</td>" +
                            "<td>" + 
                                "<button name='cancelButton' class='btn btn-outline-dark'>Cancel Order</button>" +
                            "</td>" +
                        "</tr>";

                    // Append the table column html code to the table 
                    $("#iterateDeliveryOrders").append(str);
                }

                // Select every <td> that has "name='orderDetail'", which is select every order details from this particular order
                // iterate every order detail <td> so that it can have a click function call
                $("td[name='orderDetail']").each(function(index, element) {
                    $(this).click(function () { // this just means that you select one of the <td>, and you have a click function attached to it

                        sessionStorage.setItem('orderNum', deliveryOrder_backend[index].orderNumber);
                        // Everytime that you want to store a list, you NEED to stringify when you store and set it, and parse it when you get it
                        sessionStorage.setItem('dishlist', JSON.stringify(deliveryOrder_backend[index].dish));
                        sessionStorage.setItem('orderBar', '1');
                        window.location.assign("../restaurant_dashboard/restaurant_deliverydetail.html");
                    });
                });

                $("button[name='completeButton']").each(function(index, element) {
                    $(this).click(function () {
                        if ( $("#statusDisplay" + index).html() == "Order Placed") {
                            ChangeOrderToComplete(deliveryOrder_backend[index], index);
                        } else if ($("#statusDisplay"+ index).html() == "Order Cancelled") {
                            alert("This order is already cancelled");
                        } else if ($("#statusDisplay"+ index).html() == "Order Completed") {
                            alert("This order is already completed");
                        }
                    });
                });

                $("button[name='cancelButton']").each(function(index, element) {
                    $(this).click(function () {
                        if ($("#statusDisplay" + index).html() == "Order Placed") {
                            ChangeOrderToCancel(deliveryOrder_backend[index], index);
                        } else if ($("#statusDisplay" + index).html() == "Order Cancelled") {
                            alert("This order is already cancelled");
                        } else if ($("#statusDisplay" + index).html() == "Order Completed") {
                            alert("This order is already completed");
                        }
                    });
                });


            }else{
                alert("back-end unknown error");
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });
}
// This is to change the order status
// 0: order placed 
// 1: restaurant canceled order 
// 2: restaurant finished order
// 3: delivery guy take order
// 4: delivery guy delivered order
// 5: customer confirm delivered
function ChangeOrderToComplete(order, index) {

    // console.log(order, index);

    let updateStatus = {
        orderNumber: order.orderNumber,
        restaurantEmail: paramEmail.email
    };

    $.ajax({
        type: "POST", 
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/updateOrderState.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/updateOrderState.do",
        contentType: "application/json; charset=utf-8", 
        data: JSON.stringify(updateStatus), 
        dataType: "json",
        success: function (response){
            if (response.result == 0) {
                
                $("#statusDisplay" + index).html("Order Completed");

            }else if (response.result == 1) {
                alert("back-end failed");
            } else if (response.result == 2) {
                alert("URL used in a wrong way");
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });
}
function ChangeOrderToCancel(order, index) {
    
    let updateStatus = {
        orderNumber: order.orderNumber,
        restaurantEmail: paramEmail.email,
        orderState: "1"
    };

    $.ajax({
        type: "POST", 
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/restaurantCancelOrder.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/restaurantCancelOrder.do",
        contentType: "application/json; charset=utf-8", 
        data: JSON.stringify(updateStatus), 
        dataType: "json",
        success: function (response){
            if (response.result == 0) {
                $("#statusDisplay" + index).html("Order Canceled");
            } else if (response.result == 1) {
                alert("back-end failed");
            } else if (response.result == 2) {
                alert("URL used in a wrong way");
            }
        },
        error: function (message) {
            alert("Backend cannot send data. Or backend is able to send data but has syntax error. ");
        }
    });
}


/*
 * This function will display the delivery orders
*/
function display_Restaurant_Pickup_Order () {

    $("#pickupOrder").siblings().attr("class", "list-group-item list-group-item-action");
    $("#pickupOrder").attr("class", "list-group-item list-group-item-action active");

    // Show restaurant Pickup order page and hide the other 3 pages
    $("#displayrestProf").hide();
    $("#displayingDeliveryOrder").hide();
    $("#displayingReservations").hide();
    $("#displayMenu").hide();
    $("#displayingPickupOrder").show();


    let data = {
        restaurantEmail: paramEmail.email
    };

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/pickupOrder/getOrderRestaurant.do",
        // url: "http://localhost:8080/Restaurant_Automation/pickupOrder/getOrderRestaurant.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response){

            if(response.result == 0){

                let pickupOrder_backend = [];

                // indeces are "0", "1", ... elementouter is the elements in each of the "i"
                $.each(response.data, function(index, elementouter) {
                    // "index" are the index of the elements in the list. In this case, there is only one element (elementinner) in each of the "i"s
                    $.each(elementouter, function (index, elementinner){
                        // push is to copy the elementinner(hashmap content) to pickupOrder_backend
                        pickupOrder_backend.push(elementinner);
                    });
                });
                // Now the pickupOrder_backend is a list of hashmap


                // iterate the pickupOrder_backend list elements to show it in the table
                // empty the list before print the list; otherwise will repeatedly print the table every time you click the button
                $("#iteratePickupOrders").empty();
                for (let i = 0; i < pickupOrder_backend.length; i++) {

                    let status = pickupOrder_backend[i].orderState;
                    let statustxt = "";

                    // 0: order placed
                    // 1: restaurant canceled order
                    // 2: restaurant finished order
                    // 3: delivery guy take order
                    // 4: delivery guy delivered order
                    // 5: customer confirm delivered
                    if (status == "0") {
                        statustxt = "Order Placed";
                    } else if (status == "1") {
                        statustxt = "Order Cancelled";
                    } else if (status == "2") {
                        statustxt = "Order Completed";
                    } else {
                        statustxt = "error";
                    }

                    str =
                        "<tr>" +
                        "<td>" + pickupOrder_backend[i].orderNumber + "</td>" +
                        "<td>" + pickupOrder_backend[i].customerFirstName + " " + pickupOrder_backend[i].customerLastName + "</td>" +
                        "<td>" + pickupOrder_backend[i].customerPhone + "</td>" +
                        "<td>" + pickupOrder_backend[i].totalPrice + "</td>" +
                        "<td name='pickuporderDetail'> Order Detail </td>" +
                        "<td>" + pickupOrder_backend[i].note + "</td>" +
                        "<td id='pickupstatusDisplay" + i + "'>" + statustxt + "</td>" +
                        "<td>" +
                        "<button name='completePickupButton' class='btn btn-outline-dark'>Complete Order</button>" +
                        "</td>" +
                        "<td>" +
                        "<button name='cancelPickupButton' class='btn btn-outline-dark'>Cancel Order</button>" +
                        "</td>" +
                        "</tr>";

                    // Append the table column html code to the table
                    $("#iteratePickupOrders").append(str);
                }

                // Select every <td> that has "name='orderDetail'", which is select every order details from this particular order
                // iterate every order detail <td> so that it can have a click function call
                $("td[name='pickuporderDetail']").each(function(index, element) {
                    $(this).click(function () { // this just means that you select one of the <td>, and you have a click function attached to it

                        sessionStorage.setItem('pickuporderNum', pickupOrder_backend[index].orderNumber);
                        // Everytime that you want to store a list, you NEED to stringify when you store and set it, and parse it when you get it
                        sessionStorage.setItem('pickupdishlist', JSON.stringify(pickupOrder_backend[index].dish));
                        sessionStorage.setItem('orderBar', '2');
                        window.location.assign("../restaurant_dashboard/restaurant_pickupdetail.html");
                    });
                });

                $("button[name='completePickupButton']").each(function(index, element) {
                    $(this).click(function () {
                        if ( $("#pickupstatusDisplay" + index).html() == "Order Placed") {
                            ChangeOrderToCompletepickup(pickupOrder_backend[index], index);
                        } else if ($("#pickupstatusDisplay"+ index).html() == "Order Cancelled") {
                            alert("This order is already cancelled");
                        } else if ($("#pickupstatusDisplay"+ index).html() == "Order Completed") {
                            alert("This order is already completed");
                        }
                    });
                });

                $("button[name='cancelPickupButton']").each(function(index, element) {
                    $(this).click(function () {
                        if ($("#pickupstatusDisplay" + index).html() == "Order Placed") {
                            ChangeOrderToCancelpickup(pickupOrder_backend[index], index);
                        } else if ($("#pickupstatusDisplay" + index).html() == "Order Cancelled") {
                            alert("This order is already cancelled");
                        } else if ($("#pickupstatusDisplay" + index).html() == "Order Completed") {
                            alert("This order is already completed");
                        }
                    });
                });


            }else{
                alert("back-end unknown error. (showing restaurant pickup order)");
            }
        },
        error: function (message) {
            alert("Unknown Error. (showing restaurant pickup order)");
        }
    });
}
function ChangeOrderToCompletepickup(order, index) {

    let updateStatus = {
        orderNumber: order.orderNumber,
        restaurantEmail: paramEmail.email
    };

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/pickupOrder/updateOrderState.do",
        // url: "http://localhost:8080/Restaurant_Automation/pickupOrder/updateOrderState.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(updateStatus),
        dataType: "json",
        success: function (response){

            if (response.result == 0) {

                $("#pickupstatusDisplay" + index).html("Order Completed");

            }else if (response.result == 1) {
                alert("back-end failed f");
            } else if (response.result == 2) {
                alert("URL used in a wrong way f");
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });
}
function ChangeOrderToCancelpickup(order, index) {

    let updateStatus = {
        orderNumber: order.orderNumber,
        restaurantEmail: paramEmail.email,
        orderState: "1"
    };

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/pickupOrder/restaurantCancelOrder.do",
        // url: "http://localhost:8080/Restaurant_Automation/pickupOrder/restaurantCancelOrder.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(updateStatus),
        dataType: "json",
        success: function (response){
            if (response.result == 0) {
                $("#pickupstatusDisplay" + index).html("Order Canceled");
            } else if (response.result == 1) {
                alert("back-end failed c");
            } else if (response.result == 2) {
                alert("URL used in a wrong way c");
            }
        },
        error: function (message) {
            alert("Backend cannot send data. Or backend is able to send data but has syntax error. ");
        }
    });
}

function display_Restaurant_Reservation () {

    $("#reservation").siblings().attr("class", "list-group-item list-group-item-action");
    $("#reservation").attr("class", "list-group-item list-group-item-action active");

    sessionStorage.setItem('orderBar','0');

    // Show restaurant reservation order page and hide the other 3 pages
    $("#displayrestProf").hide();
    $("#displayingDeliveryOrder").hide();
    $("#displayingPickupOrder").hide();
    $("#displayMenu").hide();
    $("#displayingReservations").show();

    let data = {
        restaurantEmail: paramEmail.email
    };

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/reservation/getAllReservationByRestaurant.do",
        // url: "http://localhost:8080/Restaurant_Automation/reservation/getAllReservationByRestaurant.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response){

            if(response.result == 0){

                let reservation_backend = response.data.reservation;
                console.log(reservation_backend);
                //console.log(reservation_backend);
                // indeces are "0", "1", ... elementouter is the elements in each of the "i"
                // $.each(response.data., function(index, elementouter) {
                //     // "index" are the index of the elements in the list. In this case, there is only one element (elementinner) in each of the "i"s
                //     $.each(elementouter, function (index, elementinner){
                //         // push is to copy the elementinner(hashmap content) to reservation_backend
                //         reservation_backend.push(elementinner);
                //     });
                // });
                // Now the reservation_backend is a list of hashmap


                // iterate the reservation_backend list elements to show it in the table
                // empty the list before print the list; otherwise will repeatedly print the table every time you click the button
                $("#iterateReservations").empty();
                for (let i = 0; i < reservation_backend.length; i++) {

                    let status = reservation_backend[i].reservationState;
                    let statustxt = "";

                    // 0: add reservation
                    // 1: restaurant cancel reservation
                    // 2: restaurant confirm reservation
                    if (status == "0") {
                        statustxt = "New Reservation";
                    } else if (status == "1") {
                        statustxt = "Reservation Cancelled";
                    } else if (status == "2") {
                        statustxt = "Reservation Confirmed";
                    } else {
                        statustxt = "error";
                    }

                    str =
                        "<tr>" +
                        "<td>" + reservation_backend[i].reservationId + "</td>" +
                        "<td>" + reservation_backend[i].customerFirstName + " " + reservation_backend[i].customerLastName + "</td>" +
                        "<td>" + reservation_backend[i].customerPhone + "</td>" +
                        "<td>" + reservation_backend[i].reservationTime + "</td>" +
                        "<td>" + reservation_backend[i].partySize + "</td>" +
                        "<td>" + reservation_backend[i].note + "</td>" +
                        "<td id='reservationstatusDisplay" + i + "'>" + statustxt + "</td>" +
                        "<td>" +
                        "<button name='completeReservationButton' class='btn btn-outline-dark'>Confirm</button>" +
                        "</td>" +
                        "<td>" +
                        "<button name='cancelReservationButton' class='btn btn-outline-dark'>Cancel</button>" +
                        "</td>" +
                        "</tr>";

                    // Append the table column html code to the table
                    $("#iterateReservations").append(str);
                }



                $("button[name='completeReservationButton']").each(function(index, element) {
                    $(this).click(function () {
                        if ( $("#reservationstatusDisplay" + index).html() == "New Reservation") {
                            ConfirmReservation(reservation_backend[index], index);
                        } else if ($("#reservationstatusDisplay"+ index).html() == "Reservation Cancelled") {
                            alert("This reservation is already cancelled");
                        } else if ($("#reservationstatusDisplay"+ index).html() == "Reservation Confirmed") {
                            alert("This reservation is already confirmed");
                        }
                    });
                });

                $("button[name='cancelReservationButton']").each(function(index, element) {
                    $(this).click(function () {
                        if ($("#reservationstatusDisplay" + index).html() == "New Reservation") {
                            CancelReservation(reservation_backend[index], index);
                        } else if ($("#reservationstatusDisplay" + index).html() == "Reservation Cancelled") {
                            alert("This reservation is already cancelled");
                        } else if ($("#reservationstatusDisplay" + index).html() == "Reservation Confirmed") {
                            alert("This reservation is already confirmed");
                        }
                    });
                });


            }else{
                alert("back-end unknown error 1");
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });

}
function ConfirmReservation (reservation, index) {
    let updateStatus = {
        reservationId: reservation.reservationId
        //restaurantEmail: paramEmail.email
    };



    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/reservation/confirmReservation.do",
        // url: "http://localhost:8080/Restaurant_Automation/reservation/confirmReservation.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(updateStatus),
        dataType: "json",
        success: function (response){

            console.log(response);

            if (response.result == 0) {

                $("#reservationstatusDisplay" + index).html("Reservation Confirmed");

            }else if (response.result == 1) {
                alert("back-end failed (reservation)");
            }
        },
        error: function (message) {
            alert("Nothing on our record (reservation)");
        }
    });
}
function CancelReservation (reservation, index) {
    let updateStatus = {
        reservationId: reservation.reservationId
        //restaurantEmail: paramEmail.email,
        //reservationState: "1"
    };

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/reservation/cancelReservation.do",
        // url: "http://localhost:8080/Restaurant_Automation/reservation/cancelReservation.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(updateStatus),
        dataType: "json",
        success: function (response){

            if (response.result == 0) {

                $("#reservationstatusDisplay" + index).html("Reservation Cancelled");

            }else if (response.result == 1) {
                alert("back-end failed (reservation)");
            }
        },
        error: function (message) {
            alert("Nothing on our record (reservation)");
        }
    });
}

/*
 * This function will display the menu
 */
function display_Restaurant_Menu () {

    $("#menu").siblings().attr("class", "list-group-item list-group-item-action");
    $("#menu").attr("class", "list-group-item list-group-item-action active");

    sessionStorage.setItem('orderBar','0');

    // Show restaurant menu page and hide the other 3 pages
    $("#displayrestProf").hide();
    $("#displayingDeliveryOrder").hide();
    $("#displayingPickupOrder").hide();
    $("#displayingReservations").hide();
    $("#displayMenu").show();


    // empty the list before print the list; otherwise will repeatedly print the table every time you click the button
    $("#displayingMenuList").empty();
    // console.log("empty");

    let data = {
        restaurantEmail: paramEmail.email
    };

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/dish/getAllDish.do",
        // url: "http://localhost:8080/Restaurant_Automation/dish/getAllDish.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response){

            if(response.result == 0){

                // iterate each index and element to show it in the table


                let strDishType = "";

                // index are "main course", "slides(sides)", ... elementouter is the elements in each of the "i"'s
                $.each(response.data, function(index, elementouter) {

                    strDishType =  "<table>" + "<caption> " + index + "</caption>" +
                                    // "<thead><tr>\n" +
                                    //     "<th>Dish Image</th>\n" +
                                    //     "<th>Dish Name</th>\n" +
                                    //     "<th>Dish Price</th>\n" +
                                    //     "<th>Actions</th>\n" +
                                    //     "<th></th>\n" +
                                    // "</tr></thead>" +
                                    "<tbody>";

                    // "index" are the index of the elements in the list. In this case, there is only one element (elementInner) in each of the "i"s
                    $.each(elementouter, function (index, elementInner){
                        // print each dish
                        strDishType += "<tr>" +
                            "<td style='width: 20%;'>" +

                                "<div class='dish-wrapper'>" +
                                    "<img id='DishImg" + elementInner.dishId + "' style='height:50px; width:60px;' src = '" + elementInner.dishPhoto + "'/>" +
                                    "<div id='dishButtonClick" + elementInner.dishId + "' class='DishUpload-button'>" +
                                        "<i class='bi bi-cloud-arrow-up' aria-hidden='true'></i> " +
                                        "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='currentColor' class='bi bi-cloud-arrow-up' viewBox='0 0 16 16'>" +
                                            "<path fill-rule='evenodd' d='M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z'/>" +
                                            "<path d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z'/>" +
                                        "</svg>" +
                                    "</div>" +
                                    "<input id='dishImageUpload" + elementInner.dishId + "' type='file' accept='image/*'/>" +
                                "</div>" +

                            "</td>" +
                            "<td style='width: 60%;'>" +
                                "<input type='text' style='width:100%;' id='dishName" + elementInner.dishId + "' value='" + elementInner.dishName + "' readonly>" +
                            "</td>" +
                            "<td style='width: 4%;'>" +
                                "<input type='text' id='dishType" + elementInner.dishId + "' value='" + elementInner.dishType + "' readonly>" +
                            "</td>" +
                            "<td style='width: 4%;'>" +
                                "<input type='text' id='dishPrice" + elementInner.dishId + "' value='" + elementInner.dishPrice + "' readonly>" +
                            "</td>" +
                            "<td style='width: 4%;'>" +
                                "<button name='UpdateDishButton' id='dishUpdateButton" + elementInner.dishId + "' class='btn btn-outline-dark'>Edit</button>" +
                            "</td>" +
                            "<td style='width: 4%;'>" +
                                "<button name='SubmitDishButton' id='submitUpdateButton" + elementInner.dishId + "' class='btn btn-outline-dark' disabled>Submit</button>" +
                            "</td>" +
                            "<td>" +
                            "<button name='DeleteDishButton' id='deleteDishButton" + elementInner.dishId + "' class='btn btn-outline-dark'>Delete</button>" +
                            "</td>" +
                        "</tr>";
                    });

                    strDishType += "</tbody></table>";
                    $("#displayingMenuList").append(strDishType);


                });

                $("div[id^='dishButtonClick']").each(function(index, element) {
                    $(this).click(function() {
                        let dishID = $(this).attr("id").slice(15);

                        // console.log(dishID);

                        // Get the dish image
                        // var imageToBase64 = "adf";
                        let readURL = function (input) {
                            let fileData = input.files[0];
                            let pettern = /^image/;
                            if (pettern.test(fileData.type)) {
                                let reader = new FileReader();

                                reader.onload = function (e) {

                                    $("#DishImg" + dishID).attr('src', e.target.result);
                                    // imageToBase64 = e.target.result;

                                }
                                reader.readAsDataURL(input.files[0]);
                            } else {
                                alert("Your image cannot be uploaded because of the image format. Please select an image. ");
                            }
                        }
                        $("#dishImageUpload" + dishID).on('change', function(){
                            readURL(this);
                        });
                        // $("#dishButtonClick" + dishID).on('click', function() {
                             $("#dishImageUpload" + dishID).click();
                        // });
                    });
                });


                // update a dish
                $("button[id^='dishUpdateButton']").each(function (index, element) {
                    $(this).click(function () {
                        let dishID = $(this).attr("id").slice(16);
                        // add readonly  // $("#dishName" + dishID ).attr("readonly", "readonly");

                        // disable edit button after click it
                        $("#dishUpdateButton" + dishID).attr("disabled", true);

                        // let all the input box editable
                        $("#dishName" + dishID).attr("readonly", false);
                        $("#dishPrice" + dishID).attr("readonly", false);
                        $("#dishType" + dishID).attr("readonly", false);

                        // enable submit button after click edit button
                        $("#submitUpdateButton" + dishID).attr("disabled", false);
                    });
                });

                // submit update information
                $("button[id^='submitUpdateButton']").each(function(index, element) {
                    $(this).click(function (){

                        let dishID = $(this).attr("id").slice(18);

                        let dishName = $("#dishName" + dishID).val();
                        let dishPrice = $("#dishPrice" + dishID).val();
                        let dishType = $("#dishType" + dishID).val();
                        let dishPhoto =  $("#DishImg" + dishID)[0].src;

                        console.log(dishName, dishPrice, dishType);

                        if (dishName == null || dishName.length == 0) {
                            alert("Please enter a dish name. ");
                        } else if (isNaN(dishPrice) || dishPrice == null || dishPrice.length == 0) {
                            alert("Please enter a price. ");
                        } else if (dishType == null || dishType.length == 0) {
                            alert("Please enter a dish type. ");
                        } else {

                            let updateDish = {
                                dishId: dishID,
                                dishName: dishName,
                                dishPrice: dishPrice,
                                dishType: dishType,
                                dishPhoto: dishPhoto
                            };

                            // console.log(updateDish);

                            $.ajax({
                                type: "POST",
                                url: "http://47.89.231.231/Restaurant_Automation/dish/updateDish.do",
                                // url: "http://localhost:8080/Restaurant_Automation/dish/updateDish.do",
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify(updateDish),
                                dataType: "json",
                                success: function (response){

                                    if (response.result == 0) {

                                        // if successful, reprint the menu to sort dish type again
                                        $("#menu").click();
                                        alert("You have updated your menu. ");

                                        // make the input boxes read only after click submit
                                        $("#dishName" + dishID).attr("readonly", true);
                                        $("#dishPrice" + dishID).attr("readonly", true);
                                        $("#dishType" + dishID).attr("readonly", true);

                                        // make
                                        $("#submitUpdateButton" + dishID).attr("disabled", true);

                                    }else if (response.result == 1) {
                                        alert("back-end failed (menu)");
                                    }
                                },
                                error: function (message) {
                                    alert("Nothing on our record (menu)");
                                }
                            });
                        }

                    });
                });

                // delete a dish
                $("button[id^='deleteDishButton']").each(function(index, element){
                    $(this).click(function(){
                        let dishID = $(this).attr("id").slice(16);

                        let deleteDish = {
                            restaurantEmail: paramEmail.email,
                            dishId: dishID
                        };

                        console.log(deleteDish);

                        $.ajax({
                            type: "POST",
                            url: "http://47.89.231.231/Restaurant_Automation/dish/deleteDish.do",
                            // url: "http://localhost:8080/Restaurant_Automation/dish/deleteDish.do",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(deleteDish),
                            dataType: "json",
                            success: function (response){
                                if (response.result == 0) {
                                    $("#menu").click();
                                    alert("You have deleted a dish. ");
                                } else {
                                    alert("Back-end failed. ");
                                }
                            },
                            error: function (message) {
                                alert("Nothing on our record (menu)");
                            }
                        });

                    });
                });

            }else{
                alert("back-end unknown error ");
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });
}
// add a dish
function add_dish(){

    // Get the dish image
    // var imageToBase64 = "adf";
    let readURL = function (input) {
        let fileData = input.files[0];
        let pettern = /^image/;
        if (pettern.test(fileData.type)) {
            let reader = new FileReader();

            reader.onload = function (e) {

                $('.dish-pic').attr('src', e.target.result);
                // imageToBase64 = e.target.result;

            }
            reader.readAsDataURL(input.files[0]);
        } else {
            alert("Your image cannot be uploaded because of the image format. Please select another image. ");
        }
    }
    $(".dishImage-upload").on('change', function(){
        readURL(this);
    });
    $(".DishUpload-button").on('click', function() {
        $(".dishImage-upload").click();
    });

    $("#addDishButton").click(function () {
        let dishtype = $("#addDishType").val();
        let dishname = $("#addDishName").val();
        let dishprice = $("#addDishPrice").val();
        let dishphoto = $("#addDish")[0].src;

        // Make sure the price is a number with two decimal points
        if (dishname == "") {
            alert("Please enter a dish name. ");
            return;
        } else if (dishtype == "") {
            alert("Please enter a type for this dish. ");
            return;
        } else if (isNaN(dishprice) || dishprice == "") {
            alert("Please enter the price for added dish. ");
            return;
        } else if (dishphoto == "") {
            dishphoto = $("#addDish").attr("src", "./default_photo.jpg");
        } else {
            dishprice = Number(dishprice).toFixed(2);

            let addDish = {
                restaurantEmail: paramEmail.email,
                dishType: dishtype,
                dishName: dishname,
                dishPrice: dishprice,
                dishPhoto: dishphoto
            };


            $.ajax({
                type: "POST",
                url: "http://47.89.231.231/Restaurant_Automation/dish/addNewDish.do",
                // url: "http://localhost:8080/Restaurant_Automation/dish/addNewDish.do",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(addDish),
                dataType: "json",
                success: function (response){
                    if (response.result == 0) {
                        $("#menu").click();
                        alert("You just added a dish! ");
                        $("#addDishType").val("");
                        $("#addDishName").val("");
                        $("#addDishPrice").val("");
                        $("#addDish").attr("src", "./default_photo.jpg");

                    } else if (response.result == 2) {
                        alert("Dish already exists. ");
                    } else {
                        alert("Back-end failed. ");
                    }
                }, error: function (message) {
                    alert("Unknown Error. ");
                }
            });
        };
    });

}



