$(document).ready(function (){

    // deliveryOrderDishes is the hashmap that stores all the order information
    orderNumber = sessionStorage.getItem('pickuporderNum') ? sessionStorage.getItem('pickuporderNum') : null;
    //  Remember to parse the list when you want to get it
    dishList = JSON.parse(sessionStorage.getItem('pickupdishlist')) ? JSON.parse(sessionStorage.getItem('pickupdishlist')) : null;

    console.log(dishList);

    $("#pickuporderNumber").html(orderNumber);

    // initiate a dishes value to store only the dishes information
    for (let i = 0; i < dishList.length; i++) {
        str =
            "<tr>" +
            "<td>" + dishList[i].dishId + "</td>" +
            "<td>" + dishList[i].dishName + "</td>" +
            "<td>" + dishList[i].dishPrice + "</td>" +
            "<td>" + dishList[i].dishCount + "</td>" +
            "</tr>";
        $("#PrintingDishes").append(str);
    }
});

$("#returnToBoardP").click(function(){
    window.location.assign("./restaurant_dashboard.html");

})