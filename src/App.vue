<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
    <a href="#app">
      <div class="el-backtop" style="right: 40px; bottom: 40px;">
        <i class="el-icon-caret-top"></i>
      </div>
    </a>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    },
  }
}
</script>

<style>
.el-backtop {
  background-color: #CFCACA;
}
</style>
