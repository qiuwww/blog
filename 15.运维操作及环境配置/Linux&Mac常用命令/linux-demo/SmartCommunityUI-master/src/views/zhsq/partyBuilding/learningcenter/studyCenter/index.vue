<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
        <Button v-if="permitIds.includes('dangjian_study_center_add')" type="primary" icon="md-add" @click="onAdd">新增</Button>
        <Form-item label="标题" :label-width="80">
          <Input v-model="searchForm.title" search enter-button placeholder="标题" @on-search="getsearchFormData" />
        </Form-item>
        <Form-item class="br" :label-width="40">
          <!--            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>-->
          <Button @click="resetSearch">重置查询</Button>
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
              <Button v-if="permitIds.includes('dangjian_study_center_see')" class="btnPrimary" icon="md-eye" @click="showInfoFun(row, index)" />
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button v-if="permitIds.includes('dangjian_study_center_edit')" class="bianji" @click="editFun(row, index)" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button v-if="permitIds.includes('dangjian_study_center_delete')" class="btnError" icon="ios-trash" @click="deleteFun(row, index)" />
            </Tooltip>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page
          :current="currentPage"
          :total="total"
          :page-size="pageSize"
          :page-size-opts="[10,20,50,100]"
          size="small"
          show-total
          show-elevator
          show-sizer
          :transfer="true"
          @on-change="currentChange"
          @on-page-size-change="changePageSize"
        />
      </Row>
      <edit-study-center
        :title="modelTitle"
        :type="modelType"
        :data="editData"
        v-model="modelStatus"
        @close="closeModel"
        @confirmClick="confirmClick"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getLearningcenterList,
  learningCenterDelete
} from '@/api/zhsq/learningCenter/index'
import EditStudyCenter from './editStudyCenter/index'
import { partymemberDelete } from '@/api/zhsq/partymember'
export default {
  name: 'StudyCenter',
  components: {
    EditStudyCenter
  },
  data: function() {
    return {
      listLoading: true,
      // 查询参数对象
      searchForm: {},
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
      pageSize: 10,
      // 总条数
      total: 0,
      // 视图数据集合
      tableList: [],
      // 视图数据表头
      columns: [
        {
          key: 'title',
          title: '标题',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'createTime',
          title: '日期',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'remark',
          title: '备注',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 220
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['permitIds'])
  },
  created() {
    this.getListData()
  },
  methods: {
  //  获取表格数据
    async getListData() {
      this.listLoading = true
      const { data } = await getLearningcenterList({
        title: this.searchForm.title,
        current: this.currentPage,
        size: 10
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
      this.modelTitle = '学习中心——新增'
      this.modelStatus = true
    },
    // 编辑
    editFun(row) {
      this.modelType = 'edit'
      this.editData = row
      this.modelTitle = '学习中心——编辑'
      this.modelStatus = true
    },
    // 删除
    deleteFun(row) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所点击选的学习中心?',
        loading: true,
        onOk: async() => {
          await learningCenterDelete(row.id)
          this.$Modal.remove()
          this.$Message.success('删除成功')
          this.getListData()
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！')
        }
      })
    },
    // 查看详情
    showInfoFun(row) {
      this.modelType = 'info'
      this.editData = row
      this.modelTitle = '学习中心——详情'
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
    confirmClick() {
      this.currentPage = 1
      this.searchForm = {}
      this.getListData()
    },
    // 分页
    currentChange(page) {
      this.currentPage = page
      this.getListData()
    },
    // 改变每页显示数据的条数
    changePageSize(v) {
      this.pageSize = v
      this.getListData()
    }
  }
}
</script>

<style scoped>
  /deep/ .ivu-form-item-content{
    margin-right:  0 !important;
  }
</style>
