<template>
  <div class="care" :class="{over: isactive}" @mouseenter="overin()" @mouseleave="overout()">
    <i class="fa fa-user-plus" @click="iscare()" v-if="!this.care">关注</i>
    <i @click="iscare()" v-else>已关注</i>
  </div>
</template>

<script>
export default {
  name: "care",
  data() {
    return {
      isactive: false,
      care: false,
    }
  },
  props: {
    uId: {
      type: Number,
      default: ''
    }
  },
  methods: {
    //页面初始加载
    initialcare() {
      //请求问题列表
      this.$axios({
        url: "/care/ifCare/"+this.uId,
        method: "POST",
      }).then((res) => {
          let data = res.data.data.data;  
          if(res.data.state == 200){
            this.care = true;
          }else{
            this.care = false;
          }
        })
    },
    //点击关注或取消关注
    iscare() {    
      //请求问题列表
      this.$axios({
        url: "/care/careUser/"+this.uId,
        method: "POST",
        data: JSON.stringify(!this.care),
      }).then((res) => {
          if(res.data.state == 200){
            this.care = !this.care;
          }
        })
    },
    overin() {
      this.isactive = !this.isactive;
    },
    overout() {
      this.isactive = !this.isactive;
    },
  },
  mounted(){
    this.initialcare();
  }
}
</script>

<style scoped>
  .care {
    border-radius: 0.3em;
    box-shadow: 1px 1px 2px rgb(168, 167, 167);
    border: 1px solid rgb(56, 55, 55);
    width: 4em;
    height: 2em;
    background: rgb(255, 255, 255);
  }
  .care .fa-user-plus {
    margin-left: 6px;
    font-size: 14px;
    font-weight: 400;
  }
  .over {
    box-shadow: 1px 1px 2px rgb(102, 102, 102);
  }
</style>