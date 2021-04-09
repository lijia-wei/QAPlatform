<template>
    <router-link :to="url" class="header-intro-achivement">
      <slot name="count"></slot>
      <slot name="title"></slot>
    </router-link>
</template>

<script>
export default {
  name: "UserIntroItem",
  props: {
    url: ''
  }
};
</script>

<style>
</style>