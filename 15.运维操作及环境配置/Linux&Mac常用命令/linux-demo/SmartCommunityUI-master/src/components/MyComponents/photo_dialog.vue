<template>
  <div class="mask" v-if="isShowPic">
    <div class="show-pic">

      <img :src="showPic" alt    />
    </div>
    <el-button type="button" @click="handleShowPic" class="close-show-pic">
      <i class="el-icon-close"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Photo_dialog",
  methods: {
    handleShowPic() {
      this.$emit("showPic");
    }
  },
  props: ["showPic", "isShowPic"]
};
</script>

<style scoped>

img{  
  display: inline-block;
    width: auto;  
    height: auto;  
    max-width: 100%;  
    max-height: 100%;     
} 
</style>