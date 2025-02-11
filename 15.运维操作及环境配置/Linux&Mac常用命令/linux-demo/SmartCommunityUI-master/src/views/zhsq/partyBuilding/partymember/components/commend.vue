<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <div class="searchWrap">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="时间">
            <el-date-picker
              v-model="searchForm.Time"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeChange"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="getsearchFormData">查询</el-button>
            <el-button type="success" size="mini" @click="onAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <party-table
        :border="true"
        :table-list="tableList"
        :columns="columns"
        :show-sequence-data="true"
        @currentChange="currentChange"
      />
    </div>
    <commend-info
      :data="editData"
      :modal-show="modelStatus"
      :type="modelType"
      :title="modelTitle"
      :party-member-id="id"
      @close="closeModel"
      @confirmClick="confirmClickFun"
    />
  </div>
</template>

<script>
// import PartyTable from '@/components/partyTable'
import { partycommendList, partycommendDelete } from '@/api/zhsq/partymember/index'
import CommendInfo from './commendInfo'
export default {
  name: 'Commend',
  components: { CommendInfo },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      // 时间范围
      timeRange: '',
      listLoading: true,
      // 查询参数对象
      searchForm: {
        startDate: '',
        endDate: ''
      },
      // 新增编辑窗口
      modelStatus: false,
      // 新增编辑窗口标题
      modelTitle: '',
      // 新增编辑窗口类型
      modelType: 'add',
      // 编辑对象
      editData: {},
      // 当前页
      currentPage: 1,
      // 视图数据集合
      tableList: [],
      // 通过表单
      inoutadoptForm: {},
      // 通过弹窗状态
      dialogFormVisible: false,
      // 视图数据表头
      columns: [
        {
          prop: 'title',
          label: '标题'
        },
        {
          prop: 'content',
          label: '表彰内容'
        },
        {
          prop: 'commendDate',
          label: '时间'
        },
        {
          prop: '',
          label: '操作',
          render: (h, parms) => {
            return h('div', {}, [
              h('el-link', { props: { type: 'primary' }, class: 'item', on: { click: () => { this.showInfoFun(parms.row, event) } }}, ['查看']),
              h('el-link', { props: { type: 'primary' }, class: 'item ml10', on: { click: () => { this.editFun(parms.row, event) } }}, ['编辑']),
              h('el-link', { props: { type: 'danger' }, class: 'item ml10', on: { click: () => { this.deleteFun(parms.row, event) } }}, ['删除'])
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.getListData()
  },
  methods: {
  //  获取表格数据
    async getListData() {
      const { data } = await partycommendList({
        partyMemberId: this.id,
        startDate: this.searchForm.startDate,
        endDate: this.searchForm.endDate,
        current: this.currentPage,
        size: 6
      })
      this.tableList = data
      this.listLoading = false
    },
    // 重置查询
    resetSearch() {
      this.searchForm = {}
      this.currentPage = 1
      this.getListData()
    },
    // 新增
    onAdd() {
      this.modelType = 'add'
      this.modelTitle = '党员表彰—新增'
      this.modelStatus = true
    },
    // 编辑
    editFun(row) {
      this.modelType = 'edit'
      this.editData = row
      this.modelTitle = '党员表彰——编辑'
      this.modelStatus = true
    },
    // 查看详情
    showInfoFun(row) {
      this.modelType = 'info'
      this.editData = row
      this.modelTitle = '党员表彰——详情'
      this.modelStatus = true
    },
    // 搜索查询
    getsearchFormData() {
      this.currentPage = 1
      this.getListData()
    },
    // 弹窗关闭时间
    closeModel() {
      this.modelStatus = false
    },
    // 弹窗确认
    confirmClickFun() {
      this.modelStatus = false
      this.getListData()
    },
    // 分页
    currentChange(page) {
      this.currentPage = page
      this.getListData()
    },
    // 时间范围选择
    timeChange() {
      if (this.searchForm.Time) {
        this.searchForm.startDate = this.searchForm.Time[0]
        this.searchForm.endDate = this.searchForm.Time[1]
      } else {
        this.searchForm.startDate = ''
        this.searchForm.endDate = ''
      }
    },
    // 删除
    deleteFun(row) {
      this.$confirm('是否移除该党员表彰?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(async() => {
        await partycommendDelete(row.id)
        this.getListData()
      })
    }
  }
}
</script>

<style scoped>

</style>
