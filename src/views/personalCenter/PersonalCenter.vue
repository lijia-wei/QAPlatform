<template>
  <div class="container">
    <user-header></user-header>

    <div class="main-content-container"></div>
  </div>
</template>

<script>
import UserHeader from "./childCom/UserHeader"
import "@/assets/css/personal/user.css";
export default {
  name: "Personal",
  components: {
    UserHeader
  }
};
</script>

<style>
</style>