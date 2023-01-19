function check_customer_otc(){
    $.ajax({
        type: "POST",
        //url: "http://123.56.14.64/Restaurant_Automation/customerLoginOTC.do",
        url: "http://localhost:8080/Restaurant_Automation/customer/loginByOTC.do",
        contentType: "application/json; charset=utf-8",
        data: "",     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){
                window.location.assign('../restaurant_list/restaurant_list.html')
            }else{
                alert("unknown error");
                return;
            }
        },
        error: function (message) {
            alert("login failed...")
            return;
        }
    });
}