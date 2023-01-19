let testCustomerEmail = "emily@gmail.com";
let testRestaurantEmail = "sturrell2@gmail.com";

let dish = [
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
]

$(function () {

    if (!checkCustomerIsLoggedIn()) {
        alert("you haven't logged in yet, please login first");
        window.location.assign("../login_page/login_page.html");
    }

    customerDropdown();
      


    let restaurantEmail = sessionStorage.getItem("restaurantEmail") ? sessionStorage.getItem("restaurantEmail") : testRestaurantEmail;

    let data1 = {
        email: restaurantEmail
    }
    
    let data2 = {
        restaurantEmail: restaurantEmail
    }

    let dish_from_backend = [];

    let dishTypeList = [];

    restaurant_ajax = $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/restaurant/getProfile.do",
        // url: "http://localhost:8080/Restaurant_Automation/restaurant/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data1),
        dataType: "json",
        success: function (response) {
            // console.log("raw data: "+response.data);
            if (response.result == 0) {
                let restaurantName = response.data.rest[0].restaurantName;
                $("#restaurantname").text(restaurantName);

                let rateValue = response.data.rest[0].rateValue;
                console.log("rateValue: "+rateValue);
                $("#ratevalue").text(rateValue + " of 5");

                let deliveryTime = response.data.rest[0].deliveryTime;
                $("#deliverytime").text(deliveryTime + " mins");
            }

            if (response.result == 1) {
                alert("back-end unknown error: restaurant");
            }
            
        }
    });
    
    dish_ajax = $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/dish/getAllDishByRestaurantEmail.do",
        // url: "http://localhost:8080/Restaurant_Automation/dish/getAllDishByRestaurantEmail.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data2),
        dataType: "json",
        success: function (response) {
            // console.log("raw data: "+response.data);

            if (response.result == 0) {
                dish_from_backend = response.data;

                for (let i = 0; i < dish_from_backend.length; i++) {
                    dish_from_backend[i].dishCount = 0;
                    if (dishTypeList.indexOf(dish_from_backend[i].dishType) == -1) {
                        dishTypeList.push(dish_from_backend[i].dishType);
                    }
                }

                let filterStr = "";
                let filterIndex = 1;

                $.each(dishTypeList, function (index, element) {
                    filterStr =
                        '<a id="filter'+filterIndex+'" href="#" class="list-group-item list-group-item-action">'+
                        element+
                        '</a>';
                    $("#dishtypefilter").append(filterStr);
                    filterIndex++;
                });

                console.log(dish_from_backend);

                let str = "";

                let len = dish_from_backend.length;
                for (let i = 0; i < len; i++) {
                    str = "";

                    str +=
                        "<div id='card" + i + "' class='card' style='width: 16rem; margin-left: 20px; margin-top: 15px;'>" +
                            "<div id='dish" + i + "' style='display: none;'>" + dish_from_backend[i].dishId + "</div>" +
                            "<img class='card-img-top' style='object-fit: cover;' src='"+dish_from_backend[i].dishPhoto+"' alt='dish image not found'>" +
                            "<div class='card-body' style='padding-top: 0px; padding-bottom: 0px;'>" +
                                "<h5 class='card-title'>" + dish_from_backend[i].dishName + "</h5>" +
                            "</div>" +
                            "<div class='dishbox'>" +
                                "<div style='display: flex; margin-left: 20px ;margin-right: 30px;'>" +
                                    "<div style='margin: auto; padding-right: 5px;'>USD: </div>" +
                                    "<div id='dishPrice' style='margin: auto;'>" + dish_from_backend[i].dishPrice + "</div>" +
                                "</div>" +
                                "<div style='display: flex;'>" +
                                    "<a id='plus" + i + "' class='btn btn-default plus' style='align-content:flex-end; margin: auto;'>" +
                                        "<i class='bi bi-plus-lg'></i>" +
                                        "<svg style='vertical-align:sub;' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-plus-lg' viewBox='0 0 16 16'>" +
                                            "<path fill-rule='evenodd' d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'/>" +
                                        "</svg>" +
                                    "</a>" +
                                    "<input id='text" + i + "' type='text' class='text' style='margin: auto;'/>" +
                                    "<a id='subtract" + i + "' class='btn btn-default subtract' style='align-content:flex-end; margin: auto;'>" +
                                        "<i class='bi bi-dash-lg'></i>" +
                                        "<svg style='vertical-align:sub;' xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-dash-lg' viewBox='0 0 16 16'>" +
                                            "<path fill-rule='evenodd' d='M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z'/>" +
                                        "</svg>" +
                                    "</a>" +
                                "</div>" +
                            "</div>" +
                        "</div>";

                    $("#dishlist").append(str);



                }
            }

            if (response.result == 1) {
                alert("back-end unknown error: dish");
            }
        }
    });

    
    // when means will be executed after these two ajax
    $.when(restaurant_ajax, dish_ajax).done(function () {

        $(".card").each(function (index, element) {
            // console.log(index);
            $("#text" + index + "").val(0);
            $("#plus" + index + "").click(function () {
                let i = $("#text" + index + "").val();
                i++;
                $("#text" + index + "").val(i);


                dish_from_backend[index].dishCount = i;

                $.each(dish_from_backend, function (index, element) {
                    if (element.dishCount != 0) {
                        console.log(index + ": " + element.dishId + ", " + element.dishCount);
                    }
                });

            });
            $("#subtract" + index + "").click(function () {
                let i = $("#text" + index + "").val();
                if (i > 0) {
                    i--;
                    $("#text" + index + "").val(i);
                } else {
                    i = 0;
                    $("#text" + index + "").val(i);
                }

                dish_from_backend[index].dishCount = i;

                $.each(dish_from_backend, function (index, element) {
                    if (element.dishCount != 0) {
                        console.log(index + ": " + element.dishId + ", " + element.dishCount);
                    }
                });

            });
            $("#text" + index + "").blur(function () {
                let i = $("#text" + index + "").val();

                dish_from_backend[index].dishCount = i;

                $("#text" + index + "").val(i);

                $.each(dish_from_backend, function (index, element) {
                    if (element.dishCount != 0) {
                        console.log(index + ": " + element.dishId + ", " + element.dishCount);
                    }
                });

            });

        });

        
        $("#dishtypefilter a").each(function (index, element) {
            

            $("#filter" + index + "").click(function () {
                // console.log("filter "+index);
                
                let filtername = $("#filter"+index+"").text();

                if (filtername == "All") {
                    $.each(dish_from_backend, function (index, element) {
                        $("#card"+ index + "").show();
                    });
                } else { 
                    $.each(dish_from_backend, function (index, element) {    
                        if (element.dishType == filtername) {
                            $("#card"+ index + "").show();
                        } else {
                            $("#card"+ index + "").hide();
                        }
                    });
                }

                $("#dishtypefilter a").each(function (index, element) {
                    $("#filter" + index + "").attr("class", "list-group-item list-group-item-action");
                });

                console.log(index);
                $("#filter" + index + "").attr("class", "list-group-item list-group-item-action active");
                
                // console.log(filtername);
            });
        });


        // Cart

        $("#cartdropdown").on("show.bs.dropdown", function () {
            let cartstr = "";
            let cartsum = 0;
            let cartisempty = true;

            $("#cartmenu").html("");
            $.each(dish_from_backend, function (index, element) {

                if (element.dishCount != 0) {
                    // console.log(index + ": " + element.dishId + ", " + element.dishCount);

                    cartisempty = false;

                    cartstr = 
                    '<div class="dropdown-item" style="display: flex; flex-direction: row;">'+
                        '<div style="width: 10%;">'+
                            '<a id="cartdishcount'+index+'">'+element.dishCount+'</a>'+
                            '<a>x</a>' +
                        '</div>'+
                        '<div style="width: 80%;">'+
                            '<a id="cartdishname'+index+'" style="display: block; width: 90%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; height: 30px;">'+element.dishName+'</a>'+
                        '</div>'+
                        '<div style="width: 10%;">'+
                            '<a id="cartdishprice'+index+'">'+(Number(element.dishPrice)*Number(element.dishCount)).toFixed(2)+'</a>'+
                        '</div>'+
                    '</div>';

                    $("#cartmenu").append(cartstr);

                    cartsum += (Number(element.dishPrice)*Number(element.dishCount));

                    
                }
            });

            if (cartisempty) {
                let str = 
                '<div style="text-align: center;">cart is empty</div>';
                $("#cartmenu").append(str);
            } else {
                let str = 
                '<div class="dropdown-divider"></div>'+
                '<div id="cartcheckout" class="btn btn-primary" style="width: 80%; margin-left: 10%; margin-right: 10%; padding-left: 10%; padding-right: 10%; text-align: center; display: flex; flex-direction: row; ">'+
                    '<a>check out</a>'+
                    '<div style="padding-left: 30px;">'+
                        '<i class="bi bi-currency-dollar"></i>'+
                        '<svg style="margin-bottom: 4px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">'+
                            '<path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>'+
                        '</svg>'+    
                    '</div>'+
                    '<div>'+cartsum.toFixed(2)+'</div>'+
                '</div>';
                $("#cartmenu").append(str);
            }
            console.log(cartsum.toFixed(2));

            $("#cartcheckout").click(function () {
                // sessionStorage.setItem("customerEmail", customerEmail);
                // sessionStorage.setItem("restaurantEmail", restaurantEmail);
                let dish = [];
    
                $.each(dish_from_backend, function (index, element) {
                    if (element.dishCount != 0) {
                        dish.push(element);
                    }
                });
    
                console.log(dish);

                sessionStorage.setItem("restaurantEmail", restaurantEmail);
                sessionStorage.setItem("cart", JSON.stringify(dish));

                window.location.assign("../check_out_page/check_out.html");
    
    
            });
        });

        
    });














});

function checkCustomerIsLoggedIn() {
    // role: "customer" / "restaurant" / "deliveryGuy"
    let role = "customer";
    if (JSON.parse(localStorage.getItem(role)) == null) {
        return false;
    }
    let customer = JSON.parse(localStorage.getItem(role));
    if (customer.state == 1) {
        return true;
    }
    if (customer.state == 0) {
        return false;
    }
}

function customerDropdown() {
    var flag;
    $("#customer-dashboard").click(function () {
        // alert("go to customer dashboard!!!");
        window.location.assign("../customer_dashboard_page/customer_dashboard.html");
    });
    $("#customer-logout").click(function () {
        let customer = JSON.parse(localStorage.getItem("customer"));
        console.log(customer);
        let object = {
            customerEmail: customer.customerEmail,
            // 1: logged in, 0: anonymous
            state: 0
        }
        localStorage.setItem("customer", JSON.stringify(object));
        alert("logout successfully!!!");
        window.location.assign("../login_page/login_page.html");
    });
}


