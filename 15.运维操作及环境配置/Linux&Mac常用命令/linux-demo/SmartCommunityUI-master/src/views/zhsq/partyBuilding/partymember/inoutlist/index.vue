<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <div class="searchWrap">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
          <Form-item label="姓名" :label-width="40">
            <Input v-model="searchForm.name" placeholder="姓名" />
          </Form-item>
          <Form-item label="电话" :label-width="70">
            <Input v-model="searchForm.phoneNumber" placeholder="电话" />
          </Form-item>
          <Form-item v-if="drop" label="性别" :label-width="70">
            <Select v-model="searchForm.gender" placeholder="性别" style="width: 200px">
              <Option :value="'1'">男</Option>
              <Option :value="'2'">女</Option>
            </Select>
          </Form-item>
          <Form-item v-if="drop" label="文化程度">
            <Select v-model="searchForm.educationId" placeholder="请选择支部" style="width: 200px">
              <Option v-for="(item, i)  in educationIds" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item v-if="drop" label="状态" :label-width="70">
            <Select v-model="searchForm.applyStatus" placeholder="状态" style="width: 200px">
              <Option v-for="(item, i)  in applyStatuss" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item v-if="drop" label="时间" :label-width="70">
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
          <Form-item label="身份证" :label-width="90">
            <Input v-model="searchForm.idCardNo" search enter-button placeholder="身份证" @on-search="getsearchFormData" />
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
            <Tooltip content="查看" placement="top">
              <Button v-if="permitIds.includes('dangjian_member_inoutlist_see')" class="btnPrimary" icon="md-eye" @click="showInfoFun(row, index)" />
            </Tooltip>
            <Tooltip content="通过" placement="top">
              <Button v-if="permitIds.includes('dangjian_member_inoutlist_pass') && (row.applyStatus === 1 || row.applyStatus === 2)" class="bianji" @click="openinoutadopt(row, index)" />
            </Tooltip>
            <Tooltip content="驳回" placement="top">
              <Button v-if="permitIds.includes('dangjian_member_inoutlist_reject') && (row.applyStatus === 1 || row.applyStatus === 2)" class="btnError" icon="ios-close-circle-outline" @click="inoutrejectFun(row, index)" />
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
    </div>
    <el-dialog :visible.sync="modelStatus" :width="'700px'">
      <div>
        <el-form ref="postForm" :inline="true" :model="editData" :label-width="'100px'" class="infoForm">
          <el-form-item label="头像:">
            <el-image style="width: 100px; height: 100px" :src="editData.headSculpture" />
          </el-form-item>
          <el-form-item label="姓名:">
            {{ editData.name }}
          </el-form-item>
          <el-form-item label="性别:">
            {{ editData.gender === 1 ? '男' : '女' }}
          </el-form-item>
          <el-form-item label="党员类型:">
            {{ editData.partyCategoryName }}
          </el-form-item>
          <el-form-item label="文化程度:">
            {{ editData.educationName }}
          </el-form-item>
          <el-form-item label="籍贯:">
            {{ editData.nativePlace }}
          </el-form-item>
          <el-form-item label="身份证:">
            {{ editData.idCardNo }}
          </el-form-item>
          <el-form-item label="入党时间:">
            {{ editData.partyDate }}
          </el-form-item>
          <el-form-item label="民族:">
            {{ editData.nation }}
          </el-form-item>
          <el-form-item label="党委名称:">
            {{ editData.partyCommitteeName }}
          </el-form-item>
          <el-form-item label="支部名称:">
            {{ editData.partyBranchName }}
          </el-form-item>
          <el-form-item label="生日:">
            {{ editData.birthday }}
          </el-form-item>
          <el-form-item label="手机号:">
            {{ editData.phoneNumber }}
          </el-form-item>
          <el-form-item label="居住地址:">
            {{ editData.residentialAddress }}
          </el-form-item>
          <el-form-item label="单位地址:">
            {{ editData.unitAddress }}
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="分配党委和支部" :visible.sync="dialogFormVisible" :width="'30%'">
      <el-form :model="inoutadoptForm">
        <el-form-item label="党委名称">
          <el-select v-model="inoutadoptForm.partyCommitteeId" clearable placeholder="党委名称" @change="selectComminttee">
            <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="支部名称">
          <el-select v-model="inoutadoptForm.partyBranchId" placeholder="支部名称" @change="selectBranch">
            <el-option v-for="(item, index) in branchs" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="inoutadoptFun">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { inoutreject, inoutadopt, getinoutlist } from '@/api/zhsq/partymember/index'
import { getPartyCommitteeList, getPartyBranchList } from '@/api/zhsq/partyManage/index'
export default {
  name: 'Inoutlist',
  components: {},
  data: function() {
    return {
      // 党委列表
      committees: [],
      // 支部列表
      branchs: [],
      // 时间范围
      timeRange: '',
      // 展开更多搜索
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
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
      applyStatuss: [
        { name: '转入', id: 1 },
        { name: '转出', id: 2 },
        { name: '通过', id: 3 },
        { name: '驳回', id: 4 }
      ],
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
      // 通过表单
      inoutadoptForm: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      // 通过弹窗状态
      dialogFormVisible: false,
      // 视图数据表头
      columns: [
        {
          key: 'name',
          title: '姓名',
          align: 'center',
          width: '80px'
        },
        {
          key: '',
          title: '性别',
          align: 'center',
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
          key: 'idCardNo',
          align: 'center',
          title: '身份证'
        },
        {
          key: 'phoneNumber',
          align: 'center',
          title: '电话'
        },
        {
          key: 'educationName',
          align: 'center',
          title: '文化程度'
        },
        {
          key: 'createTime',
          align: 'center',
          title: '申请时间'
        },
        {
          key: 'applyType',
          title: '申请类型',
          align: 'center',
          render: (h, parms) => {
            let typeName = ''
            switch (parms.row.applyType) {
              case 1:
                typeName = '转入'
                break
              case 2:
                typeName = '转出'
                break
            }
            return h(
              'span', {},
              [typeName]
            )
          }
        },
        {
          key: 'applyStatus',
          title: '状态',
          align: 'center',
          render: (h, parms) => {
            let typeName = ''
            switch (parms.row.applyStatus) {
              case 1:
                typeName = '转入'
                break
              case 2:
                typeName = '转出'
                break
              case 3:
                typeName = '通过'
                break
              case 4:
                typeName = '驳回'
                break
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
      const { data } = await getinoutlist({
        name: this.searchForm.name,
        educationId: this.searchForm.educationId,
        gender: this.searchForm.gender,
        idCardNo: this.searchForm.idCardNo,
        applyStatus: this.searchForm.applyStatus,
        startTime: this.searchForm.startDate,
        endTime: this.searchForm.endDate,
        phoneNumber: this.searchForm.phoneNumber,
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
    // 查看详情
    showInfoFun(row) {
      this.modelType = 'info'
      this.editData = row
      this.modelTitle = '转入转出——详情'
      this.modelStatus = true
    },
    // 搜索查询
    getsearchFormData() {
      this.currentPage = 1
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
      this.inoutadoptForm.partyBranchId = ''
      this.committees.forEach(ele => {
        if (ele.id === id) {
          this.inoutadoptForm.partyCommitteeName = ele.name
        }
      })
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
    // 选择支部
    selectBranch(id) {
      this.branchs.forEach(ele => {
        if (ele.id === id) {
          this.inoutadoptForm.partyBranchName = ele.name
        }
      })
    },
    openinoutadopt(row) {
      const self = this
      if (row.applyType === 1) {
        self.dialogFormVisible = true
        self.inoutadoptForm = {
          partyCommitteeId: '',
          partyBranchId: ''
        }
        self.inoutadoptForm.id = row.id
        self.inoutadoptForm.applyType = row.applyType
      } else {
        self.$confirm('是否通过该申请?', '提示', {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(async() => {
          self.inoutadoptForm.id = row.id
          self.inoutadoptForm.applyType = row.applyType
          await self.inoutadoptFun(row)
        })
      }
    },
    // 通过
    inoutadoptFun(row) {
      const self = this
      inoutadopt(
        {
          id: self.inoutadoptForm.id,
          partyBranchId: self.inoutadoptForm.partyBranchId,
          partyCommitteeId: self.inoutadoptForm.partyCommitteeId,
          partyCommitteeName: self.inoutadoptForm.partyCommitteeName,
          partyBranchName: self.inoutadoptForm.partyBranchName
        }).then(res => {
        if (self.inoutadoptForm.applyType === 1) {
          self.dialogFormVisible = false
        }
        self.$message({
          message: '通过成功',
          type: 'success'
        })
        self.getListData()
      })
    },
    // 驳回
    inoutrejectFun(row) {
      const self = this
      this.$prompt('请输入驳回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        inoutreject(
          {
            id: row.id,
            rejectReason: value
          }).then(res => {
          self.getListData()
        })
      }).catch(() => {
      })
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

<style scoped lang="less">
    .infoForm{
    /deep/.el-form-item__content{
        width: 200px;
        color: #999;
    }
    }
    .el-textarea{
      width:100% !important;
    }
    /deep/.el-select, .el-input{
      padding-top: 1px;
    }
    /deep/.el-input--medium .el-input__inner{
      height: 31px;
      line-height: 31px;
    }
    .drop-down{
      color: inherit;
      margin-left: 40px;
    }
    /deep/ .ivu-form-item-content{
      margin-right:  0 !important;
    }
</style>
