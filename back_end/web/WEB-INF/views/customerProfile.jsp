<%--
  Created by IntelliJ IDEA.
  User: minds
  Date: 2/9/2022
  Time: 11:36 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.6.0.js"></script>
</head>
<body onload="showUserProfile()">
<h1>My Profile</h1>
<%--<button onclick="showUserProfile()">show</button>--%>
<h2>Detail: </h2>

<table>
    <tr>
        <td>Email:</td>
        <td id="showEmail"></td>
    </tr>
    <tr>
        <td>Name:</td>
        <td id="showName"></td>
    </tr>
    <tr>
        <td>Address:</td>
        <td id="showAddress"></td>
    </tr>
    <tr>
        <td>Zipcode:</td>
        <td id="showZipcode"></td>
    </tr>
    <tr>
        <td>Phone:</td>
        <td id="showPhone"></td>
    </tr>
</table>




<script type="text/javascript">
    let pUrl = "";
    function clickInput() {
        $("#userInput").html("<input type='text' value='"+$(this).text()+"'/>'");
    }
    function showCustomerProfile() {
        let email = sessionStorage.getItem("email");
        let customer = {
            email: email
        }
        // alert("welcome !!!");
        $.ajax({
            url: "./getCurrentUserProfile.do",
            type: 'post',
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(customer),
            success:function (data) {
                // alert("success");
                $("#showEmail").html(email);
                $("#showName").html(data.data.customer[0].firstName+" "+data.data.customer[0].lastName);
                $("#showAddress").html(data.data.customer[0].address);
                $("#showZipcode").html(data.data.customer[0].zipcode);
                $("#showPhone").html(data.data.customer[0].phone);

            },
            error:function () {
                // $("#showEmail").html("Welcome: "+email);
                alert("fail");
            }
        });
    }
</script>

</body>
</html>
