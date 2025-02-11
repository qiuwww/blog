<template>
  <party-modal
    :title="title"
    :is-show-confirm-btn="false"
    :modal-show="modalShow"
    :top="true"
    @close="closeModel"
  >
    <div class="formWrap">
      <div class="p16">
        <div class="searchWrap">
          <Form ref="searchForm" :model="searchForm" inline label-position="left" on-submit="return false">
            <Form-item v-if="drop" label="党委名称" :label-width="70">
              <el-select v-model="searchForm.partyCommitteeId" placeholder="党委名称" @change="selectComminttee">
                <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
              </el-select>
            </Form-item>
            <Form-item v-if="drop" label="支部名称" :label-width="70">
              <Select v-model="searchForm.partyBranchId" placeholder="请选择支部" style="width: 170px">
                <Option v-for="(item, i)  in branchs" :key="item.id" :value="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item v-if="drop" label="性别" :label-width="40">
              <Select v-model="searchForm.gender" placeholder="请选择性别" style="width: 170px">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </Form-item>
            <Form-item label="姓名" :label-width="40">
              <Input v-model="searchForm.name" placeholder="姓名" style="width: 120px" />
            </Form-item>
            <Form-item label="电话" :label-width="40">
              <Input v-model="searchForm.phoneNumber" placeholder="电话" style="width: 120px" />
            </Form-item>
            <Form-item label="身份证" :label-width="60">
              <Input v-model="searchForm.idCardNo" style="width: 170px" search enter-button placeholder="身份证" @on-search="getsearchFormData" />
            </Form-item>
            <Form-item class="br" :label-width="10">
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
                <Button class="btnPrimary" size="small" @click="addFun(row, index)">添加</Button>
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
      </div>
      <div class="text-right fomrFooter">
        <Button type="text" @click="closeModel">取消</Button>
      </div>
    </div>
  </party-modal>

</template>

<script>
import { getpartymemberList } from '@/api/zhsq/partymember/index'
import { getPartyCommitteeList, getPartyBranchList } from '@/api/zhsq/partyManage/index'
import PartyModal from '@/components/partyModal/index'
export default {
  name: 'SelParticipants',
  components: {
    PartyModal
  },
  props: {
  //  弹窗标题
    title: {
      type: String,
      default: '添加参会人员'
    },
    //  弹窗显示条件
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      listLoading: true,
      // 查询参数对象
      searchForm: {
        partyCommitteeId: '',
        partBranchId: ''
      },
      // 党委列表
      committees: [],
      // 支部列表
      branchs: [],
      // 分类集合
      categorys: [],
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
      pageSize: 6,
      // 总条数
      total: 0,
      // 视图数据集合
      tableList: [],
      // 展开更多搜索
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      // 视图数据表头
      columns: [
        {
          key: 'name',
          title: '姓名',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: '',
          title: '性别',
          align: 'center',
          tooltip: true,
          minWidth: 100,
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
          minWidth: 100
        },
        {
          key: 'phoneNumber',
          title: '电话',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'partyBranchName',
          title: '所属支部',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 100
        }
      ]
    }
  },
  watch: {
    modalShow: function(newVaule, oldValue) {
      if (newVaule) {
        this.getListData()
        this.getPartyCommitteeListFun()
      }
    }
  },
  methods: {
  //  获取表格数据
    async getListData() {
      this.listLoading = true
      const { data } = await getpartymemberList({
        name: this.searchForm.name,
        gender: this.searchForm.gender,
        idCardNo: this.searchForm.idCardNo,
        phoneNumber: this.searchForm.phoneNumber,
        partyCommitteeId: this.searchForm.partyCommitteeId,
        partBranchId: this.searchForm.partBranchId,
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
    addFun(row) {
      this.$emit('confirmClick', row)
    },
    // 搜索查询
    getsearchFormData() {
      this.currentPage = 1
      this.getListData()
    },
    // 弹窗关闭时间
    closeModel() {
      this.$emit('close')
    },
    // 分页
    currentChange(page) {
      this.currentPage = page
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

<style scoped lang="less">
  /deep/ .ivu-form-item-content{
    margin-right:  0 !important;
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
  }
  .p16{
    padding: 16px;
  }
  .formWrap{
    width: 800px;
    .fomrFooter{
      padding: 14px 30px;
      background: #F8F9FA !important;
      border-radius: 0 0 12px 12px;
      /deep/.ivu-btn-primary{
        border-radius: 100px;
        padding: 0 40px;
      }
      /deep/.ivu-btn-text{
        border-radius: 100px;
        background: #ffffff;
        padding: 0 30px;
      }
    }
  }
</style>
