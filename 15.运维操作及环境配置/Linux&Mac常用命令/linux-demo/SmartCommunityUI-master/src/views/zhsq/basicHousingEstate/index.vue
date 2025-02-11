<template>
  <el-tabs style="margin-top: 5px;" value="name1" class="elTabsGrid">
    <el-tab-pane label="小区档案" name="name1">
      <basic-housing-estate-list />
    </el-tab-pane>
    <el-tab-pane label="楼栋档案" name="name2">
      <t-building-archives-list />
    </el-tab-pane>
    <el-tab-pane label="实有房屋管理" name="name3">
      <basicHouseManageList />
    </el-tab-pane>
    <el-tab-pane label="房屋结构图" name="name4">
      <house-structure />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import basicHousingEstateList from './basicHousingEstateList'
  import tBuildingArchivesList from '../tBuildingArchives/tBuildingArchivesList'
  import basicHouseManageList from '../basicHouseManage/basicHouseManageList'
  import houseStructure from '../houseStructure/index'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      basicHousingEstateList, tBuildingArchivesList, basicHouseManageList,houseStructure
    },
    computed: {
      ...mapGetters(['permitIds'])
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {}
  }
</script>
<style lang="less">
  .elTabsGrid{
    .el-tabs__item {
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      padding-left: 20px !important;
    }
  }

</style>
