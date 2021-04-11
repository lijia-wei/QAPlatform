<template>
  <div class="pro-list">
    <!-- //内容 -->
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="titlename" name="1">
        <div>{{contents}}</div>
      </el-collapse-item>
      <el-collapse-item :title="titlename" name="2">
        <div>{{contents}}</div>
      </el-collapse-item>
    </el-collapse>
    <!-- 分页栏 -->
    <pagebar/>
  </div>
</template>

<script>
  import pagebar from "@/components/content/pagebar";
  export default {
    name: "problemList",
    data() {
      return {
        titlename: "标题",
        contents: "我是内容",
        activeNames: ['1'],
      }
    },
    components: {
      pagebar,
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped>

</style>