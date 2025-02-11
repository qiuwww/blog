<style lang="less">
.tBuildingArchivesList {
  .ivu-form-item-content > .ivu-btn {
    margin-right: 40px !important;
  }
}
</style>
<template>
  <div class="search tBuildingArchivesList" >
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110" onSubmit="return false">
          <Button @click="addTBuildingArchives" type="primary" icon="md-add">新增</Button>

          <!--          <Form-item label="建筑名称">-->
          <!--            <Input type="text" v-model="searchForm.buildingName" placeholder="请输入" style="width: 200px"/>-->
          <!--          </Form-item>-->
          <!--          <Form-item label="建筑用途">-->
          <!--            <Select class="select-form" v-model="searchForm.buildingType" placeholder="请选择"-->
          <!--                    style="width: 200px">-->
          <!--              <Option v-for="(item, i) in buildingTypeData" :key="Math.random()" :value="item.number.toString()">{{item.name}}</Option>-->
          <!--            </Select>-->
          <!--          </Form-item>-->
          <Form-item label="所属街道">
            <Select v-model="searchForm.streetId" placeholder="请选择所属街道" style="width: 200px" @on-change="streetChange"
                    label-in-value clearable>
              <Option v-for="(item, i) in streetData" :key="item.id" :value="item.id.toString()">{{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="所属社区">
            <Select v-model="searchForm.communityId" placeholder="请选择所属社区" style="width: 200px" label-in-value
                    @on-change="communityChange" clearable>
              <Option v-for="(item, i) in communityData" :key="item.id" :value="item.id.toString()">{{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="所属网格" v-show="drop">
            <Select v-model="searchForm.grid" placeholder="请选择所属网格" style="width: 200px"  @on-change="handleSearch" clearable>
              <Option v-for="(item, i) in gridData" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label-width="40">
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入建筑名称"
                   @on-search="handleSearch"/>
          </Form-item>
          <Form-item :label-width="40">
            <!--            <Button v-if="permitIds.includes('archive_domain_sheshi_add')" @click="handleSearch" type="primary" icon="ios-search">搜索</Button>-->
            <Button @click="handleReset">重置查询</Button>

            <Dropdown @on-click="handleDropdown">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="refresh">
                  <Icon type="md-sync"/>
                  刷新
                </DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_domain_sheshi_delete')" name="removeAll">
                  <Icon type="md-trash"/>
                  批量删除
                </DropdownItem>
                <DropdownItem name="import">
                  <Icon type="ios-cloud-upload-outline" />
                  批量导入
                </DropdownItem>
                <DropdownItem name="export" v-if="permitIds.includes('archive_domain_sheshi_export')">
                  <Icon type="md-arrow-down"/>
                  导出本页数据
                </DropdownItem>
                <DropdownItem name="excelExport" v-if="permitIds.includes('archive_domain_sheshi_export')">
                  <Icon type="md-arrow-down"/>
                  根据查询条件导出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <a class="drop-down" @click="dropDown">
              {{ dropDownContent }}
              <Icon :type="dropDownIcon"></Icon>
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
        <Table :loading="loading" stripe :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">
            <Tooltip content="查看详情" placement="top">
              <Button class="btnPrimary" icon="md-eye" @click="handleLook(row, index)"
                      v-if="permitIds.includes('archive_domain_sheshi_see')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button class="bianji" @click="handleEdit(row, index)"
                      v-if="permitIds.includes('archive_domain_sheshi_bianji')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                      v-if="permitIds.includes('archive_domain_sheshi_delete')"></Button>
            </Tooltip>

          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
              @on-change="changePage" @on-page-size-change="changePageSize" :transfer="true"
              :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
      </Row>
    </Card>
    <updateTBuildingArchivesView v-model="updateShow" :TBuildingArchivesId="TBuildingArchivesId" :modalTitle="title"
                                 v-on:handleSearch="handleSearchPage"></updateTBuildingArchivesView>
    <lookBuildingArchives v-model="lookShow" :TBuildingArchivesId="TBuildingArchivesId"
                          :modalTitle="title"  ></lookBuildingArchives>
    <plot v-model="mapShow" @resultPoint="getResultPoint" :objData="pointArr" :selectType="selectType"
          :buildingData="buildingData"
          divId="basicGridList" modalTitle="选择坐标点"></plot>
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
  deleteTBuildingArchives,
  queryTBuildingArchivesList,
  updateTBuildingArchives,
  exportExcel,
  getOtherPolygonData
} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
import {formartDate} from '@/api/tools/tool'
import updateTBuildingArchivesView from './updateTBuildingArchives'
import lookBuildingArchives from './lookBuildingArchives'
import {queryAllList as gridsQueryAllList} from '@/api/zhsq/basicGrids/basicGrids'
import {queryAllList} from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
import plot from "@/views/gismap/components/plot";
import {queryBasicHousingManageList} from '@/api/zhsq/basicHouse/basicHouse'
import {communityData, BuildingType} from '@/api/tools/zhsqSelectData'
import * as olExtent from "ol/extent";
import {getStreet, getCommunity, getDictionary} from '@/api/index'
import {mapGetters} from "vuex";
import { baseurl} from '@/libs/axios'
import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'

export default {
  computed: {
    ...mapGetters(["permitIds"])
  },
  components: {
    updateTBuildingArchivesView,
    lookBuildingArchives,
    plot,
    ExcelUpload
  },
  data() {
    return {
      selectType: 'Polygon',
      pointArr: [],
      buildingData: [],
      mapShow: false,
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      search: '',
      data: [],
      cvData: [],
      columns: this.getTBuildingArchivesColumns(),
      openSearch: true,//打开搜索
      openTip: true,//打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        buildingType: '1',
        buildingName: '',
        streetId: '',
        community: '',
        communityId: '',
        grid: '',
        searchInfo: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null,//开始时间
        endDate: null,//结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      total: 0,
      title: '',
      TBuildingArchivesId: '',
      updateShow: false,
      tableHeight: 200,
      colOptions: ["建筑名称", "建筑用途", "所属社区", "所属网格", "所属小区", "地图标注", "创建时间", "操作"],
      colSelect: ["建筑名称", "建筑用途", "所属社区", "所属网格", "所属小区", "地图标注", "创建时间", "操作"],
      selectDate: [],
      lookShow: false,
      showSearch: false,
      gridPriority: [],
      housingEstateData: [],
      gridName: '',
      housingEstateName: '',
      //建筑类型
      buildingTypeData: [],
      //社区数据
      communityData: [],
      streetData: [],
      gridData: [],
      excelUploadShow:false,//导入弹出框
      actions:''+baseurl+'/tBuildingArchives/importExcel',//链接前缀
    }
  },
  methods: {
    //社区改变
    communityChange(e) {
      if (e) {
        //网格
        this.searchForm.grid = "";
        this.gridData = [];

        gridsQueryAllList({communityId: e.value}).then(res => {
          if (res && res.success) {
            this.gridData = res.data;
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新');
          }
        });
      }
      this.handleSearch();
    },
    //街道改变
    streetChange(e) {
      if (e) {
        //社区
        this.searchForm.communityId = "";
        this.communityData = [];
        //网格
        this.searchForm.grid = "";
        this.gridData = [];

        getCommunity({streetId: e.value}).then(res => {
          if (res && res.success) {
            this.communityData = res.data;
          } else {
            this.$Message.error('获取社区数据失败，请重新刷新');
          }
        });
      }
      this.handleSearch();
    },
    //获取街道
    getStreetData() {
      getStreet({}).then(res => {
        this.streetData = res.data;
      })
    },
    //获取建筑类型
    getBuildingTypeData() {
      getDictionary({fieldName: 'building_type'}).then(res => {
        if (res && res.success) {
          this.buildingTypeData = res.data;
        }
      });
    },
    //列表上方更多操作
    handleDropdown(name) {
      if (name == "refresh") {
        this.getDataList();
      } else if (name == "removeAll") {
        this.delAll();
      }else if (name == 'import') {
        this.excelUploadShow = true
      } else if (name == "export") {
        let excolumns = this.columns.filter(function (v) {
          return v.title != "操作" && v.type != 'selection'
        });
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.cvData,
        });
      } else if (name == "excelExport") {
        this.excelData();
      }
    },
    //导出查询数据
    excelData() {
      var _this = this;
      exportExcel(_this.searchForm).then(res => {
        const content = res;
        const blob = new Blob([content], {type: 'application/ms-excel'});
        const fileName = '设施档案.xlsx';
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
        _this.isExportShow = false;
      }).catch(function (error) {
        _this.$Message.error('数据导出失败');
        _this.isExportShow = false;
      });
    },
    //展开 收起
    dropDown() {
      if (this.drop) {
        this.dropDownContent = "展开";
        this.dropDownIcon = "ios-arrow-down";
        this.showSearch = true;
      } else {
        this.dropDownContent = "收起";
        this.dropDownIcon = "ios-arrow-up";
        this.showSearch = false;
      }
      this.drop = !this.drop;
    },
    //新增
    addTBuildingArchives() {
      this.title = '楼栋新增';
      this.updateShow = true;
      this.TBuildingArchivesId = '';
    },
    //编辑
    handleEdit(row, index) {
      this.title = '楼栋编辑';
      this.TBuildingArchivesId = row.id.toString();
      this.updateShow = true;
    },
    //查看
    handleLook(row, index) {
      this.title = '楼栋查看';
      this.housingEstateName = row.housingEstateName;
      this.gridName = row.gridName;
      this.TBuildingArchivesId = row.id.toString();
      this.lookShow = true;
    },
    //分页查询
    getDataList() {
      this.loading = true;
      this.searchForm.id = null;
      this.selectCount = 0;
      this.getGridPriority();
      //清空选择项
      this.clearSelectAll();
    },
    //单一删除
    deleteData(row, index) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所点击选的数据?",
        loading: true,
        onOk: () => {
          this.userLoading = true;
          var ids = [];
          ids.push(row.id);
          this.patchdeleteData(ids);
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！');
        },
      });
    },
    //批量删除
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据');
        return;
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function (e) {
            ids.push(e.id);
          });
          this.patchdeleteData(ids);
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！');
        }
      });
    },
    //删除（后台）
    patchdeleteData(ids) {
      if (ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error('没有选择的数据');
        return;
      }
      deleteTBuildingArchives({ids: ids}).then(res => {
        this.userLoading = false;
        this.$Modal.remove();
        if (res && res.success) {
          this.modalTaskVisible = false;
          this.$Message.success('删除成功');
          this.getDataList();
        } else {
          this.$Message.error('删除失败');
        }
      });
    },
    //改变页码
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    //改变每页显示数据的条数
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    //改变排序方式
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == 'normal') {
        this.searchForm.order = '';
      }
      this.getDataList();
    },
    //查询
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    //查询
    handleSearchPage() {
      this.getDataList();
    },
    //重置
    handleReset() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.communityId = "";
      this.communityData = [];
      this.searchForm.streetId = "";
      this.searchForm.grid = "";
      this.gridData = [];
      this.searchForm.buildingType = '1';
      this.searchForm.buildingName = '';
      this.searchForm.searchInfo = '';
      // 重新加载数据
      this.getDataList();
    },
    //显示选择
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    //清空选择
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    //获取列表字段
    getTBuildingArchivesColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '建筑名称',
          align: 'center',
          tooltip: true,
          ellipsis: true,
          key: 'buildingName',
          sortable: false,
          minWidth: 100,
          render: (h, params) => {
            if (params.row.buildingName) {
              let buildingName = params.row.housingEstate + params.row.buildingName + "号楼";
              let datad = this.cvData.filter(item => item.id == params.row.id);
              datad[0].buildingName = buildingName;
              return h("Tooltip", {
                props: {
                  content: buildingName,
                  placement: 'bottom',
                  transfer: true
                }
              }, buildingName)
            } else {
              return h("Tooltip", {
                props: {
                  content: params.row.buildingName,
                  placement: 'bottom',
                  transfer: true
                }
              }, params.row.buildingName)
            }

          }
        },
        {
          title: '建筑用途',
          align: 'center',
          key: 'buildingTypeName',
          tooltip: true,
          sortable: false,
          minWidth: 100
        },
        {
          title: '所属社区',
          align: 'center',
          key: 'community',
          tooltip: true,
          ellipsis: true,
          sortable: false,
          minWidth: 100
        },
        {
          title: '所属网格',
          align: 'center',
          key: 'grid',
          tooltip: true,
          ellipsis: true,
          sortable: false,
          minWidth: 100,
          render: (h, params) => {
            if (params.row.grid) {
              var item = this.gridPriority.filter(function (item) {
                return item.id == params.row.grid
              });
              if (item.length > 0) {
                params.row.grid = item[0].name;
                let dataF = this.cvData.filter(item => item.id == params.row.id);
                dataF[0].grid = item[0].name;
              }
              if (item && item[0]) {
                params.row["gridName"] = item[0].name;
                return h("Tooltip", {
                  props: {
                    content: item[0].name,
                    placement: 'bottom',
                    transfer: true
                  }
                }, item[0].name)
              } else {
                return h("Tooltip", {
                  props: {
                    content: params.row.grid,
                    placement: 'bottom',
                    transfer: true
                  }
                }, params.row.grid)
              }
            }
          }
        },
        {
          title: '所属小区',
          align: 'center',
          key: 'housingEstate',
          sortable: false,
          minWidth: 100,
          render: (h, params) => {
            if (params.row.housingEstate) {
              var item = this.housingEstateData.filter(function (item) {
                return item.id == params.row.housingEstate
              });
              if (item.length > 0) {
                params.row.housingEstate = item[0].name;
                let dataF = this.cvData.filter(item => item.id == params.row.id);
                dataF[0].housingEstate = item[0].name;
              }
              if (item && item[0]) {
                params.row["housingEstateName"] = item[0].name;
                return h("Tooltip", {
                  props: {
                    content: item[0].name,
                    placement: 'bottom',
                    transfer: true
                  }
                }, item[0].name)
              } else {
                return h("Tooltip", {
                  props: {
                    content: params.row.housingEstate,
                    placement: 'bottom',
                    transfer: true
                  }
                }, params.row.housingEstate)
              }
            }
          }
        },
        /* {
             title: '建筑地址',
             align: 'center',
             tooltip: true,
             key: 'buildingAddress',
             sortable: false,
             minWidth: 100
         },*/
        {
          title: '地图标注',
          align: 'center',
          key: 'location',
          minWidth: 100,
          render: (h, params) => {
            let location = params.row.location ? '已标注' : '未标注';
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            dataF[0].location = location;
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
                    },
                  },
                }, "已标注"),
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
                    },
                  },
                }, '未标注')])
            }
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: false,
          align: 'center',
          minWidth: 170,
          tooltip: true,
          render: (h, params) => {
            let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            dataF[0].createTime = '="' + createTime + '"';
            return h('div',
              formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
            )
          }
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 220,
        }
      ]
    },
    //动态列实现
    checkboxChange: function (data) {
      var columnss = this.getTBuildingArchivesColumns();
      this.columns = columnss.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    },
    //所属网格
    getGridPriority() {
      var _this = this;
      gridsQueryAllList().then(res => {
        if (res && res.success) {
          _this.gridPriority = res.data;
          _this.getHousingEstateData();
        }
      });
    },
    //获取小区数据
    getHousingEstateData(data) {
      var _this = this;
      queryAllList(data).then(res => {
        if (res && res.success) {
          _this.housingEstateData = res.data;
          _this.getTableData();
        }
      })
    },
    //table数据
    getTableData() {
      queryTBuildingArchivesList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false;
          this.cvData = JSON.parse(JSON.stringify(res.data.records));
          this.data = res.data.records;
          this.total = res.data.total;
          //建筑类型
          this.getBuildingTypeData();
        }
      });
    },
    editRow(row) {
      this.editId = row.id;
      if (row.location) {
        try {
          this.pointArr = JSON.parse(row.location);
        } catch (e) {
        }
      } else {
        this.pointArr = null;
      }

      getOtherPolygonData({id: row.id}).then(res => {
        if (res && res.success) {
          this.buildingData = res.data
        }
      })
      this.mapShow = true;
    },
    getResultPoint(obj, type) {
      let arr = obj.flatCoordinates;
      let location = JSON.stringify(arr);
      var data = [];
      var newArr = [];
      for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
        if (i % 2 == 1) {
          data.push(newArr);
          newArr = [];
        }
      }
      var extentData = olExtent.boundingExtent(data); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
      var center = olExtent.getCenter(extentData);
      center = JSON.stringify(center);
      //修改当前行
      updateTBuildingArchives({id: this.editId, location: location, centerPoint: center}).then(res => {
        if (res && res.code == 200) {
          this.$Message.success('保存成功');
          this.getDataList();
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
  },
  mounted() {
    this.getDataList();
    this.getStreetData()
  }
}
</script>
<style scoped="less">
.operation {
  margin-bottom: 10px;
}
</style>
