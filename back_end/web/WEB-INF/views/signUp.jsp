<%--
  Created by IntelliJ IDEA.
  User: minds
  Date: 2022/2/9
  Time: 18:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.6.0.js"></script>
</head>
<body>
    <table>
        <tr>
            <td>
                Email:
            </td>
            <td>
                <input id="email" type="text"/>
            </td>
        </tr>
        <tr>
            <td>
                Password:
            </td>
            <td>
                <input id="password" type="text"/>
            </td>
        </tr>
        <tr>
            <td>
                Confirm Password:
            </td>
            <td>
                <input id="cfmPassword" type="text"/>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <button type="button" onclick="checkSignUp()">sign up</button><br>
            </td>
            <td>
                <button type="button" onclick="window.history.go(-1)">back</button><br>
            </td>
        </tr>
    </table>


<script type="text/javascript">
    let pUrl = "customer";
    function checkSignUp() {
        let email = $("#email").val();
        let password = $("#password").val();
        let cfmPassword = $("#cfmPassword").val();

        let customer = {
            email: email,
            password: password
        }

        if (email === 'null' || email === '') {
            alert("email please");
        } else if (password === 'null' || password === '') {
            alert("password please");
        } else if (cfmPassword === 'null' || cfmPassword === '') {
            alert("confirm password please")
        } else if (password !== cfmPassword) {
            alert("password and confirm password must be the same")
        } else {
            $.ajax({
                url: "./checkSignUp.do",
                type: 'post',
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(customer),
                success:function (data) {
                    if (data === 0) {
                        alert("register success");
                        sessionStorage.setItem("email", email);
                        window.location.assign("./userProfile");
                    } else if (data === 1) {
                        alert("system: register fail");
                    } else if (data === 2) {
                        alert("email already exist, please change your email");
                    }

                },
                error:function () {
                    alert("fail: "+JSON.stringify(customer));
                }
            });
        }
    }
</script>
</body>
</html>
