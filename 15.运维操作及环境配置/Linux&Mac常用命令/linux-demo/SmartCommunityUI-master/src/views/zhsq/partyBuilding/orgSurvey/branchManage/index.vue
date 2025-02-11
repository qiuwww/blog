<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <Form ref="searchForm" :model="searchForm" inline on-submit="return false" :label-width="110">
        <Button v-if="permitIds.includes('dangjian_organize_branch_add')" type="primary" icon="md-add" @click="onAdd">新增</Button>
        <Form-item label="所属党委">
          <el-select v-model="searchForm.partyCommitteeId" placeholder="请选择街道">
            <el-option v-for="(item, i)  in committees" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </Form-item>
        <Form-item label="组织名" :label-width="90">
          <Input v-model="searchForm.name" placeholder="组织名" />
        </Form-item>
        <Form-item label="书记" :label-width="70">
          <Input v-model="searchForm.secretary" placeholder="书记" />
        </Form-item>
        <Form-item label="电话" :label-width="70">
          <Input v-model="searchForm.phoneNumber" search enter-button placeholder="电话" @on-search="getsearchFormData" />
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
          :loading="loading"
          stripe
          :columns="columns"
          sortable="custom"
          :data="tableList"
        >
          <template slot="action" slot-scope="{ row, index }">
            <Tooltip content="查看详情" placement="top">
              <Button v-if="permitIds.includes('dangjian_organize_branch_see')" class="btnPrimary" icon="md-eye" @click="showInfoFun(row, index)" />
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button v-if="permitIds.includes('dangjian_organize_branch_edit')" class="bianji" @click="editFun(row, index)" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button v-if="permitIds.includes('dangjian_organize_branch_delete')" class="btnError" icon="ios-trash" @click="deleteFun(row, index)" />
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
      <edit-branch-manage
        :title="modelTitle"
        :type="modelType"
        :data="editData"
        :committees="committees"
        :modal-show="modelStatus"
        @confirmClick="confirmClick"
        @close="closeModel"
      />
    </div>
  </div>
</template>

<script>
import {
  getPartyBranchList,
  getPartyBranchDelete,
  getPartyCommitteeList
} from '@/api/zhsq/partyManage/index'
import EditBranchManage from './editBranchManage'
import { mapGetters } from 'vuex'
export default {
  name: 'BranchManage',
  components: {
    EditBranchManage
  },
  data: function() {
    return {
      // 查询参数对象
      searchForm: {},
      // 新增编辑窗口
      modelStatus: false,
      // 新增编辑窗口标题
      modelTitle: '',
      // 新增编辑窗口类型
      modelType: 'add',
      // 党委
      committees: [],
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 编辑对象
      editData: {},
      loading: true, // 表单加载状态
      // 视图数据集合
      tableList: [],
      // 视图数据表头
      columns: [
        {
          key: 'name',
          title: '组织名称',
          sortable: false,
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'partyCommitteeName',
          title: '所属党委',
          sortable: false,
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'secretary',
          title: '书记',
          sortable: false,
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'gender',
          title: '性别',
          sortable: false,
          align: 'center',
          tooltip: true,
          minWidth: 70,
          render: (h, parms) => {
            var typeName = '男'
            if (parms.row.gender === 2) {
              typeName = '女'
            }
            return h(
              'span', {},
              [typeName]
            )
          }
        },
        {
          key: 'phoneNumber',
          title: '电话',
          sortable: false,
          align: 'center',
          tooltip: true,
          minWidth: 100,
          render: (h, params) => {
            let reg = /^(.{3}).*(.{4})$/
            let number =  params.row.phoneNumber.replace(reg,'$1****$2')
            return h("Tooltip", {
              props: {
                content: number,
                placement: 'bottom',
                transfer: true
              }
            }, number)
          }
        },
        {
          key: 'address',
          title: '地址',
          sortable: false,
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
    this.getPartyCommitteeListFun()
  },
  methods: {
  //  获取表格数据
    async getListData() {
      this.loading = true
      const { data } = await getPartyBranchList({
        name: this.searchForm.name,
        partyCommitteeId: this.searchForm.partyCommitteeId,
        secretary: this.searchForm.secretary,
        phoneNumber: this.searchForm.phoneNumber,
        current: this.currentPage,
        size: this.pageSize
      })
      this.loading = false
      this.tableList = data.records
      this.currentPage = parseInt(data.current)
      this.total = parseInt(data.total)
      this.listLoading = false
    },
    // 获取党委列表
    getPartyCommitteeListFun() {
      getPartyCommitteeList({
        name: '',
        jurisdictionId: '',
        secretary: '',
        phoneNumber: '',
        current: 1,
        size: 100
      }).then(res => {
        this.committees = res.data.records
      })
      //
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
      this.modelTitle = '支部管理——新增'
      this.modelStatus = true
    },
    // 编辑
    editFun(row) {
      this.modelType = 'edit'
      this.editData = row
      this.editData.partyCommitteeId = '' + this.editData.partyCommitteeId
      this.modelTitle = '支部管理——编辑'
      this.modelStatus = true
    },
    // 删除
    deleteFun(row) {
      // this.$confirm('是否移除该支部?', '提示', {
      //   confirmButtonText: '删除',
      //   cancelButtonText: '取消',
      //   type: 'danger'
      // }).then(async() => {
      //   await getPartyBranchDelete(row.id)
      //   this.getListData()
      // })
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所点击选的支部?',
        loading: true,
        onOk: async() => {
          await getPartyBranchDelete(row.id)
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
      this.modelTitle = '支部管理——详情'
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
    // 弹窗确认事件
    confirmClick() {
      this.modelStatus = false
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
  /deep/.el-select .el-input .el-select__caret{
    transform: rotateZ(0deg);
  }
  /deep/.el-icon-arrow-up:before{
    content: "";
    box-sizing: inherit;
  }
  /deep/.el-select > .el-input{
    padding-top: 1px;
  }
  /deep/.el-select .el-input .el-select__caret.is-reverse{
    transform: rotateZ(180deg);
  }
  /deep/ .ivu-form-item-content{
    margin-right:  0 !important;
  }
  /deep/.el-input--medium .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
</style>
