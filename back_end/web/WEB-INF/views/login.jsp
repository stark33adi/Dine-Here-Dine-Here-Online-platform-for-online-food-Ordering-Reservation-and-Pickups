<%--
  Created by IntelliJ IDEA.
  User: minds
  Date: 2/9/2022
  Time: 8:54 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.6.0.js"></script>
</head>
<body>
<h1>Login</h1>
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

    </table>
    <table>
        <tr>
            <td>
                <button type="button" onclick=signUp()>sign up</button><br>
            </td>
            <td>
                <button type="button" onclick="checkLogin()">login</button><br>
            </td>
            <td>
                <button type="button" onclick=fgtPwd()>forget password</button><br>
            </td>
        </tr>
    </table>




<script type="text/javascript">
    let pUrl = "customer";
    function fgtPwd() {
        window.location.assign("./fgtPwd")
    }
    function signUp() {
        window.location.assign("./signUp")
    }

    function checkLogin() {
        let email = $("#email").val();
        let password = $("#password").val();
        let customer = {
            email: email,
            password: password
        }


        if (email === 'null' || email === '') {
            alert("email please");
        } else if (password === 'null' || password === '') {
            alert("password please");
        } else {
            $.ajax({
                url: "./checkLogin.do",
                type: 'post',
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(customer),
                success:function (data) {
                    if (data.result === 0) {
                        alert("login success");
                        sessionStorage.setItem("email", email);
                        window.location.assign("./userProfile");
                    } else if (data.result === 1) {
                        alert("password is wrong");
                    } else if (data.result === 2) {
                        alert("email not exist");
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