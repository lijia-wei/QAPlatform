<template>
<div class="login">
  <div class="sign-in-box clearfix">
    <span>账 号 登 录</span>
    <router-link to="/register" class="regi">没有账号？去注册</router-link>
    <div class="in">
      <input type="text" v-model ="username" name="username" placeholder="用户名" maxlength="11">
      <input type="password" v-model ="password" name ="password" maxlength="10" minlength="6" placeholder="密码：6-10位数字、字母组合">
    </div>
    <button @click="login" class="loginbtn">登录</button>
  </div>
</div>
  
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: 'Login',
  data() {
    return {
      password: '',
      username: '',

    }
  },
  // 辅助函数也一样，获取模块中的state值
  // computed: {
  //   ...mapState({
  //     isclose: state => state.user.isclose,
  //     islogin: state => state.user.islogin,
  //     // avatar: state => state.user.userinfo.avatar,
  //     // nickname: state => state.user.userinfo.nickname,
  //   })
  // },

  methods: { 
    ...mapMutations("user", [
      "setUserInfo",
      "ISLOG",
      "CLOSE",
      // "join",
      // "close",
      // "setunread",
      // "deleteuserinfo"
    ]),

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
        data: JSON.stringify(obj),
      })
       .then(res => {
          if(res.data.state == 200) {
            this.$message.success("登录成功");
            //获取当前登录信息
            this.$axios({
              url: "/user/getCurrentUser",
              method: "GET",
              headers: {'Content-Type': 'application/json;charset=UTF-8'},
              }).then(res => {
                let data = res.data.data.data;
                if (res.data.state == 200) { 
                  this.setUserInfo(data);
                  this.ISLOG();
                  this.CLOSE();
                  console.log(data.id);
                }
              })
            //跳转主页
            this.$router.replace({
              path:'/'
            })
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
    },

  },
  
}
</script>

<style scoped>
.login{
  background-image: url(../assets/images/background.jpg);
  background-size: cover;
  height: 630px;
  padding-top: 1px;
}
</style>