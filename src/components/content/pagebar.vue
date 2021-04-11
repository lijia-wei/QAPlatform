<template>
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
</template>

<script>
export default {
  name : "pagebar",
  data() {
    return {
      index: 1,  
      all: 100,  //总页数
      cur: 1,    //当前页数
      tolalPage: 0,  //当前条数
    }
  },
  methods: {
    // 向后台发送搜索信息数据
    dataListFn(index) {
      let params = {
        current: index,    //第几页
        limit: 10,            //每页几条
        qName: "标题",        //帖子/问题名字
        sortType: 1,          //排序类型
        type: 1               //查询类型
      }
      this.$axios({
        url: "/question/query",
        method: "DELETE",
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        data: JSON.stringify(params),
      }).then((res) => {
        let data = res.data.data;
        if(res.data.state == 200){
          this.dataList = [];
          for(let i=0; i<data.length; i++){
            this.dataList.push(data[i]);
          }
          console.log(this.dataList); 
          // this.cur = res.data.
        }
      });
    },

    //分页
    btnClick(data) {
      if(data != this.cur){
        this.cur = data;
      }
      this.dataListFn(this.cur.toString());
    },
    //切换页数
    pageClick() {
      this.dataListFn(this.cur.toString());
    }
  },
  computed: {
    indexs() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if(this.all >= 5){
        if(this.cur > 3 && this.cur < this.all-2){
          left = this.cur - 2;
          right = this.cur + 2;
        }
        else{
          if(this.cur <= 3){
            left = 1;
            right = 5;
          }
          else{
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right){
        ar.push(left);
        left++;
      }
      return ar;
    }
  }
}
</script>

<style>
  .pagebar {
    margin:40px auto;
    margin-bottom: 30px;
    height: 40px;
  }
  .pagebar ul,li {
    margin: 0px;
    padding: 0px;
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
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #5D6062;
    cursor: pointer;
    margin-right: 20px;
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