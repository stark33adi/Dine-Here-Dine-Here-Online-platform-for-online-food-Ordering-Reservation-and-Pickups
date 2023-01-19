$(function () {

    let customerEmail = checkIsLoggedIn();

    let param = {
        email: customerEmail
    }

    let paramCustomerEmail = {
        customerEmail: customerEmail
    }


    displayContent(1, 0, 0, 0);
    uploadPhoto();
    customerGetProfile(param);

    $("#customerUpdateProfile").on("click", function () {
        customerUpdateProfile(param);
    });

    $("#customerProfile").on("click", function () {
        $(this).siblings().attr("class", "list-group-item list-group-item-action");
        $(this).attr("class", "list-group-item list-group-item-action active");
    
        displayContent(1, 0, 0, 0);

        customerGetProfile(param);
    });

    $("#deliveryOrder").on("click", function () {
        $(this).siblings().attr("class", "list-group-item list-group-item-action");
        $(this).attr("class", "list-group-item list-group-item-action active");

        displayContent(0, 1, 0, 0);

        display_customerDeliveryOrder(paramCustomerEmail);
    });

    $("#pickupOrder").on("click", function () {
        $(this).siblings().attr("class", "list-group-item list-group-item-action");
        $(this).attr("class", "list-group-item list-group-item-action active");

        displayContent(0, 0, 1, 0);
        display_Restaurant_Pickup_Order (paramCustomerEmail);

    });

    $("#reservation").on("click", function () {
        $(this).siblings().attr("class", "list-group-item list-group-item-action");
        $(this).attr("class", "list-group-item list-group-item-action active");

        displayContent(0, 0, 0, 1);
        display_Restaurant_Reservation (paramCustomerEmail);
    });

});

function checkIsLoggedIn() {
    // role: "customer" / "restaurant" / "deliveryGuy"
    let role = "customer";
    let backupEmail = null;

    if (JSON.parse(localStorage.getItem(role)) == null) {
        return backupEmail;
    }
    let customer = JSON.parse(localStorage.getItem(role));
    if (customer.state == 1) {
        return customer.customerEmail;
    }
    if (customer.state == 0) {
        return backupEmail;
    }
}

function uploadPhoto() {
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
}

function customerGetProfile(param) {
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/customer/getProfile.do",
        // url: "http://localhost:8080/Restaurant_Automation/customer/getProfile.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (response) {

            if (response.result == 0) {
                // Get data from database
                let customerObject_fromBackend = response.data;
                
                $("#profileImage").attr("src", customerObject_fromBackend.photo);
                $("#displayCustomerFirstName").val(customerObject_fromBackend.firstName);
                $("#displayCustomerLastName").val(customerObject_fromBackend.lastName);
                $("#displayCustomerAddress").val(customerObject_fromBackend.address);
                $("#displayCustomerZipcode").val(customerObject_fromBackend.zipcode);
                $("#displayCustomerPhone").val(customerObject_fromBackend.phone);

            } else if (response.result == 1) {
                alert("Backend Failed: customer");
            } else {
                alert("back-end unknown error");
            }
        },
        error: function (message) {
            alert("Nothing on our record for this account");
        }
    });
}

function customerUpdateProfile (param) {


    let profileImage = $("#profileImage")[0].src;
    let customerFirstName = $("#displayCustomerFirstName").val();
    let customerLastName = $("#displayCustomerLastName").val();
    let customerAddress = $("#displayCustomerAddress").val();
    let customerZipcode = $("#displayCustomerZipcode").val();
    let customerPhone = $("#displayCustomerPhone").val();


    // console.log(bgImage);

    if (profileImage == null || profileImage.length == 0) {
        alert("Please upload your Profile Photo. ");
        return;
    } else if (customerFirstName == null || customerFirstName.length == 0) {
        alert("Please enter your First Name. ");
        return;
    } else if (customerLastName == null || customerLastName.length == 0) {
        alert("Please enter valid Last Name. ");
        return;
    } else if (customerAddress == null || customerAddress.length == 0) {
        alert("Please enter valid Address. ");
        return;
    } else if (customerZipcode == null || customerZipcode.length == 0) {
        alert("Please enter valid Zipcode. ");
        return;
    } else if (check_phone_number(customerPhone)) {
        alert("You have not updated your profile. ")
        return;
    }

    let updateItems = {
        email: param.email,
        firstName: customerFirstName,
        lastName: customerLastName,
        address: customerAddress,
        zipcode: customerZipcode,
        phone: customerPhone,
        photo: profileImage,
    };

    console.log(updateItems);

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/customer/updateProfile.do",
        // url: "http://localhost:8080/Restaurant_Automation/customer/updateProfile.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(updateItems),
        success: function (response) {
            if (response.result == 0) {
                alert("You updated your profile! ");
                return;
            } else if(response.result == 1) {
                alert("Backend Failed: customer");
                return;
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });
}

function check_phone_number (num) {
    if (num.length != 10) {
        alert("Please enter a 10 digits number. ");
        return 1;
    } else if (isNaN(Number(num)) == true) {
        alert("Please enter a valid Phone Number. ");
        return 1;
    } else {
        return 0;
    }
}

function displayContent(customerProfileTab, customerDeliveryOrderTab, customerPickupOrderTab, customerReservationTab) {
    if (customerProfileTab == 1) {
        $("#displayCustomerProfile").show();
        $("#displayCustomerProfile").siblings().hide();
    }
    if (customerDeliveryOrderTab == 1) {
        $("#displayCustomerDeliveryOrder").show();
        $("#displayCustomerDeliveryOrder").siblings().hide();
    }
    if (customerPickupOrderTab == 1) {
        $("#displayCustomerPickupOrder").show();
        $("#displayCustomerPickupOrder").siblings().hide();
    }
    if (customerReservationTab == 1) {
        $("#displayCustomerReservation").show();
        $("#displayCustomerReservation").siblings().hide();
    }
}

function display_customerDeliveryOrder(param) {
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/getOrderCustomer.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (response) {
            if (response.result == 0) {
                let customerDeliveryOrder_fromBackend = [];

                $.each(response.data, function (index, elementOuter) {
                    $.each(elementOuter, function (index, elementInner) {
                        if (elementInner.orderState == 0) {
                            elementInner.orderState = "Order Placed";
                        }
                        if (elementInner.orderState == 1) {
                            elementInner.orderState = "Order Cancelled";
                        }
                        if (elementInner.orderState == 2) {
                            elementInner.orderState = "Ready for Delivery";
                        }
                        if (elementInner.orderState == 3) {
                            elementInner.orderState = "On Delivery";
                        }
                        if (elementInner.orderState == 4) {
                            elementInner.orderState = "Order Delivered";
                        }

                        customerDeliveryOrder_fromBackend.push(elementInner);
                    });
                });

                $("#iterateDeliveryOrders").empty();

                let deliveryOrderStr = "";

                $.each(customerDeliveryOrder_fromBackend, function (index, element) {
                    deliveryOrderStr = 
                        '<tr>' +
                            '<td id="orderNumber' + index + '" class="delivery-order-table-col-1">' + element.orderNumber + '</td>' +
                            '<td class="delivery-order-table-col-2">' + element.restaurantName + '</td>' +
                            '<td class="delivery-order-table-col-3">' + element.restaurantPhone + '</td>' +
                            '<td class="delivery-order-table-col-4">' + element.totalPrice + '</td>' +
                            '<td class="delivery-order-table-col-5">' + element.note + '</td>' +
                            '<td class="delivery-order-table-col-6">' + element.orderState + '</td>' +
                            '<td class="delivery-order-table-col-7">' +
                                '<button name="trackDeliveryOrder" class="btn btn-primary">Track Order</button>' +
                            '</td>' +
                        '</tr>';
                    $("#iterateDeliveryOrders").append(deliveryOrderStr);
                });

                $("button[name='trackDeliveryOrder']").each(function (index, element) {
                    $(this).on("click", function () {
                        sessionStorage.setItem("OrderTabOption", 0);
                        let orderNumber = $("#orderNumber" + index).text();
                        sessionStorage.setItem("orderNumber", orderNumber);
                        window.location.assign("../order_status_page/order_status_page.html");
                    });
                });
            }

            if (response.result == 1) {
                alert("backend failed: deliveryOrder");
            }
             
        },
        error: function (message) {
            alert("connection fail");
        }
    });
}






function display_Restaurant_Pickup_Order (param){

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/pickupOrder/getOrderCustomer.do",
        // url: "http://localhost:8080/Restaurant_Automation/pickupOrder/getOrderCustomer.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (response){

            if(response.result == 0){
                
                let pickupOrder_backend = [];

                $.each(response.data, function(index, elementOuter) {
                    $.each(elementOuter, function(index, elementInner) {
                        pickupOrder_backend.push(elementInner);
                    });
                });
                
                console.log(pickupOrder_backend);

                let str = "";         
                      
                $("#iteratePickupOrders").empty();

                for (let i = 0; i < pickupOrder_backend.length; i++) {

                    let status = pickupOrder_backend[i].orderState;
                    let statustxt = ""; 

                    // 0: order placed
                    // 1: order is cancelled
                    // 2: order is ready for pickup
                    if (status == "0") {
                        statustxt = "Order Placed";
                    } else if (status == "1") {
                        statustxt = "Order Cancelled";
                    } else if (status == "2") {
                        statustxt = "Ready for Pickup";
                    } else {
                        alert("Error from getting pickup order status");
                    }

                    
                    str =
                        "<tr>" +
                        "<td id='pickupOrderNum" + i + "' class=\"pickup-order-table-col-1\">" + pickupOrder_backend[i].orderNumber + "</td>" +
                        "<td class=\"pickup-order-table-col-2\">" + pickupOrder_backend[i].restaurantName + "</td>" +
                        "<td class=\"pickup-order-table-col-3\">" + pickupOrder_backend[i].restaurantPhone + "</td>" +
                        "<td class=\"pickup-order-table-col-4\">" + pickupOrder_backend[i].totalPrice + "</td>" +
                        "<td class=\"pickup-order-table-col-5\">" + pickupOrder_backend[i].note + "</td>" +
                        "<td class=\"pickup-order-table-col-6\">" + statustxt + "</td>" +
                        "<td class=\"pickup-order-table-col-7\">" +
                        "<button name='trackOrderButton' class='btn btn-primary'>Track Order</button>" +
                        "</td>" +
                        "</tr>";

                    // Append the table column html code to the table
                    $("#iteratePickupOrders").append(str);
                }

                // OrderTabOption key values: 
                // 0: delivery
                // 1: pickup
                $("button[name='trackOrderButton']").each(function(index, element) {
                    $(this).click(function () {
                        sessionStorage.setItem('orderNumber', $("#pickupOrderNum" + index).text());
                        sessionStorage.setItem("OrderTabOption", 1);
                        window.location.assign("../order_status_page/order_status_page.html");
                    });
                });

            } else {
                alert("Backend Unkown Error. (showing customer pickup order). ");
            }

        }, 
        error: function () {
            alert("Unknown Error (showing customer pickup order). ");
        }
    });
}


function display_Restaurant_Reservation (param) {
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/reservation/getAllReservationByCustomer.do",
        // url: "http://localhost:8080/Restaurant_Automation/reservation/getAllReservationByCustomer.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (response){

            if(response.result == 0){
                let reservationList = response.data.reservation;

                $("#iterateReservation").empty();

                let str = "";

                for (let i = 0; i < reservationList.length; i++) {

                    let status = reservationList[i].reservationState;
                    let statustxt = "";


                    // 0: add reservation
                    // 1: restaurant cancel reservation
                    // 2: restaurant confirm reservation
                    if (status == "0") {
                        statustxt = "Reservation Placed";
                    } else if (status == "1") {
                        statustxt = "Cancelled";
                        
                    } else if (status == "2") {
                        statustxt = "Confirmed";
                    }

                    

                    str =
                        "<tr>" +
                        "<td class=\"reservation-order-table-col-1\">" + reservationList[i].restaurantName + "</td>" +
                        "<td class=\"reservation-order-table-col-2\">" + reservationList[i].restaurantAddress + "</td>" +
                        "<td class=\"reservation-order-table-col-3\">" + reservationList[i].restaurantPhone + "</td>" +
                        "<td id='reservationstatusDisplay" + i + "' class=\"reservation-order-table-col-4\">" + statustxt + "</td>" +
                        "<td class=\"reservation-order-table-col-5\">" + reservationList[i].note + "</td>" +
                        "<td class=\"reservation-order-table-col-6\">" + reservationList[i].partySize + "</td>" +
                        "<td class=\"reservation-order-table-col-7\">" + reservationList[i].reservationTime + "</td>" +
                        "<td class=\"reservation-order-table-col-8\">" +
                        "<button name='cancelReservationButton' class='btn btn-primary'>Cancel Resevation</button>" +
                        "</td>" +
                        "</tr>";

                    // Append the table column html code to the table
                    $("#iterateReservation").append(str);
                
                }

                $("button[name='cancelReservationButton']").each(function(index, element) {
                        
                        
                    if (reservationList[index].reservationState == "1" ) {
                        $(this).attr("disabled", "disabled");
                    } else {
                        $(this).click(function () {
                            let cancelStatus = CancelReservation(reservationList[index], index);
                        });
                        
                    }
                    
                });

            } else {
            alert("Backend Unkown Error. (showing customer reservation). ");
            }

        }, error: function () {
        alert("Unknown Error (showing customer reservation). ");
        }
    });
}
function CancelReservation (reservation, index) {
    let updateStatus = {
        reservationId: reservation.reservationId
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
                return 1;

            }else if (response.result == 1) {
                alert("back-end failed (customer reservation)");
            }
        },
        error: function () {
            alert("Nothing on our record (customer reservation)");
        }
    });
}

