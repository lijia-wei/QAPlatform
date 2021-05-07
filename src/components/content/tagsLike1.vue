<template>
  <div class="tags">
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

    <div class="like" @click="islike">
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
      default: ''
    },
  },
  data () {
    return {
      show: true,
      show2: true,
      fontclass: "",
      fontclass2: ""
    };
  },

  methods: {
    colour () {
      if (this.show) {
        this.show = false;
        this.fontclass = "hover";
      } else if (!this.show) {
        this.show = true;
        this.fontclass = "";
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
    },
  },

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
