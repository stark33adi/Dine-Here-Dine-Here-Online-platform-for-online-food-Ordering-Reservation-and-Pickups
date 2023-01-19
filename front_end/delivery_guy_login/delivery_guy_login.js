$(function(){

    $("#login").click(function(){

        let email = $("#email").val();
        let password = $("#password").val();

        let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        let checkFormat = reg.test(email);
        if (!checkFormat) {
            alert("The email is invalid. Please enter a valid email address. ");
            return;
        } else if (email == null || email.length == 0) {
            alert("Please enter your email! ");
            return;
        } else {

            let data = {
                email: email,
                password: password
            }

            $.ajax({
                type: "POST",
                url: "http://47.89.231.231/Restaurant_Automation/deliveryGuy/login.do",
                // url: "http://localhost:8080/Restaurant_Automation/deliveryGuy/login.do",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (response) {
                    if (response.result == 0) {
                        //session save key value
                        sessionStorage.setItem('deliveryGuyEmail', response.email);
                        window.location.assign("../delivery_guy_dashboard/delivery_guy_dashboard.html");
                    } else if (data.result == 1) {
                        alert("Back-end error");
                        return;
                    } else if (data.result == 2) {
                        alert("The password is incorrect. ");
                        return;
                    } else if (data.result == 3) {
                        alert("We don't have any record of this email. Please sign up. ")
                    } else {
                        alert("Unknown backend error");
                        return;
                    }
                },
                error: function (message) {
                    alert("Unknown error")
                    return;
                }

            })


        }
    });

    $("#signup").click(function(){
        window.location.assign("../delivery_guy_signup/delivery_guy_signup.html");
    });

});