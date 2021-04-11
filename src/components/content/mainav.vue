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
                <router-link to="/help" tag="li" exact-active-class="current-menu-item">
                  <a>我的提问</a>
                </router-link>
                <router-link to="/activity" tag="li" exact-active-class="current-menu-item">
                  <a>关注</a>
                </router-link>
                <router-link to="/job" tag="li" exact-active-class="current-menu-item">
                  <a>个人中心</a>
                </router-link>
                <router-link to="/oldstuff" tag="li" exact-active-class="current-menu-item">
                  <a>关于我们</a>
                </router-link>

                <li v-if="!islogin">
                  <router-link to="/login">登录/注册</router-link>
                </li>
                <li v-else>
                  <router-link to="/login">退出登录</router-link>
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
              <option value="2">在线提问</option>
              <option value="3">关注</option>
              <option value="4">个人中心</option>
              <option value="5" v-if="!islogin">登录/注册</option>
              <option value="5" v-else>退出登录</option>
            </select>
          </nav>
          <!-- End of Main Navigation -->
        </div>
      </header>
    </div>
</template>

<script>
import { mapState} from "vuex";
export default {
  name: 'mainav',
  data() {
    return {
      selected: 1,
    }
  },
  computed: {
    ...mapState({
      isclose: state => state.user.isclose,
      islogin: state => state.user.islogin,
    })
  },
  methods: {
     changeHref(sortnum) {
      switch (sortnum) {
        case 1:
          this.$router.push({ path: "/" });
          break;
        // case 2:
        //   this.$router.push({ path: "/help" });
        //   break;
        // case 3:
        //   this.$router.push({ path: "/activity" });
        //   break;
        // case 4:
        //   this.$router.push({ path: "/job" });
        //   break;
        case 6:
          this.$router.push({ path: "/login" });
          break;
        // case 6:
          // this.close();
          // break;
      }
    },
  }
}
</script>

<style scoped>

</style>