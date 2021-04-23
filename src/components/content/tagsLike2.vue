<template>
  <div class="tags">
    <div class="operation">
      <div class="resp" @click="respond">
        <i class="fa fa-pencil">
          回复
        </i> 
      </div>
      <div class="like">
        <i class="fa fa-thumbs-o-up fa-5x"
          v-if="show2"
          @click="islike">
          点赞
        </i>
        <i class="fa fa-thumbs-up fa-5x"
          :class="fontclass2"
          v-else>
          已点赞
        </i>
      </div>
    </div>
    
    <div class="postcomment" v-if="showres">
      <el-input v-model="input" placeholder="在线回复"></el-input>
      <input class="post-btn" type="button" value="提交" @click="postCommentv2"/>
    </div>
  </div>
</template>
<script>

export default {
  name: 'tags',
  props: [''],
  data () {
    return {
      showres: false,
      show2: true,
      fontclass2: "",
      input: "",
    }
  },
  props: {
    c1Id: {
      type: Number,
      default: ''
    },
    uId: {
      type: Number,
      default: ''
    }
  },
  methods: {
    respond () {
      this.fontclass = "hover";
    },
    respond() {
      this.showres = !this.showres;
    },
    //提交二级评论
    postCommentv2() {
      let obj = {
        c1Id: this.c1Id,           //一级评论id
        comment: this.input,  //评论内容
        udId: this.uId,            //被评论的用户id
      }
      this.$axios({
        url: "/commentLv2/postCommentLv2",
        method: "POST",
        data: JSON.stringify(obj),
      }).then(res => {
          if(res.data.state == 200){
            this.$message.success("评论成功！");
          }
        })
    },
    //点赞
    islike(){
      this.$axios({
        url: "/commentLv1/supportC1/"+this.c1Id,
        method: "GET",
      }).then(res => {
          if(res.data.state == 200){
            if (this.show2) {
              this.show2 = false;
              this.fontclass2 = "hover2";
            }
            this.$message.success("点赞成功！");
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
    /* height: 5em; */
    padding-top: 0.6em;
  }
  .tags .operation {
    height: 2em;
  }
  .tags .resp {
    display: inline-block;
    position: absolute;
    right: 6em;
  }
  .tags .like {
    display: inline-block;
    position: absolute;
    right: 1.5em;
  }
  .tags .postcomment{
    height: 2em;
    margin-bottom: 1em;
  }
  .fa-5x{
    font-size: 16px;
    font-weight: 300;
  }
  /* .hover {
    color: #ee3f4d;
  } */
  .hover2 {
    color: rgb(240, 65, 94);
  }
</style>
