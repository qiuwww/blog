<style lang="less">
  .basicHouseManageList{
    .ivu-form-item-content > .ivu-btn {
      margin-right: 40px !important;
    }
    .searchForm .ivu-select {
      width: 200px;
    }
  }
</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <div class="search basicHouseManageList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110" class="searchForm">
          <Button v-if="permitIds.includes('archive_buildings_fangwu_add')" @click="addBasicHousingManage"
                  type="primary" icon="md-add">新增
          </Button>

          <Form-item label="所属街道">
            <Select v-model="searchForm.houseStreetId" placeholder="请选择" clearable @on-change="streetChange" label-in-value>
              <Option v-for="(item, i)  in streetData" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属社区">
            <Select v-model="searchForm.houseCommunityId" placeholder="请选择" clearable @on-change="communityChange" label-in-value>
              <Option v-for="(item, i)  in communityData" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属网格" v-show="searchShow">
            <Select v-model="searchForm.houseGridId" placeholder="请选择" clearable label-in-value @on-change="gridChange">
              <Option v-for="(item, i) in gridData" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="小区名称" v-show="searchShow">
            <Select v-model="searchForm.houseId" placeholder="请选择" clearable label-in-value  @on-change="handleSearch">
              <Option v-for="(item, i) in houseData" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <!--          <Form-item label="房屋地址" v-show="searchShow">-->
          <!--            <Input type="text" v-model="searchForm.houseAddress" placeholder="请输入" style="width: 200px"/>-->
          <!--          </Form-item>-->
          <Form-item label="房屋类型" v-show="searchShow">
            <Select v-model="searchForm.houseType" placeholder="请选择" clearable  @on-change="handleSearch">
              <Option v-for="(item, i) in houseType" :key="item.id.toString()" :value="item.number.toString()">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item :label-width="40">
            <Input v-model="searchForm.searchInfodel" search enter-button placeholder="请输入房屋编号"
                   @on-search="handleSearch"/>
          </Form-item>
          <Form-item :label-width="40">
<!--            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>-->
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
                <DropdownItem name="removeAll" v-if="permitIds.includes('archive_buildings_fangwu_delete')">
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
                      v-if="permitIds.includes('archive_buildings_fangwu_see')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button class="bianji" @click="handleEdit(row, index)"
                      v-if="permitIds.includes('archive_buildings_fangwu_xiugai')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                      v-if="permitIds.includes('archive_buildings_fangwu_delete')"></Button>
            </Tooltip>

          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page transfer :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer></Page>
      </Row>
    </Card>
    <updateBasicHousingManage v-model="updateShow" :BasicHousingManageId="BasicHousingManageId" :modalTitle="title"
                              v-on:handleSearch="handleSearchPage"></updateBasicHousingManage>
    <lookHousingManage v-model="deleteShow" :BasicHousingManageId="BasicHousingManageId"
                       :modalTitle="title"></lookHousingManage>
    <ExcelUpload
      v-model="excelUploadShow"
      modal-title="导入数据"
      :actions="actions"
      @handleSearch="handleSearchPage"
    />
  </div>
</template>
<script>
import {deleteBasicHousingManage, queryBasicHousingManageList, exportExcel} from '@/api/zhsq/basicHouse/basicHouse'
import {queryAllList as gridAllList} from "@/api/zhsq/basicHousingEstate/basicHousingEstate"
import {getDictionary, getStreet, getCommunity} from '@/api/index';
import updateBasicHousingManage from './updateBasicHousingManage'
import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
import lookHousingManage from './lookHousingManage'
import {formartDate} from '@/api/tools/tool'
import {mapGetters} from "vuex";
import { baseurl} from '@/libs/axios'
import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'
export default {
  components: {
    updateBasicHousingManage, lookHousingManage,ExcelUpload
  },
  computed: {
    ...mapGetters(["permitIds"])
  },
  data() {
    return {
      data: [],
      deleteShow: false,
      searchShow: false,
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      search: '',
      columns: this.getBasicHousingManageColumns(),
      openSearch: true,//打开搜索
      openTip: true,//打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        houseStreetId: '',
        houseCommunityId: '',
        houseGridId: '',
        houseAddress: '',
        houseId: '',
        houseType: '',
        searchInfo: '',
        searchInfodel: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null,//开始时间
        endDate: null,//结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      total: 0,
      cvData:[],
      title: '',
      BasicHousingManageId: '',
      updateShow: false,
      tableHeight: 200,
      colOptions: ["小区名称", "房屋地址", "房屋类型", "所属街道", "所属社区", "所属网格", "创建时间", "操作"],
      colSelect: ["小区名称", "房屋地址", "房屋类型", "所属街道", "所属社区", "所属网格", "创建时间", "操作"],
      streetData: [],
      communityData: [],
      gridData: [],
      houseType: [],
      rentStatus: [],
      houseData: [],
      excelUploadShow:false,//导入弹出框
      actions:''+baseurl+'/basicHousing/importExcel',//链接前缀
    }
  },
  methods: {
    //获取街道
    getStreetData() {
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetData = res.data;
        }
      })
    },
    //房屋类型
    getHouseType() {
      getDictionary({fieldName: 'houseType'}).then(res => {
        if (res && res.success) {
          this.houseType = res.data;
        }
      })
    },
    //街道改变
    streetChange(e) {
      if (e) {
        //社区
        this.searchForm.houseCommunityId = '';
        this.communityData = [];
        //网格
        this.searchForm.houseGridId = '';
        this.gridData = [];
        //小区
        this.searchForm.houseId = '';
        this.houseData = [];
        getCommunity({streetId: e.value}).then(res => {
          if (res && res.success) {
            this.communityData = res.data;
          }
        });
      }
      this.handleSearch();
    },
    //社区改变
    communityChange(e) {
      if (e) {
        //网格
        this.searchForm.houseGridId = '';
        this.gridData = [];
        //小区
        this.searchForm.houseId = '';
        this.houseData = [];

        queryAllList({communityId: e.value}).then(res => {
          if (res.data.length > 0) {
            this.gridData = res.data;
          }
        });
      }
      this.handleSearch();
    },
    //网格改变
    gridChange(e) {
      if (e) {
        //小区
        this.searchForm.houseId = '';
        this.houseData = [];

        gridAllList({gridId: e.value}).then(res => {
          if (res.data.length > 0) {
            this.houseData = res.data;
          }
        })
      }
      this.handleSearch();
    },
    //导出查询数据
    excelData() {
      let _this = this;
      exportExcel(_this.searchForm).then(res => {
        const content = res;
        const blob = new Blob([content], {type: 'application/ms-excel'});
        const fileName = '实有房屋档案.xlsx';
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
    //列表上方更多操作
    handleDropdown(name) {
      if (name == "refresh") {
        this.getDataList();
      } else if (name == "removeAll") {
        this.delAll();
      } else if (name == 'import') {
        this.excelUploadShow = true
      }else if (name == "export") {
        let excolumns = this.columns.filter(function (v) {
          return v.title != "操作" && v.type != 'selection'
        });
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.cvData
        });
      } else if (name == "excelExport") {
        this.excelData();
      }
    },
    //展开 收起
    dropDown() {
      if (this.drop) {
        this.dropDownContent = "展开";
        this.dropDownIcon = "ios-arrow-down";
        this.searchShow = false;
      } else {
        this.dropDownContent = "收起";
        this.dropDownIcon = "ios-arrow-up";
        this.searchShow = true;
      }
      this.drop = !this.drop;
    },
    //新增
    addBasicHousingManage() {
      this.title = '实有房屋新增';
      this.updateShow = true
      this.BasicHousingManageId = '';
    },
    //编辑
    handleEdit(row, index) {
      this.title = '实有房屋修改';
      this.BasicHousingManageId = row.id.toString();
      this.updateShow = true;
    },
    //查看
    handleLook(row, index) {
      this.title = '实有房屋查看';
      this.BasicHousingManageId = row.id.toString();
      this.deleteShow = true;
    },
    //分页查询
    getDataList() {
      this.loading = true;
      this.searchForm.id = null;
      if(this.searchForm.searchInfodel && this.searchForm.searchInfodel.trim().length>0){
        let searchForms = this.searchForm.searchInfodel.split("-");
        if(searchForms && searchForms.length>1){
          this.searchForm.searchInfo = "";
          for(let i in searchForms){
            if(searchForms[i]){
              this.searchForm.searchInfo += this.dealNumber(searchForms[i])
            }

          }
        }
        else {
          this.searchForm.searchInfo = this.searchForm.searchInfodel;
        }
      }
      else {
        this.searchForm.searchInfo = "";
      }
      queryBasicHousingManageList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false;
          this.data = res.data.records;
          this.total = res.data.total;
          this.cvData = JSON.parse(JSON.stringify(res.data.records));
          //房屋类型
          this.getHouseType();
        }
      });
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
      deleteBasicHousingManage({ids: ids}).then(res => {
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
    // 查询
    handleSearchPage() {
      this.getDataList()
    },
    //重置
    handleReset() {
      this.gridData = [];
      this.communityData = [];
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      this.selectDate = null;
      this.searchForm.houseStreetId = '';
      this.searchForm.houseCommunityId = '';
      this.searchForm.houseGridId = '';
      this.searchForm.houseId = '';
      this.searchForm.houseAddress = '';
      this.searchForm.houseType = '';
      this.searchForm.searchInfo = '';
      this.searchForm.searchInfodel = '';

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
    getBasicHousingManageColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '小区名称',
          align: 'center',
          key: 'houseName',
          tooltip: true,
          sortable: false,
          minWidth: 100
        },
        {
          title: '房屋编码',
          align: 'center',
          key: 'houseCode',
          tooltip: true,
          sortable: false,
          minWidth: 100,
          render: (h, param) => {
            if (param.row.houseCode) {

              let houseCode =param.row.buildArchiveName.substring(0,param.row.buildArchiveName.length-1)+"-"+param.row.unit+"-"+this.dealNumber(param.row.floor)+param.row.doorNumber;
              let dataF = this.cvData.filter(item => item.id == param.row.id);
              dataF[0].houseCode =  '暂无';
                if(dataF && dataF.length>0){
                  dataF[0].houseCode = houseCode;
                }
                // return h('span', tempArr[0].name)
                return h('Tooltip', {
                  props: {
                    content: houseCode,
                    placement: 'bottom',
                    transfer: true
                  }
                },houseCode)

            } else {
              // return h('span', '暂无');
              return h('Tooltip', {
                props: {
                  content: '暂无',
                  placement: 'bottom',
                  transfer: true
                }
              }, '暂无')
            }
          }
        },
        {
          title: '房屋类型',
          align: 'center',
          key: 'houseType',
          sortable: false,
          tooltip: true,
          minWidth: 100,
          render: (h, param) => {
            if (param.row.houseType) {
              let tempArr = this.houseType.filter(item => item.number.toString() === param.row.houseType.toString());
              let dataF = this.cvData.filter(item => item.id == param.row.id);
              dataF[0].houseType =  '暂无';
              if (tempArr && tempArr.length > 0) {

                if(dataF && dataF.length>0){
                  dataF[0].houseType = '="' + tempArr[0].name + '"';
                }
                // return h('span', tempArr[0].name)
                return h('Tooltip', {
                  props: {
                    content: tempArr[0].name,
                    placement: 'bottom',
                    transfer: true
                  }
                }, tempArr[0].name)
              } else {
                // return h('span', '暂无');
                return h('Tooltip', {
                  props: {
                    content: '暂无',
                    placement: 'bottom',
                    transfer: true
                  }
                }, '暂无')
              }
            } else {
              // return h('span', '暂无');
              return h('Tooltip', {
                props: {
                  content: '暂无',
                  placement: 'bottom',
                  transfer: true
                }
              }, '暂无')
            }
          }
        },
        {
          title: '所属街道',
          align: 'center',
          key: 'houseStreet',
          sortable: false,
          tooltip: true,
          minWidth: 100
        },
        {
          title: '所属社区',
          align: 'center',
          key: 'houseCommunity',
          sortable: false,
          tooltip: true,
          minWidth: 100
        },
        {
          title: '所属网格',
          align: 'center',
          key: 'houseGrid',
          sortable: false,
          tooltip: true,
          minWidth: 100
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: false,
          align: 'center',
          minWidth: 180,
          tooltip: true,
          render: (h, params) => {
            let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            dataF[0].createTime = '="' + createTime + '"';
            return h('Tooltip', {
              props: {
                content: formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'),
                placement: 'bottom',
                transfer: true
              }
            }, formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
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
      let col = this.getBasicHousingManageColumns();
      this.columns = col.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    },
    //拼接number
    dealNumber(number){
      if (number &&  number.toString().trim().length==1) {
        number = "0" + number;
      } else {
        number = number + "";
      }
      return number;
    }
  },
  mounted() {
    this.getDataList();
    this.getStreetData();
    //this.tableHeight = window.innerHeight - this.$refs.basicHousingManageTable.$el.offsetTop - 270
  }
}
</script>
<style scoped="less">
.operation {
  margin-bottom: 10px;
}
</style>
