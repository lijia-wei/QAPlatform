<template>
  <div class="index">
    <!-- Start of Header -->
    <mainav/>
    <!-- End of Header -->

    <!-- Start of Search Wrapper -->
    <div class="search-area-wrapper">
      <div class="search-area container">
        <h3 class="search-header">Questions & Answers</h3>
         <router-link to="/index"><a class="logo-img"></a></router-link>
        <p class="search-tag-line" style="margin-top:50px">
          信息共享与交流平台，你问我答，让信息传递更简单！
        </p>

        <form class="search-form clearfix" @submit.prevent="onSubmit">
          <input
            class="search-term required"
            type="text"
            v-model="search"
            placeholder="Type your search terms here"
          />
          <input class="search-btn" type="submit" @click="searchbtn" value="搜索" />
          <div id="search-error-container"></div>
        </form>
      </div>
    </div>
    <!-- End of Search Wrapper -->

    <!-- Main Content -->
    <answer/>  
    <!-- End Content -->
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="text"
      maxlength="40"
      show-word-limit
    >
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="textarea"
      maxlength="2000"
      show-word-limit
    >
    </el-input>

    <!-- start of foot -->
    <foot/>
    <!-- end of foot -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import foot from "@/components/content/foot";
import mainav from "@/components/content/mainav";
import answer from "@/components/content/answer"

export default {
  name: "index",
  components: {
    foot,
    mainav,
    answer
  },
  data() {
    return {
      password: "",
      password1: "",
      username: "",
      hover: false,
      search: "",
      text: '',
      textarea: ''
    };
  },
  computed: {
    ...mapState({
      isclose: state => state.user.isclose,
      islogin: state => state.user.islogin,
      avatar: state => state.user.userinfo.avatar,
      // nickname: state => state.user.userinfo.nickname,
    })
  },
  methods: {
    ...mapActions("user", [
      "setUserInfo",
      "changeislog",
      "setToken",
      "join",
      "close",
      "setunread",
      "deleteuserinfo"
    ]),
    //退出登录
    logout() {
      this.deleteuserinfo();
      this.$message.success("退出成功");
    },
    joinin() {
      this.join();
    },
    closein() {
      this.close();
    },
    onSubmit() {
      return false;
    },
    searchbtn() {
      if (this.search == "") {
        this.$message.error("关键字不能为空");
        return;
      }
      this.$router.push({ path: "/search", query: { search: this.search } });
    },
    async getnocitenmu() {     
          const res = await this.$axios.post(
            "/web/getnotice",
            this.qs.stringify({ num: 1 })
          );
          console.log(res.data);
          this.setunread(res.data.data.count);
    }
  },
  created() {
     localStorage.luffy_jwt_token&&this.getnocitenmu();
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-btn {
  background-color: #2c696d;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  padding: 14px 30px 15px;
  color: #fff;
  display: table;
  margin: 0 auto;
}
#mask {
  position: fixed;
  z-index: 999;
  top: 0; 
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  filter: alpha(Opacity=30);
  opacity: 0.2;
  margin: 0;
  /* display: none;  */
}
.iconfont {
  font-size: 20px;
  color: #000;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>

