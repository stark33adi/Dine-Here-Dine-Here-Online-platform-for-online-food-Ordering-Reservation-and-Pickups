let index_type;
let index_function;
let url = "http://47.89.231.231/Restaurant_Automation";
let u1 = "";
let u2 = "";




let array_type = 
[
    "customer",
    "restaurant",
    "dish",
    "cart",
    "deliveryOrder",
    "pickupOrder",
    "reservation"
];
let array_function = [
    // customer
    [
        "loginByEmail.do",
        "signUp.do",
        "forgetPassword.do",
        "updatePassword.do",
        "updateProfile.do",
        "checkPhone.do",
        "loginByOTC.do",
        "getProfile.do",
        "testPhoto.do"
    ],

    // restaurant
    [
        "login.do",
        "loginForPhone.do",
        "signUp.do",
        "forgetPassword.do",
        "getAllRestaurant.do",
        "getSecurityProfile.do",
        "getProfile.do",
        "updatePassword.do",
        "updateSecurityProfile.do",
        "updateProfile.do",
        "getPhoto.do",
        "addPhoto.do",
        "filter.do"
    ],

    // dish
    [
        "getAllDish.do",
        "get.do",
        "getProfileByDishId.do",
        "addNewDish.do",
        "updateDish.do",
        "deleteDish.do"
    ],

    // cart
    [
        "getCart.do",
        "addToCart.do",
        "removeFromCart.do",
        "cartCheckOut.do",
        "deleteCart.do"
    ],

    // deliveryOrder
    [
        "getOrderCustomer.do",
        "getOrderRestaurant.do",
        "getOrderDeliveryGuy.do",
        "getOrderByOrderNumber.do",
        "getNotTokenDeliveryOrder.do",
        "takeDeliveryOrder.do",
        "addOrder.do",
        "trackOrder.do",
        "updateOrderState.do",
        "restaurantCancelOrder.do"
    ],

    // pickupOrder
    [
        "getOrderCustomer.do",
        "getOrderRestaurant.do",
        "getOrderByOrderNumber.do",
        "addOrder.do",
        "trackOrder.do",
        "updateOrderState.do",
        "restaurantCancelOrder.do"
    ], 

    // reservation
    [
        "getAllReservationByCustomer.do",
        "getAllReservationByRestaurant.do",
        "addReservation.do",
        "confirmReservation.do",
        "cancelReservation.do"
    ]
];

$(function () {
    for (let i = 0; i < array_type.length; i++) {
        $("#object").append("<option>"+array_type[i]+"</option>");
    }
    $("#object").change(function () {
        $("#object_function").children().not(":eq(0)").remove();
        index_type = $(this).children("option:selected").index();
        // console.log("index_type: " + index_type);
        if (index_type != 0) {
            u1 = "/" + array_type[index_type - 1];
            // console.log("u1: " + u1);
            for (let i = 0; i < array_function[index_type - 1].length; i++) {
                $("#object_function").append("<option>"+array_function[index_type - 1][i]+"</option>");
            }
        }
        
    })

    $("#object_function").change(function () {
        index_function = $(this).children("option:selected").index();
        u2 = "/" + array_function[index_type - 1][index_function - 1];
        // console.log("u2: " + u2);
        // console.log("index_function: " + index_function[index_type - 1][index_function - 1]);
    })

    url = url + u1 + u2;

    getDistance();


})

function printUrl () {
    console.log("url: " + url + u1 + u2);
}

function callUrl () {
    let json = $("#json").val();
    $.ajax({
        type: "POST",
        url: url + u1 + u2,
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function(data){
            $("#dataFromMySql").val(data);
            // alert("success");
            console.log(data);
            return;
        },
        error: function (message) {
            alert("fail");
            return;
        }
    })
}

function getDistance () {

    $.ajax({
        type: "GET",
        url: "https://maps.googleapis.com/maps/api/distancematrix/json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        crossDomain: true,
        data: {
            origins: "475 Commonwealth Avenue #103, Boston, MA 02215",
            destinations: "925 Commonwealth Avenue, Boston, MA 02215",
            mode: "driving",
            key: "AIzaSyBhIVjzoYZfc0U6DXgqp6_wjmZ41MFKZAA"
        },
        success: function(response){
            console.log(response);
            return;
        },
        error: function (XMLHttpRequest, textStatus) {
            alert("fail get address");
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
            return;
        }
    })
}
