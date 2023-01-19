$(document).ready(function () {
    let param = {};
    param.email = sessionStorage.getItem('email') ? sessionStorage.getItem('email') : "louis@bu.edu"
    customerProfile(param)
});


function customerProfile(param) {
    $.ajax({
        type: "POST",
        url: "http://123.56.14.64/Restaurant_Automation/customer/getProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/customer/getProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function (data) {
            if (data.result == 0) {
                //another choice: document.getElementById("first_name_value").innerHTML=firstName
                $("#first_name_value").val(data.data.firstName);
                $("#last_name_value").val(data.data.lastName);
                $("#email_value").val(data.data.email);
                $("#phone_value").val(data.data.phone);
                $("#zipcode_value").val(data.data.zipcode);
                $("#address_value").val(data.data.address);
                var img = new Image();
                img.src = data.data.photo;
                img.style.width = "200px";
                img.style.height = "200px";
                document.getElementById("display_photo").appendChild(img);
            } else if (data.result == 2) {
                alert("Do not have this email");
            } else {
                alert("back-end unknown error");
            }
        },
        error: function (message) {
            alert("Nothing on our record");
        }
    });

}

$("#upload_photo").change(function () {
    $("#display_photo").children().remove();
    var reader = new FileReader();
    var AllowImgFileSize = 2097152; //max upload size(byte)（ 2 M = 2097152 B ） bigger than it will fail
    var file = $("#upload_photo")[0].files[0];
    var imgUrlBase64;
    if (file) {
        //read photo file as Data URL type  
        imgUrlBase64 = reader.readAsDataURL(file);
        //console.log(imgUrlBase64);
        reader.onload = function (e) {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//the size of photo(byte), not use
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                alert('upload failed, please select a photo which is less than 2M!');
                return;
            } else {
                //execute upload to back-end
                let photo = {};
                photo.photo = reader.result
            }
            //display photo which source is DataUrl type of string
            let img = new Image();
            img.src = reader.result;
            img.style.width = "200px";
            img.style.height = "200px";
            div_block = document.getElementById("display_photo");
            div_block.appendChild(img)
        }

    }
})

function customerRevise(){
    if(($("#first_name_value").val()==null) || ($("#first_name_value").val()=='')){
        alert("first name cannot be none");
        return;
    }
    if(($("#last_name_value").val()==null) || ($("#last_name_value").val()=='')){
        alert("last name cannot be none");
        return;
    }
    if(($("#email_value").val()==null) || ($("#email_value").val()=='')){
        alert("email cannot be none");
        return;
    }
    if(($("#phone_value").val()==null) || ($("#phone_value").val()=='')){
        alert("phone cannot be none");
        return;
    }
    if(($("#zipcode_value").val()==null) || ($("#zipcode_value").val()=='')){
        alert("zipcode cannot be none");
        return;
    }
    if(($("#address_value").val()==null) || ($("#address_value").val()=='')){
        alert("address cannot be none");
        return;
    }
    if(($("#display_photo").children()[0].src==null) || ($("#display_photo").children()[0].src=='')){
        alert("photo cannot be none");
        return;
    }
    let param = {};
    param.firstName=$("#first_name_value").val();
    param.lastName=$("#last_name_value").val();
    param.email=$("#email_value").val();
    param.phone=$("#phone_value").val();
    param.zipcode=$("#zipcode_value").val();
    param.address=$("#address_value").val();
    param.photo=$("#display_photo").children()[0].src
    $.ajax({
        type: "POST",
        url: "http://123.56.14.64/Restaurant_Automation/customer/updateProfile.do",
        //url: "http://localhost:8080/Restaurant_Automation/customer/updateProfile.do",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),     //data transfer to back-end
        dataType: "json",	    //the type of data which receive from back-end
        success: function(data){
            if(data.result == 0){
                alert("Success!")
            }else if(data.result == 2){
                alert("Email exist!Please input another email");
            }else{
                alert("Back-end unknown error")
            }
        },
        error: function (message) {
            alert("Front-end error or no response")
        }
    });
}

function click_cancel(){
    window.location.assign('../customer_profile/customer_profile.html') 
}