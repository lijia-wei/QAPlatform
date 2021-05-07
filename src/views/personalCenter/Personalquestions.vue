<template>
  <div class="myquestions">
    <!-- Start of Header -->
    <mainav />

    <!-- Main Content -->
    <problemList :url="requesturl" :which="1" />

    <!-- start of foot -->
    <foot />
  </div>
</template>

<script>
import foot from "@/components/content/foot";
import mainav from "@/components/content/mainav";
import problemList from "@/components/content/problemList";
export default {
  name: "myquestions",
  data() {
    return {
      requesturl:
        "/question/getQuestionByUid/" + this.$store.state.user.userInfo.id,
    };
  },
  components: {
    foot,
    mainav,
    problemList,
  },
  methods: {},
};
</script>

<style scoped>
</style>