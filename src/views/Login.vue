<template>
  <div class="sign-in-box clearfix">
    <span>账 号 登 录</span>
    <router-link to="/register" class="regi">没有账号？去注册</router-link>
    <div class="in">
      <input type="text" v-model ="username" name="username" placeholder="用户名" maxlength="11">
      <input type="password" v-model ="password" name ="password" maxlength="10" minlength="6" placeholder="密码：6-10位数字、字母组合">
    </div>
    <button @click="login" class="loginbtn">登录</button>
    <!-- <a href="findPassword.html" class="findpass">找回密码</a> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      password: '',
      username: '',

    }
  },
  methods: {
    login(){
      if (this.password == "" || this.password == "") {
        this.$message.error("账号或者密码为空");
        return;
      }
      let obj = {
        password: this.password,
        username: this.username,
      }
      this.$axios({
        url: "/user/login",
        method: "POST",
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        data: JSON.stringify(obj)
      })
       .then(res => {
          let data = res.data.data;
          if (res.data.state == 200) {
            this.$message.success("登录成功");
            // this.$store.user.dispatch("setUserInfo", data)
            this.setUserInfo(data.userinfo);
            // this.setToken(data.token);
            // this.changeislog();
            // console.log(data);
            // this.close();
          }
          if (res.data.state == 403){
            this.$message.error("该用户不存在，请前往注册");
          }
          if (res.data.state == 400 || res.data.state == 402){
            this.$message.error("请求异常，登陆失败");
          }
        })
        .catch(e => {
          this.$message(e);
        });
    }
  }

}
</script>

<style>
  @import url(../assets/css/login.css);
</style>