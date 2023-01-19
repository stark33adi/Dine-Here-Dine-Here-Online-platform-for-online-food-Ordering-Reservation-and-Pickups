$(function(){

    $("#signup").click(function(){
        let deliEmail = $("#email").val();
        let deliPwd = $("#password").val();
        let deliCfmPwd = $("#cfmpwd").val();
        let deliFirst = $("#firstName").val();
        let deliLast = $("#lastName").val();
        let deliAddress = $("#address").val();
        let deliZipcode = $("#zipcode").val();
        let deliPhone = $("#phoneNum").val();

        let data = {
            email: deliEmail,
            password: deliPwd,
            firstName: deliFirst,
            lastName: deliLast,
            address: deliAddress,
            zipcode: deliZipcode,
            phone: deliPhone
        }

        if (check_phone_number (deliPhone) && check_email (deliEmail) && check_password (deliPwd, deliCfmPwd) &&
            check_names(deliLast, deliFirst)) {

            $.ajax({
                type: "POST",
                url: "http://47.89.231.231/Restaurant_Automation/deliveryGuy/signUp.do",
                // url: "http://localhost:8080/Restaurant_Automation/deliveryGuy/signUp.do",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (response) {

                    let result = response.result;

                    if (result == 2) {
                        alert("Email already Exist. Please login! ");
                        window.location.assign("../delivery_guy_login/delivery_guy_login.html");
                        return;
                    } else if (result == 1) {
                        alert("Backend failed. ");
                        return;
                    } else if (result == 0) {
                        sessionStorage.setItem("deliveryGuyEmail", deliEmail);
                        window.location.assign("../delivery_guy_dashboard/delivery_guy_dashboard.html");
                    }
                }
            });

        } else {
            alert("We're unable to create your account. ");
        }


    });

    $("#login").click(function() {
        window.location.assign("../delivery_guy_login/delivery_guy_login.html");
    });

});

function check_phone_number (num) {
    if (num.length!=10) {
        alert("Please enter a 10 digits number. ");
        return 0;
    } else if (isNaN(Number(num)) == true) {
        alert("Please enter a phone number. ");
        return 0;
    } else {
        return 1;
    }
}

function check_email (email) {
    let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    let checkFormat = reg.test(email);
    if (!checkFormat) {
        alert("The email is invalid. Please enter a valid email address. ");
        return 0;
    } else if (email == null || email.length == 0) {
        alert("Please enter your email! ");
        return 0;
    } else {
        return 1;
    }
}

function check_password (password, confirmPassword) {
    if (password == null || password.length == 0) {
        alert("Please enter your password! ");
        return 0;
    } else if (confirmPassword == null || confirmPassword.length == 0) {
        alert("Please confirm your password! ");
        return 0;
    } else if (password != confirmPassword) {
        alert("Your passwords are different. Please confirm your password! ");
        return 0;
    } else {
        return 1;
    }
}

function check_names (first, last) {
    if (first == "" || last == "") {
        alert("Please enter your legal name! ");
        return 0;
    } else {
        return 1;
    }
}

// function check_address (street, zip) {
//     return ",#-/ !@$%^*(){}|[]\\".indexOf(street) >= 0;
// }