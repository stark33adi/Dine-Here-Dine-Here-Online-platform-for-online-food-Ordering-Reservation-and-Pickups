let param={};
$(document).ready(function(){ 
    param.orderNumber = sessionStorage.getItem('orderNumber') ? sessionStorage.getItem('orderNumber') : "00001"
    getOrderState(param)
}); 

function getOrderState(param){
    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/deliveryOrder/getOrderByOrderNumber.do",
        //url: "http://localhost:8080/Restaurant_Automation/deliveryOrder/getOrderByOrderNumber.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){
                console.log(data.data.order[0].orderState)
                let state;
                if(data.data.order[0].orderState==0){
                    state='order placed';
                }else if(data.data.order[0].orderState==1){
                    state='restaurant canceled order';
                }else if(data.data.order[0].orderState==2){
                    state='restaurant finished order';
                }else if(data.data.order[0].orderState==3){
                    state='delivery guy take order';
                }else if(data.data.order[0].orderState==4){
                    state='delivery guy delivered order';
                }else if(data.data.order[0].orderState==5){
                    state='customer confirm delivered';
                }
                $('#order_state').html(state)
            }else if(data.result == 2){
                alert("Do not have this email");
            }else{
                alert("Front-end error or no response")
            }
        },
        error: function (message) {
            alert("Nothing on our record")
        }
    });
    
}

function refresh(){
    getOrderState(param)
}

function back_to_restaurant_list(){
    window.location.assign('../restaurant_list/restaurant_page.html') 
}