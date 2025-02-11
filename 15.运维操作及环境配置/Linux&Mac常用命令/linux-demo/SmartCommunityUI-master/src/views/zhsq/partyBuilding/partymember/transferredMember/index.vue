<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <div class="searchWrap">
        <el-form :inline="true" :model="searchForm" :label-width="'80px'">
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" placeholder="姓名" style="width: 178px" @keyup.enter.native="getsearchFormData" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="searchForm.phoneNumber" placeholder="电话" style="width: 178px" @keyup.enter.native="getsearchFormData" />
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="searchForm.idCardNo" placeholder="身份证" style="width: 178px" @keyup.enter.native="getsearchFormData" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="searchForm.gender" clearable placeholder="分类" style="width: 178px">
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="党委名称">
            <el-select v-model="searchForm.partyCommitteeId" clearable placeholder="党委名称" style="width: 178px" @change="selectComminttee">
              <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="支部名称">
            <el-select v-model="searchForm.partBranchId" clearable placeholder="支部名称" style="width: 178px">
              <el-option v-for="(item, index) in branchs" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="文化程度">
            <el-select v-model="searchForm.educationId" clearable placeholder="文化程度" style="width: 178px">
              <el-option v-for="(item, index) in educationIds" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="getsearchFormData">查询</el-button>
            <el-button type="danger" size="small" @click="resetSearch">清空</el-button>
            <el-button v-if="permitIds.includes('dangjian_member_add')" type="success" size="small" @click="onAdd">新增</el-button>
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
      <party-member-model
        :data="editData"
        :modal-show="modelStatus"
        :type="modelType"
        :category-name="categoryName"
        :category-id="categoryId"
        :committees="committees"
        :title="modelTitle"
        @close="closeModel"
        @confirmClick="confirmClickFun"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getpartymemberList, partymemberDelete } from '@/api/zhsq/partymember/index'
import { getPartyCommitteeList, getPartyBranchList } from '@/api/zhsq/partyManage/index'
import PartyMemberModel from '../components/partyMemberModel'
export default {
  // 转入党员
  name: 'TransferredMember',
  components: {
    PartyMemberModel
  },
  data: function() {
    return {
      // 党委列表
      committees: [],
      // 支部列表
      branchs: [],
      listLoading: true,
      // 查询参数对象
      searchForm: {
        partyCommitteeId: '',
        partBranchId: ''
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
      // 党员类型 - 支部
      categoryName: '新转入党员',
      categoryId: 4,
      // 文化程度
      educationIds: [
        { name: '小学', id: 1 },
        { name: '初中', id: 2 },
        { name: '高中', id: 3 },
        { name: '中专', id: 4 },
        { name: '大专', id: 5 },
        { name: '本科', id: 6 },
        { name: '硕士', id: 7 },
        { name: '博士', id: 8 }
      ],
      // 视图数据表头
      columns: [
        {
          prop: 'name',
          label: '姓名',
          width: '80px'
        },
        {
          prop: '',
          label: '性别',
          width: '80px',
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
          prop: 'idCardNo',
          label: '身份证'
        },
        {
          prop: 'phoneNumber',
          label: '电话'
        },
        {
          prop: 'partyCommitteeName',
          label: '党委名称'
        },
        {
          prop: 'partyBranchName',
          label: '支部名称'
        },
        {
          prop: 'educationName',
          label: '文化程度'
        },
        {
          prop: 'partyDate',
          label: '入党时间'
        },
        {
          prop: '',
          label: '操作',
          render: (h, parms) => {
            const _btnArr = []
            if (this.permitIds.includes('dangjian_member_see')) {
              _btnArr.push(h('el-link', { props: { type: 'primary' }, class: 'item', on: { click: () => { this.showInfoFun(parms.row, event) } }}, ['查看']))
            }
            if (this.permitIds.includes('dangjian_member_edit')) {
              _btnArr.push(h('el-link', { props: { type: 'primary' }, class: 'item ml10', on: { click: () => { this.editFun(parms.row, event) } }}, ['编辑']))
            }
            if (this.permitIds.includes('dangjian_member_delete')) {
              _btnArr.push(h('el-link', { props: { type: 'danger' }, class: 'item ml10', on: { click: () => { this.deleteFun(parms.row, event) } }}, ['删除']))
            }
            return h('div', {}, [
              _btnArr
            ])
          }
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
      const { data } = await getpartymemberList({
        name: this.searchForm.name,
        partBranchId: this.searchForm.partBranchId,
        partyCommitteeId: this.searchForm.partyCommitteeId,
        educationId: this.searchForm.educationId,
        idCardNo: this.searchForm.idCardNo,
        phoneNumber: this.searchForm.phoneNumber,
        gender: this.searchForm.gender,
        partyCategoryId: this.categoryId,
        current: this.currentPage,
        size: 10
      })
      this.tableList = data
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
        this.branchs = res.data.records

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
      this.editData = {}
      this.modelTitle = '支部党员—新增'
      this.modelStatus = true
    },
    // 编辑
    editFun(row) {
      this.modelType = 'edit'
      this.editData = row
      this.editData.partyBranchId = '' + this.editData.partyBranchId
      this.modelTitle = '支部党员——编辑'
      this.modelStatus = true
    },
    // 删除
    deleteFun(row) {
      this.$confirm('是否移除该支部党员?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(async() => {
        await partymemberDelete(row.id)
        this.getListData()
      })
    },
    // 查看详情
    showInfoFun(row) {
      this.modelType = 'info'
      this.editData = row
      this.modelTitle = '支部党员——详情'
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
      this.modelStatus = false
      this.getListData()
    },
    // 分页
    currentChange(page) {
      this.currentPage = page
      this.getListData()
    },
    confirmClickFun() {
      this.modelStatus = false
      this.currentPage = 1
      this.searchForm = {}
      this.getListData()
    }
  }
}
</script>

<style scoped>

</style>
