<template>
  <div class="main-content-container">
    <user-navigation></user-navigation>
    <user-space></user-space>
  </div>
</template>

<script>
import UserNavigation from "@/components/common/personalCenter/userContent/UserNavigation"
import UserSpace from "@/components/common/personalCenter/userContent/UserSpace"
export default {
  name: 'UserContent',
  components: {
    UserNavigation,
    UserSpace
  }
}
</script>

<style>

</style>