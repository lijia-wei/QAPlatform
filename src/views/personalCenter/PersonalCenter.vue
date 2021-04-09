<template>
  <div class="container">
    <user-header></user-header>
    <user-content></user-content>
  </div>
</template>

<script>
import UserHeader from "./childCom/UserHeader"
import "@/assets/css/personal/user.css"
import UserContent from './childCom/UserContent.vue'
export default {
  name: "Personal",
  components: {
    UserHeader,
    UserContent
  }
};
</script>

<style>
</style>