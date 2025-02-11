<template>
  <el-row class="app-warp">
    <el-row class="headerbox">
      <span class="label">
        所属网格
      </span>
      <span>
        <Grid @grid="handleGetGridId" />
      </span>
    </el-row>
    <el-col :span="22">
      <el-table
        :header-cell-style="{
          'font-size': '13px',
          'font-weight': 'bold',
          'color':'#000000'

        }"
        stripe
        :data="tableData"
        class="tablebox"
        style="width: 100%"
      >
        <el-table-column prop="name" label="任务类型" />
        <el-table-column prop="beReceived" label="待接收" />
        <el-table-column prop="todo" label="待处理" />
        <el-table-column prop="dispatch" label="待派遣" />
        <el-table-column prop="toExamine" label="待审核" />
        <el-table-column prop="toEnd" label="待结束" />
        <el-table-column prop="toEvaluate" label="待评价" />
        <el-table-column prop="isEnd" label="已结束" />
        <el-table-column prop="twoExamine" label="待复核" />
        <div slot="empty"  class="sqt">
          <!-- 暂无数据图-->
          <p><img src="../../../../assets/imgs/qsy.png"></p>
        </div>
      </el-table>
    </el-col>
  </el-row>
</template

<script>
import { eventsMap } from '@/api/events'
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
    this.handleGetTable('')
  },
  methods: {
    handleGetGridId(val) {
      this.gridId = val
      if (val) {
        this.handleGetTable(this.gridId)
      }
    },
    async handleGetTable(gridId) {
      const { data } = await eventsMap({ gridId })
      this.tableData = data
    }

  }
}
</script>

<style lang="scss" scoped>
  .headerbox{
    margin: 38px 0 0 0 ;
  }
  .tablebox{
    margin:20px 80px 32px 80px ;
	border-top: 2px solid #e8e8ea;
  }
	/* .tablebox ::v-deep .cell{
		font-size: 14px;
		font-weight: bold;
		color: #000000;
	} */
</style>
