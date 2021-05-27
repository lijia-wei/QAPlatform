<template>
  <div class="caredperson">
    <el-tag
      v-for="tag in tags"
      :key="tag.petName"
      closable
      :type="tag.type">

      <el-row class="demo-avatar demo-basic">
          <el-col :span="12">
            <div class="demo-basic--circle">
              <div class="block"><el-avatar :size="60" ><img :src="testsrc[tag.id]"></el-avatar></div>
            </div>
          </el-col>  
      </el-row>
      {{tag.petName}}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: "caredperson",
  data() {
    return {
      tags: [],
      imgsrc: [],
      testsrc: [],
    }
  },
  props: {
    type: {
      type: Number,
    }
  },
  methods: {
    showfans() {
      let params = {
        current: 1,
        limit: 10,
        type: this.type,
        uId: this.$store.state.user.userInfo.id
      }
      this.$axios({
        url: "/care/select",
        method: "POST",
        data: JSON.stringify(params),
      }).then((res) => {
        let data = res.data.data.data;
          if(res.data.state == 200){
            this.tags = res.data.data.data;
            
            for(let i=0; i<this.tags.length; i++){
              this.$axios({
                url: "/headPicture/getHeadPicture/"+ this.tags[i].id,
                method: "POST",
              }).then((res) => {
                if(res.data.state == 200){
                  this.imgsrc[this.tags[i].id] = res.data.data.data;
                }
              })
           }
          }
          else if(res.data.state == 403){
            this.loading = false;
          }
          setInterval(()=>{
            this.testsrc = this.imgsrc;
          },800);
      })
    }
  },
  mounted(){
    this.showfans();
  },
}
</script>

<style>
  .el-tag {
    height: 105px;
    margin: 1em;
    border-color: #cae3fc;
    border-width: 1px;
    font-size:14px;
  }
</style>