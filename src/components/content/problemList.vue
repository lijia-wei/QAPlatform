<template>
  <div class="pro-list">
    <p><i class="fa fa-question-circle"></i>问题列表</p>
    <!-- //内容 -->
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="titlename" :name="1">
        <div>{{contents}}</div>
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
  export default {
    name: "problemList",
    data() {
      return {
        //问题内容
        dataList: [],
        titlename: "标题",
        name: "1",
        contents: "我是内容",
        activeNames: ['1'],
        //分页栏
        index: 1,  //用于循环每页的下标
        all: 10,   //总页数
        cur: 1,    //当前选中的页数
        tolalPage: 0,  //当前条数
      }
    },
    components: {
      
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },

      // 向后台发送搜索信息数据
      dataListFn(index) {
        let params = {
          current: index,    //第几页
          limit: 10,            //每页几条
          qName: "",        //帖子/问题名字
          sortType: 1,          //排序类型
          type: 1               //查询类型
        }
        this.$axios({
          url: "/question/query",
          method: "POST",
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data: JSON.stringify(params),
        }).then((res) => {
          console.log(res); 
          let data = res.data.data.data;  //请求到的问题数组
          if(res.data.state == 200){
            this.dataList = [];
            // for(let i=0; i<data.length; i++){
            //   this.dataList.push(data[i]);
            // }
            console.log(data.length); 
            // this.cur = res.data.
          }
        });
      },

      //直接点击页数换页，重新请求数据
      btnClick(data) {
        if(data != this.cur){
          this.cur = data;
        }
        this.dataListFn(this.cur);
      },
      //点击上一页/下一页换页，重新请求数据
      pageClick() {
        this.dataListFn(this.cur);
      },

    },
    
    computed: {
      //计算分页栏的点击选页
      indexs() {
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
    font-size: 18px;
    color: rgb(18, 18, 19);
  }
  .pro-list .el-collapse-item__content {
    font-size: 14px;
    color: rgb(75, 75, 80);
    font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .pro-list .pagebar {
    float: right;
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