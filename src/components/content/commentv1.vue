<template>
  <div class="commentv1">
    <!-- 单个一级评论 -->
    <div class="com_con" v-for="(item,index) in dataList" :key="index">
      <img class="headpic" :src="cimgSrc[item.uId]" >
      <span class="petName">
         {{petName[item.uId]}}：
         <span class="content">{{item.comment}}</span>
        <br>
        <span class="updatetime">{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <tagslike2 :c1Id="item.id" :uId="item.uId"/>
      </span>
      <commentv2 :c1Id="item.id"></commentv2 >
      <el-divider></el-divider>
    </div>
    <!-- 显示更多 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        显示更多<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu></el-dropdown-menu>
    </el-dropdown>
    
  </div>
</template>

<script>
import moment from 'moment'//导入文件
import commentv2 from '@/components/content/commentv2'
import tagslike2 from '@/components/content/tagsLike2'
  export default {
    name: "commentv1",
    data() {
      return {
        input: '',   //回复
        cimgSrc: [],  //头像
        petName: [],  //用户名
        //问题内容
        dataList: [],  //dataList相当于指针，是指向testList
        testList: [],  
        name: 0,
        contents: "我是内容",
        activeNames: [0,1,2],
        loading: true,
        moment
      }
    },
    props: {
      qId: {
        type: Number,
        default: ''
      }
    },
    components: {
      commentv2,
      tagslike2
    },
    methods: {
      //提交二级级评论
      postComment(qId) {
        let obj = {
          comment: this.input,
          qId: qId,
        }
        this.$axios({
          url: "/commentLv2/postCommentLv2",
          method: "POST",
          data: JSON.stringify(obj),
        }).then(res => {
            if(res.data.state == 200){
              this.$message.error("评论成功！");
            }
          })
      },
      //获取一级评论列表
      dataListFn(index) {
        let params = {
          current: index,       //第几页
          limit: 10,            //每页几条
          qId: this.qId,            //帖子/问题名字
        }
        this.$axios({
          url: "/commentLv1/getAllC1",
          method: "POST",
          data: JSON.stringify(params),
        }).then((res) => {
          let data = res.data.data.data;  //请求到的评论数组
          if(res.data.state == 200){
            this.testList = data;

            //请求问题列表中的每个用户的头像
            for(let i=0; i<this.testList.length; i++){
              this.$axios.all([this.$axios({
                url: "/headPicture/getHeadPicture/"+ this.testList[i].uId,
                method: "POST",
                data: JSON.stringify(params),
              }), this.$axios({
                url: "/user/getPetNameByUId/"+ this.testList[i].uId,
                method: "GET",
                data: JSON.stringify(params),
              })])
              .then((res) => {
                if(res[0].data.state == 200){
                  this.cimgSrc[this.testList[i].uId] = res[0].data.data.data;
                }
                if(res[1].data.state == 200){
                  this.petName[this.testList[i].uId] = res[1].data.data.data.petName;
                }
              });
            }
            //防止异步操作先后导致起初图片无法显示
            setInterval(()=>{
              this.dataList = this.testList;   //dataList相当于指针，是指向testList
              this.loading = false;
              clearInterval(this.timer);
            },400);

          }
        });

      },
      clearArray(){
        this.dataList=[];
        this.testList=[];
        this.cimgSrc=[];
        this.petName=[];
      },
      //直接点击页数换页，重新请求数据
      btnClick(data) {
        if(data != this.cur){
          this.cur = data;
        }
        this.clearArray();
        this.dataListFn(this.cur);
      },
      handleCommand() {

      }
    },
    mounted(){
      //计算分页栏的点击选页
      this.clearArray();
      this.dataListFn(1);
    },
  }
</script>

<style>
  .commentv1 {
    height: auto;
    margin: 0 auto;
    width: 80%;
    background-color: #997e9910;
  }
  .el-dropdown {
    width: 100%;
    text-align: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-divider--horizontal {
    margin: 0;
  }
</style>