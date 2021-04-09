<template>
  <div class="main-content-block">
    <div class="main-content-block-title">
      <router-link to="" @click="toPost(post.qid)">{{ post.title }}</router-link>
    </div>
    <div class="main-content-block-date">问题日期：{{ post.create_time }}</div>
  </div>
</template>

<script>
export default {
  name: "QAmodule",
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
.main-content-block {
  width: auto;
  padding-bottom: 20px;
  border-bottom: rgb(228, 229, 230) solid 2px;
  overflow: hidden;
}

.main-content-block-title {
}

.main-content-block-title a {
  text-decoration: none;
}

.main-content-block-title a:hover {
  color: rgb(136, 191, 104)!important;
}

.main-content-block-title a:active {
  color: rgb(0, 161, 214);
}

.main-content-block-title a:visited {
  color: black;
}

.main-content-block-date {
  font-size: 12px;
}
</style>
