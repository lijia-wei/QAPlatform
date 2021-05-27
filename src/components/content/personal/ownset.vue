<template>
  <div class="ownset">
    <li>id: {{this.$store.state.user.userInfo.id}}</li>
    <div class="change">
      <li>昵称：{{this.$store.state.user.userInfo.petName}}</li> <a @click="show1">修改</a>
      <input
          type="text"
          v-model="new1"
          placeholder="昵称"
          maxlength="11"
          v-if="showpet"
        />
        <button class="changeput" v-if="showpet" @click="changePetName">提交</button>
    </div>
    <div class="change">
      <li>密码：{{this.$store.state.user.userInfo.password}}</li> <a @click="show2">修改</a>
      <input
          type="text"
          v-model="new2"
          maxlength="10"
          minlength="6"
          placeholder="旧密码"
          v-if="showpass"
        />
        <input
          type="text"
          v-model="new3"
          maxlength="10"
          minlength="6"
          placeholder="新密码：6-10位数字、字母组合"
          v-if="showpass"
        />
        <button class="changeput" v-if="showpass" @click="changePassWord">提交</button>
    </div>
    <li>用户名：{{this.$store.state.user.userInfo.username}}</li>
    <li>邮箱：{{this.$store.state.user.userInfo.email}}</li>
  </div>
</template>

<script>
export default {
  name: "ownset",
  data() {
    return {
      showpet: false,
      showpass: false,
      new1: "",
      new2: "",
      new3: "",
    }
  },
  methods: {
    changePetName(){
      let params = this.new1;
      this.$axios({
        url: "/user/changePetName",
        method: "POST",
        data: JSON.stringify(params)
      }).then((res) => {
          let data = res.data.data.data;  
          if(res.data.state == 200){
            this.$store.state.user.userInfo.petName = this.new1;
            sessionStorage.setItem("userInfo", JSON.stringify(this.$store.state.user.userInfo));
            location. reload();
            this.$message.success("修改成功！");
          }else{
            this.$message.error("修改失败！");
          }
        })
    },
    changePassWord(){
      let params = {
        newPassword: this.new2,
        oldPassword: this.new3,
        username: this.$store.state.user.userInfo.username     
      }
      this.$axios({
        url: "/user/changePassword",
        method: "PUT",
        data: JSON.stringify(params)
      }).then((res) => {
          let data = res.data.data.data;  
          if(res.data.state == 200){
            this.$store.state.user.userInfo.password = this.new3;
            sessionStorage.getItem("userInfo");
            location. reload();
            this.$message.success("修改成功！");
          }else{
             this.$message.error("修改失败！");
          }
        })
    },
    show1() {
      this.showpet = !this.showpet;
    },
    show2() {
      this.showpass = !this.showpass;
    }
  }
}
</script>

<style>
  .el-tag {
    height: 105px;
    margin: 1em;
    border-color: #cae3fc;
    border-width: 1px;
    font-size:14px;
  }
  .ownset{
    margin: 1em 0 2em 3em;
    font-size: 16px;
  }
  .ownset li{
    display: block;
  }
  .change{
    margin-bottom: 1em;
  }
  .change li {
    display: inline;
  }
  .change a {
    font-size: 12px;
    margin-left: 3em;
  }
  .change input{
    margin-left: 2em;
  }
  .change a:hover {
    color: rgb(99, 6, 250);
  }
  .change button {
    font-size: 14px;
    margin-left: 1em;
    margin-bottom: 1em;
  }
</style>