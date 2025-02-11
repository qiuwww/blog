<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
        <Button v-if="permitIds.includes('dangjian_member_add')" type="primary" icon="md-add" @click="onAdd">新增</Button>
        <Form-item label="姓名" :label-width="70">
          <Input v-model="searchForm.name" placeholder="姓名" />
        </Form-item>
        <Form-item label="电话" :label-width="70">
          <Input v-model="searchForm.phoneNumber" placeholder="电话" />
        </Form-item>
        <Form-item label="党员类型">
          <el-select v-model="searchForm.categoryId" clearable placeholder="党员类型" style="width: 170px">
            <el-option v-for="(item, index) in categorys" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </Form-item>
        <Form-item v-if="drop" label="党委名称">
          <el-select v-model="searchForm.partyCommitteeId" clearable placeholder="党委名称" style="width: 170px" @change="selectComminttee">
            <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </Form-item>
        <Form-item v-if="drop" label="支部名称">
          <el-select v-model="searchForm.partyBranchId" placeholder="支部名称" style="width: 170px">
            <el-option v-for="(item, i)  in branchs" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </Form-item>
        <Form-item v-if="drop" label="性别" :label-width="70">
          <el-select v-model="searchForm.gender" placeholder="性别">
            <el-option v-for="(item, i)  in genders" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </Form-item>
        <Form-item v-if="drop" label="文化程度">
          <el-select v-model="searchForm.educationId" placeholder="文化程度" style="width: 170px">
            <el-option v-for="(item, i)  in educationIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </Form-item>
        <Form-item label="身份证" :label-width="90">
          <Input v-model="searchForm.idCardNo" search enter-button placeholder="请输入身份证" @on-search="getsearchFormData" />
        </Form-item>
        <Form-item class="br" :label-width="40">
          <!--            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>-->
          <Button @click="resetSearch">重置查询</Button>
          <a class="drop-down" @click="dropDown">
            {{ dropDownContent }}
            <Icon :type="dropDownIcon" />
          </a>
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
              <Button v-if="permitIds.includes('dangjian_member_see')" class="btnPrimary" icon="md-eye" @click="showInfoFun(row, index)" />
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button v-if="permitIds.includes('dangjian_member_edit')" class="bianji" @click="editFun(row, index)" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button v-if="permitIds.includes('dangjian_member_delete')" class="btnError" icon="ios-trash" @click="deleteFun(row, index)" />
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
      <party-member-model
        :data="editData"
        :modal-show="modelStatus"
        :type="modelType"
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
import { getPartyCommitteeList, getPartyBranchList, getPartyCommitteeDelete } from '@/api/zhsq/partyManage/index'
import PartyMemberModel from './components/partyMemberModel'
export default {
  name: 'Partymember',
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
        partyBranchId: ''
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
      pageSize: 10,
      // 总条数
      total: 0,
      // 视图数据集合
      tableList: [],
      // 党员类型 - 支部
      categorys: [
        { name: '支部委员', id: 1 },
        { name: '支部党员', id: 2 },
        { name: '入党积极分子', id: 3 },
        { name: '新转入党员', id: 4 },
        { name: '退出党员', id: 5 },
        { name: '退党党员', id: 6 },
        { name: '迁出党员', id: 7 },
        { name: '死亡党员', id: 8 }
      ],
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
      // 性别
      genders: [
        { name: '男', id: 1 },
        { name: '女', id: 2 }
      ],
      // 展开更多搜索
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      // 视图数据表头
      columns: [
        {
          key: 'name',
          title: '姓名',
          width: '80px',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: '',
          title: '性别',
          width: '80px',
          align: 'center',
          tooltip: true,
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
          key: 'idCardNo',
          title: '身份证',
          align: 'center',
          tooltip: true,
          minWidth: 120,
          render: (h, params) => {
            let reg = /^(.{6}).*(.{4})$/
            let number =  params.row.idCardNo.replace(reg,'$1****$2')
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
          key: 'phoneNumber',
          title: '电话',
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
          key: 'partyCategoryName',
          title: '党员类型',
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
          key: 'educationName',
          title: '文化程度',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'partyDate',
          title: '入党时间',
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
      this.listLoading = true
      const { data } = await getpartymemberList({
        name: this.searchForm.name,
        partBranchId: this.searchForm.partBranchId,
        partyCommitteeId: this.searchForm.partyCommitteeId,
        educationId: this.searchForm.educationId,
        idCardNo: this.searchForm.idCardNo,
        phoneNumber: this.searchForm.phoneNumber,
        gender: this.searchForm.gender,
        partyCategoryId: this.searchForm.categoryId,
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
      this.editData.partyCommitteeId = '' + this.editData.partyCommitteeId
      this.editData.partyBranchId = '' + this.editData.partyBranchId
      this.modelTitle = '支部党员——编辑'
      this.modelStatus = true
    },
    // 删除
    deleteFun(row) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所点击选的党员?',
        loading: true,
        onOk: async() => {
          await partymemberDelete(row.id)
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
    },
    // 展开 收起
    dropDown() {
      if (this.drop) {
        this.dropDownContent = '展开'
        this.dropDownIcon = 'ios-arrow-down'
      } else {
        this.dropDownContent = '收起'
        this.dropDownIcon = 'ios-arrow-up'
      }
      this.drop = !this.drop
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
    height: 32px;
    line-height: 32px;
  }
  .drop-down{
    color: inherit;
    margin-left: 40px;
  }
  /deep/ .ivu-form-item-content{
    margin-right:  0 !important;
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
