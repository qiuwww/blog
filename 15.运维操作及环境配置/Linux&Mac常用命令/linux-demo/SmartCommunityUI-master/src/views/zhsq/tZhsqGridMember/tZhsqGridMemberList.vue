<style lang="less">
  .tZhsqGridMember {
    .ivu-form-item-content > .ivu-btn {
      margin-right: 40px !important;
    }
  }

</style>
<template>
  <div class="search tZhsqGridMember">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline label-position="right">
          <Button @click="addTZhsqGridMember" type="primary" icon="md-add"
                  v-if="permitIds.includes('archive_staff_renyuan_add')">新增
          </Button>
          <Form-item label="所属街道" :label-width="110">
            <Select v-model="searchForm.streetId" placeholder="请选择街道" style="width: 200px" clearable label-in-value
                    @on-change="onStreetChange">
              <Option v-for="(item, i) in streetArr" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属社区" :label-width="110">
            <Select v-model="searchForm.communityId" placeholder="请选择社区" style="width: 200px"
                    clearable label-in-value @on-change="communityChange">
              <Option v-for="(item, i) in communityArr" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>

          <Form-item label="所属网格" :label-width="110" v-if="drop">
            <Select v-model="searchForm.gridId" placeholder="请选择网格" style="width: 200px" clearable label-in-value
                    @on-change="handleSearch">
              <Option v-for="(item, i) in gridArr" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>

          <Form-item label="所属职务" v-if="tabPaneTitle.indexOf('网格员')>-1  && drop" :label-width="110">
            <Select v-model="searchForm.post" placeholder="请选择职务" style="width: 200px" clearable label-in-value
                    @on-change="handleSearch">
              <Option v-for="(item, i) in postArr" :key="item.name" :value="item.name">{{item.label}}</Option>
            </Select>
          </Form-item>
          <Form-item :label-width="40">
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入姓名/手机号/身份证号码"
                   @on-search="handleSearch"/>
          </Form-item>

          <Form-item class="br" :label-width="40">
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
                <DropdownItem name="removeAll" v-if="permitIds.includes('archive_staff_renyuan_delete')">
                  <Icon type="md-trash"/>
                  批量删除
                </DropdownItem>
                <DropdownItem name="import">
                  <Icon type="ios-cloud-upload-outline" />
                  批量导入
                </DropdownItem>
                <DropdownItem name="export" v-if="permitIds.includes('archive_staff_renyuan_export')">
                  <Icon type="md-arrow-down"/>
                  导出本页数据
                </DropdownItem>
                <DropdownItem name="excelExport" v-if="permitIds.includes('archive_staff_renyuan_export')">
                  <Icon type="md-arrow-down"/>
                  根据查询条件导出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <a class="drop-down" style="margin-left: 40px" @click="dropDown">
              {{dropDownContent}}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>
        </Form>
      </Row>
      <Row v-show="selectCount>0">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
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
                      v-if="permitIds.includes('archive_staff_renyuan_see')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button class="bianji" @click="handleEdit(row, index)"
                      v-if="permitIds.includes('archive_staff_renyuan_xiugai')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                      v-if="permitIds.includes('archive_staff_renyuan_delete')"></Button>
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
    <updateTZhsqGridMember v-model="updateShow" :TZhsqGridMemberId="TZhsqGridMemberId" :modalTitle="title"
                           :tabPaneTitle="tabPaneTitle" v-on:handleSearch="handleSearchPage"></updateTZhsqGridMember>
    <lookTZhsqCommunityCadres v-model="lookShow" :TZhsqGridMemberId="TZhsqGridMemberId" :modalTitle="title"
                              v-on:handleSearch="handleSearchPage"></lookTZhsqCommunityCadres>
    <ExcelUpload
      v-model="excelUploadShow"
      modal-title="导入数据"
      :actions="actions1"
      @handleSearch="handleSearchPage"
      v-if="this.tabPaneTitle=='网格长'"
    />
    <ExcelUpload
      v-else
      v-model="excelUploadShow"
      modal-title="导入数据"
      :actions="actions"
      @handleSearch="handleSearchPage"
    />

  </div>
</template>
<script>
  import {
    deleteTZhsqGridMember,
    queryTZhsqGridMemberList,
    exportExcel
  } from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
  import {formartDate} from '@/api/tools/tool'
  import updateTZhsqGridMember from './updateTZhsqGridMember'
  import lookTZhsqCommunityCadres from './lookTZhsqCommunityCadres'
  import {gridMemberLevel, communityData} from '@/api/tools/zhsqSelectData'
  import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
  import {getCommunity, getDictionary, getStreet} from "../../../api";
  import {mapGetters} from "vuex";
  import { baseurl} from '@/libs/axios'
  import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'

  export default {
    name: "TZhsqGridMemberList",
    props: {
      tabPaneTitle: {
        type: String,
        default: "网格长"
      },
    },
    components: {
      updateTZhsqGridMember,
      lookTZhsqCommunityCadres,
      ExcelUpload
    },
    computed: {
      ...mapGetters(["permitIds"])
    },
    data() {
      return {
        isNumber: true,
        lookShow: false,
        //社区下拉数据
        communityArr: [],
        streetArr: [],
        gridArr: [],
        //岗位下拉数据
        postArr: [],
        tabPaneName: '',
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        columns: this.getTZhsqGridMemberColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          idCard: '',
          name: '',
          phone: '',
          streetId: '',
          communityId: '',
          gridId: '',
          searchInfo: '',//查询条件
          post: '',
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'create_time', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        title: '',
        TZhsqGridMemberId: '',
        updateShow: false,
        tableHeight: 200,
        searchShow: false,
        colOptions: ["姓名", "性别", "身份证号", "手机号", "所属社区", "所属网格", "所属职务", "创建时间", "操作"],
        colSelect: ["姓名", "性别", "身份证号", "手机号", "所属社区", "所属网格", "所属职务", "创建时间", "操作"],
        selectDate: [],
        csvData: [],
        excelUploadShow:false,//导入弹出框
        actions:''+baseurl+'/tZhsqGridMember/importGridMemberExcel',//链接前缀
        actions1:''+baseurl+'/tZhsqGridMember/importGridLengthExcel',//链接前缀
      }
    },
    methods: {
      onStreetChange(e) {
        if (e) {
          getCommunity({streetId: e.value}).then(res => {
            if (res && res.success) {
              this.communityArr = res.data;
            }
          });
        } else {
          this.communityArr = [];
          this.searchForm.communityId = "";
        }

        this.gridArr = [];
        this.searchForm.gridId = '';
        this.searchForm.communityId = '';
        this.handleSearch();
      },
      //社区改变
      communityChange(e) {
        if (e) {
          queryAllList({communityId: e.value}).then(res => {
            if (res.data.length > 0) {
              this.gridArr = res.data;
            } else {
              this.gridArr = [];
              this.searchForm.gridId = "";
            }
          });
        } else {
          this.gridArr = [];
          this.searchForm.gridId = "";
        }
        this.handleSearch();
      },
      //列表上方更多操作
      handleDropdown(name) {
        if (name == "refresh") {
          this.getDataList(this.tabPaneTitle);
        } else if (name == "removeAll") {
          this.delAll();
        }  else if (name == 'import') {
          this.excelUploadShow = true
        } else if (name == "export") {
          let excolumns = this.columns.filter(function (v) {
            return v.title != "操作" && v.type != 'selection'
          });

          if (this.isNumber) {
            this.csvData.forEach(item => {
              item.phone = '="' + item.phone + '"';
              item.idCard = '="' + item.idCard + '"';
            })
          }
          this.isNumber = false;
          this.$refs.table.exportCsv({
            filename: '本页数据',
            columns: excolumns,
            data: this.csvData
          });
        } else if (name == "excelExport") {
          this.excelData();
        }
      },
      excelData() {
        var _this = this;
        exportExcel(_this.searchForm).then(res => {
          const content = res;
          const blob = new Blob([content], {type: 'application/ms-excel'});
          const fileName = '导出网格人员档案.xlsx';
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
          this.searchShow = true;
        } else {
          this.dropDownContent = "收起";
          this.dropDownIcon = "ios-arrow-up";
          this.searchShow = false;
        }
        this.drop = !this.drop;
      },
      //时间选择事件
      selectDateRange(v) {
        if (v) {
          if (this.selectDate && this.selectDate[0] && this.selectDate[1]) {
            this.searchForm.startDate = formartDate(this.selectDate[0], 'yyyy-MM-dd 00:00:00')
            this.searchForm.endDate = formartDate(this.selectDate[1], 'yyyy-MM-dd 23:59:59')
          } else {
            this.searchForm.startDate = null
            this.searchForm.endDate = null
          }
        }
      },
      //新增
      addTZhsqGridMember() {
        this.title = '网格人员新增';
        this.updateShow = true;
        this.TZhsqGridMemberId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '编辑';
        this.TZhsqGridMemberId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '网格人员查看';
        this.TZhsqGridMemberId = row.id.toString();
        this.lookShow = true;
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
      //分页查询
      getDataList(data) {
        this.loading = true;
        this.searchForm.id = null;

        if (data) {
          if (this.searchForm["post"] == undefined || this.searchForm["post"] == null) {
            this.searchForm["post"] = data + "";
          } else if (this.searchForm["post"].indexOf(data) == -1) {
            this.searchForm["post"] = data + "";
          } else if (this.searchForm["post"].indexOf(data) > -1) {
          } else {
            this.searchForm["post"] = data + "";
          }
        }
        queryTZhsqGridMemberList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.csvData = JSON.parse(JSON.stringify(res.data.records));
            this.total = res.data.total;
            this.isNumber = true;
          }
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
        deleteTZhsqGridMember({ids: ids}).then(res => {
          this.userLoading = false;
          this.$Modal.remove();
          if (res && res.success) {
            this.modalTaskVisible = false;
            this.$Message.success('删除成功');
            this.getDataList(this.tabPaneTitle);
          } else {
            this.$Message.error('删除失败');
          }
        });
      },
      //改变页码
      changePage(v) {
        this.searchForm.pageNumber = v;
        this.getDataList(this.tabPaneTitle);
        this.clearSelectAll();
      },
      //改变每页显示数据的条数
      changePageSize(v) {
        this.searchForm.pageSize = v;
        this.getDataList(this.tabPaneTitle);
      },
      //改变排序方式
      changeSort(e) {
        this.searchForm.sort = e.key;
        this.searchForm.order = e.order;
        if (e.order == 'normal') {
          this.searchForm.order = '';
        }
        this.getDataList(this.tabPaneTitle);
      },
      //查询
      handleSearch() {
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.getDataList(this.tabPaneTitle);
      },
      //查询
      handleSearchPage() {
        this.getDataList();
      },
      //重置
      handleReset() {
        this.selectDate = null;
        this.searchForm = {
          idCard: '',
          name: '',
          phone: '',
          houseCommunity: '',
          post: '',
          searchInfo: '',//查询条件
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'create_time', // 默认排序字段
          order: 'desc' // 默认排序方式
        };
        // 重新加载数据
        this.getDataList(this.tabPaneTitle);
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
      getTZhsqGridMemberColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '姓名',
            align: 'center',
            tooltip: true,
            key: 'name',
            sortable: false
          },
          {
            title: '性别',
            align: 'center',
            tooltip: true,
            key: 'sex',
            sortable: false,
            width: 70
          },
          {
            title: '身份证号',
            align: 'center',
            tooltip: true,
            key: 'idCard',
            sortable: false,
            render: (h, params) => {
              let reg = /^(.{6}).*(.{4})$/
              let number = params.row.idCard.replace(reg, '$1****$2')
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
            title: '手机号',
            align: 'center',
            key: 'phone',
            tooltip: true,
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
          /*{
               title: '所属街道',
               align: 'center',
               key: 'streetName',
               tooltip: true,
               sortable: false
           },*/
          {
            title: '所属社区',
            align: 'center',
            tooltip: true,
            key: 'communityName',
            sortable: false
          },
          {
            title: '所属网格',
            align: 'center',
            key: 'gridsPersonGrids',
            sortable: false,
            render: (h, params) => {
              if (params.row.gridsPersonGrids) {
                let gridsNameStr = "";
                params.row.gridsPersonGrids.forEach(function (item) {
                  gridsNameStr += "," + item.gridsName;
                });
                if (gridsNameStr != "") {
                  gridsNameStr = gridsNameStr.substring(1);
                }

                let dataF = this.csvData.filter(item => item.id == params.row.id);
                dataF[0].gridsPersonGrids = '"' + gridsNameStr + '"';
                return h('div', [
                  h('Tooltip', {
                    props: {placement: 'bottom', transfer: true}
                  }, [
                    h('span', {
                      style: {
                        display: 'inline-block',
                        width: params.column._width * 0.9 + 'px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                    }, gridsNameStr),
                    h('span', {
                      slot: 'content',
                      style: {whiteSpace: 'normal', wordBreak: 'break-all'}
                    }, gridsNameStr)
                  ])
                ])
              }
            },
          },
          {
            title: '所属职务',
            tooltip: true,
            align: 'center',
            key: 'post',
            sortable: false
          },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: false,
            align: 'center',
            minWidth: 130,
            tooltip: true,
            render: (h, params) => {
              let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
              let dataF = this.csvData.filter(item => item.id == params.row.id);
              dataF[0].createTime = '="' + createTime + '"';
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
            width: 215,
          }
        ]
      },
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getTZhsqGridMemberColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      },
      getPostArrData() {
        if (this.tabPaneTitle && this.tabPaneTitle.indexOf("网格长") > -1) {
          this.postArr = gridMemberLevel.filter(function (item) {
            return item.name.indexOf("网格长") > -1
          });
        } else if (this.tabPaneTitle && this.tabPaneTitle.indexOf("网格员") > -1) {
          this.postArr = gridMemberLevel.filter(function (item) {
            return item.name.indexOf("网格员") > -1
          });
        } else {
          this.postArr = gridMemberLevel;
        }
      }
    },
    mounted() {
      this.getPostArrData();
      this.getDataList(this.tabPaneTitle);
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetArr = res.data;
        }
      });
    },
    watch: {
      tabPaneTitle(val) {
        this.getDataList(val);
      },
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
