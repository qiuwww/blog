<template>
  <div :class="{ grid: true, Ch:vOrh }">
   
    <div class="mb10">
      <span class="label"> 所属社区： </span>
      <span class="bold"> 
        <el-tag type="info"> {{ userObj.communityName ? userObj.communityName :'所有社区' }}</el-tag>
      </span>
    </div>
    <div class="mb10">
      <span class="label"> 所属网格： </span>
      <Grid :communityId="+communityId" @grid="handleGrid" class="el-form-item__content" />
    </div>
  </div>
</template>

<script>
import Grid from "./gridSelect";
import Street from "./streetSelecr";
import Community from "./communitySelect";
// 获取 社区 id 下的 网格 communityId

export default {
  data() {
    return {
      streetId: 0,
      communityId:JSON.parse(sessionStorage.getItem('UserObj')).communityId,
      gridId: 0,
      userObj:JSON.parse(sessionStorage.getItem('UserObj')),
    };
  },
  watch: {
    gridId(n, o) {
      this.handlePush();
    }
  },
  mounted(){
    this.handlePush();
  },
  props: {
    vOrh: {
      // false 横向排列  true 纵向排列
      required: false,
      type: Boolean,
      default: () => {
        return false;
      }
    },

  },
  methods: {
    handleGrid(val) {
      this.gridId = val;
    },
    handlePush() {
      this.$emit("push", this.gridId);
    }
  },
  components: {
    Grid,
    Street,
    Community
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
  justify-content: left;
}
.Ch {
  justify-content: space-between;
  flex-direction: column;
}
.label{ 
  font-weight: 700;
  width: 110px;
  text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
