<template>
  <div class="care" :class="{over: isactive}" @mouseenter="overin()" @mouseleave="overout()">
    <i class="fa fa-trash-o" @click="deleteqs()">删除</i>
  </div>
</template>

<script>
export default {
  name: "delete",
  data() {
    return {
      isactive: false,
    }
  },
  props: {
    qId: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    //点击关注或取消关注
    deleteqs() {    
      if(this.$store.state.user.islogin) {
        //请求问题列表
        this.$axios({
          url: "/question/delete/"+this.qId,
          method: "DELETE",
          data: JSON.stringify(this.qId),
        }).then((res) => {
            if(res.data.state == 200){
              this.$message.success("删除成功！");
              location. reload();
            }
          })
      }
      else {
        this.$message.error("请先登录！");
      }
    },
    overin() {
      this.isactive = !this.isactive;
    },
    overout() {
      this.isactive = !this.isactive;
    },
  },
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
    position: absolute;
    top: 1em;
    right: 1em;
  }
  .care .fa-user-plus {
    margin-left: 6px;
    font-size: 14px;
    font-weight: 400;
  }
  .care i{
    margin-left: 0.5em;
  }
  .over {
    box-shadow: 1px 1px 2px rgb(102, 102, 102);
  }
</style>