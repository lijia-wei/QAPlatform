<template>
  <div class="tags" @click="iscollect">
    <div class="collect">
      <i class="fa fa-heart-o fa-5x animated swing"
         @click="colour"
         v-if="show">
         收藏
      </i>
      <i class="fa fa-heart fa-5x animated swing"
         :class="fontclass"
         v-if="!show"
         @click="colour">
         已收藏
      </i>
    </div>

    <div class="like" @click="islike" >
      <i class="fa fa-thumbs-o-up fa-5x"
         v-if="show2"
         @click="colour2">
         点赞
      </i>
      <i class="fa fa-thumbs-up fa-5x"
         :class="fontclass2"
         v-if="!show2"
         @click="colour2">
         已点赞
      </i>
    </div>
  </div>
</template>
<script>

export default {
  name: 'tags',
  props: {
    qId: {
      type: Number,
      default: -1,
    },
  },
  data () {
    return {
      show: true,
      show2: true,
      fontclass: "",
      fontclass2: "",
      collect: false,
    };
  },

  methods: {
    colour () {
      if (this.show) {
        this.show = false;
        this.fontclass = "hover";
        this.collect = true;
      } else if (!this.show) {
        this.show = true;
        this.fontclass = "";
        this.collect = false;
      }
    },
    colour2 () {
      if (this.show2) {
        this.show2 = false;
        this.fontclass2 = "hover2";
      } else if (!this.show2) {
        this.show2 = true;
        this.fontclass2 = "";
      }
    },
    //点赞
    islike(){
      if(this.$store.state.user.islogin) {
        this.$axios({
          url: "/question/support/"+this.qId,
          method: "POST",
          data: JSON.stringify(!this.show2),
        }).then(res => {
            if(res.data.state == 200){
              if(!this.show2){
                this.$message.success("点赞成功！");
              }
              else{
                this.$message.success("取消点赞！");
              }
            }
          })
      }
      else{
        this.$message.error("请先登录！");
        this.$router.replace({
              path: "/login",
            });
      }
    },

    //页面初始加载
    initialcollect() {
      //请求问题列表
      this.$axios({
        url: "/collection/ifCollection/"+this.qId,
        method: "POST",
      }).then((res) => {
          let data = res.data.data.data;  
          if(res.data.state == 200){
            this.collect = true; //收藏的时候
            this.show = false;
            this.fontclass = "hover";
          }else{
            this.collect = false;
            this.show = true;
            this.fontclass = "";
          }
        })
    },
    //收藏
    iscollect(){
      if(this.$store.state.user.islogin) {
        this.$axios({
          url: "/collection/collectionUser/"+this.qId,
          method: "POST",
          data: JSON.stringify(this.collect),
        }).then(res => {
            if(res.data.state == 200){
              if(this.collect){
                this.$message.success("收藏成功！");
              }
              else{
                this.$message.success("取消收藏！");
              }
            }
          })
      }
      else{
        this.$message.error("请先登录！");
        this.$router.replace({
              path: "/login",
            });
      }
    },
  },
  mounted(){
    this.initialcollect();
  }
}
</script>

<style  scoped>
  .tags {
    width: 100%;
    position: relative;
    height: 2.5em;
    padding-top: 0.6em;
  }
  .tags .collect {
    display: inline-block;
    position: absolute;
    right: 9em;
  }
  .tags .like {
    display: inline-block;
    position: absolute;
    right: 2em;
  }
  .fa-5x{
    font-size: 16px;
    font-weight: 300;
  }
  .hover {
    color: #ee3f4d;
  }
  .hover2 {
    color: rgb(240, 65, 94);
  }
</style>
