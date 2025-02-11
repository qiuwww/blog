<style lang="less" scoped>
  .basicHousingManageList {
    .ivu-select {
      width: 190px;
    }
    .ivu-input-wrapper {
      width: 240px !important;
    }
    .ivu-select-selection{
      width: 190px !important;
    }
    .ivu-form .ivu-form-item-label {
        text-align: left;
        padding: 0px 0px 0px 0;
    }
    .ivu-form-item-content>.ivu-btn{
      margin-right: 40px !important;
    }
    .ivu-tooltip-rel {
      display: inline-block !important;
      position: relative !important;
      width: inherit !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
    }

  }
</style>
<template>
  <div class="search basicHousingManageList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
          <Button v-if="permitIds.includes('archive_domain_xiaoqu_add')" type="primary" icon="md-add" @click="addBasicHousingEstate">新增</Button>
          <Form-item  label="创建时间">
            <DatePicker
              v-model="selectDate"
              type="daterange"
              format="yyyy-MM-dd"
              clearable
              placeholder="选择创建时间"
              style="width:190px"
              @on-change="selectDateRange"
              :options="buildingYearOptions"
            />
          </Form-item>
<!--          <Form-item label="小区名称">-->
<!--            <Input v-model="searchForm.name" type="text" placeholder="请输入小区名称" clearable />-->
<!--          </Form-item>-->
          <Form-item label="物业名称">
            <Select v-model="searchForm.propertyName" class="select-form" placeholder="请选择物业名称" clearable  @on-change="handleSearch">
              <Option v-for="(item, i) in PropertyPriority" :key="i" :value="item.propertyName">{{ item.propertyName }}</Option>
            </Select>
          </Form-item>
<!--          <Form-item label="小区地址">-->
<!--            <Input v-model="searchForm.address" type="text" placeholder="请输入小区地址" clearable />-->
<!--          </Form-item>-->
          <!-- <Form-item label="物业名称" v-if="drop">
            <Select v-model="searchForm.propertyName" filterable placeholder="请选择物业名称">
              <Option v-for="(item, i)  in propertyList" :value="item.id" :key="item.id">{{ item.propertyName }}</Option>
            </Select>
          </Form-item> -->
          <Form-item v-if="drop"   label="所属街道">
            <Select
              v-model="searchForm.streetId"
              class="select-form"
              placeholder="请选择所属街道"
              clearable
              :label-in-value="true"
              @on-change="streetChange"
              @on-clear="clearStreet"
            >
              <Option v-for="(item, i)  in streetData" :key="item.id.toString()" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item v-if="drop" label="所属社区">
            <Select
              ref="closeCommunity"
              v-model="searchForm.communityId"
              class="select-form"
              placeholder="请选择所属社区"
              clearable
              :label-in-value="true"
              @on-change="selectCommunity"
              @on-clear="clearCommunity"
            >
              <Option v-for="(item, i)  in communityPriority" :key="item.id.toString()" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item v-if="drop" label="所属网格">
            <Select
              ref="closeGrid"
              v-model="searchForm.gridId"
              class="select-form"
              placeholder="请选择所属网格"
              clearable
              :label-in-value="true"
              @on-change="selectGrid"
            >
              <Option v-for="(item, i)  in gridPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label-width="40">
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入小区名称/小区地址"
                   @on-search="handleSearch"/>
          </Form-item>
          <Form-item :label-width="40">
<!--            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>-->
            <Button @click="handleReset">重置查询</Button>
            <Dropdown @on-click="handleDropdown">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown" />
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="refresh">
                  <Icon type="md-sync" />刷新</DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_domain_xiaoqu_delete')" name="removeAll">
                  <Icon type="md-trash" />批量删除</DropdownItem>
                <DropdownItem name="importExcel">
                  <Icon type="md-arrow-up" />批量导入</DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_domain_xiaoqu_export')" name="export">
                  <Icon type="md-arrow-down" />导出本页数据</DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_domain_xiaoqu_export')" name="exportData">
                  <Icon type="md-arrow-down" />根据查询条件导出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <a class="drop-down" @click="dropDown">
              {{ dropDownContent }}
              <Icon :type="dropDownIcon" />
            </a>
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
          stripe :columns="columns"
          sortable="custom"
          :data="data"
          @on-sort-change="changeSort"
          @on-selection-change="showSelect"
        >
          <template slot="action" slot-scope="{ row, index }">
            <Tooltip content="查看详情" placement="top">
              <Button  class="btnPrimary"  icon="md-eye"   @click="handleLook(row, index)" v-if="permitIds.includes('archive_domain_xiaoqu_see')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button  class="bianji"   @click="handleEdit(row, index)" v-if="permitIds.includes('archive_domain_xiaoqu_bianji')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button  class="btnError"  icon="ios-trash"   @click="deleteData(row, index)" v-if="permitIds.includes('archive_domain_xiaoqu_delete')"></Button>
            </Tooltip>

          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center"  class="page">
        <Page
          :current="searchForm.pageNumber"
          :transfer="true"
          :total="total"
          :page-size="searchForm.pageSize"
          :page-size-opts="[10,20,50,100]"
          size="small"
          show-total
          show-elevator
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Row>
    </Card>
    <updateBasicHousingEstateView
      v-model="updateShow"
      :basic-housing-estate-id="BasicHousingEstateId"
      :modal-title="title"
      @handleSearch="handleSearchPage"
    />
    <lookBasicHousingEstate
      v-model="lookShow"
      :basic-housing-estate-id="BasicHousingEstateId"
      :property-name="propertyName"
      :modal-title="title"
      @handleSearch="handleSearchPage"
    />
    <ExcelUpload
      v-model="excelUploadShow"
      modal-title="导入数据"
      :actions="actions"
      @handleSearch="handleSearchPage"
    />
    <mapPlot
      v-model="mapShow"
      :obj-data="pointArr"
      :select-type="selectType"
      :building-data="buildingData"
      div-id="basicHousingEstateList"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />
  </div>
</template>
<script>
import {
  deleteBasicHousingEstate,
  queryBasicHousingEstateList,
  updateBasicHousingEstate,
  download
} from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
import {
  queryTZhsqPropertyManagementList
} from '@/api/zhsq/tZhsqPropertyManagement/tZhsqPropertyManagement'
import {
  formartDate
} from '@/api/tools/tool'
import updateBasicHousingEstateView from './updateBasicHousingEstate'
import lookBasicHousingEstate from './lookBasicHousingEstate'
import ExcelUpload from './ExcelUpload'
import {
  queryAllList as gridsQueryAllList
} from '@/api/zhsq/basicGrids/basicGrids'
import {
  queryAllList as propertyManagementAllList
} from '@/api/zhsq/tZhsqPropertyManagement/tZhsqPropertyManagement'
import mapPlot from '@/views/gismap/components/plot'
import {
  getStreet,
  getCommunity
} from '@/api/index'
import {
  mapGetters
} from 'vuex'
import { baseurl} from '@/libs/axios'
export default {
  computed: {
    ...mapGetters(['permitIds'])
  },
  components: {
    updateBasicHousingEstateView,
    lookBasicHousingEstate,
    mapPlot,
    ExcelUpload
  },
  data() {
    return {
      //时间控件限定
      buildingYearOptions: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      },
      mapShow: false,
      selectType: 'Polygon',
      pointArr: [],
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      search: '',
      data: [],
      cvData: [],
      selectDate: [],
      showSearch: true, // 展示搜索条件
      columns: this.getBasicHousingEstateColumns(),
      openSearch: true, // 打开搜索
      openTip: true, // 打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      lookShow: false,
      actions:''+baseurl+'/basicHousingEstate/importExcel',
      searchForm: {
        // 搜索框对应data对象
        name: '',
        searchInfo:'',
        address: '',
        propertyName: '',
        propertyType: '',
        propertyPerson: '',
        propertyPhone: '',
        streetId: '',
        communityId: '',
        gridId: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null, // 开始时间
        endDate: null, // 结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      total: 0,
      title: '',
      BasicHousingEstateId: '',
      updateShow: false,
      tableHeight: 200,
      colOptions: ['小区名称', '所属社区', '所属网格', '物业名称', '物业电话', '小区地址', '地图标注', '创建时间', '操作'],
      colSelect: ['小区名称', '所属社区', '所属网格', '物业名称', '物业电话', '小区地址', '地图标注', '创建时间', '操作'],
      propertyTypePriority: [],
      PropertyPriority: this.PropertyPriorityData(),
      gridName: '',
      excelUploadShow: false,
      // 物业列表
      // propertyList:[],
      // 物业名称
      propertyName: '',
      streetData: [],
      buildingData: [],
      communityPriority: [],
      gridPriority: []
    }
  },
  mounted() {
    this.getDataList()
    this.getStreetData()
  },
  methods: {

    clearCommunity() { // 清空社区
      this.$refs.closeGrid.clearSingleSelect()
      this.searchForm.communityId = ''
      this.searchForm.gridId = ''
      this.gridPriority = []
    },
    clearStreet() { // 清空街道
      this.$refs.closeCommunity.clearSingleSelect()
      this.$refs.closeGrid.clearSingleSelect()
      this.searchForm.streetId = ''
      this.searchForm.communityId = ''
      this.searchForm.gridId = ''
      this.communityPriority = null
      this.gridPriority = null
    },
    selectGrid(v) {
      if (v) {
        this.searchForm.gridId = v.value
      } else {
        this.searchForm.gridId = ''
      }
      this.handleSearch();
    },
    selectCommunity(v) { // 选择社区
      if (v) {
        this.searchForm.communityId = v.value
        gridsQueryAllList({
          'communityId': v.value
        }).then(res => {
          if (res && res.success) {
            this.gridPriority = res.data
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新')
          }
        })
      } else {
        this.gridPriority = null
        this.searchForm.communityId = ''
      }
      this.handleSearch();
    },
    streetChange(e) { // 街道选择
      if (e) {
        this.searchForm.streetId = e.value
        getCommunity({
          streetId: e.value
        }).then(res => {
          if (res && res.success) {
            this.communityPriority = res.data
          }
        })
      } else {
        this.communityPriority = null
        this.searchForm.streetId = ''
      }
      this.handleSearch();
    },
    getStreetData() { // 获取街道
      getStreet().then(res => {
        this.streetData = res.data
      })
    },
    // 列表上方更多操作
    handleDropdown(name) {
      if (name == 'refresh') {
        this.getDataList()
      } else if (name == 'removeAll') {
        this.delAll()
      } else if (name == 'export') {
        const excolumns = this.columns.filter(function(v) {
          return v.title != '操作' && v.type != 'selection'
        })
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.cvData
        })
      } else if (name == 'importExcel') {
        this.importExcel()
      } else if (name == 'exportData') {
        this.downloadData()
      }
    },
    downloadData() {
      var _this = this
      download(_this.searchForm).then(res => {
        const content = res
        const blob = new Blob([content], {
          type: 'application/ms-excel'
        })
        const fileName = '小区档案数据.xlsx'
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
      }).catch(() => {
        _this.$Message.error('数据导出失败')
        _this.isExportShow = false
      })
    },
    // 展开 收起
    dropDown() {
      if (this.drop) {
        this.dropDownContent = '展开'
        this.dropDownIcon = 'ios-arrow-down'
        this.showSearch = true
      } else {
        this.dropDownContent = '收起'
        this.dropDownIcon = 'ios-arrow-up'
        this.showSearch = false
      }
      this.drop = !this.drop
    },
    // 时间选择事件
    selectDateRange(v) {
      if (this.selectDate && this.selectDate[0] &&this.selectDate[1]  ) {
        this.searchForm.startDate = formartDate(this.selectDate[0], 'yyyy-MM-dd 00:00:00')
        this.searchForm.endDate = formartDate(this.selectDate[1], 'yyyy-MM-dd 23:59:59')
      }
      else{
        this.searchForm.startDate = null
        this.searchForm.endDate = null
      }
      this.handleSearch();
    },
    // 新增
    addBasicHousingEstate() {
      this.title = '小区管理新增'
      this.updateShow = true
      this.BasicHousingEstateId = ''
    },
    // 编辑
    handleEdit(row, index) {
      this.title = '小区管理编辑'
      this.BasicHousingEstateId = row.id.toString()
      this.updateShow = true
    },
    // 查看
    handleLook(row, index) {
      this.title = '小区管理查看'
      this.gridName = row.gridName
      this.propertyName = row.property_name
      this.BasicHousingEstateId = row.id.toString()
      this.lookShow = true
    },
    PropertyPriorityData() {
      queryTZhsqPropertyManagementList().then(res => {
        this.PropertyPriority = res.data.records
      })
    },
    // 所属网格
    getGridPriority(data) {
      if (data.communityId) {
        gridsQueryAllList(data).then(res => {
          if (res && res.success) {
            this.gridPriority = res.data
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新')
          }
        })
      } else {
        this.gridPriority = []
      }
    },
    // 获取物业列表
    getPropertyList() {
      var _this = this
      propertyManagementAllList().then(res => {
        if (res && res.success) {
          _this.propertyList = res.data
          _this.getTableData()
        }
      })
    },
    // table数据
    getTableData() {
      queryBasicHousingEstateList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false
          this.cvData = JSON.parse(JSON.stringify(res.data.records))
          this.data = res.data.records
          this.total = res.data.total
        }
      })
    },
    // 分页查询
    getDataList() {
      this.loading = true
      this.searchForm.id = null
      this.selectCount = 0;
      this.getTableData()
      // 清空选择项
      this.clearSelectAll()
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
      deleteBasicHousingEstate({
        ids: ids
      }).then(res => {
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
    handleSearchPage() {
      // this.searchForm.pageNumber = 1;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields()
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.searchForm.startDate = null
      this.searchForm.endDate = null
      this.selectDate = null
      this.searchForm.name = ''
      this.searchForm.address = ''
      this.searchForm.propertyName = ''
      this.searchForm.propertyType = ''
      this.searchForm.propertyPerson = ''
      this.searchForm.propertyPhone = ''
      this.searchForm.streetId = ''
      this.searchForm.communityId = ''
      this.searchForm.gridId = ''
      this.searchForm.searchInfo = ''
      this.communityPriority = null
      this.gridPriority = null
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
    getBasicHousingEstateColumns() {
      return [{
        type: 'selection',
        width: 60,
        align: 'center'
      },
        {
          title: '小区名称',
          align: 'center',
          key: 'name',
          tooltip: true,
          sortable: false
        },
        /* {
              title: '所属街道',
              align: 'center',
              tooltip:true,
              key: 'street',
              sortable: false,
              },*/
        {
          title: '所属社区',
          align: 'center',
          key: 'community',
          tooltip: true,
          sortable: false
        },
        {
          title: '所属网格',
          align: 'center',
          key: 'grid',
          tooltip: true,
          sortable: false
        },
        {
          title: '物业名称',
          align: 'center',
          tooltip: true,
          key: 'propertyName',
          sortable: false
        },
        // {
        // 	title: '物业负责人',
        // 	align: 'center',
        //   tooltip:true,
        // 	key: 'propertyPerson',
        // 	sortable: false
        // },
        {
          title: '物业电话',
          align: 'center',
          tooltip: true,
          key: 'propertyPhone',
          sortable: false,
          render: (h, params) => {
            let propertyPhone = params.row.propertyPhone
            let dataF = this.cvData.filter(item => item.id == params.row.id)
            if(dataF && dataF.length >0){
              dataF[0].propertyPhone = '="' + propertyPhone + '"'
            }
            let reg = /^(.{3}).*(.{4})$/
            let number = propertyPhone.replace(reg, '$1****$2')
            return h('Tooltip', {
              props: {
                content: number,
                placement: 'bottom',
                transfer: true
              }
            }, number)
          }
        },
        {
          title: '小区地址',
          align: 'center',
          key: 'address',
          tooltip: true,
          sortable: false
        },
        {
          title: '地图标注',
          align: 'center',
          key: 'location',
          render: (h, params) => {
            const location = params.row.location ? '已标注' : '未标注'
            const dataF = this.cvData.filter(item => item.id == params.row.id)
            dataF[0].location = location
            if (params.row.location) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.editRow(params.row)
                    }
                  }
                }, '已标注')
              ])
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },

                  on: {
                    click: () => {
                      this.editRow(params.row)
                    }
                  }
                }, '未标注')
              ])
            }
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: false,
          align: 'center',
          minWidth: 110,
          tooltip: true,
          render: (h, params) => {
            const createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
            const dataF = this.cvData.filter(item => item.id == params.row.id)
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
      var columnss = this.getBasicHousingEstateColumns()
      this.columns = columnss.filter(function(v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    },
    // excel导入数据
    importExcel() {
      this.excelUploadShow = true
    },
    // 点击列表标注 修改坐标点
    editRow(row) {
      this.editId = row.id
      this.editPosition = row.location
      if (row.location) {
        try {
          this.pointArr = JSON.parse(row.location)
        } catch (e) {}
      } else {
        this.pointArr = null
      }
      queryBasicHousingEstateList({}).then(res => {
        this.buildingData = []
        if (res && res.success) {
          res.data.records.forEach(element => {
            if (element.location) {
              this.buildingData.push({
                housingEstateName: element.name,
                location: element.location
              })
            }
          })
          this.mapShow = true
        }
      })
    },
    getResultPoint(obj, type) {
      const arr = obj.flatCoordinates
      const location = JSON.stringify(arr)
      // 修改当前行
      updateBasicHousingEstate({
        id: this.editId,
        location: location
      }).then(res => {
        if (res && res.code == 200) {
          this.$Message.success('保存成功')
          this.getDataList()
        } else {
          this.$Message.error(res.msg)
        }
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
