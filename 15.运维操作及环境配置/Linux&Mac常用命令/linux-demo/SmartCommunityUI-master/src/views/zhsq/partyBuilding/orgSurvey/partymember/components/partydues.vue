<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <Form ref="searchForm" :model="searchForm" inline label-position="left" on-submit="return false">
        <Button type="primary" icon="md-add" @click="onAdd">新增</Button>
        <Form-item label="姓名" :label-width="40">
          <el-date-picker
            v-model="searchForm.Time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </Form-item>
        <Form-item class="br" :label-width="10">
          <Button type="primary" icon="ios-search" @click="getsearchFormData">搜索</Button>
        </Form-item>
      </Form>
    </div>
    <div>
      <Row>
        <Table
          ref="table"
          :loading="listLoading"
          stripe
          :columns="columns"
          sortable="custom"
          :data="tableList"
        >
          <template slot="action" slot-scope="{ row, index }">
            <Tooltip content="查看详情" placement="top">
              <Button class="btnPrimary" icon="md-eye" @click="showInfoFun(row, index)" />
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button class="bianji" @click="editFun(row, index)" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="deleteFun(row, index)" />
            </Tooltip>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page
          :current="currentPage"
          :total="total"
          :page-size="pageSize"
          size="small"
          show-total
          show-elevator
          :transfer="true"
          @on-change="currentChange"
        />
      </Row>
    </div>
    <partydues-info
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
import { partyduesList, partyduesDelete } from '@/api/zhsq/partymember/index'
import PartyduesInfo from './partyduesInfo'
export default {
  name: 'Partydues',
  components: { PartyduesInfo },
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
      // 每页条数
      pageSize: 6,
      // 总条数
      total: 0,
      // 视图数据集合
      tableList: [],
      // 通过表单
      inoutadoptForm: {},
      // 通过弹窗状态
      dialogFormVisible: false,
      // 视图数据表头
      columns: [
        {
          key: 'payDate',
          title: '缴纳日期',
          align: 'center',
          tooltip: true,
          minWidth: 100,
          render: (h, parms) => {
            var _item = /\d{4}-\d{1,2}-\d{1,2}/g.exec(parms.row.payDate)
            return h(
              'span', {},
              [_item]
            )
          }
        },
        {
          key: 'amount',
          title: '金额',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'remark',
          title: '备注',
          align: 'center',
          tooltip: true,
          minWidth: 140
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 180
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
      this.listLoading = true
      const { data } = await partyduesList({
        partyMemberId: this.id,
        startDate: this.searchForm.startDate,
        endDate: this.searchForm.endDate,
        current: this.currentPage,
        size: 6
      })
      this.tableList = data.records
      this.currentPage = parseInt(data.current)
      this.total = parseInt(data.total)
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
      this.modelTitle = '党费缴纳—新增'
      this.modelStatus = true
    },
    // 编辑
    editFun(row) {
      this.modelType = 'edit'
      this.editData = row
      this.modelTitle = '党费缴纳——编辑'
      this.modelStatus = true
    },
    //  删除
    deleteFun(row) {
      this.$confirm('是否移除该党费缴纳?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(async() => {
        await partyduesDelete(row.id)
        this.getListData()
      })
    },
    // 查看详情
    showInfoFun(row) {
      this.modelType = 'info'
      this.editData = row
      this.modelTitle = '党费缴纳——详情'
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
        this.getListData()
      }
    }
  }
}
</script>

<style scoped>

</style>
