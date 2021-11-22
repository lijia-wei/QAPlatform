<template>
  <div class="pro-list">
    <p><i class="fa fa-question-circle"></i>问题列表</p>
    <!-- //内容 -->
    <el-collapse
      v-model="activeNames"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-collapse-item
        v-for="(item, index) in dataList"
        :key="index"
        :title="item.title"
        :name="index"
      >
        <img class="headpic" :src="imgSrc[item.uId]" />
        <span class="petName">
          {{ petName[item.uId] }}
          <br />
          <span class="updatetime"
            >更新时间：{{
              moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")
            }}</span
          >
        </span>
        <care :uId="item.uId" v-if="item.uId != userinfo.id" />
        <div class="content">{{ item.content }}</div>

        <!-- 删除帖子 -->
        <slot :qId="item.id"></slot>
        <!-- 一级点赞 -->
        <tagslike1 :qId="item.id" />
        <postcom :qId="item.id" />

        <commentv1 :qId="item.id"></commentv1>
      </el-collapse-item>
    </el-collapse>
    <!-- 分页栏 -->
    <div class="pagebar">
      <ul>
        <li v-if="cur == 1"><a class="banclick">上一页</a></li>
        <li v-if="cur > 1"><a @click="pageClick, cur--">上一页</a></li>
        <li
          v-for="index in indexs"
          :key="index"
          :class="{ active: cur == index }"
        >
          <a @click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="cur != all"><a @click="pageClick, cur++">下一页</a></li>
        <li v-if="cur == all"><a class="banclick">下一页</a></li>
        <li>
          <a
            >共<i>{{ all }}</i
            >页</a
          >
        </li>
      </ul>
    </div>
    <div style="clear: both"></div>
    <!--清除浮动-->
  </div>
</template>

<script>
import moment from "moment"; //导入文件
import { mapState, mapMutations } from "vuex";
import postcom from "@/components/content/postcom_v1";
import tagslike1 from "@/components/content/tagsLike1";
import commentv1 from "@/components/content/commentv1";
import care from "@/components/content/care";
export default {
  name: "problemList2",
  data() {
    return {
      input: "", //评论
      imgSrc: [], //头像
      petName: [], //用户名
      //问题内容
      dataList: [], //dataList相当于指针，是指向testList
      testList: [],
      titlename: "标题",
      name: 0,
      contents: "我是内容",
      activeNames: [0, 1, 2],
      loading: true,
      //分页栏
      index: 1, //用于循环每页的下标
      all: 1, //总页数
      cur: 1, //当前选中的页数
      tolalPage: 0, //当前条数
      moment, //Json时间转换对象
    };
  },
  props: {
    qName: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "/question/query",
    },
    which: {
      type: Number,
      default: 0,
    },
  },
  components: {
    tagslike1,
    commentv1,
    care,
    postcom,
  },
  methods: {
    //获取问题列表
    dataListFn(index) {
      let params = [
        {
          current: index, //第几页
          limit: 10, //每页几条
          qName: this.qName, //问题标题名字
          sortType: 1, //排序类型
          type: 1, //查询类型
        },
        {
          current: index,
          limit: 10,
          type: 1,
          uId: this.userinfo.id,
        },
      ];
      console.log(this.url);
      //请求问题列表
      this.$axios({
        url: this.url,
        method: "POST",
        data: JSON.stringify(params[this.which]),
      }).then((res) => {
        var data = res.data.data.data; //请求到的问题数组
        if (res.data.state == 200) {
          this.testList = data;
          if (
            this.url == "/question/query" ||
            this.url == "/collection/select"
          ) {
            if (res.data.data.size % 10 == 0) {
              this.all = parseInt(res.data.data.size / 10);
            } else {
              this.all = parseInt(res.data.data.size / 10 + 1);
            }
          } else {
            this.all = 1;
          }

          //请求问题列表中的每个用户的头像
          for (let i = 0; i < this.testList.length; i++) {
            this.$axios
              .all([
                this.$axios({
                  url: "/headPicture/getHeadPicture/" + this.testList[i].uId,
                  method: "POST",
                }),
                this.$axios({
                  url: "/user/getPetNameByUId/" + this.testList[i].uId,
                  method: "GET",
                }),
              ])
              .then((res) => {
                if (res[0].data.state == 200) {
                  this.imgSrc[this.testList[i].uId] = res[0].data.data.data;
                }
                if (res[1].data.state == 200) {
                  this.petName[this.testList[i].uId] =
                    res[1].data.data.data.petName;
                }
              });
          }
          //防止异步操作先后导致起初图片无法显示
          setInterval(() => {
            this.dataList = this.testList; //dataList相当于指针，是指向testList!!!
            this.loading = false;
            clearInterval(this.timer);
          }, 800);
        } else if (res.data.state == 403) {
          this.loading = false;
          this.all = 0;
        }
      });
    },
    clearArray() {
      this.dataList = [];
      this.testList = [];
      this.imgSrc = [];
      this.petName = [];
    },
    //直接点击页数换页，重新请求数据
    btnClick(data) {
      if (data != this.cur) {
        this.cur = data;
      }
      this.clearArray();
      this.dataListFn(this.cur);
    },
    //点击上一页/下一页换页，重新请求数据
    pageClick() {
      this.clearArray();
      this.dataListFn(this.cur);
    },
  },
  computed: {
    ...mapState({
      isclose: (state) => state.user.isclose,
      islogin: (state) => state.user.islogin,
      userinfo: (state) => state.user.userInfo,
    }),
    //计算分页栏的点击选页
    indexs() {
      this.clearArray();
      this.dataListFn(this.cur);
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 3) {
        if (this.cur > 2 && this.cur < this.all - 1) {
          left = this.cur - 1;
          right = this.cur + 1;
        } else {
          if (this.cur <= 2) {
            left = 1;
            right = 3;
          } else {
            right = this.all;
            left = this.all - 2;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
};
</script>

<style>
.el-collapse-item__content {
  position: relative;
}
</style>