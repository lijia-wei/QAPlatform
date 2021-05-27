<template>
  <div class="index">
    <!-- Start of Header -->
    <mainav />

    <!-- Start of Search Wrapper -->
    <div class="search-area-wrapper">
      <div class="search-area container">
        <h3 class="search-header">Questions & Answers</h3>
        <router-link to="/"><a class="logo-img"></a></router-link>
        <p class="search-tag-line" style="margin-top: 50px">
          信息共享与交流平台，你问我答，让信息传递更简单！
        </p>

        <form class="search-form clearfix" @submit.prevent="onSubmit">
          <input
            class="search-term required"
            type="text"
            v-model="search"
            placeholder="输入问题名称"
          />
          <input
            class="search-btn"
            type="submit"
            @click="searchbtn"
            value="搜索"
          />
          <div id="search-error-container"></div>
        </form>
      </div>
    </div>

    <!-- Main Content -->
    <problem-list :qName="qName" />

    <!-- Post questions -->

    <div class="post-container">
      <hr />
      <p><i class="fa fa-pencil-square"></i>在线提问</p>
      <div class="post">
        <el-input
          type="text"
          placeholder="请输入标题"
          v-model="text"
          maxlength="400"
          show-word-limit
          required
        >
        </el-input>
        <div style="margin: 20px 0"></div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="2000"
          show-word-limit
          rows="6"
          required
        >
        </el-input>
        <input
          class="post-btn"
          type="submit"
          @click="postQuestions"
          value="发布"
        />
      </div>
    </div>

    <!-- start of foot -->
    <foot />
  </div>
</template>

<script>
import foot from "@/components/common/foot";
import mainav from "@/components/common/mainav";
import scrollup from "@/components/common/scrollup";
import problemList from "@/components/content/problemList";

export default {
  name: "index",
  data() {
    return {
      password: "",
      username: "",
      hover: false,
      search: "",
      text: "",
      textarea: "",
      what: "hhhh",
      qName: "",
    };
  },
  components: {
    foot,
    mainav,
    problemList,
    scrollup
  },
  mounted() {
    console.log(this.islogin);
  },
  // 辅助函数也一样，获取user模块中的mutations方法
  methods: {
    //发表帖子/提问
    postQuestions() {
      if(this.$store.state.user.islogin){
        let obj = {
          title: this.text,
          content: this.textarea,
        };
        this.$axios({
          url: "/question/submit",
          method: "POST",
          data: JSON.stringify(obj),
        }).then((res) => {
          console.log(res);
        });
      }
    },
    searchbtn() {
      if (this.search == "") {
        this.$message.error("关键字不能为空");
        return;
      } else {
        this.qName = this.search;
      }
    },
  },
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

