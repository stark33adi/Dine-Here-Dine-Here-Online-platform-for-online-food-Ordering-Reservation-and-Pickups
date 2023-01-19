$(document).ready(function () {
    let param = {};
    param.email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : "louis@bu.edu"
    customerProfile(param)
    $("#displaypickuphistory").hide();
    $("#displayReservation").hide();

    $("#displayDeliveryOrder").hide();
    $("#displayProfiletable").show();


});





































function customerProfile(param) {
    $.ajax({
        type: "POST",
        url: "http://123.56.14.64/Restaurant_Automation/customer/getProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/customer/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function (data) {
            if (data.result == 0) {
                //another choice: document.getElementById("first_name_value").innerHTML=firstName
                $("#first_name_value").val(data.data.firstName);
                $("#last_name_value").val(data.data.lastName);
                $("#email_value").val(data.data.email);
                $("#phone_value").val(data.data.phone);
                $("#zipcode_value").val(data.data.zipcode);
                $("#address_value").val(data.data.address);
                var img = new Image();
                img.src = data.data.photo;
                img.style.width = "200px";
                img.style.height = "200px";
                document.getElementById("display_photo").appendChild(img);
            } else if (data.result == 2) {
                alert("Do not have this email");
            } else {
                alert("back-end unknown error");
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });

}
























$("#upload_photo").change(function () {
    $("#display_photo").children().remove();
    var reader = new FileReader();
    var AllowImgFileSize = 2097152; //max upload size(byte)（ 2 M = 2097152 B ） bigger than it will fail
    var file = $("#upload_photo")[0].files[0];
    var imgUrlBase64;
    if (file) {
        //read photo file as Data URL type  
        imgUrlBase64 = reader.readAsDataURL(file);
        //console.log(imgUrlBase64);
        reader.onload = function (e) {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//the size of photo(byte), not use
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                alert('upload failed, please select a photo which is less than 2M!');
                return;
            } else {
                //execute upload to back-end
                let photo = {};
                photo.photo = reader.result
            }
            //display photo which source is DataUrl type of string
            let img = new Image();
            img.src = reader.result;
            img.style.width = "200px";
            img.style.height = "200px";
            div_block = document.getElementById("display_photo");
            div_block.appendChild(img)
        }

    }
})
function displayProfiletable(){
    $("#displayProfiletable").show();
    $("#displaypReservation").hide();
    $("#displaypickuphistory").hide()
    $("#displayDeliveryOrder").hide();
}





function displayReservation(){
    $("#displayProfiletable").hide();
    $("#displaypickuphistory").hide();
    $("#displayReservation").show();
    $("#displayDeliveryOrder").hide();

}





function displayDeliveryOrder(){
    $("#displayProfiletable").hide();
    $("#displaypickuphistory").hide();
    $("#displayReservation").hide();
    $("#displayDeliveryOrder").show();


}












function displaypickuphistory() {
    $("#displayProfiletable").hide();
    $("#displaypickuphistory").show();
    $("#displayReservation").hide();
    $("#displayDeliveryOrder").hide();
    let data = {
        restaurantEmail: paramEmail.email
    };

        $.ajax({
            type: "POST",
            url: "http://123.56.14.64/Restaurant_Automation/pickupOrder/getOrderRestaurant.do",
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
                            "<td>" + pickupOrder_backend[i].customerEmail + "</td>" +
                            "<td>" + pickupOrder_backend[i].totalPrice + "</td>" +
                            "<td name='pickuporderDetail'> Order Detail </td>" +
                            "<td>" + pickupOrder_backend[i].note + "</td>" +
                            "<td id='pickupstatusDisplay" + i + "'>" + statustxt + "</td>" +
                            "<td>" +
                            "<button name='completePickupButton'>Complete Order</button>" +
                            "</td>" +
                            "<td>" +
                            "<button name='cancelPickupButton'>Cancel Order</button>" +
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
                    alert("back-end unknown error 1");
                }
            },
            error: function (message) {
                alert("Nothing on our record");
            }
        });
    
}













function customerRevise(){
    if(($("#first_name_value").val()==null) || ($("#first_name_value").val()=='')){
        alert("first name cannot be none");
        return;
    }
    if(($("#last_name_value").val()==null) || ($("#last_name_value").val()=='')){
        alert("last name cannot be none");
        return;
    }
    if(($("#email_value").val()==null) || ($("#email_value").val()=='')){
        alert("email cannot be none");
        return;
    }
    if(($("#phone_value").val()==null) || ($("#phone_value").val()=='')){
        alert("phone cannot be none");
        return;
    }
    if(($("#zipcode_value").val()==null) || ($("#zipcode_value").val()=='')){
        alert("zipcode cannot be none");
        return;
    }
    if(($("#address_value").val()==null) || ($("#address_value").val()=='')){
        alert("address cannot be none");
        return;
    }
    if(($("#display_photo").children()[0].src==null) || ($("#display_photo").children()[0].src=='')){
        alert("photo cannot be none");
        return;
    }
    let param = {};
    param.firstName=$("#first_name_value").val();
    param.lastName=$("#last_name_value").val();
    param.email=$("#email_value").val();
    param.phone=$("#phone_value").val();
    param.zipcode=$("#zipcode_value").val();
    param.address=$("#address_value").val();
    param.photo=$("#display_photo").children()[0].src
    $.ajax({
        type: "POST",
        url: "http://123.56.14.64/Restaurant_Automation/customer/updateProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/customer/updateProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){
                alert("Success!")
            }else if(data.result == 2){
                alert("Email exist!Please input another email");
            }else{
                alert("Back-end unknown error")
            }
        },
        error: function (message) {
            alert("Front-end error or no response")
        }
    });
}

function click_cancel(){
    window.location.assign('../customer_profile/customer_profile.html') 
}






















function ChangeOrderToCompletepickup(order, index) {

let updateStatus = {
    orderNumber: order.orderNumber,
    restaurantEmail: paramEmail.email
};

$.ajax({
    type: "POST",
    url: "http://123.56.14.64/Restaurant_Automation/pickupOrder/updateOrderState.do",
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
    url: "http://123.56.14.64/Restaurant_Automation/pickupOrder/restaurantCancelOrder.do",
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


$.ajax({
    type: "POST",
    url: "http://123.56.14.64/Restaurant_Automation/reservation/getAllReservationByRestaurant.do",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    dataType: "json",
    success: function (response){

        if(response.result == 0){

            let reservation_backend = response.data.reservation;
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
                    "<td>" + reservation_backend[i].customerEmail + "</td>" +
                    "<td>" + reservation_backend[i].reservationTime + "</td>" +
                    "<td>" + reservation_backend[i].partySize + "</td>" +
                    "<td>" + reservation_backend[i].note + "</td>" +
                    "<td id='reservationstatusDisplay" + i + "'>" + statustxt + "</td>" +
                    "<td>" +
                    "<button name='completeReservationButton'>Complete Order</button>" +
                    "</td>" +
                    "<td>" +
                    "<button name='cancelReservationButton'>Cancel Order</button>" +
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

function ConfirmReservation (reservation, index) {
let updateStatus = {
    reservationId: reservation.reservationId
    //restaurantEmail: paramEmail.email
};



$.ajax({
    type: "POST",
    url: "http://123.56.14.64/Restaurant_Automation/reservation/confirmReservation.do",
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
    url: "http://123.56.14.64/Restaurant_Automation/reservation/cancelReservation.do",
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

