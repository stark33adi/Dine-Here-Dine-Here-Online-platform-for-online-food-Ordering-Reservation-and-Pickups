
var deliEmail;

deliEmail = sessionStorage.getItem("deliEmail") ? sessionStorage.getItem("deliEmail") : "croloff4@sogou.com";

// profile popup settings
$("#deliveryGuyProfileIcon").click(function(){
    $("#box").show();
    $("#hidden").show();
});
$("#close").click(function(){
    $("#box").hide();
    $("#hidden").hide();
});
// Upload delivery guy profile image
$("#DGUpload-buttonClick").click(function () {


    let readURL = function (input) {
        let fileData = input.files[0];
        let pettern = /^image/;

        if (pettern.test(fileData.type)) {
            let reader = new FileReader();

            reader.onload = function(e) {
                $("#DGImage").attr("src", e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        } else {
            alert("Your image cannot be uploaded because of the image format. Please select an image");
        }
    }
    $("#DGImageUpload").on('change', function(){
        readURL(this);
    });
    // $("#DGUpload-button").on('change', function() {
        $("#DGImageUpload").click();
    // });
});


function change_sidebar (newOrder, ongoingOrder, pastOrder) {
    // if (newOrder == 1 ) {
    //     $("#displayNewOrders").show();
    // }
    // if (newOrder == 0) {
    //     $("#displayNewOrders").hide();
    // }
    //
    // if (ongoingOrder == 1 ) {
    //     $("#displayOngoingOrders").show();
    // }
    // if (ongoingOrder == 0) {
    //     $("#displayOngoingOrders").hide();
    // }
    //
    // if (pastOrder == 1 ) {
    //     $("#displayPastOrders").show();
    // }
    // if (pastOrder == 0) {
    //     $("#displayPastOrders").hide();
    // }

    if (newOrder == 1 ) {
        $("#displayNewOrders").show();
        $("#NotFoundImage").hide();
        $("#newOrderInfo").hide();
        $("#displayNewOrders").siblings().hide();
    }
    if (ongoingOrder == 1 ) {
        $("#displayOngoingOrders").show();
        $("#CompleteImage").hide();
        $("#OngoingOrderInfo").hide();
        $("#displayOngoingOrders").siblings().hide();
    }
    if (pastOrder == 1 ) {
        $("#displayPastOrders").show();
        $("#NoPastOrderImage").hide();
        $("#PastOrderInfo").hide();
        $("#displayPastOrders").siblings().hide();
    }

}


// Show delivery guy profile
$(document).ready(function(){

    display_past_order();

    change_sidebar(1, 0, 0);

    let DGEmail = {
        email: deliEmail
    }

    // display profile
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryGuy/getProfile.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryGuy/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(DGEmail),
        dataType: "json",
        success: function(response){
            DGProfile = response.data;
            // console.log(DGProfile);

            if(response.result == 0) {


                if (DGProfile.photo == "") {
                    $("#DGImage").attr("src", "./default_photo.jpg");
                } else {
                    $("#DGImage").attr("src", DGProfile.photo);
                }

                $("#displayFirstName").val(DGProfile.firstName);
                $("#displayLastName").val(DGProfile.lastName);
                $("#displayAddress").val(DGProfile.address);
                $("#displayZipcode").val(DGProfile.zipcode);
                $("#displayPhoneNum").val(DGProfile.phone);
            } else if(response.result == 1) {
                alert("Backend failed. ");
            }
        }
    })


    // show new orders every time driver open the dashboard
    restore_ongoing_order();
    $("#NewOrders").click(function (){
        change_sidebar(1, 0, 0);
        display_new_orders();
    });


});

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
// Update delivery guy profile
$("#UpdateProfile").click(function(){

    let firstName = $("#displayFirstName").val();
    let lastName = $("#displayLastName").val();
    let address = $("#displayAddress").val();
    let zipcode = $("#displayZipcode").val();
    let phone =  $("#displayPhoneNum").val();
    let photo = $("#DGImage")[0].src;

    if (firstName == "" || lastName == "" || address == "") {
        alert("Your profile is incomplete. Please enter your name and address");
        return;
    } else if (zipcode.length != 5 || isNaN(Number(zipcode))){
        alert("Please enter a valid zipcode. ");
        return;
    } else if (address == "") {
        alert("Please enter your street address. ");
        return;
    } else if (check_phone_number(phone)) {
        return;
    } else {
        let updateItems = {
            email: deliEmail,
            firstName: firstName,
            lastName: lastName,
            address: address,
            zipcode: zipcode,
            phone: phone,
            photo: photo
        }

        $.ajax({
            type: "POST",
            url: "http://47.89.231.231/Restaurant_Automation/deliveryGuy/updateProfile.do",
            // url: "http://localhost:8080/Restaurant_Automation/deliveryGuy/updateProfile.do",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(updateItems),
            dataType: "json",
            success:function (response) {
                if (response.result == 0) {
                    alert("You have updated your profile");
                    $("#box").hide();
                    $("#hidden").hide();
                } else if (response.result == 1) {
                    alert("Backend error. ");
                } else {
                    alert("Unknown Error. ");
                }
            }
        });
    }



});


function display_new_orders() {

    change_sidebar(1, 0, 0);
    $("#NewOrders").siblings().attr("class", "");
    $("#NewOrders").attr("class", "active");


    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/getNotTakenDeliveryOrder.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/getNotTakenDeliveryOrder.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (response){

            if(response.result == 0){

                let newOrders_backend = [];

                $.each(response.data, function(index, elementOuter){
                    $.each(elementOuter, function(index, elementInner){
                        newOrders_backend.push(elementInner);
                    });
                });

                if (newOrders_backend.length == 0) {
                    $("#NotFoundImage").show();
                } else {
                    $("#newOrderInfo").show();

                    $("#iterateNewOrders").empty();

                    let str = "";
                    for (let i = 0; i < newOrders_backend.length; i++){
                        str =
                            "<tr class='tr-content'>" +
                            "<td class='tableNewOrder-1'>" + newOrders_backend[i].restaurantPhone + "</td>" +
                            "<td class='tableNewOrder-2'>" + newOrders_backend[i].restaurantName + "</td>" +
                            "<td class='tableNewOrder-3'>" + newOrders_backend[i].restaurantAddress + "</td>" +
                            "<td class='tableNewOrder-4'>" + newOrders_backend[i].customerAddress + "</td>" +
                            "<td class='tableNewOrder-5'>" + newOrders_backend[i].note + "</td>" +
                            "<td class='tableNewOrder-6'>" + newOrders_backend[i].tip + "</td>" +
                            "<td class='tableNewOrder-7'>" + "<button class='btn btn-warning' name='takeOrderButton'>Take Order</button>" + "</td>";

                        $("#iterateNewOrders").append(str);
                    }

                    $("button[name='takeOrderButton']").each(function(index, element) {
                        $(this).click(function (){
                            // console.log(newOrders_backend[index].orderNumber);
                            change_status_to_delivery(newOrders_backend[index].orderNumber);
                            $("#CompleteText").text("You have completed a delivery request! Please go to \"New Orders\" tab to take more delivery requests. ");
                        });
                    });
                }



            } else if (response.result == 1) {
                alert("Backend failed");
            }
        },
        error: function (){
            alert("Unknown Error. ");
        }

    });
}
// status 2 to 3
function change_status_to_delivery(newOrderNumber) {


    let updateStatus = {
        orderNumber: newOrderNumber,
        deliveryGuyEmail: deliEmail
    }

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/takeDeliveryOrder.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/takeDeliveryOrder.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(updateStatus),
        dataType: "json",
        success: function (response){

            if(response.result == 0){
                alert("You just took a delivery order. Safe drive! ");
                // console.log(newOrderNumber);

                localStorage.setItem("CurDeliveryOrder", newOrderNumber);
                // Only status 3 is possible here
                localStorage.setItem("CurDeliveryOrderState", "3");

                console.log("1");
                display_ongoing_orders();
                $("#NewOrders").attr("disabled", 'disabled').css('pointer-events', 'none');
                $("#NewOrders").css('color', 'grey');

                $("#OngoingOrders").siblings().attr("class", "");
                $("#OngoingOrders").attr("class", "active");

            } else if (response.result == 1) {
                alert("Backend fail. ");
            }
        },
        error: function (){
            alert("Unknown Error");
        }
    });
}


function display_ongoing_orders() {
    change_sidebar(0, 1, 0);

    let CurOrder = localStorage.getItem("CurDeliveryOrder") ? localStorage.getItem("CurDeliveryOrder") : null;
    let CurOrderState = localStorage.getItem("CurDeliveryOrderState") ? localStorage.getItem("CurDeliveryOrderState") : "0";

    $("#OngoingOrders").siblings().attr("class", "");
    $("#OngoingOrders").attr("class", "active");

    if (CurOrderState != "3") {
        $("#CompleteImage").show();
        return;
    }

    let data={
        orderNumber:CurOrder
    }

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/getOrderByOrderNumber.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/getOrderByOrderNumber.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response) {

            if (response.result == 0) {

                let curOrder_backend = [];

                $.each(response.data, function(index, elementOuter) {
                    $.each(elementOuter, function(index, elementInner) {
                        curOrder_backend.push(elementInner);
                    });
                });

                console.log(curOrder_backend);

                if (curOrder_backend[0].orderState == "4") {

                    $("#CompleteImage").show();

                } else {
                    $("#OngoingOrderInfo").show();


                    $("#OrderNum").text("Order #. :  " + curOrder_backend[0].orderNumber);
                    $("#restNameValue").text(curOrder_backend[0].restaurantName);
                    $("#restAddressValue").text(curOrder_backend[0].restaurantAddress);
                    $("#restPhoneValue").text(curOrder_backend[0].restaurantPhone);

                    $("#custNameValue").text(curOrder_backend[0].customerFirstName + " " + curOrder_backend[0].customerLastName);
                    $("#custAddressValue").text(curOrder_backend[0].customerAddress);
                    $("#custPhoneValue").text(curOrder_backend[0].customerPhone);

                    $("#notes").text(curOrder_backend[0].note);
                }

            } else if (response.result == 1) {
                alert("Backend failed");
            }

        }
    });
}
function change_status_to_complete () {


    let CurOrder = localStorage.getItem("CurDeliveryOrder") ? localStorage.getItem("CurDeliveryOrder") : "00007";

    let data = {
        orderNumber: CurOrder,
        deliveryGuyEmail: deliEmail
    }

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/updateOrderState.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/updateOrderState.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response) {
            if (response.result == 0) {
                alert("You have completed an order! ");

                localStorage.setItem("CurDeliveryOrderState", "4");
                $("#CompleteImage").show();

                $("#OngoingOrderInfo").hide();
                $("#NewOrders").removeAttr("disabled").css('pointer-events', '');
                $("#NewOrders").css('color','');

            } else if (response.result == 1) {
                alert("Backend failed. ");

            } else if (reponse.result == 2) {
                alert("Use url in a wrong way. ")
            }
        }
    });
}
function restore_ongoing_order() {
    let CurOrderState = localStorage.getItem("CurDeliveryOrderState") ? localStorage.getItem("CurDeliveryOrderState") : "0";

    if (CurOrderState == "3") {
        display_ongoing_orders();
        $("#OngoingOrders").siblings().attr("class", "");
        $("#OngoingOrders").attr("class", "active");
        $("#NewOrders").attr("disabled", 'disabled').css('pointer-events', 'none');
    } else {

        display_new_orders();
        $("#NewOrders").siblings().attr("class", "");
        $("#NewOrders").attr("class", "active");
        // $("#OngoingOrders").attr("disabled", 'disabled').css('pointer-events', 'none');
    }
}


function display_past_order() {

    change_sidebar(0, 0, 1);

    $("#PastOrders").siblings().attr("class", "");
    $("#PastOrders").attr("class", "active");

    let data = {
        deliveryGuyEmail: deliEmail
    };

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/getOrderDeliveryGuy.do",
        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/getOrderDeliveryGuy.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (response){

            if(response.result == 0){

                let AllOrders = [];

                $.each(response.data, function(index, elementOuter) {
                    if (index == "4") {
                        $.each(elementOuter, function (index, elementInner) {
                            // console.log(elementInner);
                            AllOrders.push(elementInner);
                        });
                    }
                });


                let str = "";
                let totalTips = 0;

                $("#iteratePastOrders").empty();

                for (let i = 0; i < AllOrders.length; i++) {
                    str = "<tr class='tr-content'>" +
                        "<td style='width: 8%'>" + AllOrders[i].orderNumber + "</td>" +
                        "<td style='width: 12%'>" + AllOrders[i].customerPhone + "</td>" +
                        "<td style='width: 20%'>" + AllOrders[i].customerAddress + "</td>" +
                        "<td style='width: 12%'>" + AllOrders[i].restaurantPhone + "</td>" +
                        "<td style='width: 20%'>" + AllOrders[i].restaurantAddress + "</td>" +
                        "<td style='width: 18%'>" + AllOrders[i].note + "</td>" +
                        "<td style='width: 10%'>" + AllOrders[i].tip + "</td>" +
                        "</tr>";

                    totalTips += parseFloat(AllOrders[i].tip);

                    $("#iteratePastOrders").append(str);
                }

                if (totalTips == 0){
                    $("#totalTips").text("You earned $0 tips..");
                } else {
                    $("#totalTips").text("Your earned $" + totalTips + " tips!");
                }

                if (str == "") {
                    $("#NoPastOrderImage").show();
                } else {
                    $("#PastOrderInfo").show();
                }


            } else if (response.result == 1) {
                alert("Backend failed. ");
            }
        }
    });


}
