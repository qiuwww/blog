<style lang="less" scoped>
  .tZhsqCommunityCadresList {
    .ivu-form-item-content > .ivu-btn {
      margin-right: 40px !important;
    }
    .ivu-input-group{
      width: 260px;
    }
  }
</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <div class="search tZhsqCommunityCadresList" >
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline label-position="right" on-submit="return false">
          <Button v-if="permitIds.includes('archive_staff_ganbu_add')" type="primary" icon="md-add" @click="addTZhsqCommunityCadres">新增</Button>


          <Form-item label="所属街道" :label-width="110">
            <Select v-model="searchForm.streetId" placeholder="请选择街道" clearable label-in-value style="width: 200px" @on-change="onStreetChange">
              <Option v-for="(item, i) in streetArr" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>

          <Form-item label="所属社区" :label-width="110">
            <Select v-model="searchForm.communityId" placeholder="请选择社区"  clearable label-in-value style="width: 200px"   @on-change="handleSearch">
              <Option v-for="(item, i) in communityArr" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item  :label-width="40">
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入姓名/手机号/身份证号码" @on-search = "handleSearch"/>
          </Form-item>
          <Form-item class="br" :label-width="40">
<!--            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>-->
            <Button @click="handleReset">重置查询</Button>
            <Dropdown @on-click="handleDropdown">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown" />
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="refresh">
                  <Icon type="md-sync" />
                  刷新
                </DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_staff_ganbu_delete')" name="removeAll">
                  <Icon type="md-trash" />
                  批量删除
                </DropdownItem>
                <DropdownItem name="import">
                  <Icon type="ios-cloud-upload-outline" />
                  批量导入
                </DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_staff_ganbu_export')" name="export">
                  <Icon type="md-arrow-down" />
                  导出本页数据
                </DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_staff_ganbu_export')" name="excelExport">
                  <Icon type="md-arrow-down" />
                  根据查询条件导出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
<!--            <a class="drop-down" @click="dropDown">-->
<!--              {{ dropDownContent }}-->
<!--              <Icon :type="dropDownIcon" />-->
<!--            </a>-->
          </Form-item>
        </Form>
      </Row>

      <Row v-show="selectCount>0">
        <Alert show-icon>
          已选择
          <span class="select-count">{{ selectCount }}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
<!--          <span style="float: right;">点击右上角按钮配置动态列↑</span>-->
        </Alert>
      </Row>
      <Row>
        <Table
               ref="table"
          :loading="loading"
          stripe
               :columns="columns"
          sortable="custom"
          :data="data"
          @on-sort-change="changeSort"
          @on-selection-change="showSelect"
        >
          <template slot="action" slot-scope="{ row, index }">
            <Tooltip content="查看详情" placement="top">
              <Button  class="btnPrimary"  icon="md-eye"   @click="handleLook(row, index)" v-if="permitIds.includes('archive_staff_ganbu_see')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button  class="bianji"   @click="handleEdit(row, index)" v-if="permitIds.includes('archive_staff_ganbu_bianji')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button  class="btnError"  icon="ios-trash"   @click="deleteData(row, index)" v-if="permitIds.includes('archive_staff_ganbu_delete')"></Button>
            </Tooltip>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center"  class="page">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          :page-size-opts="[10,20,50,100]"
          size="small"
          show-total
          show-elevator
          show-sizer
          :transfer="true"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Row>
    </Card>
    <updateTZhsqCommunityCadres
      v-model="updateShow"
      :t-zhsq-community-cadres-id="TZhsqCommunityCadresId"
      :modal-title="title"
      @handleSearch="handleSearchPage"
    />
    <lookTZhsqCommunityCadres
      v-model="lookShow"
      :t-zhsq-community-cadres-id="TZhsqCommunityCadresId"
      :modal-title="title"
    />
    <ExcelUpload
      v-model="excelUploadShow"
      modal-title="导入数据"
      :actions="actions"
      @handleSearch="handleSearchPage"
    />
  </div>
</template>
<script>
import {
  deleteTZhsqCommunityCadres,
  queryTZhsqCommunityCadresList,
  exportExcel
} from '@/api/zhsq/tZhsqCommunityCadres/tZhsqCommunityCadres'
import { formartDate } from '@/api/tools/tool'
import updateTZhsqCommunityCadres from './updateTZhsqCommunityCadres'
import lookTZhsqCommunityCadres from './lookTZhsqCommunityCadres'
import { getCommunity, getDictionary, getStreet, getPostData, getDepartmentData } from '../../../api'
import { mapGetters } from 'vuex'
import { baseurl} from '@/libs/axios'
import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'
export default {
  components: {
    updateTZhsqCommunityCadres,
    lookTZhsqCommunityCadres,
    ExcelUpload
  },
  computed: {
    ...mapGetters(['permitIds'])
  },
  data() {
    return {
      drop: true,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      search: '',
      data: [],
      csvData: [],
      isNumber:false,
      columns: this.getTZhsqCommunityCadresColumns(),
      openSearch: true, // 打开搜索
      openTip: true, // 打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        streetId: '',
        communityId: '',
        idCard: '',
        name: '',
        phone: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null, // 开始时间
        endDate: null, // 结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc', // 默认排序方式,
        searchInfo:''//查询参数
      },
      total: 0,
      title: '',
      TZhsqCommunityCadresId: '',
      updateShow: false,
      tableHeight: 200,
      colOptions: ['姓名', '性别', '手机号', '所属街道', '所属社区', '所属部门', '所属岗位', '创建时间', '操作'],
      colSelect: ['姓名', '性别', '手机号', '所属街道', '所属社区', '所属部门', '所属岗位', '创建时间', '操作'],
      // 时间
      selectDate: [],
      // 查看页面
      lookShow: false,
      showSearch: false,

      // 社区下拉数据
      communityArr: [],
      streetArr: [],

      departmentArr: [],
      postArr: [],
      excelUploadShow:false,//导入弹出框
      actions:''+baseurl+'/tZhsqCommunityCadres/importExcel',//链接前缀
    }
  },
  mounted() {
    this.getDataList()
    getStreet({}).then(res => {
      if (res && res.success) {
        this.streetArr = res.data
      }
    })

    // 部门下拉数据
    getDepartmentData({ communityId: null }).then(res => {
      if (res && res.success) {
        this.departmentArr = res.data
      }
    })

    // 岗位下拉数据
    getPostData({}).then(res => {
      if (res && res.success) {
        this.postArr = res.data
      }
    })
  },
  methods: {
    onStreetChange(e) {
      if (e) {
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.communityArr = res.data
          }
        })
      } else {
        this.communityArr = []
      }
      this.searchForm.communityId = ''
      this.handleSearch();
    },
    // 列表上方更多操作
    handleDropdown(name) {
      if (name == 'refresh') {
        this.getDataList()
      } else if (name == 'removeAll') {
        this.delAll()
      } else if (name == 'import') {
        this.excelUploadShow = true
      }else if (name == 'export') {
        const excolumns = this.columns.filter(function(v) {
          return v.title != '操作' && v.type != 'selection'
        })
        if(this.isNumber){
          this.csvData.forEach(item => {
            item.phone = '="' + item.phone + '"'
          })
        }
        this.isNumber = false;
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.csvData
        })
      } else if (name == 'excelExport') {
        this.excelData()
      }
    },
    // 导出查询数据
    excelData() {
      var _this = this
      exportExcel(_this.searchForm).then(res => {
        const content = res
        const blob = new Blob([content], { type: 'application/ms-excel' })
        const fileName = '导出社区干部档案.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        _this.isExportShow = false
      }).catch(function(error) {
        _this.$Message.error('数据导出失败')
        _this.isExportShow = false
      })
    },
    // 展开 收起
    dropDown() {
      if (this.drop) {
        this.dropDownContent = '收起'
        this.dropDownIcon = 'ios-arrow-up'
        this.showSearch = true
      } else {
        this.dropDownContent = '展开'
        this.dropDownIcon = 'ios-arrow-dwon'
        this.showSearch = false
      }
      this.drop = !this.drop
    },
    // 时间选择事件
    selectDateRange(v) {
      if (v) {
        if (this.selectDate && this.selectDate[0] &&this.selectDate[1]  ) {
          this.searchForm.startDate = formartDate(this.selectDate[0], 'yyyy-MM-dd 00:00:00')
          this.searchForm.endDate = formartDate(this.selectDate[1], 'yyyy-MM-dd 23:59:59')
        }
        else{
          this.searchForm.startDate = null
          this.searchForm.endDate = null
        }
      }
    },
    // 新增
    addTZhsqCommunityCadres() {
      this.title = '社区干部新增'
      this.updateShow = true
      this.TZhsqCommunityCadresId = ''
    },
    // 编辑
    handleEdit(row, index) {
      this.title = '社区干部编辑'
      this.TZhsqCommunityCadresId = row.id.toString()
      this.updateShow = true
    },
    // 查看
    handleLook(row, index) {
      this.title = '社区干部查看'
      this.TZhsqCommunityCadresId = row.id.toString()
      this.lookShow = true
    },
    // 分页查询
    getDataList() {
      this.selectCount = 0;
      this.loading = true
      this.searchForm.id = null
      // 清空选择项
      this.clearSelectAll()
      queryTZhsqCommunityCadresList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false
          if (res.data != null){
            this.data = res.data.records
            this.csvData = JSON.parse(JSON.stringify(res.data.records))
            this.total = res.data.total
          }
          this.isNumber=true;
        }
      })
    },
    // 单一删除
    deleteData(row, index) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所点击选的数据?',
        loading: true,
        onOk: () => {
          this.userLoading = true
          var ids = []
          ids.push(row.id)
          this.patchdeleteData(ids)
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！')
        }
      })
    },
    // 批量删除
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据')
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
        loading: true,
        onOk: () => {
          const ids = []
          this.selectList.forEach(function(e) {
            ids.push(e.id)
          })
          this.patchdeleteData(ids)
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！')
        }
      })
    },
    // 删除（后台）
    patchdeleteData(ids) {
      if (ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error('没有选择的数据')
        return
      }
      deleteTZhsqCommunityCadres({ ids: ids }).then(res => {
        this.userLoading = false
        this.$Modal.remove()
        if (res && res.success) {
          this.modalTaskVisible = false
          this.$Message.success('删除成功')
          this.getDataList()
        } else {
          this.$Message.error('删除失败')
        }
      })
    },
    // 改变页码
    changePage(v) {
      this.searchForm.pageNumber = v
      this.getDataList()
      this.clearSelectAll()
    },
    // 改变每页显示数据的条数
    changePageSize(v) {
      this.searchForm.pageSize = v
      this.getDataList()
    },
    // 改变排序方式
    changeSort(e) {
      this.searchForm.sort = e.key
      this.searchForm.order = e.order
      if (e.order == 'normal') {
        this.searchForm.order = ''
      }
      this.getDataList()
    },
    // 查询
    handleSearch() {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.getDataList()
    },
    //查询
    handleSearchPage(){
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.searchForm.streetId = ''
      this.searchForm.communityId = ''
      this.searchForm.name = ''
      this.searchForm.phone = ''
      this.searchForm.idCard = ''
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.searchForm.startDate = null
      this.searchForm.endDate = null
      this.searchForm.searchInfo = ''
      this.selectDate = null
      // 重新加载数据
      this.getDataList()

    },
    // 显示选择
    showSelect(e) {
      this.selectList = e
      this.selectCount = e.length
    },
    // 清空选择
    clearSelectAll() {
      this.$refs.table.selectAll(false)
    },
    // 获取列表字段
    getTZhsqCommunityCadresColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          align: 'center',
          tooltip: true,
          key: 'name',
          sortable: false,
          minWidth: 100
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex',
          tooltip: true,
          sortable: false,
          minWidth: 70
        },
        {
          title: '身份证号',
          align: 'center',
          key: 'idCard',
          tooltip: true,
          sortable: false,
          ellipsis:true,
          minWidth: 200,
          render: (h, params) => {
            let dataF = this.csvData.filter(item => item.id == params.row.id)
            if (dataF.length > 0) {
              let reg = /^(.{6}).*(.{4})$/
              let number = params.row.idCard.replace(reg, '$1****$2')
              dataF[0].idCard = '="' + params.row.idCard + '"';
              return h('Tooltip', {
                props: {
                  content: number,
                  placement: 'bottom',
                  transfer: true
                }
              }, number)
            }
          }
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone',
          tooltip: true,
          sortable: false,
          minWidth: 100,
          render: (h, params) => {
            let reg = /^(.{3}).*(.{4})$/
            let number = params.row.phone.replace(reg, '$1****$2')
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
          title: '所属街道',
          align: 'center',
          tooltip: true,
          key: 'streetName',
          sortable: false,
          minWidth: 100
        },
        {
          title: '所属社区',
          align: 'center',
          tooltip: true,
          key: 'communityName',
          sortable: false,
          minWidth: 100
        },
        {
          title: '所属部门',
          align: 'center',
          tooltip: true,
          key: 'department',
          sortable: false,
          minWidth: 100,
          // render: (h, params) => {
          //   const filter = this.departmentArr.filter(item => item.id == params.row.department)
          //   if (filter && filter.length > 0) {
          //     const dataF = this.csvData.filter(item => item.id == params.row.id)
          //     dataF[0].department = filter[0].name
          //     return h('Tooltip', {
          //       props: {
          //         content: filter[0].name,
          //         placement: 'bottom',
          //         transfer: true
          //       }
          //     }, filter[0].name)
          //   }
          // }
        },
        {
          title: '所属岗位',
          align: 'center',
          key: 'post',
          ellipsis: true,
          sortable: false,
          minWidth: 130,
          // render: (h, params) => {
          //   const filter = this.postArr.filter(item => item.id == params.row.post)
          //   const dataF = this.csvData.filter(item => item.id == params.row.id)
          //
          //   if (filter && filter.length > 0) {
          //     dataF[0].post = filter[0].name
          //     return h('Tooltip', {
          //       props: {
          //         content: filter[0].name,
          //         placement: 'bottom',
          //         transfer: true
          //       }
          //     }, filter[0].name)
          //   }
          //   else{
          //     dataF[0].post = ""
          //     return h('Tooltip', {
          //       props: {
          //         content: "",
          //         placement: 'bottom',
          //         transfer: true
          //       }
          //     }, "")
          //   }
          // }
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: false,
          align: 'center',
          minWidth: 170,
          tooltip: true,
          render: (h, params) => {
            const createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
            const dataF = this.csvData.filter(item => item.id == params.row.id)
            dataF[0].createTime = '="' + createTime + '"'
            return h('Tooltip', {
              props: {
                content: createTime,
                placement: 'bottom',
                transfer: true
              }
            }, createTime)
          }
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 220
        }
      ]
    },
    // 动态列实现
    checkboxChange: function(data) {
      var columnss = this.getTZhsqCommunityCadresColumns()
      this.columns = columnss.filter(function(v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    }
  }
}
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
