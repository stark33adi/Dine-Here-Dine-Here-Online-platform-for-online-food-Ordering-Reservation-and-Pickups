$(document).ready(function (){

    // deliveryOrderDishes is the hashmap that stores all the order information
    orderNumber = sessionStorage.getItem('orderNum') ? sessionStorage.getItem('orderNum') : null; 
    //  Remember to parse the list when you want to get it 
    dishList = JSON.parse(sessionStorage.getItem('dishlist')) ? JSON.parse(sessionStorage.getItem('dishlist')) : null; 

    console.log(dishList);

    $("#orderNumber").html(orderNumber);

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

$("#returnToBoard").click(function(){
    window.location.assign("./restaurant_dashboard.html");

})

