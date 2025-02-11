<style lang="less">
  .tZhsqVolunteerActivityList {
    .ivu-form .ivu-form-item-label {
      float: left;
      padding: 0px 0px 0px 0;
    }
  }

  .ivu-form-item-content > .ivu-btn {
    margin-right: 40px !important;
  }
</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <div class="search" tZhsqVolunteerActivityList>
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80" label-position="right">
          <Button @click="addTZhsqVolunteerActivity" type="primary" icon="md-add"
                  v-if=" permitIds.includes('archive_staff_volunteer_activity_add')">新增
          </Button>
          <Form-item label="开始时间">
            <DatePicker type="date" placeholder="请选择活动开始时间" style="width: 200px" v-model="searchForm.startDate"
                        clearable @on-change="handleSearchStartTime" :options="buildingYearOptionsStart"></DatePicker>
          </Form-item>
          <Form-item label="结束时间">
            <DatePicker type="date" placeholder="请选择活动结束时间" style="width: 200px" v-model="searchForm.endDate"
                        clearable @on-change="handleSearchEndTime" :options="buildingYearOptionsEnd"></DatePicker>
          </Form-item>
          <!--          <Form-item label="活动名称">-->
          <!--            <Input type="text" v-model="searchForm.name" placeholder="请输入" clearable style="width: 200px"/>-->
          <!--          </Form-item>-->
          <Form-item :label-width="40">
            <Input v-model="searchForm.name" search enter-button placeholder="请输入活动名称" @on-search="handleSearch"/>
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
                <DropdownItem name="removeAll">
                  <Icon type="md-trash"/>
                  批量删除
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
            <!--            <a class="drop-down" @click="dropDown">-->
            <!--              {{dropDownContent}}-->
            <!--              <Icon :type="dropDownIcon"></Icon>-->
            <!--            </a>-->
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
            <Tooltip content="查看详情" placement="top" v-if=" permitIds.includes('archive_staff_volunteer_activity_see')">
              <Button class="btnPrimary" icon="md-eye" @click="handleLook(row, index)"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top" v-if=" permitIds.includes('archive_staff_volunteer_activity_update')">
              <Button class="bianji" @click="handleEdit(row, index)"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top" v-if=" permitIds.includes('archive_staff_volunteer_activity_delete')">
              <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"></Button>
            </Tooltip>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total
              show-elevator
              show-sizer transfer></Page>
      </Row>
    </Card>
    <updateTZhsqVolunteerActivity v-model="updateShow" :TZhsqVolunteerActivityId="TZhsqVolunteerActivityId"
                                  :modalTitle="title"
                                  v-on:handleSearch="handleSearchPage"></updateTZhsqVolunteerActivity>
    <lookTZhsqVolunteerActivity v-model="lookShow" :TZhsqVolunteerActivityId="TZhsqVolunteerActivityId"
                                :modalTitle="title"></lookTZhsqVolunteerActivity>
  </div>
</template>
<script>
  import {
    deleteTZhsqVolunteerActivity,
    queryTZhsqVolunteerActivityList,
    exportExcel
  } from '@/api/zhsq/tZhsqVolunteerActivity/tZhsqVolunteerActivity'
  import {formartDate} from '@/api/tools/tool'
  import updateTZhsqVolunteerActivity from './updateTZhsqVolunteerActivity'
  import lookTZhsqVolunteerActivity from './lookTZhsqVolunteerActivity'
  import {mapGetters} from "vuex";

  export default {
    components: {
      updateTZhsqVolunteerActivity,
      lookTZhsqVolunteerActivity
    },
    computed: {
      ...mapGetters(["permitIds"])
    },
    data() {
      return {
        //时间控件限定
        buildingYearOptionsStart: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        //时间控件限定
        buildingYearOptionsEnd: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now();
          }
        },
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        startDate: "",
        endDate: "",
        data: [],
        columns: this.getTZhsqVolunteerActivityColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          // 搜索框对应data对象
          name: '',
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'create_time', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        title: '',
        TZhsqVolunteerActivityId: '',
        updateShow: false,
        lookShow: false,
        tableHeight: 200,
        colOptions: ["活动名称", "活动地址", "开始时间", "结束时间", "组织者", "参与志愿者", "创建时间", "操作"],
        colSelect: ["活动名称", "活动地址", "开始时间", "结束时间", "组织者", "参与志愿者", "创建时间", "操作"],
        csvData: [],
        isNumber: false
      }
    },
    methods: {
      //列表上方更多操作
      handleDropdown(name) {
        if (name == "refresh") {
          this.getDataList();
        } else if (name == "removeAll") {
          this.delAll();
        } else if (name == "export") {
          let excolumns = this.columns.filter(function (v) {
            return v.title != "操作" && v.type != 'selection'
          });
          if (this.isNumber) {
            this.csvData.forEach(item => {
              item.participantName = '"' + item.participantName + '"';
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
      //导出查询数据
      excelData() {
        var _this = this;
        exportExcel(_this.searchForm).then(res => {
          const content = res;
          const blob = new Blob([content], {type: 'application/ms-excel'});
          const fileName = '志愿者活动档案.xlsx';
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
        } else {
          this.dropDownContent = "收起";
          this.dropDownIcon = "ios-arrow-up";
        }
        this.drop = !this.drop;
      },

      //新增
      addTZhsqVolunteerActivity() {
        this.title = '志愿者活动新增';
        this.updateShow = true;
        this.TZhsqVolunteerActivityId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '志愿者活动编辑';
        this.TZhsqVolunteerActivityId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '志愿者活动查看';
        this.TZhsqVolunteerActivityId = row.id.toString();
        this.lookShow = true;
      },
      //分页查询
      getDataList() {
        this.clearSelectAll();
        this.selectCount = 0;
        this.loading = true;
        this.searchForm.id = null;

        queryTZhsqVolunteerActivityList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.csvData = JSON.parse(JSON.stringify(res.data.records));
            this.total = res.data.total;
            this.isNumber = true;
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
        deleteTZhsqVolunteerActivity({ids: ids}).then(res => {
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
      //开始时间改变
      handleSearchStartTime() {
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        let _this = this;
        this.buildingYearOptionsEnd = {
          disabledDate(date) {
            return date && date.valueOf() <= _this.searchForm.startDate;
          }
        };//时间控件限定
        this.getDataList();
      },
      //结束时间改变
      handleSearchEndTime(){
        if(this.searchForm.startDate==null || this.searchForm.startDate==""){
          this.$Message.error("请先选择开始时间")
          this.searchForm.endDate=null
        }
        else {
          this.searchForm.pageNumber = 1;
          this.searchForm.pageSize = 10;
          this.getDataList();
        }
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
        this.$refs.searchForm.resetFields();
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.searchForm.startDate = null;
        this.searchForm.endDate = null;
        this.searchForm.name = '',
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
      getTZhsqVolunteerActivityColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '活动名称',
            align: 'center',
            key: 'name',
            tooltip: true,
            minWidth: 120,
          },
          {
            title: '活动地址',
            align: 'center',
            minWidth: 120,
            key: 'activitiyAddress',
            tooltip: true
          },
          {
            title: '开始时间',
            key: 'startDate1',
            align: 'center',
            width: 120,
            render: (h, params) => {
              if (params.row.startDate1) {
                let startDate1 = formartDate(params.row.startDate1, 'yyyy-MM-dd');
                let csvDataF = this.csvData.filter(item => item.id == params.row.id);
                csvDataF[0].startDate1 = startDate1;
                return h("Tooltip", {
                  props: {
                    content: startDate1,
                    placement: 'bottom',
                    transfer: true
                  }
                }, startDate1)
              }
            }
          },
          {
            title: '结束时间',
            key: 'endDate1',
            align: 'center',
            width: 120,
            render: (h, params) => {
              if (params.row.endDate1) {
                let endDate1 = formartDate(params.row.endDate1, 'yyyy-MM-dd');
                let csvDataF = this.csvData.filter(item => item.id == params.row.id);
                csvDataF[0].endDate1 = '="' + endDate1 + '"';
                return h("Tooltip", {
                  props: {
                    content: endDate1,
                    placement: 'bottom',
                    transfer: true
                  }
                }, endDate1)
              }
            }
          },
          {
            title: '组织者',
            align: 'center',
            key: 'organizer',
            minWidth: 120,
            tooltip: true
          },
          {
            title: '参与志愿者',
            align: 'center',
            key: 'participantName',
            minWidth: 120,
            ellipsis: true,
            tooltip: true
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
              let csvDataF = this.csvData.filter(item => item.id == params.row.id);
              csvDataF[0].createTime = '="' + createTime + '"';
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
            width: 220,
          }
        ]
      },
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getTZhsqVolunteerActivityColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      }
    },
    mounted() {
      this.handleReset();
      //this.getDataList();
      //this.tableHeight = window.innerHeight - this.$refs.tZhsqVolunteerActivityTable.$el.offsetTop - 270
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
