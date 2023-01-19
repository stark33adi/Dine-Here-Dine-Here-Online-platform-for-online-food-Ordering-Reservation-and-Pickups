$(function () {
    $("#showPassword").change(function () {
        if ($(this).is(":checked")) {
            $("#password").attr("type", "text");
            $("#cfmPassword").attr("type", "text");
        } else {
            $("#password").attr("type", "password");
            $("#cfmPassword").attr("type", "password");

        }
    });

    $("#loginButton").click(function () {
        checkLogin();
    });
});

function check_customer_id(){

    let emailOrPhone =  document.getElementById('contact_id').value;
    //check the phone number and jump to login_page_password if user input a phone number
    if(check_num(emailOrPhone)){
        let param = {};
        param.phone = emailOrPhone;
        checkPhoneNumber(param);
    }else if(check_email_format(emailOrPhone)){ //check the email and jump to login_page_password if user input a email
        sessionStorage.setItem('email', emailOrPhone);
        window.location.assign('login_page_password.html')
    }else{
        alert("please input a valid phone number or email")
    }

}

function check_email_format(a){
    if (a.includes('@') != true){
        return 0;
    } else{
        return 1;
    }
}

function check_num(num){
    if(num.length != 10){
        return 0;
    } else if(isNaN(Number(num)) == true){
        return 0;
    } else {
        return 1;
    }
}


function checkPhoneNumber(param){
    $.ajax({
        type: "POST",
        //url: "http://123.56.14.64/Restaurant_Automation/checkCustomerPhone.do",
        url: "http://localhost:8080/Restaurant_Automation/customer/checkPhone.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){
                //session save key value
                sessionStorage.setItem('phone', param.phone);
                //page jump
                window.location.assign('login_page_otc.html')
                console.log("checkPhoneNumber successfully!");
            }else if(data.result == 1){
                alert("back-end unknown error");
                return;
            }else if(data.result == 2){
                alert("phone number doesn't exist");
                return;
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

function checkLogin() {
    let customerEmail = $("#email").val();
    let password = $("#password").val();

    let param = {
        email: customerEmail,
        password: password
    }

    if (!check_email_format(customerEmail)) {
        alert("Please input a valid Email.");
        return;
    }

    if (password.length <= 8 || password.length > 20) {
        alert("Please input a Password between 9 - 20 digits.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "http://47.89.231.231/Restaurant_Automation/customer/loginByEmail.do",
        // url: "http://localhost:8080/Restaurant_Automation/customer/checkPhone.do",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function(response){
            if(response.result == 0){
                let object = {
                    customerEmail: param.email,
                    // 1: logged in, 0: anonymous
                    state: 1
                }
                localStorage.setItem("customer", JSON.stringify(object));
                //page jump
                window.location.assign('../restaurant_list_page_alternative/restaurant_list_page_alternative.html');

            }else if (response.result == 1){
                alert("Back-end unknown error: customer");
                return;
            }else if (response.result == 2){
                alert("This email hasn't been signed up yet");
                return;
            }else if (response.result == 3){
                alert("Wrong password");
                return;
            }
        },
        error: function (message) {
            alert("login failed...")
            return;
        }
    });

}
