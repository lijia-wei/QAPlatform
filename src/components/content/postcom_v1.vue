<template>
  <div class="postcomment">
    <el-input v-model="input" placeholder="在线评论"></el-input>
    <input class="post-btn" type="button" @click="postComment()" value="评论" />
  </div>
</template>

<script>
export default {
  name: "postcomment",
  props: {
    qId: {
      type: Number,
      default: -1,
    },
  },
  data(){
    return {
      input: '',
    }
  },
  methods: {
    //提交一级评论
      postComment() {
        if(this.$store.state.user.islogin) {
          let obj = {
            comment: this.input,
            qId: this.qId,
          }
          this.$axios({
            url: "/commentLv1/postCommentLv1",
            method: "POST",
            data: JSON.stringify(obj),
          }).then(res => {
              if(res.data.state == 200){
                this.$message.success("评论成功！");
              }
            })
        }
      },
  }
}
</script>

<style>

</style>