<template>
    
  <div class="setting">
    <!--  Start of Header  -->
    <mainav />
    <div class="head">
      <div class="demo-avatar demo-basic el-row">
        <div class="el-col el-col-15">
          <div class="demo-basic--circle">
            <div class="block">
              <span
                class="el-avatar el-avatar--circle"
                :style="[{ backgroundImage: 'url(' + headsrc + ')' }]"
                v-loading="loading"
              >
                <input
                  type="file"
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  @change="changehead"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="petname">昵称：{{this.$store.state.user.userInfo.petName}}</div>
    </div>
    <!-- Main Content -->
    <div class="main">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="信息设置"> 
          信息设置 
          <ownset />
        </el-tab-pane>

        <el-tab-pane label="我的关注">
          我的关注
          <caredperson :type="2" />
        </el-tab-pane>

        <el-tab-pane label="粉丝"
          >粉丝
          <caredperson :type="1" />
        </el-tab-pane>

        <el-tab-pane label="我的收藏"
          >我的收藏
          <collection :url="requesturl" :which="1" />
        </el-tab-pane>
      </el-tabs>
    </div>

       <!-- start of foot -->
    <!--     <foot/> -->
  </div>
</template>

<script>
import foot from "@/components/common/foot";
import mainav from "@/components/common/mainav";
import caredperson from "@/components/content/personal/caredperson";
import collection from "@/components/content/personal/collection";
import ownset from "@/components/content/personal/ownset";

export default {
  name: "setting",
  data() {
    return {
      tabPosition: "left",
      requesturl: "/collection/select",
      headsrc: "",
      loading: true,
    };
  },
  components: {
    foot,
    mainav,
    ownset,
    caredperson,
    collection,
  },
  methods: {
    changehead(e) {
      let file = e.target.files[0];
      console.log(file);
      let param = new FormData(); // 创建form对象
      param.append("file", file, file.name); // 通过append向form对象添加数据

      this.$axios({
        url: "headPicture/change?uId=" + this.$store.state.user.userInfo.id,
        method: "POST",
        data: param,
      }).then((res) => {
        if (res.data.state == 200) {
          this.gethead();
        }
      });
    },

    gethead() {
      this.loading = true;
      this.$axios({
        url:
          "/headPicture/getHeadPicture/" + this.$store.state.user.userInfo.id,
        method: "POST",
      }).then((res) => {
        if (res.data.state == 200) {
          this.headsrc = res.data.data.data;
          this.loading = false;
        }
      });
    },
    outback() {
      //跳转主页
      this.$router.replace({
        path: "/",
      });
    }
  },
  created() {
    this.gethead();
    if(!this.$store.state.user.islogin){
      this.outback();
    }
  },
};
</script>

<style>

.head {
  background: url("../../assets/images/cool-background.png") no-repeat;
  background-size: cover;
  width: 80%;
  margin: 2em auto 0.5em;
  font-size: 16px;
  border: solid #e4e7ed 1px;
  height: 200px;
  position: relative;
}
.head input {
  opacity: 0;
  display: block;
}
.head span {
  position: absolute;
  left: 45%;
  top: 30px;
  height: 120px;
  width: 120px;
  line-height: 120px;
  background-size: cover;
}
.head .petname {
  position: absolute;
  left: 45%;
  top: 80%;
  color: white;
  font-size: 18px;
}
.main {
  width: 80%;
  margin: 0 auto;
  font-size: 16px;
  border: solid #e4e7ed 2px;
}
.el-row::after,
.el-row::after {
  clear: both;
}
.el-row::before {
  display: table;
}
.el-tab-pane{
  font-size: 20px;
  margin: 1em 0;
}

</style>
