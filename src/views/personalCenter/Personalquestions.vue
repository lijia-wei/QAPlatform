<template>
  <div class="myquestions">
    <!-- Start of Header -->
    <mainav/>
   
    <!-- Main Content -->
    <div class="main">
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="用户管理">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>

    <!-- start of foot -->
    <foot/>
  </div>
</template>

<script>
import foot from "@/components/content/foot";
import mainav from "@/components/content/mainav";
import problemList from "@/components/content/problemList"
export default {
  name: "myquestions",
  data() {
    return {
       tabPosition: 'left',
    }
  },
  components: {
    foot,
    mainav,
    problemList,
  },

}
</script>

<style>

</style>