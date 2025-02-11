<style lang="less">
  .tZhsqGridMemberList {
    .ivu-form .ivu-form-item-label {
      text-align: left;
      padding: 0px 0px 0px 0;
    }
    .ivu-form-item-content > .ivu-btn {
      margin-right: 40px !important;
    }
  }


</style>
<template>
  <div class="search" tZhsqGridMemberList>
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch" onSubmit="return false">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110" label-position="right">
          <Form-item label="所属街道" :label-width="110">
            <Select v-model="searchForm.streetId" placeholder="请选择街道" style="width: 200px" label-in-value clearable
                    @on-change="onStreetChange">
              <Option v-for="(item, i) in streetArr" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属社区">
            <Select v-model="searchForm.communityId" placeholder="请选择"
                    @on-change="selectCommunity" label-in-value clearable
                    style="width: 200px" clearable>
              <Option v-for="(item, i) in communityArr" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属网格">
            <Select v-model="searchForm.houseGrid" placeholder="请选择" clearable style="width: 200px" label-in-value
                    clearable @on-change="handleSearch">
              <Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item style="margin-left:-70px" class="br">
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
                <DropdownItem name="export">
                  <Icon type="md-arrow-down"/>
                  导出本页数据
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer transfer></Page>
      </Row>
    </Card>
    <!--		<lookTZhsqCommunityCadres v-model="lookShow" :TZhsqGridMemberId="TZhsqGridMemberId" :modalTitle="title"-->
    <!--                            v-on:handleSearch="handleSearchPage"></lookTZhsqCommunityCadres>-->
  </div>
</template>
<script>
  import {getStatisticsData} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
  import {formartDate} from '@/api/tools/tool'
  import updateTZhsqGridMember from './updateTZhsqGridMember'
  import lookTZhsqCommunityCadres from './lookTZhsqCommunityCadres'
  import {gridMemberLevel, communityData} from '@/api/tools/zhsqSelectData'
  import {queryAllList as gridsQueryAllList} from '@/api/zhsq/basicGrids/basicGrids'
  import {getCommunity, getDictionary, getStreet} from "../../../api";

  export default {
    name: "gridMemberCensusList",
    props: {
      tabPaneTitle: {
        type: String,
        default: ""
      },
    },
    components: {
      updateTZhsqGridMember,
      lookTZhsqCommunityCadres
    },
    data() {
      return {
        lookShow: false,
        //社区下拉数据
        communityArr: [],
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
          streetId: '',
          name: '',
          phone: '',
          houseCommunity: '',
          houseGrid: '',
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
        searchShow: true,
        colOptions: [
          "所属街道", "所属社区", "所属网格", "网格长人数", "专职网格员人数", "兼职网格员人数"],
        colSelect: [
          "所属街道", "所属社区", "所属网格", "网格长人数", "专职网格员人数", "兼职网格员人数"],
        selectDate: [],
        gridPriority: [],
        streetArr: [],
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

        this.gridPriority = [];
        this.searchForm.houseGrid = '';
        this.searchForm.communityId = '';
        this.handleSearch();
      },
      //选择社区
      selectCommunity(value) {
        let data;
        if (value) {
          data = {"communityId": value.value};
        }
        this.getGridsData(data);
        this.searchForm.houseGrid = "";
        this.handleSearch();
      },
      //获取网格数据
      getGridsData(data) {
        gridsQueryAllList(data).then(res => {
          if (res && res.success) {
            this.gridPriority = res.data
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新');
          }
        })
      },
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
          this.$refs.table.exportCsv({
            filename: '本页数据',
            columns: excolumns,
            data: this.data
          });
        }
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
        this.title = '新增';
        this.updateShow = true
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
        this.title = '查看';
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
      getDataList() {
        this.selectCount = 0;
        this.loading = true;
        this.searchForm.id = null;
        getStatisticsData(this.searchForm).then(res => {
          this.loading = false;
          if (res && res.success) {
            this.data = res.data.data.records;
            this.total = res.data.data.total;
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
        this.selectDate = null;
        this.searchForm = {
          streetId: '',
          name: '',
          phone: '',
          houseCommunity: '',
          post: '',
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'create_time', // 默认排序字段
          order: 'desc' // 默认排序方式
        };
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
      getTZhsqGridMemberColumns() {
        return [
          {
            title: '所属街道',
            align: 'center',
            tooltip: true,
            key: 'street_name',
            sortable: false
          },
          {
            title: '所属社区',
            align: 'center',
            tooltip: true,
            key: 'community_name',
            sortable: false
          },
          {
            title: '所属网格',
            align: 'center',
            tooltip: true,
            key: 'house_grid',
            sortable: false
          },
          {
            title: '网格长人数',
            align: 'center',
            tooltip: true,
            key: 'wgzCount',
            sortable: false
          },
          {
            title: '专职网格员人数',
            align: 'center',
            tooltip: true,
            key: 'zzwgyCount',
            sortable: false
          },
          {
            title: '兼职网格员人数',
            align: 'center',
            tooltip: true,
            key: 'jzwgyCount',
            sortable: false
          },
          // {
          // 	title:'操作',
          // 	align: 'center',
          // 	slot: 'action',
          // 	width: 200,
          // }
        ]
      },
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getTZhsqGridMemberColumns();
        //	this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
      },
    },
    mounted() {
      this.getDataList();
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
