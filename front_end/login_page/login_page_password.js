
function customer_login(){
    //param.password = document.getElementById('password').value;
    let customer = {
        "email":String(sessionStorage.getItem('email')),
        "password" : String(document.getElementById('password').value)
    };
    //sessionStorage.setItem('firstname','Peeyush');
    let custom = {
        "email":'emily@gmail.com',
        "password" : '123456'
    };
    customerLogin(customer);
}

function get_customer_profile(){
            const portal= new XMLHttpRequest();

            portal.open('POST',"http://123.56.14.64/Restaurant_Automation/customer/getProfile.do");
            
            portal.onload = function (){
                //let obj = JSON.parse(this.responseText);
                //window.alert(this.responseText);
                window.alert(this.responseText);
                let obj = JSON.parse(this.responseText);
                sessionStorage.setItem('firstname',obj.data['firstName']);
                sessionStorage.setItem('lastname',obj.data['lastName']);
                sessionStorage.setItem('phone',obj.data['phone']);
                sessionStorage.setItem('address',obj.data['address']);
                sessionStorage.setItem('customerid',obj.data['customerId']);
                window.alert(sessionStorage.getItem('phone'));

                //document.getElementById('tit').innerHTML=this.responseText;
                //document.getElementById('logo_img').src=img_bg.src;
            }

            //if(flag==false){window.alert('FAILURE of getting profile')} "email" : sessionStorage.getItem('email')
    

            let customer = {
                
                "email" : sessionStorage.getItem('email')
            };
            //window.alert(typeof(String(sessionStorage.getItem('email'))));
            portal.send(JSON.stringify(customer));
}

function customerLogin(param){
    
    $.ajax({
        type: "POST",
        //url: "http://123.56.14.64/Restaurant_Automation/customerLogin.do",
        url: "http://123.56.14.64/Restaurant_Automation/customer/loginByEmail.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){
                //page jump
                get_customer_profile();
                window.location.assign('../restaurant_list/restraunts_page.html');
                console.log("checkPhoneNumber successfully!");
            }else if(data.result == 1){
                alert("back-end unknown error");
                return;
            }else if(data.result == 2){
                alert("email doesn't exist");
                window.location.assign('login_page.html')
                return;
            }else if(data.result == 3){
                alert("wrong password");
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