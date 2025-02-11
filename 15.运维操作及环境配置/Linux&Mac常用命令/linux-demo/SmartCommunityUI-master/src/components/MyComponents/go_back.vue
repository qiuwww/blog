<template>
  <el-button @click="handleBack">返回</el-button>
</template>

<script>
export default {
  methods: {
    handleBack() {
      this.$store.dispatch("back/goBack");
    }
  }
};
</script>
<style scoped>
</style>