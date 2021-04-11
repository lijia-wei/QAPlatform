<template>
<div class="register">
  <div class="sign-in-box clearfix">
    <span class="regiline">欢 迎 注 册</span>
    <router-link to="/login" class="login">已有账号？去登录</router-link>
    <div class="in-regi">
      <input type="text" v-model="username" name="username" placeholder="用户名" maxlength="11">
      <input type="password" v-model="password" name ="password" maxlength="10" minlength="6" placeholder="密码：6-10位数字、字母组合">
      <input type="text" v-model="pet_name" name="pet_name" placeholder="昵称" maxlength="11">
      <div class="get">
          <input type="e-mail" v-model="e_mail" name="e-mail" placeholder="邮箱" maxlength="20">
          <button class="sendver" @click="sendVerify">{{timecount}}</button>
      </div>
      <input type="text" v-model="verification" name="verification" placeholder="验证码">
    </div>
    <div class="agree findpass">
        <input type="radio">
        <label for="">阅读并接受《网络问答平台网络协议》</label>
    </div>
    <button type="submit" @click="registered" class="regist">注册</button>
  </div>
</div>
    
</template>

<script>
export default {
  name: 'Register',
  data(){
    return {
      password: '',
      username: '',
      pet_name: '',
      e_mail: '',
      verification: '',
      time: 60,
      timecount: "发送验证码",
    };
  },
  methods: {
    //验证码倒计时
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
      console.log(this.e_mail);
      this.$axios({
        url: "/email/sendEmail/registerCode",
        method: "POST",
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        data: this.e_mail,
      })
      .then(res => {
          let data = res.data;
          if (res.data.state == 200) {
            this.$message.success("发送成功！");
          }
          // this.countDown();
           
        })
        .catch(e => {
          this.$message.error(e);
        });
    },

    registered() {
       const userReg = /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{5,9}$/; //6-10位字母数字
      const pwdReg = /^[a-zA-Z]\w{5,17}$/; //6-18位字母数字下划线 字母开头
      if (!userReg.test(this.username)) {
        this.$message.error("账号为6-10位字母数字字母");
        return;
      }
      if (!pwdReg.test(this.password)) {
        this.$message.error("密码为6-18位字母数字或下划线 字母开头");
        return;
      }
      let obj = {
        password: this.password,
        username: this.username,
        petName: this.pet_name,
        email: this.e_mail,
      };
      this.$axios({
        url: "/user/register/"+this.verification,
        method: "POST",
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        data: JSON.stringify(obj)
      })
        .then(res => {
          let data = res.data.data;
          alert(data);
          if (res.data.state != 200) {
            // if (data.state.type == "ERROR_PARAMS_EXIST") {
            //   this.$message.error("用户名重复");
            // } else {
            //   this.$message.error("注册失败");
            // }
            // return;
          }
          this.$message.success("注册成功请登录");
          // this.join();
          this.$router.push({path:'/login'});
        })
        .catch(e => {
          this.$message.error(e);
        });
    },
  }
}

</script>

<style scoped>
  .register{
    background-image: url(../assets/images/background.jpg);
    background-size: cover;
    height: 630px;
    padding-top: 1px; 
}
</style>