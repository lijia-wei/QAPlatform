<template>
  <div class="myquestions">
    <!-- Start of Header -->
    <mainav />

    <!-- Main Content -->
    <problemList :url="requesturl" :which="1" #default="{ qId }">
      <deletequestion :qId="qId"/>
    </problemList>
    <!-- start of foot -->
    <foot />
  </div>
</template>

<script>
import foot from "@/components/common/foot";
import mainav from "@/components/common/mainav";
import problemList from "@/components/content/problemList";
import deletequestion from "@/components/content/delete";
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
    deletequestion
  },
  methods: {

  },
};
</script>

<style scoped>

</style>

