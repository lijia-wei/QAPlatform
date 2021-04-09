<template>
  <div class="header-container">
      <div class="header-portrait">
        <img
          src="https://himg.bdimg.com/sys/portrait/item/wise.1.71904824.kt8ObgK_NDRQ35RRlWapaA.jpg?time=3044"
        />
        <a href="">更改头像</a>
      </div>

      <user-header-intro>
        <div class="header-intro-ID" slot="id">{{ user.username }}</div>
        <div class="header-intro-introduction" slot="introduction">
          世界如此美好，我却如此浮躁，这样不好，这样不好。
        </div>
        <user-intro-item url="/index">
          <div class="header-intro-achivement-count" slot="count">88</div>
          <div class="header-intro-achivement-title" slot="title">关注</div>
        </user-intro-item>
        <user-intro-item url="/index">
          <div class="header-intro-achivement-count" slot="count">88</div>
          <div class="header-intro-achivement-title" slot="title">粉丝</div>
        </user-intro-item>
        <user-intro-item url="/index">
          <div class="header-intro-achivement-count" slot="count">88</div>
          <div class="header-intro-achivement-title" slot="title">收藏</div>
        </user-intro-item>
        <user-intro-item url="/index">
          <div class="header-intro-achivement-count" slot="count">88</div>
          <div class="header-intro-achivement-title" slot="title">获赞</div>
        </user-intro-item>
      </user-header-intro>
    </div>
</template>

<script>
import UserHeaderIntro from "@/components/common/personalCenter/userHeader/UserHeaderIntro";
import UserIntroItem from "@/components/common/personalCenter/userHeader/UserIntroItem";
export default {
  name: 'UserHeader',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  components: {
    UserHeaderIntro,
    UserIntroItem
  }
}
</script>

<style>

</style>