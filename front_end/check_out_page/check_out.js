// test sets
let testCustomerEmail = "emily@gmail.com";
let testRestaurantEmail = "sturrell2@gmail.com";
let testOrderNumber = "00001";

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

let paymentDeliveryShow = false;
let paymentPickupShow = false;


    
$(function () {

    // $("#pickupTab").click();
    // console.log(dish[0].dishPrice);
    initialState();
    
    showData();
    
});

function initialState() {
    // if (sessionStorage.getItem("OrderTabOption") == null) {
    sessionStorage.setItem("OrderTabOption", 0);
    document.getElementById("deliveryfeetitle").style.display = "";
    document.getElementById("deliveryfee").style.display = "";
    // }

    if (sessionStorage.getItem("DeliveryOption") == null) {
        sessionStorage.setItem("DeliveryOption", 0);
    }

    if (sessionStorage.getItem("TipOption") == null) {
        sessionStorage.setItem("TipOption", 3);
    }

    document.getElementById("deliveryNotSupported").style.display = "none";
    document.getElementById("pickupNotSupported").style.display = "none";
    
    
    document.getElementById("accordionDelivery").style.display = "none";
    document.getElementById("accordionPickup").style.display = "none";

    $("#accordionPayment").hide();
    $("#checkoutButton").attr("disabled", "disabled");

    $("#distance_value").text("3 miles");

    let serviceType = "";
    let deliveryOrderAddress = "";
    let pickupOrderAddress = "";

    let customerEmail = JSON.parse(localStorage.getItem("customer")).customerEmail;
    let restaurantEmail = sessionStorage.getItem("restaurantEmail") ? sessionStorage.getItem("restaurantEmail") : testRestaurantEmail;

    let indexDorder = -1;
    let indexPorder = -1;

    let data1 = {
        email: customerEmail
    }

    let data2 = {
        email: restaurantEmail
    }


    initialOne_ajax = $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/customer/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data1),
        dataType: "json",
        success: function (response) {
            if (response.result == 0) {
                deliveryOrderAddress = response.data.address;
            }
            if (response.result == 1) {
                alert("unknown back-end error: customer");
            }

        }
    });

    initialTwo_ajax = $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/restaurant/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data2),
        dataType: "json",
        success: function (response) {
            // console.log(response.data);
            if (response.result == 0) {
                serviceType = response.data.rest[0].serviceType;
                pickupOrderAddress = response.data.rest[0].address;
            }
            if (response.result == 1) {
                alert("unknown back-end error: restaurant");
            }


        }
    });

    $.when(initialOne_ajax, initialTwo_ajax).done(function() {
        indexDorder = serviceType.indexOf("Delivery");
        indexPorder = serviceType.indexOf("Pickup");

        /* console.log("serviceType: "+serviceType);
        console.log("deliveryOrderAddress: "+deliveryOrderAddress);
        console.log("pickupOrderAddress: "+pickupOrderAddress);
        
        
        console.log("indexDorder: "+indexDorder);
        console.log("indexPorder: "+indexPorder); */

        
        // Delivery
        indexDorder = serviceType.indexOf("Delivery");


        if (indexDorder == -1) {
            document.getElementById("deliveryNotSupported").style.display = "";
            document.getElementById("accordionDelivery").style.display = "none";
        } else {
            paymentDeliveryShow = true;
            $("#accordionPayment").show();
            $("#checkoutButton").removeAttr("disabled");

            document.getElementById("accordionDelivery").style.display = "";

            $('#collapseOne').on('hide.bs.collapse', function() {
                document.getElementById("dAddressTitle").innerText = "Location: "+deliveryOrderAddress;
            })
                
            $('#collapseOne').on('show.bs.collapse', function() {
                document.getElementById("dAddressTitle").innerText = "Location: ";
            })

            if (deliveryOrderAddress.length != 0) {
                document.getElementById("dAddress_value").innerText = deliveryOrderAddress;
                document.getElementById("dAddressTitle").innerText = "Location: "+deliveryOrderAddress;
            } else {
                document.getElementById("dAddressTitle").innerText = "Location: ";
            }
            
            $('#collapseTwo').on('hide.bs.collapse', function() {
                // console.log("collapse");

                if ($("#Leave it at door").prop("checked")) {
                    // console.log("choose leave it at door");
                    
                    note = "Leave it at door. ";
                    
                }
    
                if ($("#Meet at door").prop("checked")) {
                    // console.log("choose meet at door");
                    note = "Meet at door. ";
                    
                }

                if (sessionStorage.getItem("DeliveryOption") == 0) {
                    document.getElementById("dNoteTitle").innerText = "Note: Leave it at door";
                }

                if (sessionStorage.getItem("DeliveryOption") == 1) {
                    document.getElementById("dNoteTitle").innerText = "Note: Meet at door";
                }
            })
                
            $('#collapseTwo').on('show.bs.collapse', function() {
                // console.log("expand");
                document.getElementById("dNoteTitle").innerText = "Note: ";
            })
        }


        // Pickup
        indexPorder = serviceType.indexOf("Pickup");
        let distance = document.getElementById("distance_value").innerText;

        if (indexPorder == -1) {
            document.getElementById("pickupNotSupported").style.display = "";
            document.getElementById("accordionPickup").style.display = "none";
        } else {
            paymentPickupShow = true;

            document.getElementById("accordionPickup").style.display = "";

            $('#collapseFour').on('hide.bs.collapse', function() {
                document.getElementById("pAddressTitle").innerText = "Distance: "+distance;
            })
                
            $('#collapseFour').on('show.bs.collapse', function() {
                document.getElementById("pAddressTitle").innerText = "Distance: ";
            })

            if (pickupOrderAddress.length != 0) {
                document.getElementById("pAddress_value").innerText = pickupOrderAddress;
                document.getElementById("pAddressTitle").innerText = "Distance: "+distance;

            } else {
                document.getElementById("pAddressTitle").innerText = "Distance: ";
            }
        }

    });
}

function leaveItAtDoor() {
    // console.log("choose leave it at door");
    sessionStorage.setItem("DeliveryOption", 0);
    // document.getElementById("dNote").innerText = "Leave it at door";
}

function meetAtDoor() {
    // console.log("choose meet at door");
    sessionStorage.setItem("DeliveryOption", 1);
    // document.getElementById("dNote").innerText = "Meet at door";
}

function deliveryTab() {

    if (paymentDeliveryShow) {
        $("#accordionPayment").show();
        $("#checkoutButton").removeAttr("disabled");
    } else {
        $("#accordionPayment").hide();
        $("#checkoutButton").attr("disabled", "disabled");
    }
    
    sessionStorage.setItem("OrderTabOption", 0);

    document.getElementById("deliveryfeetitle").style.display = "";
    document.getElementById("deliveryfee").style.display = "";
    document.getElementById("deliveryFeeDollar").style.display = "";

    document.getElementById("tipgrouptitle").style.display = "";
    document.getElementById("tipgroup").style.display = "";
    document.getElementById("tipDollar").style.display = "";

    document.getElementById("tiptitle").style.display = "";
    document.getElementById("tip").style.display = "";

    let sum = parseFloat(document.getElementById("subtotal").innerText);

    let tipRate = parseFloat(sessionStorage.getItem("TipOption") * 0.05);

    let tip = parseFloat((sum * tipRate).toFixed(2));

    let deliveryFee = parseFloat((sum * 0.02).toFixed(2));

    let tax = parseFloat((sum * 0.03).toFixed(2));
    
    document.getElementById("total").innerText = (sum + tip + deliveryFee + tax).toFixed(2);

}

function pickupTab() {

    if (paymentPickupShow) {
        $("#accordionPayment").show();
        $("#checkoutButton").removeAttr("disabled");
    } else {
        $("#accordionPayment").hide();
        $("#checkoutButton").attr("disabled", "disabled");
    }
    
    sessionStorage.setItem("OrderTabOption", 1);

    document.getElementById("deliveryfeetitle").style.display = "none";
    document.getElementById("deliveryfee").style.display = "none";
    document.getElementById("deliveryFeeDollar").style.display = "none";

    document.getElementById("tipgrouptitle").style.display = "none";
    document.getElementById("tipgroup").style.display = "none";
    document.getElementById("tipDollar").style.display = "none";

    document.getElementById("tiptitle").style.display = "none";
    document.getElementById("tip").style.display = "none";

    let sum = parseFloat(document.getElementById("subtotal").innerText);

    let tax = parseFloat((sum * 0.03).toFixed(2));

    // let tipRate = sessionStorage.getItem("TipOption")  * 0.05;
    
    document.getElementById("total").innerText = (sum + tax).toFixed(2);
    
}



// 0%
function tip0() {
    sessionStorage.setItem("TipOption", 0);
    document.getElementById("tip0").checked = true;
    let sum = parseFloat(document.getElementById("subtotal").innerText);
    document.getElementById("tip").innerText = (0).toFixed(2);
    let deliveryFee = 0;
    let tip = 0;
    let tax = parseFloat((sum * 0.03).toFixed(2));
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 0) {
        deliveryFee = parseFloat((sum * 0.02).toFixed(2));
        tip = 0
        document.getElementById("tip").innerText = tip.toFixed(2);
    }
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 1) {
        deliveryFee = 0;
        tip = 0;
    }
    document.getElementById("total").innerText = (sum + deliveryFee + tip + tax).toFixed(2);
}

// 5%
function tip1() {
    sessionStorage.setItem("TipOption", 1);
    document.getElementById("tip1").checked = true;
    let sum = parseFloat(document.getElementById("subtotal").innerText);
    let deliveryFee = 0;
    let tip = 0;
    let tax = parseFloat((sum * 0.03).toFixed(2));
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 0) {
        deliveryFee = parseFloat((sum * 0.02).toFixed(2));
        tip = parseFloat((sum * 0.05).toFixed(2));
        document.getElementById("tip").innerText = tip.toFixed(2);
    }
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 1) {
        deliveryFee = 0;
        tip = 0;
    }
    document.getElementById("total").innerText = (sum + deliveryFee + tip + tax).toFixed(2);
}

// 10%
function tip2() {
    sessionStorage.setItem("TipOption", 2);
    document.getElementById("tip2").checked = true;
    let sum = parseFloat(document.getElementById("subtotal").innerText);
    let deliveryFee = 0;
    let tip = 0;
    let tax = parseFloat((sum * 0.03).toFixed(2));
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 0) {
        deliveryFee = parseFloat((sum * 0.02).toFixed(2));
        tip = parseFloat((sum * 0.10).toFixed(2));
        document.getElementById("tip").innerText = tip.toFixed(2);
    }
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 1) {
        deliveryFee = 0;
        tip = 0;
    }
    document.getElementById("total").innerText = (sum + deliveryFee + tip + tax).toFixed(2);
}

// 15%
function tip3() {
    sessionStorage.setItem("TipOption", 3);
    document.getElementById("tip3").checked = true;
    let sum = parseFloat(document.getElementById("subtotal").innerText);
    let deliveryFee = 0;
    let tip = 0;
    let tax = parseFloat((sum * 0.03).toFixed(2));
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 0) {
        deliveryFee = parseFloat((sum * 0.02).toFixed(2));
        tip = parseFloat((sum * 0.15).toFixed(2));
        document.getElementById("tip").innerText = tip.toFixed(2);
    }
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 1) {
        deliveryFee = 0;
        tip = 0;
    }
    document.getElementById("total").innerText = (sum + deliveryFee + tip + tax).toFixed(2);
}

// 20%
function tip4() {
    sessionStorage.setItem("TipOption", 4);
    document.getElementById("tip4").checked = true;
    let sum = parseFloat(document.getElementById("subtotal").innerText);
    let deliveryFee = 0;
    let tip = 0;
    let tax = parseFloat((sum * 0.03).toFixed(2));
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 0) {
        deliveryFee = parseFloat((sum * 0.02).toFixed(2));
        tip = parseFloat((sum * 0.20).toFixed(2));
        document.getElementById("tip").innerText = tip.toFixed(2);
    }
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 1) {
        deliveryFee = 0;
        tip = 0;
    }
    document.getElementById("total").innerText = (sum + deliveryFee + tip + tax).toFixed(2);
}

// 25%
function tip5() {
    sessionStorage.setItem("TipOption", 5);
    document.getElementById("tip5").checked = true;
    let sum = parseFloat(document.getElementById("subtotal").innerText);
    let deliveryFee = 0;
    let tip = 0;
    let tax = parseFloat((sum * 0.03).toFixed(2));
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 0) {
        deliveryFee = parseFloat((sum * 0.02).toFixed(2));
        tip = parseFloat((sum * 0.25).toFixed(2));
        document.getElementById("tip").innerText = tip.toFixed(2);
    }
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 1) {
        deliveryFee = 0;
        tip = 0;
    }
    document.getElementById("total").innerText = (sum + deliveryFee + tip + tax).toFixed(2);
}

// 30%
function tip6() {
    sessionStorage.setItem("TipOption", 6);
    document.getElementById("tip6").checked = true;
    let sum = parseFloat(document.getElementById("subtotal").innerText);
    let deliveryFee = 0;
    let tip = 0;
    let tax = parseFloat((sum * 0.03).toFixed(2));
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 0) {
        deliveryFee = parseFloat((sum * 0.02).toFixed(2));
        tip = parseFloat((sum * 0.30).toFixed(2));
        document.getElementById("tip").innerText = tip.toFixed(2);
    }
    if (parseInt(sessionStorage.getItem("OrderTabOption")) == 1) {
        deliveryFee = 0;
        tip = 0;
    }
    document.getElementById("total").innerText = (sum + deliveryFee + tip + tax).toFixed(2);
}

function showData() {
    

    let str = "";
    let sum = 0;

    let cart = JSON.parse(sessionStorage.getItem("cart")) ? JSON.parse(sessionStorage.getItem("cart")) : testCart;
    // console.log(cart);
    let tipRate = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3];
            
            
    // pickupOrderAddress = response.data.rest[0].address;
    for (let i = 0; i < cart.length; i++) {
        str =
            "<tr>" +
                "<td class='no'>" + (i + 1) + "</td>" +
                "<td class='dishname'>" + cart[i].dishName + "</td>" +
                "<td class='dishcount'>" + cart[i].dishCount + "</td>" +
                "<td class='dishprice'>" + cart[i].dishPrice + "</td>" +
            "</tr>";

        $("#dishCart").append(str);

         

        sum += Number(cart[i].dishPrice) * Number(cart[i].dishCount);
        // console.log(sum);
        // console.log(parseFloat(cart[i].dishPrice) * parseFloat(cart[i].dishCount) + 0.02);
    }

    tipRate = Number(tipRate[parseInt(sessionStorage.getItem("TipOption"))]);

    // console.log("index: "+sessionStorage.getItem("TipOption"));
    // console.log("tipRate: "+tipRate);

    document.getElementById("subtotal").innerText = sum.toFixed(2);

    document.getElementById("deliveryfee").innerText = (sum * 0.02).toFixed(2);
     
    document.getElementById("tip").innerText = (sum * tipRate).toFixed(2);

    document.getElementById("tax").innerText = (sum * 0.03).toFixed(2);

    document.getElementById("total").innerText = (sum * (1 + tipRate + 0.02 + 0.03)).toFixed(2);

}



function checkOut() {
    let dish = JSON.parse(sessionStorage.getItem("cart"));
    let orderTabOption = sessionStorage.getItem("OrderTabOption");
    let note = "";
    // console.log(orderTabOption);

    if (orderTabOption == 0) {
        // let note = "";
        let additionalNotes = document.getElementById("delivery additional notes");

        if (sessionStorage.getItem("DeliveryOption") == 0) {
            // console.log("choose leave it at door");
            note = "Leave it at door. ";
        }

        if (sessionStorage.getItem("DeliveryOption") == 1) {
            // console.log("choose meet at door");
            note = "Meet at door. ";
        }

        if (additionalNotes.value.length != 0) {
            note += additionalNotes.value;
            // console.log("delivery note: "+note)
        }
    }

    if (orderTabOption == 1) {
        // let note = "";
        let additionalNotes = document.getElementById("pickup additional notes");

        if (additionalNotes.value.length != 0) {
            note += additionalNotes.value;
            // console.log("pickup note: "+note)
        }
    }

    let deliveryFee = 0;
    let tip = 0;
    let subTotal = document.getElementById("subtotal").innerHTML;
    if (orderTabOption == 0) {
        deliveryFee = document.getElementById("deliveryfee").innerHTML;
        tip = document.getElementById("tip").innerHTML;
    }
    let tax = document.getElementById("tax").innerHTML;
    let totalPrice = document.getElementById("total").innerHTML;

    // console.log("sum: " + document.getElementById("subtotal").innerHTML);
    // console.log("sum: " + document.getElementById("total").innerHTML);
    // console.log("sum: " + totalPrice);

    console.log(JSON.parse(localStorage.getItem("customer")).customerEmail);

    let deliveryOrder = {
        customerEmail: JSON.parse(localStorage.getItem("customer")).customerEmail,
        restaurantEmail: sessionStorage.getItem("restaurantEmail") ? sessionStorage.getItem("restaurantEmail") : testRestaurantEmail,
        subTotal: subTotal,
        deliveryFee: deliveryFee,
        tip: tip,
        tax: tax,
        totalPrice: totalPrice,
        note: note,
        dish: dish
    }

    let pickupOrder = {
        customerEmail: JSON.parse(localStorage.getItem("customer")).customerEmail,
        restaurantEmail: sessionStorage.getItem("restaurantEmail") ? sessionStorage.getItem("restaurantEmail") : testRestaurantEmail,
        subTotal: subTotal,
        tax: tax,
        totalPrice: totalPrice,
        note: note,
        dish: dish
    }

    let cardNumber = $("#cardNumber").val();
    let cvv = $("#cvv").val();
    let nameOnCard = $("#nameOnCard").val();
    let expDateMonth = $("#expDateMonth").val();
    let expDateDay = $("#expDateDay").val();

    let card = {
        cardNumber: cardNumber,
        nameOnCard: nameOnCard,
        expMonth: expDateMonth,
        expDay: expDateDay,
        CVV: cvv
    }

    if (cardNumber == null || cardNumber.length == 0) {
        alert("card number is empty");
        return;
    } else if (check_num(cardNumber) == false) {
        alert("card number is not valid");
        return;
    } else if (nameOnCard == null || nameOnCard.length == 0) {
        alert("name on card is empty");
        return;
    } else if (expDateMonth == null || expDateMonth.length == 0) {
        alert("expire month is empty");
        return;
    } else if (expDateDay == null || expDateDay.length == 0) {
        alert("expire day is empty");
        return;
    } else if (cvv == null || cvv.length == 0) {
        alert("CVV is empty");
        return;
    }

    let p0;
    let p1;
    let p2;
    let pT;

    clearTimeout(p0);
    clearTimeout(p1);
    clearTimeout(p2);
    clearTimeout(pT);

    $("#box").show();
    $("#hidden").show();


    $("#process0").show();
    $("#process1").hide();
    $("#process2").hide();

    p0 = setTimeout(function () {
        $("#process0").hide();
        $("#process1").show();
        if (verifyCard(card) == false) {
            pT = setTimeout(function () {
                $("#box").hide();
                $("#hidden").hide();
                alert("we can't process your payment");

            }, 600);
            return;
        }
        p1 = setTimeout(function () {
            $("#process1").hide();
            $("#process2").show();
            p2 = setTimeout(function () {
                alert("time to go to order status page");
                $("#process2").hide();
                $("#box").hide();
                $("#hidden").hide();

                if (orderTabOption == 0) {
                    sessionStorage.setItem("order", JSON.stringify(deliveryOrder));
                    $.ajax({
                        type: "POST",
                        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/addOrder.do",
                        // url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/addOrder.do",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(deliveryOrder),
                        dataType: "json",
                        success: function (response) {

                            if (response.result == 0) {
                                console.log("add delivery order success!!!");
                                sessionStorage.setItem("orderNumber", response.data.orderNumber);
                                window.location.assign("../order_status_page/order_status_page.html");
                            }

                            if (response.result == 1) {
                                alert("back-end error: deliveryOrder");
                            }

                        }
                    });
                }

                if (orderTabOption == 1) {
                    sessionStorage.setItem("order", JSON.stringify(pickupOrder));
                    $.ajax({
                        type: "POST",
                        url: "http://47.89.231.231/Restaurant_Automation/pickupOrder/addOrder.do",
                        // url: "http://localhost:8080/Restaurant_Automation/pickupOrder/addOrder.do",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(pickupOrder),
                        dataType: "json",
                        success: function (response) {

                            if (response.result == 0) {
                                console.log("add pickup order success!!!");
                                sessionStorage.setItem("orderNumber", response.data.orderNumber);
                                window.location.assign("../order_status_page/order_status_page.html");
                            }

                            if (response.result == 1) {
                                alert("back-end error: pickupOrder");
                            }

                        }
                    });
                }
            }, 2000);
        }, 2000);
    }, 2000);

}

function verifyCard(card) {
    let cardInfo = {
        cardNumber: "1234123412341234",
        nameOnCard: "John Smith",
        expMonth: "12",
        expDay: "23",
        CVV: "007"
    }

    return !(card.cardNumber != cardInfo.cardNumber ||
        card.nameOnCard != cardInfo.nameOnCard ||
        card.expMonth != cardInfo.expMonth ||
        card.expDay != cardInfo.expDay ||
        card.CVV != cardInfo.CVV);


}

function check_num(num){
    if(num.length!=16){
        return 0;
    } else if(isNaN(Number(num))== true){
        return 0;
    } else {
        return 1;
    }
}
