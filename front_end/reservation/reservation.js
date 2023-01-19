
$(document).ready(function () {
    let param = {};
    param.email = sessionStorage.getItem("restaurantEmail") ? sessionStorage.getItem("restaurantEmail") : "pkildale1@gmail.com";
    let customerEmail = JSON.parse(localStorage.getItem("customer")).customerEmail;
    $("#reserveemail").text(customerEmail);
    // console.log($("#reserveemail").text());

    $("#datetimepicker").datetimepicker({
        value: "2022/1/1 00:00",
        yearStart: 2022,
        minTime: "09:00"
    });

    getRestaurantProfile(param);
});

function getRestaurantProfile(param){
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/restaurant/getProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/restaurant/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function (data) {
            if (data.result == 0) {
                $("#restaurant_name").html(data.data.rest[0].restaurantName);
                $("#restaurant_address").html(data.data.rest[0].address);
                $("#restaurant_type").html(data.data.rest[0].restaurantType);
                $("#restaurant_phone").html(data.data.rest[0].phone);
                var img = new Image();
                img.src = data.data.rest[0].bgPhoto;
                img.style.width = "320px";
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

function collect_reserve_values(){
    let cur = new Date();
    let curYear = cur.getFullYear();
    let curMonth = cur.getMonth() + 1;
    let curDay = cur.getDate();
    // console.log(cur);
    // console.log("cur: " + curYear + "/" + curMonth + "/" + curDay);

    let reservationTime = $("#datetimepicker").val();
    let year = reservationTime.slice(0, 4);
    let month = reservationTime.slice(5, 7);
    let day = reservationTime.slice(8, 10);
    console.log("reserve: " + year + "/" + month + "/" + day);
    /*if (year < curYear || month < curMonth || day <= curDay) {
        alert("Can't reserve this date&time.");
        return;
    }*/

    if (year < curYear) {
        alert("Can't reserve this date&time.");
        return;
    } else if (year == curYear) {
        if (month < curMonth) {
            alert("Can't reserve this date&time.");
            return;
        } else if (month == curMonth) {
            if (day <= curDay) {
                alert("Can't reserve this date&time.");
                return;
            } // >cD
        } // > cM
    } // > cY


    let param = {};
    param.partySize = $("#reservepartynum").val();
    param.customerEmail = $("#reserveemail").text();
    param.note = $("#reservenotes").val();
    // param.reservationTime = $("#reservedate").val()+' '+$("#reservetime").val()+':00';
    param.reservationTime = $("#datetimepicker").val()+':00';
    param.restaurantEmail = sessionStorage.getItem('restaurantEmail') ? sessionStorage.getItem('restaurantEmail') : "pkildale1@gmail.com";
    console.log(param);
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/reservation/addReservation.do",
        //url: "http://localhost:8080/Restaurant_Automation/reservation/addReservation.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (data) {
            if (data.result == 0) {
                alert('Success!');
                window.location.assign('../restaurant_list_page_alternative/restaurant_list_page_alternative.html');
            }else {
                alert("back-end unknown error");
            }
        },
        error: function (message) {
            alert("Front-end error or no response");
        }
    });
}