<template>
  <div class="sign-in-box clearfix">
    <span class="regiline">欢 迎 注 册</span>
    <router-link to="/login" class="login">已有账号？去登录</router-link>
    <div class="in-regi">
      <input type="text" id ="username" name="username" placeholder="用户名" maxlength="11">
      <input type="password" id ="password" name ="password" maxlength="10" minlength="6" placeholder="密码：6-10位数字、字母组合">
      <input type="text" id ="pet_name" name="pet_name" placeholder="昵称" maxlength="11">
      <div class="get">
          <input type="e-mail" id ="e-mail" name="e-mail" placeholder="邮箱" maxlength="20">
          <button class="sendver" @click="countDown">{{timecount}}</button>
      </div>
      <input type="text" id ="verification" name="verification" placeholder="验证码" maxlength="4">
    </div>
    <div class="agree findpass">
        <input type="radio">
        <label for="">阅读并接受《网络问答平台网络协议》</label>
    </div>
    <button type="submit" class="regist">注册</button>
    
</div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return {
      time: 60,
      timecount: "发送验证码",
    };
  },
  methods: {
    countDown() {
      var time = 60;
      const datathis = this;
      function ti(){
      var t = setInterval(function(){
        time--;
        datathis.timecount = time + '秒后重新发送';
        if(time == 0){
          clearTimeout(t);
          datathis.timecount = "发送验证码";
          time=60;
          }
        }, 1000)
      }
      ti(datathis);
    },
    sendVerify() {
      //发送验证码
    },
    sendUserinfo() {
      //发送用户信息
    }
  }
}

</script>

<style>
  @import url(../assets/css/login.css);
</style>