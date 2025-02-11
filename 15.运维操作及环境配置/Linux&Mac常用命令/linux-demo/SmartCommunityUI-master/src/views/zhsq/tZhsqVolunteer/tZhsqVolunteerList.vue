<style lang="less" scoped>
.tZhsqVolunteerList {
  .ivu-form .ivu-form-item-label {
    text-align: left;
    padding: 0px 0px 0px 0;
  }
  .searchButton {
    margin-left: -88px !important;
  }
  .ivu-input-group{
    width: 260px;
  }
}

</style>
<template>
  <div class="search tZhsqVolunteerList">
    <Card>
      <Row v-show="openSearch" >
        <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
          <Button type="primary" icon="md-add" @click="addTZhsqVolunteer" v-if="permitIds.includes('archive_staff_volunteer_postulant_add')">新增</Button>

          <Form-item  label="申请时间" :label-width="110">
            <DatePicker
              v-model="selectDate"
              type="daterange"
              format="yyyy-MM-dd"
              clearable
              placeholder="选择起始时间"
              style="width: 200px"
              @on-change="selectDateRange"
              :options="buildingYearOptions"
            />
          </Form-item>
<!--          <Form-item label="姓名">-->
<!--            <Input v-model="searchForm.name" type="text" placeholder="请输入姓名" clearable style="width: 200px"/>-->
<!--          </Form-item>-->
<!--          <Form-item label="手机号">-->
<!--            <Input v-model="searchForm.phone" type="text" placeholder="请输入手机号" clearable style="width: 200px"/>-->
<!--          </Form-item>-->

          <FormItem label="所属街道" >
            <Select v-model="searchForm.houseStreetId" placeholder="请选择" clearable style="width: 200px;"
                    label-in-value     @on-change="onStreetChange">
              <Option v-for="(item, i) in houseStreetPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>

          <FormItem  label="所属社区" v-if="drop">
            <Select v-model="searchForm.houseCommunityId" label-in-value  placeholder="请选择社区" clearable style="width: 200px;"
                    @on-change="communityChange">
              <Option v-for="(item, i) in houseCommunityPriority" :key="item.id" :value="item.id">{{
                  item.name
                }}
              </Option>
            </Select>
          </FormItem>
          <FormItem v-if="drop" label="所属网格" :label-width="110">
            <Select v-model="searchForm.houseGrid" placeholder="请选择网格" @on-change="getDataList" clearable style="width: 200px;">
              <Option v-for="(item, i) in gridData" :key="i" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem v-if="drop" label="是否党员" :label-width="110">
            <Select v-model="searchForm.isPartyMember" placeholder="请选择" @on-change="getDataList" clearable style="width: 200px;">
              <Option value="是">是</Option>
              <Option value="否">否</Option>
            </Select>
          </FormItem>
          <Form-item v-if="drop" label="审核状态" :label-width="110">
            <Select v-model="searchForm.state" placeholder="请选择" @on-change="getDataList" clearable style="width: 200px;">
              <Option v-for="(item,i) in statePriority" :key="i" :value="item.name">{{ item.label }}</Option>
            </Select>

          </Form-item >
          <Form-item :label-width="40" >
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入姓名/手机号/身份证号码" @on-search = "handleSearch"/>

          </Form-item>
          <Form-item class="br" :label-width="40">

<!--            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>-->
            <Button @click="handleReset">重置查询</Button>
            <Dropdown @on-click="handleDropdown" style="margin-left: 40px;">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="refresh">
                  <Icon type="md-sync"/>
                  刷新
                </DropdownItem>
                <DropdownItem name="removeAll">
                  <Icon type="md-trash"/>
                  批量删除
                </DropdownItem>
                <DropdownItem name="import">
                  <Icon type="ios-cloud-upload-outline" />
                  批量导入
                </DropdownItem>
                <DropdownItem name="export">
                  <Icon type="md-arrow-down"/>
                  导出本页数据
                </DropdownItem>
                <DropdownItem name="excelExport">
                  <Icon type="md-arrow-down"/>
                  根据查询条件导出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <a class="drop-down" @click="dropDown" style="margin-left: 40px;">
              {{ dropDownContent }}
              <Icon :type="dropDownIcon"/>
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
          ellipsis="true"
          @on-sort-change="changeSort"
          @on-selection-change="showSelect"
        >
          <template slot="action" slot-scope="{ row, index }">

            <Tooltip content="查看详情" placement="top" v-if="permitIds.includes('archive_staff_volunteer_postulant_see')">
              <Button  class="btnPrimary"  icon="md-eye"   @click="handleLook(row, index)" ></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top" v-if="permitIds.includes('archive_staff_volunteer_postulant_update')">
              <Button  class="bianji"   @click="handleEdit(row, index)"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top" v-if="permitIds.includes('archive_staff_volunteer_postulant_delete')">
              <Button  class="btnError"  icon="ios-trash"   @click="deleteData(row, index)" ></Button>
            </Tooltip>
            <Tooltip content="绑定房屋" placement="top" v-if="permitIds.includes('archive_staff_volunteer_postulant_see')">
              <Button  class="btnBd"    @click="inBind(row, index)" ><svg-icon icon-class="btn_bd" /></Button>
            </Tooltip>
            <Tooltip content="解绑房屋" placement="top"  v-if="permitIds.includes('archive_staff_volunteer_postulant_see')">
              <Button  class="btnJb"    @click="outBind(row, index)" ><svg-icon icon-class="btn_jb" /></Button>
            </Tooltip>
<!--            <Tooltip content="审核" placement="top" v-if="row.state=='0' && permitIds.includes('archive_staff_volunteer_postulant_examine')" name="edit">-->
<!--              <Button  class="btnPrimary"  icon="ios-power"   @click="examineData(row, index)"></Button>-->
<!--            </Tooltip>-->
<!--            <Dropdown v-if="row.state!=2" :transfer="true">-->


<!--              <Button>-->
<!--                更多操作-->
<!--                <Icon type="md-arrow-dropdown"/>-->
<!--              </Button>-->
<!--              <DropdownMenu slot="list">-->
<!--                <DropdownItem name="inBind" @click.native="inBind(row,index)">-->
<!--                  <Icon type="ios-link"/>-->
<!--                  绑定房屋-->
<!--                </DropdownItem>-->
<!--                <DropdownItem name="outBind" @click.native="outBind(row,index)">-->
<!--                  <Icon type="ios-close-circle-outline"/>-->
<!--                  解绑房屋-->
<!--                </DropdownItem>-->
<!--                <DropdownItem name="edit" @click.native="handleEdit(row, index)">-->
<!--                  <Icon type="md-create"/>-->
<!--                  修改-->
<!--                </DropdownItem>-->
<!--                <DropdownItem name="delete" @click.native="deleteData(row, index) ">-->
<!--                  <Icon type="ios-trash"/>-->
<!--                  删除-->
<!--                </DropdownItem>-->
<!--                <DropdownItem v-if="row.state=='0'" name="edit" @click.native="examineData(row, index)">-->
<!--                  <Icon type="ios-power"/>-->
<!--                  审核-->
<!--                </DropdownItem>-->

<!--              </DropdownMenu>-->
<!--            </Dropdown>-->
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
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
    <updateTZhsqVolunteer
      v-model="updateShow"
      :t-zhsq-volunteer-id="TZhsqVolunteerId"
      :modal-title="title"
      v-on:handleSearch="getDataList"
    />
    <lookTZhsqVolunteer
      v-model="lookShow"
      :t-zhsq-volunteer-id="TZhsqVolunteerId"
      :modal-title="title"
      v-on:handleSearch="getDataList"
      :modalTitleDisabled="modalTitleDisabled"
    />
    <bindHouse v-model="bindShow" :basic-id="TZhsqVolunteerId" :modal-title="title" table-name="TZhsqVolunteer"
               v-on:handleSearch="getDataList"/>
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
  deleteTZhsqVolunteer,
  queryTZhsqVolunteerList,
  updateTZhsqVolunteer as update, exportExcel
} from '@/api/zhsq/tZhsqVolunteer/tZhsqVolunteer'
import {formartDate} from '@/api/tools/tool'
import updateTZhsqVolunteer from './updateTZhsqVolunteer'
import lookTZhsqVolunteer from './lookTZhsqVolunteer'
import bindHouse from './bindHouse'
import {getCommunity, getDictionary, getStreet} from '../../../api'
import {queryAllList as gridsQueryAllList, queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
import {communityData, sexData, streetData, auditStatusState} from '@/api/tools/zhsqSelectData'
import {mapGetters} from "vuex";
import { baseurl} from '@/libs/axios'
import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'
export default {
  name: 'TZhsqVolunteerList',
  components: {
    updateTZhsqVolunteer,
    lookTZhsqVolunteer,
    bindHouse,
    ExcelUpload
  },
  computed: {
    ...mapGetters(["permitIds"])
  },
  data() {
    return {
      bindShow: false,
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      search: '',
      data: [],
      selectDate: [],
      columns: this.getTZhsqVolunteerColumns(),
      openSearch: true, // 打开搜索
      openTip: true, // 打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        name: '',
        sex: '',
        idCard: '',
        houseStreet: '',
        houseGrid: '',
        houseStreetId: '',
        houseCommunityId: '',
        houseCommunity: '',
        isPartyMember: '',
        state: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null, // 开始时间
        endDate: null, // 结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      total: 0,
      title: '',
      TZhsqVolunteerId: '',
      updateShow: false,
      lookShow: false,
      tableHeight: 200,
      gridData: [],
      houseStreetPriority: [],
      houseCommunityPriority: [],
      statePriority: [],
      colOptions: ['姓名', '性别', '手机号', '所属社区', '所属网格', '是否为党员', '审核状态', '房屋绑定', '申请时间', '操作'],
      colSelect: ['姓名', '性别', '手机号', '所属社区', '所属网格', '是否为党员', '审核状态', '房屋绑定', '申请时间', '操作'],
      csvData: [],
      isNumber:false,
      modalTitleDisabled:false,
      //时间控件限定
      buildingYearOptions: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      },
      excelUploadShow:false,//导入弹出框
      actions:''+baseurl+'/tZhsqVolunteer/importExcel',//链接前缀
    }
  },
  mounted() {
    this.getDataList()
    this.getRadio()

    getStreet({}).then(res => {
      if (res && res.success) {
        this.houseStreetPriority = res.data
      }
    })
    // this.tableHeight = window.innerHeight - this.$refs.tZhsqVolunteerTable.$el.offsetTop - 270
  },
  methods: {

    inBind(row, index) {
      if (row.houseId && row.houseId.trim().length > 0) {
        this.$Message.error('您已经关联房屋，请勿继续操作！')
        return false
      }
      this.title = '房屋绑定'
      this.bindShow = true
      this.TZhsqVolunteerId = row.id.toString()
    },
    // 解绑
    outBind(row, index) {
      if (row.houseId == undefined || row.houseId == null || row.houseId.trim().length == 0) {
        this.$Message.error('您已为解绑状态，请勿继续操作！')
        return false
      }
      if (row.id) {
        this.$Modal.confirm({
          title: '解除绑定',
          content: '您确认要解除‘' + row.name + '’和房屋的绑定吗?',
          loading: true,
          onOk: () => {
            this.userLoading = true
            const data = {}
            data.id = row.id
            data.homeAddress = '',
              data.houseId = '',
              update(data).then(res => {
                this.userLoading = false
                if (res && res.code == 200) {
                  this.bindShow = false
                  this.$Message.success('解绑成功')
                  this.getDataList()
                  this.$Modal.remove()
                } else {
                  this.$Message.error(res.msg)
                }
              })
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！')
          }
        })
      } else {
        this.$Message.error('获取参数失败，请联系管理员！')
        return false
      }
    },
    // 社区改变
    // selectCommunity(v){
    // 	this.gridItem({"communityId":v});
    // 	this.searchForm.houseGrid="";
    // },
    onStreetChange(e) {
      if (e) {
        getCommunity({streetId: e.value}).then(res => {
          if (res && res.success) {
            this.houseCommunityPriority = res.data
          }
        })
      } else {
        this.houseCommunityPriority = []
        this.searchForm.houseCommunityId = ''
      }

      this.gridData = []
      this.searchForm.houseGrid = ''
      this.searchForm.houseCommunityId = ''
      this.handleSearch();
    },
    // 社区改变
    communityChange(e) {
      if (e) {
        queryAllList({communityId: e.value}).then(res => {
          if (res.data.length > 0) {
            this.gridData = res.data
          } else {
            this.gridData = []
            this.searchForm.houseGrid = ''
          }
        })
      } else {
        this.gridArr = []
        this.searchForm.gridId = ''
      }
      this.handleSearch();
    },
    // 列表上方更多操作
    handleDropdown(name) {
      if (name == 'refresh') {
        this.getDataList()
      } else if (name == 'removeAll') {
        this.delAll()
      }else if (name == 'import') {
        this.excelUploadShow = true
      } else if (name == 'export') {
        const excolumns = this.columns.filter(function (v) {
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
        const blob = new Blob([content], {type: 'application/ms-excel'})
        const fileName = '导出志愿者档案.xlsx'
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
      }).catch(function (error) {
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
      this.getDataList();
    },
    // 新增
    addTZhsqVolunteer() {
      this.title = '街道志愿者新增'
      this.updateShow = true
      this.TZhsqVolunteerId = ''
    },
    // 编辑
    handleEdit(row, index) {
      this.title = '街道志愿者编辑'
      this.TZhsqVolunteerId = row.id.toString()
      this.updateShow = true
    },
    // 查看
    handleLook(row, index) {
      this.title = '街道志愿者查看'
      if(row.state=="0"){
        this.modalTitleDisabled= true;
      }
      else {
        this.modalTitleDisabled= false;
      }
      this.TZhsqVolunteerId = row.id.toString()
      this.lookShow = true
    },
    // 审核
    examineData(row, index) {
      this.title = '街道志愿者审核'
      this.TZhsqVolunteerId = row.id.toString()
      this.lookShow = true
    },
    // 分页查询
    getDataList() {

      this.clearSelectAll()
      this.selectCount = 0;
      this.loading = true
      this.searchForm.id = null
      queryTZhsqVolunteerList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false
          this.data = res.data.records
          this.csvData = JSON.parse(JSON.stringify(res.data.records))
          this.total = res.data.total
          this.isNumber = true
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
          this.selectList.forEach(function (e) {
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

      deleteTZhsqVolunteer({ids: ids}).then(res => {
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
      this.$refs.searchForm.resetFields()
      this.houseCommunityPriority = []
      this.gridData = []
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.searchForm.startDate = null
      this.searchForm.endDate = null
      this.selectDate = null
      this.searchForm.name = ''
      this.searchForm.sex = ''
      this.searchForm.phone = ''
      this.searchForm.idCard = ''
      this.searchForm.houseStreetId = ''
      this.searchForm.houseCommunityId = ''
      this.searchForm.isPartyMember = ''
      this.searchForm.state = ''
      this.searchForm.houseGrid = ''
      this.searchForm.searchInfo = ''

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
    getTZhsqVolunteerColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          tooltip: true,
          align: 'center',
          key: 'name',
          minWidth: 100,
          sortable: false
        },
        {
          title: '性别',
          tooltip: true,
          align: 'center',
          key: 'sex',
          minWidth: 100,
          sortable: false,
        },
        {
          title: '手机号',
          tooltip: true,
          align: 'center',
          key: 'phone',
          minWidth: 100,
          sortable: false,
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
          title: '所属社区',
          tooltip: true,
          align: 'center',
          ellipsis: true,
          key: 'houseCommunity',
          minWidth: 100,
          sortable: false
        },
        {
          title: '所属网格',
          align: 'center',
          key: 'houseGridName',
          ellipsis: true,
          sortable: false,
          minWidth: 100,
          tooltip: true

        },

        {
          title: '是否为党员',
          tooltip: true,
          align: 'center',
          key: 'isPartyMember',
          sortable: false,
          width: 110,
        },
        /* {
                        title: '家庭住址',
                        tooltip: true,
                        align: 'center',
                        key: 'homeAddress',
                        sortable: false
                    },*/

        {
          title: '审核状态',
          ellipsis: true,
          align: 'center',
          key: 'state',
          sortable: false,
          minWidth: 100,
          render: (h, params) => {
            if (params.row.state != undefined && params.row.state != null) {
              const csvDataF = this.csvData.filter(item => item.id == params.row.id)
              let state = ''
              if (params.row.state == '0') {
                state = '审核中'
                csvDataF[0].state = '审核中'
              } else if (params.row.state == '1') {
                state = '已通过'
                csvDataF[0].state = '已通过'
              } else if (params.row.state == '2') {
                state = '审核驳回'
                csvDataF[0].state = '审核驳回'
              }

              return h('Tooltip', {
                props: {
                  content: state,
                  placement: 'bottom',
                  transfer: true
                }
              }, state)
            }
            return h('div', '')
          }
        },
        {
          title: '房屋绑定',
          align: 'center',
          key: 'isBind',
          ellipsis: true,
          minWidth: 100,
          render: (h, param) => {
            let csvDataF = this.csvData.filter(item => item.id == param.row.id);
            if (param.row.houseId && param.row.houseId.trim().length > 0) {
              csvDataF[0].isBind = "已绑定";
              return h('Tooltip', {
                props: {
                  content: '已绑定',
                  placement: 'bottom',
                  transfer: true
                },
                style: {
                  color: 'green'
                }
              }, '已绑定');
            } else {
              csvDataF[0].isBind = "未绑定";
              return h('Tooltip', {
                props: {
                  content: '未绑定',
                  placement: 'bottom',
                  transfer: true
                },
                style: {
                  color: 'red'
                }
              }, '未绑定');
            }
          }
        },
        {
          title: '申请时间',
          key: 'applicationTime',
          sortable: false,
          align: 'center',
          ellipsis: true,
          minWidth: 100,
          render: (h, params) => {
            const applicationTime = params.row.applicationTime
            const dataF = this.csvData.filter(item => item.id == params.row.id)
            dataF[0].applicationTime = '="' + applicationTime + '"'
            return h('Tooltip', {
              props: {
                content: applicationTime,
                placement: 'bottom',
                transfer: true
              }
            }, applicationTime)
          }

        },
        // {
        //     title: '创建时间',
        //     key: 'createTime',
        //     sortable: false,
        //     align: 'center',
        //     tooltip: true,
        //     width: 180,
        //     render: (h, params) => {
        //       let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
        //       let dataF = this.csvData.filter(item=>item.id == params.row.id);
        //       dataF[0].createTime = '="'+createTime+'"';
        //       return h('Tooltip',{
        //         props:{
        //           content:createTime,
        //           placement:'bottom',
        //           transfer:true
        //         }
        //       },createTime)
        //     }

        // },

        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 310
        }
      ]
    },
    // 动态列实现
    checkboxChange: function (data) {
      var columnss = this.getTZhsqVolunteerColumns()
      this.columns = columnss.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    },
    // 获取下拉框以及单选按钮的选项
    getRadio() {
      this.statePriority = auditStatusState
      // this.houseStreetPriority = streetData;
      // this.houseCommunityPriority = communityData;
      // this.getGrids();
    }
    // gridItem(data){
    // 	if(data.communityId){
    // 		queryAllList(data).then(res => {
    // 			if(res && res.success){
    // 				this.gridData = res.data;
    // 			}else {
    // 				this.$Message.error('获取网格数据失败，请重新刷新');
    // 			}
    // 		})
    // 	}else{
    // 		this.gridData = [];
    // 	}
    // },
    // 获取网格
    // getGrids(data) {
    //     gridsQueryAllList(data).then(res => {

    //         if (res && res.code == 200) {
    //             this.gridData = res.data;
    //         }
    //     });
    // },
  }
}
</script>
<style scoped="less">
.operation {
  margin-bottom: 10px;
}
</style>
