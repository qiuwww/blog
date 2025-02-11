<!--搜索与重置-->
<template>
  <span>
    <el-button class="ivu-btn ivu-btn-primary" size="mini" type="button" icon="el-icon-search" @click="crud.toQuery">搜索</el-button>
    <el-button class="ivu-btn ivu-btn-default" size="mini" type="button" icon="el-icon-refresh-left" @click="crud.resetQuery()">重置</el-button>
  </span>
</template>
<script>
export default {
  props: {
    crud: {
      type: Object,
      required: true
    },
    itemClass: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
