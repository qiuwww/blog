<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
        <Button v-if="permitIds.includes('dangjian_threelessons_add')" type="primary" icon="md-add" @click="onAdd">新增</Button>
        <Form-item label="党委名称">
          <el-select v-model="searchForm.partyCommitteeId" placeholder="党委名称"  @change='selectComminttee'>
            <el-option v-for="(item, i)  in committees" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </Form-item>
        <Form-item label="支部名称">
          <el-select v-model="searchForm.partyBranchId" placeholder="请选择支部" >
            <el-option  v-for="(item, i)  in branchs" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </Form-item>
        <Form-item label="分类" :label-width="70">
          <el-select v-model="searchForm.partyCategoryId" placeholder="请选择支部" >
            <el-option  v-for="(item, i)  in categorys" :key="item.partyCategoryId" :label="item.partyCategoryName" :value="item.partyCategoryId" />
          </el-select>
        </Form-item>
        <Form-item label="标题" :label-width="70">
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
              <Button v-if="permitIds.includes('dangjian_threelessons_see')" class="btnPrimary" icon="md-eye" @click="showInfoFun(row, index)" />
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button v-if="permitIds.includes('dangjian_threelessons_edit')" class="bianji" @click="editFun(row, index)" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button v-if="permitIds.includes('dangjian_threelessons_delete')" class="btnError" icon="ios-trash" @click="deleteFun(row, index)" />
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
      <edit-threelessons
        :title="modelTitle"
        :type="modelType"
        v-model="modelStatus"
        :categorys="categorys"
        :committees="committees"
        :data="editData"
        @confirmClick="confirmClick"
        @close="closeModel"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThreelessonsList, threelessonsDelete } from '@/api/zhsq/threelessons/index'
import { getPartyCommitteeList, getPartyBranchList } from '@/api/zhsq/partyManage/index'
import EditThreelessons from './editThreelessons/index'
export default {
  name: 'Threelessons',
  components: {
    EditThreelessons
  },
  data: function() {
    return {
      listLoading: true,
      // 查询参数对象
      searchForm: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      // 党委列表
      committees: [],
      // 支部列表
      branchs: [],
      // 分类集合
      categorys: [
        {
          partyCategoryId: '1',
          partyCategoryName: '党小组会'
        }, {
          partyCategoryId: '2',
          partyCategoryName: '支部委员会'
        }, {
          partyCategoryId: '3',
          partyCategoryName: '党支部大会'
        }, {
          partyCategoryId: '4',
          partyCategoryName: '党课'
        }
      ],
      // 新增编辑窗口
      modelStatus: false,
      // 新增编辑窗口标题
      modelTitle: '',
      // 编辑对象
      editData: {},
      // 新增编辑窗口类型
      modelType: 'add',
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
          key: 'topic',
          title: '标题',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'partyCommitteeName',
          title: '党委名称',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'partyBranchName',
          title: '支部名称',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'createTime',
          title: '发布时间',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'partyCategoryName',
          title: '分类',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'lessonsStatus',
          title: '状态',
          align: 'center',
          tooltip: true,
          minWidth: 100,
          render: (h, parms) => {
            var typeName = '未开始'
            if (parms.row.lessonsStatus === 2) {
              typeName = '已结束'
            }
            return h(
              'span', {},
              [typeName]
            )
          }
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
      this.listLoading = true
      const { data } = await getThreelessonsList({
        topic: this.searchForm.title,
        partyBranchId: this.searchForm.partyBranchId,
        partyCommitteeId: this.searchForm.partyCommitteeId,
        partyCategoryId: this.searchForm.partyCategoryId,
        current: this.currentPage,
        size: this.pageSize
      })
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
    },
    // 查询党员分类
    // getPartyCategoryListFun() {
    //  getPartyCategoryList({}).then(res => {
    //   this.categorys = res.data
    //  })
    // },
    // 选择党委
    selectComminttee(id) {
      this.searchForm.partyBranchId = ''
      this.getPartyBranchListFun(id)
    },
    // 获取支部列表
    getPartyBranchListFun(id) {
      getPartyBranchList({
        partyCommitteeId: id || '',
        current: 1,
        size: 100
      }).then(res => {
        this.branchs = [{ id: '0', name: '全部' }].concat(res.data.records)

      })
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
      this.modelTitle = '三会一课——新增'
      this.modelStatus = true
    },
    // 编辑
    editFun(row) {
      this.modelType = 'edit'
      this.editData = row
      this.editData.partyBranchId = '' + this.editData.partyBranchId
      this.editData.partyCommitteeId = '' + this.editData.partyCommitteeId
      this.modelTitle = '三会一课——编辑'
      this.modelStatus = true
    },
    // 查看详情
    showInfoFun(row) {
      this.modelType = 'info'
      this.editData = row
      this.modelTitle = '三会一课——详情'
      this.modelStatus = true
    },
    // 删除
    deleteFun(row) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所点击选的三会一课?',
        loading: true,
        onOk: async() => {
          await threelessonsDelete(row.id)
          this.$Modal.remove()
          this.$Message.success('删除成功')
          this.getListData()
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！')
        }
      })
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
      // this.modelStatus = false
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
  /deep/.el-select, .el-input{
    padding-top: 1px;
  }
  /deep/.el-input--medium .el-input__inner{
    height: 31px;
    line-height: 31px;
  }
  /deep/.el-select .el-input .el-select__caret{
    transform: rotateZ(0deg);
  }
  /deep/.el-icon-arrow-up:before{
    content: "";
    box-sizing: inherit;
  }
  /deep/.el-select .el-input .el-select__caret.is-reverse{
    transform: rotateZ(180deg);
  }
</style>
