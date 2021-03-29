<template>
  <div class="sign-in-box clearfix">
    <span>账 号 登 录</span>
    <router-link to="/register" class="regi">没有账号？去注册</router-link>
    <div class="in">
      <input type="text" id ="username" name="username" placeholder="用户名" maxlength="11">
      <input type="password" id ="password" name ="password" maxlength="10" minlength="6" placeholder="密码：6-10位数字、字母组合">
    </div>
    <button type="submit" class="loginbtn">登录</button>
    <a href="findPassword.html" class="findpass">找回密码</a>
  </div>
</template>

<script>
export default {
  name: 'Login',
  
}

</script>

// <script>
//     $("button").on("click", function(){
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
    
//     sendUserinfo(username, password);
//     function sendUserinfo(username, password){
//       $.ajax({
//         url: 'http://47.108.190.196/QAPlatform/user/login',
//         method: 'POST',
//         contentType: "application/json",
//         dataType:"json",
//         data: JSON.stringify({ "username": username, "password": password }),
//         success: function (result) {
          
//         }
//       })
//     }
//   })
// </script>

<style>
  @import url(../assets/css/login.css);
</style>