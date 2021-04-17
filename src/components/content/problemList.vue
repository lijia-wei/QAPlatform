<template>
  <div class="pro-list">
    <p><i class="fa fa-question-circle"></i>问题列表</p>
    <!-- //内容 -->
    <el-collapse v-model="activeNames" v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">

      <el-collapse-item v-for="(item,index) in dataList" :key="index" :title="item.title" :name="index">
        <img class="headpic" :src="imgSrc[item.uId]" >
        <span class="petName">
          {{petName[item.uId]}} 
          <br>
          <span class="updatetime">更新时间：{{moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </span>
       
        <div class="content">{{item.content}}</div>
        <!-- <div>{{item.likeNum}}</div> -->
        <!-- <div>{{item.uId}}</div> -->
        
        <!-- <img src="4768a6bd-78ba-422a-919c-67d218c07e7a.png" alt=""> -->
        <div>此处是评论操作</div>
        <tagslike/>  
      </el-collapse-item>
    </el-collapse>
    <!-- 分页栏 -->
    <div class="pagebar">
      <ul>
        <li v-if="cur==1"><a class="banclick">上一页</a></li>
        <li v-if="cur>1"><a @click="pageClick, cur--">上一页</a></li>
        <li v-for="index in indexs" :key="index" :class="{ 'active' : cur == index}">
          <a @click="btnClick(index)">{{ index }}</a>
        </li>
        <li v-if="cur!=all"><a @click="pageClick, cur++">下一页</a></li>
        <li v-if="cur==all"><a class="banclick">下一页</a></li>
        <li><a>共<i>{{ all }}</i>页</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'//导入文件
  import tagslike from '@/components/content/tagsLike'
  export default {
    name: "problemList",
    data() {
      return {
        imgSrc: [],  //头像
        petName: [],  //用户名
        //问题内容
        dataList: [],  //dataList相当于指针，是指向testList
        testList: [],  
        titlename: "标题",
        name: 0,
        contents: "我是内容",
        activeNames: [0,1,2,],
        loading: true,
        //分页栏
        index: 1,  //用于循环每页的下标
        all: 10,   //总页数
        cur: 1,    //当前选中的页数
        tolalPage: 0,  //当前条数
        moment,    //Json时间转换对象
      }
    },
    components: {
      tagslike,
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      dataListFn(index) {
        
        let params = {
          current: index,       //第几页
          limit: 10,            //每页几条
          qName: "",            //帖子/问题名字
          sortType: 1,          //排序类型
          type: 1               //查询类型
        }
        //请求问题列表
        this.$axios({
          url: "/question/query",
          method: "POST",
          data: JSON.stringify(params),
        }).then((res) => {
          let data = res.data.data.data;  //请求到的问题数组
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
                  this.imgSrc[this.testList[i].uId] = res[0].data.data.data;
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
            },800);

          }
        });

      },
      clearArray(){
        this.dataList=[];
        this.testList=[];
        this.imgSrc=[];
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
      //点击上一页/下一页换页，重新请求数据
      pageClick() {
        this.clearArray();
        this.dataListFn(this.cur);
      },
    },
    computed: {
      //计算分页栏的点击选页
      indexs() {
        this.clearArray();
        this.dataListFn(this.cur);
        var left = 1;
        var right = this.all;
        var ar = [];
        if(this.all >= 3){
          if(this.cur > 2 && this.cur < this.all-1){
            left = this.cur - 1;
            right = this.cur + 1;
          }
          else{
            if(this.cur <= 2){
              left = 1;
              right = 3;
            }
            else{
              right = this.all;
              left = this.all - 2;
            }
          }
        }
        while (left <= right){
          ar.push(left);
          left++;
        }
        return ar;
      }
    },
  }
</script>



<style>
  .pro-list {
    width: 70%;
    margin: 0 auto;
    position: relative;
    margin-top: 3em;
  }
  .pro-list p {
    font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 28px;
    margin: 2em 0 1em;
  }
  .pro-list .el-collapse-item__header{
    font-size: 19px;
    color: rgb(18, 18, 19);
    font-weight: 800px;
  }
  .pro-list .el-collapse-item__content .content{
    margin-top: 1em;
    font-size: 16px;
    color: rgb(81, 81, 83);
    font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .pro-list .el-collapse-item__content .petName{
    font-size: 17px;
    color: rgb(47, 44, 51);
    margin-left: 1em;
    font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .pro-list .el-collapse-item__content .updatetime{
    font-size: 14px;
    color: rgb(79, 79, 80);
  }
  .pro-list .pagebar {
    float: right;
  }
  .pro-list .headpic {
    height: 60px;
    width: 60px;
    display: inline-block;
    background-size: cover;
    border-radius: 50%;
  }
  .pagebar {
    margin:35px auto;
    margin-bottom: 30px;
    height: 40px;
  }
  .pagebar ul,li {
    margin: 0px;
    padding: 0px;
    height: 38px;
    display: inline;
  }
  li {
    list-style: none;
  }
  .pagebar li:first-child>a {
    margin-left: 0px;
  }
  .pagebar a {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    padding: 7px 12px;
    line-height: 1.42857143;
    color: #5D6062;
    cursor: pointer;
    margin-right: 15px;
  }
  .pagebar a:hover {
    background-color: #eee;
  }
  .pagebar a.banclick {
    cursor:not-allowed;
  }
  .pagebar .active a {
    color: #fff;
    cursor: default;
    background-color: #E96463;
    border-color: #E96463;
  }
  .pagebar i {
    font-style:normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>