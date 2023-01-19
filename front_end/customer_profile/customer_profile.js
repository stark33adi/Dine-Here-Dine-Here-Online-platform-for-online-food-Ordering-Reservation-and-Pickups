$(document).ready(function(){ 
    let param={};
    param.email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : "louis@bu.edu"
    customerProfile(param)
}); 


function customerProfile(param){
    $.ajax({
        type: "POST",
        url: "http://123.56.14.64/Restaurant_Automation/customer/getProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/customer/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){
                //another choice: document.getElementById("first_name_value").innerHTML=firstName
                $("#first_name_value").html(data.data.first_name);
                $("#last_name_value").html(data.data.last_name);
                $("#email_value").html(data.data.email);
                $("#phone_value").html(data.data.phone);
                $("#zipcode_value").html(data.data.zipcode);
                $("#address_value").html(data.data.address);
                $("#customer_ID_value").html(data.data.customer_id);
                $("#reg_date_value").html(data.data.reg_date);
                var img = new Image();
                img.src = data.data.photo;
                img.style.width="200px";
                img.style.height="200px";
                document.getElementById("photo_value").appendChild(img);
            }else if(data.result == 2){
                alert("Do not have this email");
            }else{
                alert("back-end unknown error")
            }
        },
        error: function (message) {
            alert("Nothing on our record")
        }
    });
    
}
