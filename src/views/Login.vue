<template>
  <div class="login">
    <div class="sign-in-box clearfix">
      <span class="loginline">账 号 登 录</span>
      <router-link to="/register" class="regi">没有账号？去注册</router-link>
      <div class="in">
        <input
          type="text"
          v-model="username"
          name="username"
          placeholder="用户名"
          maxlength="11"
        />
        <input
          type="password"
          v-model="password"
          name="password"
          maxlength="10"
          minlength="6"
          placeholder="密码：6-10位数字、字母组合"
        />
      </div>
      <a class="regi" src="javascript:;" @click="showfindback">忘记密码？</a>
      <button @click="login" class="loginbtn">登录</button>
    </div>
    <div class="sign-in-box clearfix findpass" v-if="show">
      <span>找 回 密 码</span>
      <div class="in">
        <input
          type="text"
          v-model="username"
          name="username"
          placeholder="登录名"
          maxlength="11"
        />
        <input
          type="password"
          v-model="newpassword"
          name="password"
          maxlength="10"
          minlength="6"
          placeholder="新密码：6-10位数字、字母组合"
        />
        <div class="get">
          <input
            type="e-mail"
            v-model="e_mail"
            name="e-mail"
            placeholder="邮箱"
            maxlength="20"
          />
          <button class="sendver" @click="sendVerify">{{ timecount }}</button>
        </div>
        <input
          type="text"
          v-model="verification"
          name="verification"
          placeholder="验证码"
        />
      </div>
      <button @click="findback" class="loginbtn">确认找回</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      password: "",
      newpassword: "",
      username: "",
      e_mail: "",
      time: 60,
      timecount: "发送验证码",
      verification: "",
      show: false,
    };
  },
  // 辅助函数也一样，获取模块中的state值
  computed: {
    ...mapState({
      isclose: (state) => state.user.isclose,
      islogin: (state) => state.user.islogin,
    }),
  },

  methods: {
    ...mapMutations("user", ["setUserInfo", "ISLOG", "CLOSE"]),

    login() {
      if (this.password == "" || this.password == "") {
        this.$message.error("账号或者密码为空");
        return;
      }
      let obj = {
        password: this.password,
        username: this.username,
      };
      this.$axios({
        url: "/user/login",
        method: "POST",
        data: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.data.state == 200) {
            this.$message.success("登录成功！");
            //获取当前登录信息
            this.$axios({
              url: "/user/getCurrentUser",
              method: "GET",
            })
              .then((res) => {
                let data = res.data.data.data;
                if (res.data.state == 200) {
                  this.setUserInfo(data);
                  this.ISLOG();
                  this.CLOSE();
                }
              })
              .catch((e) => {
                this.$message(e);
              });
            //跳转主页
            this.$router.replace({
              path: "/",
            });
          }
          if (res.data.state == 403) {
            this.$message.error("该用户不存在，请前往注册！");
          } else if (res.data.state == 402) {
            this.$message.error("请求异常，登陆失败！");
          } else if (res.data.state == 400) {
            this.$message.error("登陆失败，密码或账号错误！");
          }
        })
        .catch((e) => {
          this.$message(e);
        });
    },
    //验证码倒计时
    countDown() {
      var time = 60;
      const datathis = this;
      function ti() {
        var t = setInterval(function () {
          time--;
          datathis.timecount = time + "秒后重新发送";
          if (time == 0) {
            clearTimeout(t);
            datathis.timecount = "发送验证码";
            time = 60;
          }
        }, 1000);
      }
      ti(datathis);
    },
    sendVerify() {
      //发送验证码
      if (this.e_mail == "") {
        this.$message.error("请输入邮箱！");
        this.$axios({
          url: "/email/sendEmail/findPasswordCode",
          method: "POST",
          data: this.e_mail,
        })
          .then((res) => {
            let data = res.data;
            if (res.data.state == 200) {
              this.$message.success("发送成功，请稍等！");
              this.countDown();
            }
          })
          .catch((e) => {
            this.$message.error(e);
          });
      }
    },
    showfindback() {
      this.show = true;
    },
    //找回密码
    findback() {
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
        newPassword: this.newpassword,
        username: this.username,
      };
      this.$axios({
        url: "/user/findPassword/" + this.verification,
        method: "POST",
        data: JSON.stringify(obj),
      })
        .then((res) => {
          let data = res.data.data;
          alert(data);
          if (res.data.state == 200) {
            this.$message.success("找回成功,请登录！");
          } else {
            this.$message.error("找回失败！");
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
  },
};
</script>

<style scoped>
.login {
  background-image: url(../assets/images/background.jpg);
  background-size: cover;
  height: 630px;
  padding-top: 1px;
}
</style>