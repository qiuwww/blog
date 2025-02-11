<template>
  <div>
    <div class="position" >
      <el-select  clearable v-model="thepic" class="selectInputNone" :style="widthAndHeight">
            <div class="select_img_imgDiv">
      <img :src="thepic" alt="" :style="ImgWidthAndHeight"/>
    </div>
        <el-option v-for="(pic, index) in picArr" :key="index" :value="pic" :style="ImgWidthAndHeight">
          <img :src="pic" alt="" :style="ImgWidthAndHeight" />
        </el-option>
      </el-select>
    </div>
    <!-- <div class="select_img_imgDiv">
      <img :src="thepic" alt="" :style="ImgWidthAndHeight"/>
    </div> -->
    <!-- <div class="el-input el-input--small el-input--suffix">
        <img :src="thepic" alt="" :style="ImgWidthAndHeight" />
        <span class="el-input__suffix">
            <span class="el-input__suffix-inner">
                <i class="el-select__caret el-input__icon el-icon-arrow-up"> </i>
            </span>
        </span>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["picArr", "ImgWidthAndHeight", "widthAndHeight"],
  data() {
    return {
      thepic: ""
    };
  }
};
</script>

<style lang="less" scoped>


.position {
  position: relative;
}
.select_img_imgDiv {
  position: absolute;
  left: 0;
  top: 50%;
  margin: 10px;
  transition: -50%;
}
.selectInputNone{
    .el-input{
       input{
           display: none;
       }
    }
}
</style>
