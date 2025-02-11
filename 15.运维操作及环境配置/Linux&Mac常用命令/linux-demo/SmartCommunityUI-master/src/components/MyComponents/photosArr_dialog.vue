<template>
  <div v-if="isShowPic" class="mask">
    <div class="show-pic maximgSize">
      <img :src="firstPic" alt>
    </div>
    <div class="flexDiv">
      <div class="fex1 m10">
        <img v-for="(everyPic, index) in picArr" :src="everyPic" alt width="150" height="100" class="m10" @click="imgClick(index)">
      </div>
    </div>
    <el-button type="button" class="close-show-pic" @click="handleShowPic">
      <i class="el-icon-close" />
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'PhotoDialog',
  props: ['showPicArr', 'isShowPic'],
  data() {
    return {
      firstPic: '',
      picArr: []
    }
  },
  watch: {
    isShowPic(n, o) {
      if (n) {
        this.picArr = this.showPicArr.split(',')
        this.firstPic = this.picArr.shift()
      } else {
        this.firstPic = ''
        this.picArr = []
      }
    }
  },
  created() {

  },
  methods: {
    handleShowPic() {
      this.$emit('showPic')
    },
    imgClick(index) {
      this.picArr.push(this.firstPic)
      this.firstPic = this.picArr[index]
      this.picArr.splice(index, 1)
    }
  }
}
</script>

<style scoped></style>
