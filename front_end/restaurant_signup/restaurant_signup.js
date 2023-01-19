$(function(){

    /*var foodType;
    // When this tag has some changes, it will execute the following function
    $("#selectFoodType").change(function(){


        //this: means the "select" tag; children: means the elements of the "select" tag; ("option:selected"): means
        // chosen the tag that is selected
        foodType = $(this).children("option:selected").text();
        console.log("food1: " + foodType);

    });*/


    $("#return").click(function(){
        window.location.assign('../restaurant_login/restaurant_login.html');
    });



    $('#signup').click(function(){
        let restName = $("#storeName").val();
        let restAddress = $("#address").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let cfmpassword = $("#cfmpwd").val();
        let restPhone = $("#storePhone").val();
        let restType = $("#restType").val();
        let foodType = $("#selectFoodType").children("option:selected").text();

        let serviceTypeSTR = "";
        let count = 0;

        // tag1 id space tag2: means find all the tag 2 below tag1
        // iterate all the tag2
        $("#serviceType input").each(function(index, element){
            if ($(this).is(":checked")) {
                if (count) {
                    serviceTypeSTR += ",";
                }
                serviceTypeSTR += $(this).attr("id");
                count++;
            }
        });

        if (check_restaurant_name(restName) && check_restaurant_address(restAddress) && check_email (email) && check_password (password, cfmpassword) && check_phone_number (restPhone) && check_restaurant_type(restType) && check_foodType (foodType) && check_service_type (serviceTypeSTR)) {

            let data = {
                email: email,
                password: password,
                restaurantName: restName,
                address: restAddress,
                phone: restPhone,
                restaurantType: restType,
                foodType: foodType,
                serviceType: serviceTypeSTR
            }

            $.ajax({
                type: "POST",
                url: "http://47.89.231.231/Restaurant_Automation/restaurant/signUp.do",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                dataType: "json",
                success: function (response) {
                    console.log(response.result);

                    let result = response.result;

                    if (result == 2) {
                        alert("Email already Exist. Please login! ");
                        window.location.assign("../restaurant_login/restaurant_login.html");
                        return;
                    } else if (result == 1) {
                        alert("Server Error. ");
                        return;
                    } else if (result == 0) {
                        sessionStorage.setItem("restaurantEmail", email);
                        window.location.assign("../restaurant_dashboard/restaurant_dashboard.html");
                    }
                }
            });
        } else {
            alert("We're unable to create your account. ");
        }
    });
});

/*function check_service_type (count) {
    return count;
}*/

function check_service_type (serviceTypeSTR) {
    if (serviceTypeSTR == null || serviceTypeSTR.length == 0) {
        alert("Please choose at least one service type. ");
        return 0;
    } else {
        return 1;
    }
}

function check_restaurant_type(restaurantType) {
    if (restaurantType == null || restaurantType.length == 0) {
        alert("Please enter your restaurant type. ");
        return 0;
    } else {
        return 1;
    }
}

function check_restaurant_address(restaurantAddress) {
    if (restaurantAddress == null || restaurantAddress.length == 0) {
        alert("Please enter your store address. ");
        return 0;
    } else {
        return 1;
    }
}

function check_restaurant_name(restaurantName) {
    if (restaurantName == null || restaurantName.length == 0) {
        alert("Please enter your store name. ");
        return 0;
    } else {
        return 1;
    }
}

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
    if (email == null || email.length == 0) {
        alert("Please enter your email! ");
        return 0;
    } else if (!checkFormat) {
        alert("The email is invalid. Please enter a valid email address. ");
        return 0;
    } else {
        return 1;
    }
}

function check_password (password, confirmPassword) {
    if (password.length <= 8 || password.length > 20) {
        alert("Please input a Password between 9 - 20 digits. ");
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

function check_foodType (foodType) {
    if (foodType == "Please Select Restaurant's Food Type"){
        alert("Please Select Restaurant's Food Type");
        return 0;
    } else {
        return 1;
    }
}