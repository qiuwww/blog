<template>
  <el-dialog
    v-if="isShow"
    v-dialogDrag
    v-loading="loading"
    center
    title="历史记录"
    width="1060px"
    :before-close="close"
    :visible.sync="isShow"
  >
    <div>
      <span>
        <i class="label"> 完成时间</i>
        <el-date-picker
          v-model="createFrom"
          align="right"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
        />
        至
        <el-date-picker
          v-model="createTo"
          align="right"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
        />
      </span>
      <span><Search :placeholder="placeholder" @update="handleUpdate" />
      </span>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" />
      <el-table-column prop="code" label="任务单号" />
      <el-table-column prop="createDate" label="完成时间" />
      <el-table-column prop="userInFo" label="执行人" />
      <el-table-column prop="evaluationStarLevel" label="工单打分" />
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <el-button class="chakan" @click="handleHistory(scope.row.id)">详情</el-button></template>
      </el-table-column>
    </el-table>
    <Pagination
     :page-total="pageTotal"
      option
      @paginationChange="handleUpdate"
    />
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import Pagination from '@/components/Pagination'
import Search from '@/components/Search'
import { mapGetters } from 'vuex'
import { teskExamineHistory } from '@/api/engineering'

export default {
  data() {
    return {
      createFrom: '',
      createTo: '',
      pageTotal: 0,
      tableData: [],
      placeholder: '请输入执行人',
      alSelect: []
    }
  },
  computed: {
    ...mapGetters(['pageSize', 'pageNum', 'queryStr', 'permitIds', 'loading']),

    isShow() {
      if (this.detailDialog) {
        this.getTaskHistory()
      }
      return this.detailDialog
    }
  },
  methods: {
    handleHistory(id) {
      this.$router.push({
        name: 'taskDetail',
        query: { id }
      })
      this.$router.go(0)
    },
    handleUpdate() {},
    close() {
      this.$emit('close')
    },
    handleSelectionChange(val) {
      this.alSelect = val
    },
    async getTaskHistory() {
      const o = await teskExamineHistory({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        gridId: sessionStorage.getItem('gridId'),
        masterId: this.$route.query.id,
        createDateFrom: this.createFrom,
        createDateTo: this.createTo,
        queryStr: this.queryStr
      })
      this.tableData = o.data.records
      this.pageTotal = o.data.total
    }
  },
  components: {
    Pagination,
    Search
  },
  props: ['detailDialog']
}
</script>

<style scoped></style>
