<template>
  <div class="header-wrapper">
      <header>
        <div class="container">
          <!-- Logo set -->
          <div class="logo-container">
            <!-- Website Logo -->
            <span style="font-size: 35px;color: white;">Q & A 问答</span>
            <span class="tag-line">网络交流平台</span>
          </div>
          <!-- Start of Main Navigation -->
          <nav class="main-nav">
            <div class="menu-top-menu-container">
              <ul id="menu-top-menu" class="clearfix">
                <router-link to="/" tag="li" exact-active-class="current-menu-item">
                  <a>首页</a>
                </router-link>
                <router-link to="/myquestions" v-if="islogin" tag="li" exact-active-class="current-menu-item">
                  <a>我的提问</a>
                </router-link>
                <router-link to="/login" v-else tag="li" exact-active-class="current-menu-item">
                  <a>我的提问</a>
                </router-link>
                <router-link to="/setting" v-if="islogin" tag="li" exact-active-class="current-menu-item">
                  <a>个人中心</a>
                </router-link>
                <router-link to="/login" v-else tag="li" exact-active-class="current-menu-item">
                  <a>个人中心</a>
                </router-link>
                <router-link to="/about" tag="li" exact-active-class="current-menu-item">
                  <a>关于我们</a>
                </router-link>

                <li v-if="!islogin">
                  <router-link to="/login">登录/注册</router-link>
                </li>
                <li v-else>
                  <a @click="logout">退出登录</a>
                </li>
              </ul>
            </div>

            <!-- Response window drop - down box 响应式-->
            <select
              v-model="selected"
              @change="changeHref(parseInt(selected))"
              class="responsive-nav"
            >
              <option value="1">首页</option>
              <option value="2">我的提问</option>
              <option value="3">个人中心</option>
              <option value="4">关于我们</option>
              <option value="5" v-if="!islogin">登录/注册</option>
              <option value="6" v-else @click="logout">退出登录</option>
            </select>
          </nav>
          <!-- End of Main Navigation -->
        </div>
      </header>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: 'mainav',
  inject: ["reload"],
  data() {
    return {
      selected: 1,
    }
  },

  // 辅助函数也一样，获取模块中的state值
  computed: {
    ...mapState({
      isclose: state => state.user.isclose,
      islogin: state => state.user.islogin,
      userinfo: state => state.user.userinfo,
    })
  },

  methods: {
    ...mapMutations("user", [
      "setUserInfo",
      "ISLOG",
      "CLOSE",
      "DELETE_USERINFO",
    ]),

    //退出登录
    logout() {
      //注销
      this.$axios({
        url: "/user/cancel",
        method: "POST",
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
      }).then(res => {
        if (res.data.state == 200) { 
        this.DELETE_USERINFO();
        this.$message.success("退出成功!"); 
      }
      }).catch(e => {
        this.$message(e);
      });
       
    },
     changeHref(sortnum) {
      switch (sortnum) {
        case 1:
          this.$router.push({ path: "/" });
          break;
        case 2:
          this.$router.push({ path: "/myquestions" });
          break;
        case 3:
          this.$router.push({ path: "/setting" });
          break;
        case 4:
          this.$router.push({ path: "/about" });
          break;
        case 5:
          this.$router.push({ path: "/login" });
          break;
        case 6:
          break;
      }
    },
  }
}
</script>

<style scoped>

</style>