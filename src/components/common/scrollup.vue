<template>
  <div id="app">
     <div class="content">
       <div class="backtop"></div>
       <el-backtop target=".content .backtop"></el-backtop>
     </div>
  </div>
</template>  

<script>
export default {
  name: "scrollup"
}
</script>

<style>
html,body {
  height: 100%;
}
#app {
 height: 100%;
}
.content {
   height: 100%;
} 
.backtop {
    overflow: scroll;
    height: 100%;
} 
</style>

