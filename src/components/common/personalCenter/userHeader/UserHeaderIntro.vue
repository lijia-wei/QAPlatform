<template>
  <div class="header-intro">
    <slot name="id"></slot>
    <slot name="introduction"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UserHeaderIntro',
};
</script>

<style>
</style>