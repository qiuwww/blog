<style lang="less">
.basicPersonList {
  .searchRow {
    .ivu-select {
      width: 200px;
    }

    .ivu-input-number {
      width: 190px;
    }

    .ivu-input-wrapper {
      width: 190px;
    }

    .ivu-select {
      width: 190px;
    }
    .ivu-input-group{
      width: 260px;
    }
  }
  svg g polyline {
    stroke: red;
  }
   .ivu-form-item-content > .ivu-btn {
    margin-right: 40px !important;
  }
  .ivu-table-cell-slot {
    width: 100%;
  }
  .dividerDelete {
    height: 28px;
    margin-right: 15px;
  }
}
</style>
<template>
  <div class="search basicPersonList">
    <Card>
      <Row v-show="openSearch" class="searchRow" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110">
          <Button v-if="permitIds.includes('archive_population_add')" type="primary" icon="md-add" @click="addBasicPerson">新增</Button>
          <Form-item label="人口类型">
            <Select v-model="searchForm.personType" clearable placeholder="请选择人口类型"  @on-change="handleSearch">
              <Option v-for="(item, i) in personTypeData" :key="item.id" :value="item.number.toString()">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属街道">
            <Select v-model="searchForm.streetId" clearable placeholder="请选择" label-in-value @on-change="streetChange">
              <Option v-for="(item, i) in streetData" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item  label="所属社区" v-if="drop">
            <Select v-model="searchForm.communityId" clearable placeholder="请选择" label-in-value @on-change="communityChange">
              <Option v-for="(item, i) in communityData" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item  label="所属网格" v-if="drop">
            <Select v-model="searchForm.ownedGridId" clearable placeholder="请选择"  @on-change="handleSearch">
              <Option v-for="(item, i) in gridData" :key="item.id.toString()" :value="item.id.toString()">{{ item.name }}</Option>
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
                <DropdownItem name="removeAll">
                  <Icon type="md-trash" />
                  批量删除
                </DropdownItem>
                <DropdownItem name="uploadPerson">
                  <Icon type="ios-cloud-upload-outline" />
                  批量导入
                </DropdownItem>
                <DropdownItem name="export">
                  <Icon type="md-arrow-down" />
                  导出本页数据
                </DropdownItem>
                <DropdownItem name="exportPerson">
                  <Icon type="md-arrow-down" />
                  导出人口数据
                </DropdownItem>
                <DropdownItem name="dynamicColumn">
                  <Icon type="ios-barcode-outline" />
                  动态列
                </DropdownItem>
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
            <Row type="flex" justify="center" align="middle" :gutter="2">
              <Col span="14" justify="right">
                <Tooltip content="查看详情" transfer placement="top" v-if="permitIds.includes('archive_population_chakan')">
                  <Button class="btnPrimary" icon="md-eye" @click="handleLook(row, index)"
                          v-if="permitIds.includes('archive_population_chakan')"></Button>
                </Tooltip>

                <Tooltip content="修改" transfer placement="top">
                  <!--              <Button  class="bianji"   @click="handleEdit(row, index)"  v-if="permitIds.includes('archive_population_xiugai')"></Button>-->
                  <Button class="bianji" @click="handleEdit(row, index)"
                          v-if="permitIds.includes('archive_population_xiugai')"></Button>
                </Tooltip>

                <Tooltip content="删除" transfer placement="top">
                  <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                          v-if="permitIds.includes('archive_population_delet')"></Button>

                </Tooltip>
              </Col>
              <Col span="1">
                <div class="dividerDelete"></div>
              </Col>
              <Col span="9">

                <Tooltip content="绑定房屋" transfer placement="top" v-if="permitIds.includes('archive_population_chakan')">
                  <Button class="btnBd" @click="inBind(row, index)">
                    <svg-icon icon-class="btn_bd"/>
                  </Button>
                </Tooltip>

                <Tooltip content="解绑房屋" transfer placement="top"  v-if="permitIds.includes('archive_population_chakan') && row.isBind>0">
                  <Button class="btnJb" @click="outBind(row, index)">
                    <svg-icon icon-class="btn_jb"/>
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center"  class="page">
        <Page transfer
              :current="searchForm.pageNumber"
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
    <!--        新增-->
    <updateBasicPerson
      v-model="updateShow"
      :basic-person-id="BasicPersonId"
      :modal-title="title"
      @handleSearch="handleSearchPage"
    />
    <!--        查看-->
    <lookBasicPerson
      v-model="deleteShow"
      :basic-person-id="BasicPersonId"
      :grid-name="gridName"
      :modal-title="title"
    />
    <!--        人和房屋绑定-->
    <bindHouse
      v-model="bindShow"
      :basic-person-id="BasicPersonId"
      :modal-title="title"
      @handleSearch="handleSearchPage"
    />
    <!--    解绑房屋-->
    <outBindHouse
      v-model="outBindShow"
      :basic-person-id="BasicPersonId"
      :modal-title="title"
      @handleSearch="handleSearchPage"
    />
    <ExcelUpload
      v-model="excelUploadShow"
      modal-title="导入数据"
      :actions="actions"
      @handleSearch="handleSearchPage"
    />
    <downloadVue  v-model="downloadShow"></downloadVue>
    <selectFeild  v-model="selectFeildShow"></selectFeild>
  </div>
</template>
<script>
import {
  deleteBasicPerson,
  queryBasicPersonList,
  count,
  getSpecialPersonCount,
  outBind,
  download,
  queryBasicPersonDynamicList
} from '@/api/zhsq/basicPerson/basicPerson'
import { personTypeData, communityData } from '@/api/tools/zhsqSelectData'
import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids'
import updateBasicPerson from './updateBasicPerson'
import lookBasicPerson from './lookBasicPerson'
import bindHouse from './bindHouse'
import downloadVue from './download'
import selectFeild from './selectFeild'
import { formartDate } from '@/api/tools/tool'
import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'
import { getDictionary, getStreet, getCommunity } from '@/api/index'
import outBindHouse from './outBindHouse'
import { baseurl} from '@/libs/axios'
import {mapGetters} from "vuex";
export default {
  components: {
    updateBasicPerson, lookBasicPerson, bindHouse, ExcelUpload, outBindHouse,downloadVue,selectFeild
  },
  computed: {
    ...mapGetters(["permitIds"])
  },
  data() {
    return {
      // 人口类型
      personTypeData: [],
      // 街道
      streetData: [],
      // 社区
      communityData: [],
      // 网格
      gridData: [],
      outBindShow: false,
      bindShow: false,
      uploadPersonShow: false,
      deleteShow: false,
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      search: '',
      data: [],
      csvData:[],
      isNumber:false,
      columns: this.getBasicPersonColumns(),
      openSearch: true, // 打开搜索
      openTip: true, // 打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      actions:''+baseurl+'/basicPerson/importExcel',
      searchForm: {
        // 搜索框对应data对象
        name: '',
        searchInfo:'',
        phone: null,
        cardId: '',
        personType: '',
        streetId: '',
        communityId: '',
        ownedGridId: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null, // 开始时间
        endDate: null, // 结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      gridName: '',
      total: 0,
      title: '',
      BasicPersonId: '',
      updateShow: false,
      tableHeight: 200,
      gridsData: [],
      colOptions: ['姓名', '所属小区','所属网格', '所属社区','所属街道', '房屋绑定', '人口类型', '联系电话', '创建时间', '操作'],
      colSelect: ['姓名', '所属小区','所属网格', '所属社区','所属街道', '房屋绑定', '人口类型', '联系电话', '创建时间', '操作'],
      excelUploadShow: false,
      downloadShow:false,
      selectFeildShow:false,
    }
  },
  mounted: function () {
    // 查询人口类型
    this.getPersonType()
    // 街道
    this.getStreetData();
    this.checkboxChange(this.colSelect);
    this.getDataList()


  },
  methods: {
    // 获取街道
    getStreetData() {
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetData = res.data
        }
      })
    },
    // 街道改变
    streetChange(e) {
      if (e) {
        // 社区
        this.searchForm.communityId = ''
        this.communityData = []
        // 网格
        this.searchForm.houseGridId = ''
        this.gridData = []
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.communityData = res.data
          }
        })
      }
      this.getDataList()
    },
    // 社区改变
    communityChange(e) {
      if (e) {
        // 网格
        this.searchForm.houseGridId = ''
        this.gridData = []
        queryAllList({ communityId: e.value }).then(res => {
          if (res.data.length > 0) {
            this.gridData = res.data
          }
        })
      }
      this.getDataList()
    },
    // 人口类型
    async getPersonType() {
      await getDictionary({fieldName: 'personTypeDatas'}).then(res => {
        if (res && res.success) {
          this.personTypeData = res.data;
          // this.personTypeData.push({number: 6, name: "暂无"})
        }
      })
    },
    // 人员绑定房屋
    inBind(row, index) {
      // if (row.isBind == 1) {
      //   this.$Message.error('您已经关联房屋，请勿继续操作！')
      //   return false
      // }
      this.title = '房屋绑定'
      this.bindShow = true
      this.BasicPersonId = row.id.toString()
    },
    // 解绑
    outBind(row, index) {
      if (row.isBind == 0) {
        this.$Message.error('您已为解绑状态，请勿继续操作！')
        return false
      }
      this.title = '房屋解除绑定'
      this.outBindShow = true
      this.BasicPersonId = row.id.toString()

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
        if( this.isNumber){
          this.csvData.forEach(item => {
            item.phone =item.phone?'="' + item.phone + '"':''  ;
            item.card_id = item.card_id?'="' + item.card_id + '"':"";
            item.host_card =item.host_card?  '="' + item.host_card + '"':"";
            item.host_contact =item.host_contact? '="' + item.host_contact + '"':"";
          })
        }
        this.isNumber = false;
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.csvData
        })
      } else if (name == 'uploadPerson') {
        this.excelUploadShow = true
      } else if (name == 'exportPerson') {
        this.downloadShow = true;
        // this.exportData()
      }
      else if (name == 'dynamicColumn') {
        this.selectFeildShow = true;
        // this.exportData()
      }

    },
    exportData() { // 导出人口数据
      let _this = this;
      let map = {};
      map.searchForm = _this.searchForm;
      map.Field = {"id":"id"}
      download(map).then(res => {
        const content = res
        const blob = new Blob([content], { type: 'application/ms-excel' })
        const fileName = '人口管理数据.xlsx'
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
        this.dropDownContent = '展开'
        this.dropDownIcon = 'ios-arrow-down'
      } else {
        this.dropDownContent = '收起'
        this.dropDownIcon = 'ios-arrow-up'
      }
      this.drop = !this.drop
    },
    // 新增
    addBasicPerson() {
      this.title = '新增人员'
      this.updateShow = true
      this.BasicPersonId = ''
    },
    // 编辑
    handleEdit(row, index) {
      this.title = '编辑人员'
      this.BasicPersonId = row.id.toString()
      this.updateShow = true
    },
    // 查看
    handleLook(row, index) {
      this.title = '查看人员'
      this.gridName = row.gridName
      this.BasicPersonId = row.id.toString()
      this.deleteShow = true
    },
    // 分页查询
    getDataList() {
      this.loading = true
      this.searchForm.id = null
      this.selectCount = 0;
      queryBasicPersonDynamicList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false
          this.data = res.data.records
          this.total = res.data.total
          this.csvData = JSON.parse(JSON.stringify(res.data.records))
          this.isNumber = true;
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
      deleteBasicPerson({ ids: ids }).then(res => {
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
    // 查询
    handleSearchPage() {
      this.$emit('handleSearch')
      this.searchForm.pageSize = 10
      this.getDataList()
    },
    // 重置
    handleReset() {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.searchForm.name = ''
      this.searchForm.phone = null
      this.searchForm.cardId = ''
      this.searchForm.personType = ''
      this.searchForm.streetId = ''
      this.searchForm.communityId = ''
      this.communityData = []
      this.searchForm.ownedGridId = ''
      this.searchForm.searchInfo = ''
      this.gridData = []
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
    getBasicPersonColumns() {
      var _this = this;
      return [
        {
          type: 'selection',
          align: 'center',
          tooltip: false,
          fixed: 'left',
          minWidth: 60
        },
        {
          title: '姓名',
          align: 'center',
          key: 'NAME',
          sortable: false,
          tooltip: true,
          minWidth: 80
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex',
          tooltip: true,
          sortable: false,
          minWidth: 80
        },
        {
          title: '所属小区',
          align: 'center',
          key: 'house_name',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '所属网格',
          align: 'center',
          key: 'owned_grid',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '所属社区',
          align: 'center',
          key: 'community_name',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '所属街道',
          align: 'center',
          key: 'street_name',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '人口类型',
          align: 'center',
          key: 'person_type',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '联系电话',
          align: 'center',
          key: 'phone',
          tooltip: true,
          sortable: false,
          minWidth: 120,
          render: (h, params) => {
            let reg = /^(.{3}).*(.{4})$/
            let number =  params.row.phone.replace(reg,'$1****$2')
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
          title: '楼栋号',
          align: 'center',
          key: 'build_archive_name',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '单元号',
          align: 'center',
          key: 'unit',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '楼层号',
          align: 'center',
          key: 'floor',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房号',
          align: 'center',
          key: 'door_number',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },

        {
          title: '身份证号码',
          align: 'center',
          key: 'card_id',
          tooltip: true,
          sortable: false,
          minWidth: 120,
          render: (h, params) => {
            let reg = /^(.{6}).*(.{4})$/
            let number =  params.row.card_id.replace(reg,'$1****$2')
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
          title: '民族',
          align: 'center',
          key: 'nation',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '政治面貌',
          align: 'center',
          key: 'political_face',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '党员关系管理地',
          align: 'center',
          key: 'party_relationship_managemen',
          tooltip: true,
          sortable: false,
          minWidth: 180
        },
        {
          title: '党员关系管理地址',
          align: 'center',
          key: 'party_relationship_managemen_address',
          tooltip: true,
          sortable: false,
          minWidth: 180
        },
        {
          title: '工作单位',
          align: 'center',
          key: 'work_address',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '职业',
          align: 'center',
          key: 'occupation',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '宗教信仰',
          align: 'center',
          key: 'religious_belief',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '婚姻状况',
          align: 'center',
          key: 'marital_status',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '兵役情况',
          align: 'center',
          key: 'military_service',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '是否优抚对象',
          align: 'center',
          key: 'is_preferential_treatment',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '现大病详细',
          align: 'center',
          key: 'serious_illness',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '是否残疾人',
          align: 'center',
          key: 'is_disabled',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '伤残类型',
          align: 'center',
          key: 'disability_type',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '伤残等级',
          align: 'center',
          key: 'disability_level',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '是否低保',
          align: 'center',
          key: 'is_minimum_living',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '是否失独',
          align: 'center',
          key: 'is_lonely',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '与房主关系',
          align: 'center',
          key: 'relation_ship',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房主姓名',
          align: 'center',
          key: 'host_name',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房主性别',
          align: 'center',
          key: 'host_gender',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房主身份证号码',
          align: 'center',
          key: 'host_card',
          tooltip: true,
          sortable: false,
          minWidth: 160,
          render: (h, params) => {
            let reg = /^(.{6}).*(.{4})$/
            let number =  params.row.host_card.replace(reg,'$1****$2')
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
          title: '房主联系方式',
          align: 'center',
          key: 'host_contact',
          tooltip: true,
          sortable: false,
          minWidth: 120,
          render: (h, params) => {
            let reg = /^(.{3}).*(.{4})$/
            let number =  params.row.host_contact.replace(reg,'$1****$2')
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
          title: '房主户籍地址',
          align: 'center',
          key: 'host_permanent_address',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房主现居地址',
          align: 'center',
          key: 'host_current_address',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房屋类型',
          align: 'center',
          key: 'house_type',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房屋分类',
          align: 'center',
          key: 'house_classification',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '建筑性质描述',
          align: 'center',
          key: 'house_nature_describe',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '有无物业管理',
          align: 'center',
          key: 'have_property',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '省',
          align: 'center',
          key: 'province',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '市',
          align: 'center',
          key: 'city',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '区/县',
          align: 'center',
          key: 'county',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '详细地址',
          align: 'center',
          key: 'house_address',
          tooltip: true,
          sortable: false,
          minWidth: 120
        },
        {
          title: '房屋绑定',
          align: 'center',
          key: 'isBind',
          tooltip: true,
          ellipsis: true,
          minWidth: 100,
          render: (h, params) => {
            let datad = _this.csvData.filter(item => item.id == params.row.id)
            let isBind = "";
            let type = 'success'
            params.row.isBind = 0;
            if (params.row.build_archive_name && params.row.build_archive_name.trim().length>0) {
              params.row.isBind = 1;
              datad[0].isBind = "已绑定";
              isBind ="已绑定";
            } else {
              datad[0].isBind = "未绑定";
              isBind  = "未绑定";
              type = 'error';
            }
            return h('div', [
              h('Tooltip', {
                props: {
                  content: isBind,
                  placement: 'bottom',
                  transfer: true
                }
              }, ["",  h('Button', {
                props: {
                  type: type,
                  size: 'small'
                }
              }, isBind)
              ])
            ])
          }
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'create_time',
          tooltip: true,
          minWidth: 180,
          render: (h, params) => {
            let newTime = formartDate(params.row.create_time, 'yyyy-MM-dd HH:mm:ss');
            let datad = _this.csvData.filter(item => item.id == params.row.id);
            datad[0].createTime = '="' + newTime + '"';
            return h("Tooltip", {
              props: {
                content: newTime,
                placement: 'bottom',
                transfer: true
              }
            }, newTime)
          }
        },
        {
          title: '操作',
          align: 'left',
          slot: 'action',
          fixed: 'right',
          width: 280
        }
      ]
    },
    // 动态列实现
    checkboxChange: function(data) {
      const columnss = this.getBasicPersonColumns()
      this.columns = columnss.filter(function(v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'||v.title=='操作'||v.title=='房屋绑定'
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
