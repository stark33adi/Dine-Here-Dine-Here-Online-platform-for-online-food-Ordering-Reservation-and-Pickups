<%--
  Created by IntelliJ IDEA.
  User: minds
  Date: 2/13/2022
  Time: 3:44 PM
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
                Old Password:
            </td>
            <td>
                <input id="oldPassword" type="text"/>
            </td>
        </tr>
        <tr>
            <td>
                New Password:
            </td>
            <td>
                <input id="newPassword" type="text"/>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <button type="button" onclick="checkForgetPassword()">Change Password</button><br>
            </td>
            <td>
                <button type="button" onclick="window.history.go(-1)">back</button><br>
            </td>
        </tr>
    </table>

    <script type="text/javascript">
        let pUrl = "customer";
        function checkForgetPassword() {
            let email = $("#email").val();
            let oldPassword = $("#oldPassword").val();
            let newPassword = $("#newPassword").val();
            let customer = {
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword
            }

            if (email === 'null' || email === '') {
                alert("email please");
            } else if (oldPassword === 'null' || oldPassword === '') {
                alert("old password please");
            } else if (newPassword === 'null' || newPassword === '') {
                alert("new password please")
            } else if (oldPassword === newPassword) {
                alert("old and new password can't be the same")
            } else {
                $.ajax({
                    url: "./checkForgetPassword.do",
                    type: 'post',
                    dataType: "json",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(customer),
                    success:function (data) {
                        if (data === 0) {
                            alert("update password success");
                            window.history.go(-1)
                        } else if (data === 1) {
                            alert("system: update password fail");
                        } else if (data === 2) {
                            alert("old password is wrong");
                        } else if (data === 3) {
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
