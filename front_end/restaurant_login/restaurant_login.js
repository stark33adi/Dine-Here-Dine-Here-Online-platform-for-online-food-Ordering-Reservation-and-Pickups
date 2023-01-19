$(function(){

    //$("#chooseUserType").click(function(){});

    $("#login").click(function(){
        // jquery id 
        let email = $("#email").val();
        let password = $("#password").val();
        // console.log(email);
        // console.log(password);

        let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        let checkFormat = reg.test(email);
        if (email == null || email.length == 0) {
            alert("Please enter your email! ");
            return;
        } else if (!checkFormat) {
            alert("The email is invalid. Please enter a valid email address. ");
            return;
        } else if (password.length <= 8 || password.length > 20) {
            alert("Please input a Password between 9 - 20 digits. ");
            return;
        } else {

            let data = {
                email: email,
                password: password
            }

            $.ajax({
                type: "POST",
                url: "http://47.89.231.231/Restaurant_Automation/restaurant/login.do",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (response) {
                    if (response.result == 0) {
                        //session save key value
                        sessionStorage.setItem('restaurantEmail', email);
                        window.location.assign("../restaurant_dashboard/restaurant_dashboard.html");
                    } else if (response.result == 1) {
                        alert("back-end unknown error. ");
                        return;
                    } else if (response.result == 2) {
                        alert("Wrong password. ");
                        return;
                    } else if (response.result == 3) {
                        alert("Email doesn't exist. ");
                        return;
                    }
                },
                error: function (message) {
                    alert("login failed...")
                    return;
                }

            })

        }
    });

    $("#signup").click(function(){
        window.location.assign("../restaurant_signup/restaurant_signup.html");
    });
});

