<template>
  <div class="taskStatistics">
  <el-row class="app-warp">
    <el-row class="rowone">
      <span class="label">
        所属网格
      </span>
      <span>
        <Grid @grid="handleGetGridId" />
      </span>
    </el-row>
    <el-col :span="22" class="tablebox">
      <el-table
        :header-cell-style="{
          'font-size': '13px',
          'font-weight': 'bold',
          'color':'#000000'

        }"
        stripe
        :data="tableData"
        style="width: 100%;margin-left: 38px;"
      >
        <el-table-column prop="name" label="任务类型" />
        <el-table-column prop="totalCount" label="全部任务" />
        <el-table-column prop="distribute" label="待派单" />
        <!--       <el-table-column prop="name" label="待派遣" />-->
        <el-table-column prop="beReceived" label="待接单" />
        <el-table-column prop="doing" label="处理中" />
        <el-table-column prop="beVerified" label="待核查" />
        <el-table-column prop="isComplete" label="已完成" />
        <el-table-column prop="toReject" label="已驳回" />
        <el-table-column prop="invalid" label="标记无效" />
        <div slot="empty"  class="sqt">
          <p><img src="../../../../assets/imgs/qsy.png"></p>
        </div>
      </el-table>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import { getTaskMap } from '@/api/engineering'
import Grid from '@/components/Ascription/gridSelect'
export default {
  components: {
    Grid
  },
  data() {
    return {
      tableData: [],
      gridId: ''
    }
  },
  created() {
    this.handleGetTable()
  },
  methods: {
    handleGetGridId(val) {
      this.gridId = val
      if (val) {
        this.handleGetTable(this.gridId)
      }
    },
    async handleGetTable(gridId) {
      const { data } = await getTaskMap({
        gridId
      })
      this.tableData = data
    }

  }
}
</script>

<style lang="scss" scoped>
  .taskStatistics{
    .tablebox{
      margin-left:0 20px 0 0;

    }
    .rowone{
      margin-top: 32px;
      margin-bottom: 20px;
      margin-left: -60px;
    }
    /* .tablebox ::v-deep .cell{
      font-size: 15px;
      font-weight: bold;
      color: #000000;
    } */
  }


</style>
