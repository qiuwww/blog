<style lang="less">
  .basicGridsList{
    .ivu-form-item-content > .ivu-btn {
      margin-right: 40px !important;
    }
  }

</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <Tabs style="margin-top: 5px;" value="name3">
    <!--    <TabPane label="网格划分" icon="md-apps" name="name3" v-if="permitIds.includes('archive_domain_quyu_wangge')">-->
    <TabPane v-if="true" label="网格划分" icon="md-apps" name="name3">

      <div class="search basicGridsList">
        <Card>
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="110">
              <Button
                v-if="permitIds.includes('archive_domain_quyu_wangge_add')"
                type="primary"
                icon="md-add"
                @click="addBasicGrids"
              >新增
              </Button>
              <Form-item label="创建时间">
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
              <Form-item label="所属街道">
                <Select
                  v-model="searchForm.streetId"
                  placeholder="请选择"
                  style="width: 200px"
                  clearable
                  label-in-value
                  @on-change="onStreetChange"
                >
                  <Option v-for="(item, i) in streetIdPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item v-if="drop" label="所属社区">
                <Select
                  v-model="searchForm.communityId"
                  placeholder="请选择"
                  style="width: 200px"
                  clearable
                  label-in-value
                  @on-change="handleSearch"
                >
                  <Option v-for="(item, i) in communityIdPriority" :key="item.id" :value="item.id">{{ item.name }}
                  </Option>
                </Select>
              </Form-item>

              <!--              <Form-item label="网格长" v-if="drop">-->
              <!--                <Input type="text" v-model="searchForm.gridPersonName" placeholder="请输入" clearable-->
              <!--                       style="width: 200px"/>-->
              <!--              </Form-item>-->
              <Form-item :label-width="40">
                <Input
                  v-model="searchForm.searchInfo"
                  search
                  enter-button
                  placeholder="请输入网格名/网格长"
                  @on-search="handleSearch"
                />
              </Form-item>
              <Form-item :label-width="40">
                <!--                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>-->
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
                    <DropdownItem name="import">
                      <Icon type="ios-cloud-upload-outline" />
                      批量导入
                    </DropdownItem>
                    <DropdownItem name="export">
                      <Icon type="md-arrow-down" />
                      导出本页数据
                    </DropdownItem>
                    <DropdownItem name="excelExport">
                      <Icon type="md-arrow-down" />
                      根据查询条件导出
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
              <!--              <span style="float: right;">点击右上角按钮配置动态列↑</span>-->
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
                  <Button class="btnPrimary" icon="md-eye" title="查看" @click="handleLook(row, index)" />
                </Tooltip>
                <Tooltip content="修改" placement="top">
                  <Button class="bianji" title="编辑" @click="handleEdit(row, index)" />
                </Tooltip>
                <Tooltip content="删除" placement="top">
                  <Button class="btnError" icon="ios-trash" title="删除" @click="deleteData(row, index)" />
                </Tooltip>
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
              transfer
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            />
          </Row>
        </Card>
        <updateBasicGridsPage
          v-model="updateShow"
          :basic-grids-id="BasicGridsId"
          :modal-title="title"
          @handleSearch="handleSearchPage"
        />
        <lookBasicGrids
          v-model="lookShow"
          :basic-grids-id="BasicGridsId"
          :modal-title="title"
          @handleSearch="handleSearchPage"
        />

        <plot
          v-model="mapShow"
          :obj-data="pointArr"
          :select-type="selectType"
          div-id="basicGridList"
          modal-title="选择坐标点"
          @resultPoint="getResultPoint"
        />
        <ExcelUpload
          v-model="excelUploadShow"
          modal-title="导入数据"
          :actions="actions"
          @handleSearch="handleSearchPage"
        />
      </div>
    </TabPane>
    <TabPane label="产业功能划分" icon="ios-albums-outline" name="name1">
      <list-basic-file type="1" />
    </TabPane>
    <TabPane label="生态坏境划分" icon="ios-aperture-outline" name="name2">
      <list-basic-file type="2" />
    </TabPane>
  </Tabs>
</template>
<script>
import {
  deleteBasicGrids,
  queryBasicGridsList,
  updateBasicGrids,
  exportExcel
} from '@/api/zhsq/basicGrids/basicGrids'
import { formartDate } from '@/api/tools/tool'
import updateBasicGridsPage from './updateBasicGrids'
import lookBasicGrids from './lookBasicGrids'
import ListBasicFile from '../basicFile/basicFileList'
import plot from '../../gismap/components/plot'
import { getCommunity, getDictionary, getStreet } from '../../../api'
import { mapGetters } from 'vuex'
import { baseurl} from '@/libs/axios'
import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'
export default {
  computed: {
    ...mapGetters(['permitIds'])
  },
  components: {
    updateBasicGridsPage,
    ListBasicFile,
    lookBasicGrids,
    plot,
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
      organizationPriority: [],
      selectType: 'Polygon',
      editId: '',
      editPosition: '',
      mapShow: false,
      pointArr: [],
      streetIdPriority: [],
      communityIdPriority: [],
      selectDate: [],
      drop: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      search: '',
      data: [],
      cvData: [],
      columns: this.getBasicGridsColumns(),
      openSearch: true, // 打开搜索
      openTip: true, // 打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        name: '',
        searchInfo: '',
        communityId: '',
        gridPersonName: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null, // 开始时间
        endDate: null, // 结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      total: 0,
      title: '',
      BasicGridsId: '',
      updateShow: false,
      lookShow: false,
      tableHeight: 200,
      colOptions: ['所属社区', '网格名称', '网格长', '党组织', '状态', '地图标注', '创建时间', '操作'],
      colSelect: ['所属社区', '网格名称', '网格长', '党组织', '状态', '地图标注', '创建时间', '操作'],
      excelUploadShow:false,//导入弹出框
      actions:''+baseurl+'/basicGrids/importExcel',//链接前缀
    }
  },
  mounted() {
    this.getDataList()
    getStreet({}).then(res => {
      if (res && res.success) {
        this.streetIdPriority = res.data
      }
    })

    getDictionary({ fieldName: 'organizationData' }).then(res => {
      if (res && res.success) {
        this.organizationPriority = res.data
      }
    })
  },
  methods: {
    // 列表上方更多操作
    handleDropdown(name) {
      if (name == 'refresh') {
        this.getDataList()
      } else if (name == 'removeAll') {
        this.delAll()
      }
      else if (name == 'import') {
        this.excelUploadShow = true
      } else if (name == 'export') {
        const excolumns = this.columns.filter(function(v) {
          return v.title != '操作' && v.type != 'selection'
        })
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.cvData

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
        const fileName = '区域档案.xlsx'
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
    // 时间选择事件
    selectDateRange(v) {
      if (v && v[0] && v[1] && v[0].trim().length>0 && v[1].trim().length>0) {
        this.searchForm.startDate = v[0]
        this.searchForm.endDate = v[1]
      } else {
        this.searchForm.startDate = null
        this.searchForm.endDate = null
      }
      this.handleSearch()
    },
    // 新增
    addBasicGrids() {
      this.title = '网格新增'
      this.updateShow = true
      this.BasicGridsId = ''
    },
    // 编辑
    handleEdit(row, index) {
      this.title = '网格编辑'
      this.BasicGridsId = row.id.toString()
      this.updateShow = true
    },
    // 查看
    handleLook(row, index) {
      this.title = '网格查看'
      this.BasicGridsId = row.id.toString()
      this.lookShow = true
    },
    // 分页查询
    getDataList() {
      this.loading = true
      this.searchForm.id = null
      queryBasicGridsList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false
          this.cvData = JSON.parse(JSON.stringify(res.data.records))
          this.data = res.data.records
          this.total = res.data.total
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
      deleteBasicGrids({ ids: ids }).then(res => {
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
      this.getDataList()
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
      this.searchForm.communityId = ''
      this.searchForm.streetId = ''
      this.searchForm.gridPersonName = ''
      this.searchForm.searchInfo = ''
      this.communityIdPriority = []
      this.selectCount = 0
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
    getBasicGridsColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },

        /* {
             title: '所属街道',
             align: 'center',
             key: 'streetName',
             tooltip: true,
             sortable: false
         },*/
        {
          title: '所属社区',
          align: 'center',
          key: 'communityName',
          tooltip: true,
          sortable: false
        },
        {
          title: '网格名称',
          align: 'center',
          key: 'name',
          tooltip: true,
          sortable: false
        },
        {
          title: '网格长',
          align: 'center',
          key: 'gridPersonName',
          tooltip: true,
          sortable: false
        },
        {
          // renderHeader:(h, params) => {
          //     return h('div', [
          //         h('Tooltip', {
          //             props: { placement: 'top', transfer: true }
          //         }, [
          //             h('span', {
          //                 style: {
          //                     display: 'inline-block',
          //                     width: params.column._width*0.9+'px',
          //                     overflow: 'hidden',
          //                     textOverflow: 'ellipsis',
          //                     whiteSpace: 'nowrap',
          //                 },
          //             }, '党组织'),
          //             h('span', {
          //                 slot: 'content',
          //                 style: { whiteSpace: 'normal', wordBreak: 'break-all' }
          //             },'党组织')
          //         ])
          //     ])
          // },
          title: '党组织',
          align: 'center',
          key: 'organization',
          tooltip: true,
          ellipsis: true,
          sortable: false
          // render:(h, params) => {
          //     if(params.row.organization){
          //         let filter = this.organizationPriority.filter(item => item.number == params.row.organization);
          //         if(filter && filter.length > 0){
          //             let dataF = this.cvData.filter(item => item.id == params.row.id);
          //             dataF[0].organization = filter[0].name;
          //
          //             return h('Tooltip', {
          //                 props: {
          //                     content: filter[0].name,
          //                     placement: 'bottom',
          //                     transfer: true
          //                 }
          //             }, filter[0].name)
          //         }
          //
          //     }
          // }
        },
        // {
        //     title: '状态',
        //     align: 'center',
        //     key: 'state',
        //     tooltip: true,
        //     sortable: false,
        //     render: (h, params) => {
        //         if (params.row.isDelete == 0) {
        //             let state = params.row.isDelete == 0 ? '正常' : '已删除';
        //             let dataF = this.cvData.filter(item => item.id == params.row.id);
        //             let handleStr = dataF[0].gridPersonName.replace(/[\r\n]/g, "");
        //             dataF[0].gridPersonName = handleStr;
        //             dataF[0].state = state;
        //             return h('Tag', {
        //                 props: {
        //                     color: "success"
        //                 },
        //
        //             }, "正常")
        //
        //         } else {
        //             return h('Tag', {
        //                 props: {
        //                     color: "error"
        //                 },
        //             }, "已删除")
        //         }
        //     }
        // },

        {
          title: '地图标注',
          align: 'center',
          key: 'position',
          render: (h, params) => {
            const position = params.row.position ? '已标注' : '未标注'
            const dataF = this.cvData.filter(item => item.id == params.row.id)
            dataF[0].position = position
            if (params.row.position) {
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
                }, '未标注')])
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
        /* {
            title: '排序',
            align: 'center',
            key: 'orderNumber',
            tooltip: true,
            sortable: false
        },*/
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
      var columnss = this.getTSubstancesColumns()
      this.columns = columnss.filter(function(v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    },
    // 点击列表标注 修改坐标点
    editRow(row) {
      this.editId = row.id
      this.editPosition = row.position
      if (row.position) {
        try {
          this.pointArr = JSON.parse(row.position)
        } catch (e) {
        }
      } else {
        this.pointArr = []
      }
      this.mapShow = true
    },
    getResultPoint(obj, type) {
      const arr = obj.flatCoordinates
      const position = JSON.stringify(arr)
      // 修改当前行
      updateBasicGrids({ id: this.editId, position: position }).then(res => {
        if (res && res.code == 200) {
          this.pointArr = []
          this.$Message.success('保存成功')
          this.getDataList()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 街道改变
    onStreetChange(e) {
      if (e) {
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.communityIdPriority = res.data
          }
        })
      } else {
        this.communityIdPriority = []
        this.searchForm.communityId = ''
        // this.basicGridsForm.communityName = ''
      }
      this.handleSearch()
    }
  }
}
</script>
<style scoped="less">
.operation {
  margin-bottom: 10px;
}
</style>
