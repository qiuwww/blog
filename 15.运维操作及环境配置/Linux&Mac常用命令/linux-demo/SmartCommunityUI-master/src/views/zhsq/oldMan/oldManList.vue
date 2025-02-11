<style lang="less">
.search {
  .searchRow {
    .ivu-select {
      width: 200px;
    }
    .ivu-input-group{
      width: 280px;
    }
  }

}
.oldManList .ivu-form-item-content > .ivu-btn {
  margin-right: 40px !important;
}
</style>
<template>
  <div class="search oldManList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch" class="searchRow">
        <Form ref="searchForm" :model="searchForm" inline label-position="right">
<!--          <Button @click="addBasicPerson" type="primary" icon="md-add"-->
<!--                  v-if="permitIds.includes('archive_staff_laoren_add')">新增-->
<!--          </Button>-->

          <!--          <Form-item label="姓名" :label-width="40">-->
          <!--            <Input type="text" v-model="searchForm.name" placeholder="请输入姓名" clearable style="width: 200px"/>-->
          <!--          </Form-item>-->
          <!--          <Form-item label="家庭地址" :label-width="110">-->
          <!--            <Input type="text" v-model="searchForm.residentialAddress" placeholder="请输入居住地" clearable-->
          <!--                   style="width: 200px"/>-->
          <!--          </Form-item>-->

          <Form-item label="所属街道" :label-width="110">
            <Select v-model="searchForm.streetId" placeholder="请选择" label-in-value clearable @on-change="onStreetChange">
              <Option v-for="(item, i) in streetIdPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属社区" :label-width="110" >
            <Select v-model="searchForm.communityId" placeholder="请选择" label-in-value clearable @on-change="communityChange">
              <Option v-for="(item, i) in communityIdPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属网格" :label-width="110"  v-if="drop">
            <Select v-model="searchForm.ownedGridId" placeholder="请选择" label-in-value clearable @on-change="get()">
              <Option v-for="(item, i) in gridData" :key="item.id.toString()" :value="item.id.toString()">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item :label-width="40">
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入姓名/身份证号码/家庭住址"
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
                <DropdownItem name="removeAll">
                  <Icon type="md-trash"/>
                  批量删除
                </DropdownItem>
                <DropdownItem name="export" v-if="permitIds.includes('archive_staff_laoren_export')">
                  <Icon type="md-arrow-down"/>
                  导出本页数据
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <a class="drop-down" @click="dropDown">
              {{dropDownContent}}
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
        <Table :loading="loading" stripe :columns="columns" sortable="custom" :data="data"
               @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">

            <Tooltip content="查看详情" placement="top" v-if="permitIds.includes('archive_staff_laoren_see')">
              <Button class="btnPrimary" icon="md-eye" @click="handleLook(row, index)"
                      v-if="permitIds.includes('archive_population_chakan')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button class="bianji" @click="handleEdit(row, index)"
                      v-if="permitIds.includes('archive_staff_laoren_bianji')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                      v-if="permitIds.includes('archive_staff_laoren_delete')"></Button>
              <div class="dividerDelete"></div>
            </Tooltip>
            <Tooltip content="健康档案" placement="top" v-if="permitIds.includes('archive_staff_laoren_healthy')">
              <Button  class="btnBd"    @click="showHealthFile(row)" ><svg-icon icon-class="btn_jkda" /></Button>
            </Tooltip>

            <!--            <Button  class="btnPrimary"  icon="md-eye" title="查看"   @click="handleLook(row, index)" v-if="permitIds.includes('archive_staff_laoren_see')"></Button>-->
            <!--            <Button  class="bianji" title="编辑"  @click="handleEdit(row, index)" v-if="permitIds.includes('archive_staff_laoren_bianji')"></Button>-->
            <!--            <Button  class="btnError"  icon="ios-trash" title="删除"  @click="deleteData(row, index)" v-if="permitIds.includes('archive_staff_laoren_delete')"></Button>-->
            <!--            <Button  class="btnPrimary"  icon="ios-clipboard-outline" title="健康档案"   @click="showHealthFile(row)" v-if="permitIds.includes('archive_staff_laoren_healthy')"></Button>-->

          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page transfer :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total
              show-elevator
              show-sizer></Page>
      </Row>
    </Card>
    <updateBasicPerson v-model="updateShow" :BasicPersonId="BasicPersonId" :modalTitle="title"
                       v-on:handleSearch="handleSearchPage"></updateBasicPerson>
    <lookBasicPerson v-model="deleteShow" :BasicPersonId="BasicPersonId" :gridName="gridName"
                     :modalTitle="title"></lookBasicPerson>
    <lookBasicHealthFile v-model="showHealthFileModal" :BasicPersonId="BasicPersonId"
                         modalTitle="健康档案查看"></lookBasicHealthFile>
  </div>
</template>
<script>
import {
  deleteBasicPerson,
  queryBasicPersonList,
} from '@/api/zhsq/basicPerson/basicPerson'
import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
import updateBasicPerson2 from './updateOldMan'
import lookBasicPerson2 from './lookOldMan'
import updateBasicPerson from '../basicPerson/updateBasicPerson'
import lookBasicPerson from '../basicPerson/lookBasicPerson'
import {formartDate} from '@/api/tools/tool'
import lookBasicHealthFile from "../basicHealthFile/lookBasicHealthFile";
import {getCommunity, getDictionary, getStreet} from "../../../api";
import {mapGetters} from "vuex";

export default {
  components: {
    updateBasicPerson, lookBasicPerson, lookBasicHealthFile
  },
  computed: {
    ...mapGetters(["permitIds"])
  },
  data() {
    return {
      showHealthFileModal: false,
      personType: {},
      specialPerson: {},
      communityIdPriority: [],
      streetIdPriority: [],
      personTypeData: [],
      deleteShow: false,
      drop: false,
      gridData: [],
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      search: '',
      data: [],
      columns: this.getBasicPersonColumns(),
      openSearch: true,//打开搜索
      openTip: true,//打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        residentialAddress: '',
        name: '',
        searchInfo: '',
        tableType: 2,
        personType: '',
        streetId: '',
        communityId: '',
        ownedGridId: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null,//开始时间
        endDate: null,//结束时间
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
      colOptions: ["姓名", "性别", "出生日期", "身份证号", "所属街道", "所属社区", "所属网格", "创建时间", "操作"],
      colSelect: ["姓名", "性别", "出生日期", "身份证号", "所属街道", "所属社区", "所属网格", "创建时间", "操作"],
      csvData: [],
      isNumber:false,
    }
  },
  methods: {
    onStreetChange(e) {
      if (e) {
        getCommunity({streetId: e.value}).then(res => {
          if (res && res.success) {
            this.communityIdPriority = res.data;
          }
        });
      } else {
        this.communityIdPriority = [];
      }
      this.searchForm.communityId = "";
      this.gridData = [];
      this.searchForm.ownedGridId = "";
      this.handleSearch();
    },
    //社区改变
    communityChange(e) {
      if (e) {
        queryAllList({communityId: e.value}).then(res => {
          if (res.data.length > 0) {
            this.gridData = res.data;
          } else {
            this.gridData = [];
            this.searchForm.ownedGridId = "";
          }
        });
      } else {
        this.gridData = [];
        this.searchForm.ownedGridId = "";
      }
      this.handleSearch();
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
        if(this.isNumber){
          this.csvData.forEach(item => {
            item.cardId = '="' + item.cardId + '"';
            item.birthDate = '="' + item.birthDate + '"';
          })
        }
        this.isNumber = false;
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.csvData
        });
      }
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
    //时间选择事件
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    //新增
    addBasicPerson() {
      this.title = '新增人员';
      this.updateShow = true
      this.BasicPersonId = '';
    },
    //编辑
    handleEdit(row, index) {
      this.title = '编辑人员';
      this.BasicPersonId = row.id.toString();
      this.updateShow = true;
    },
    //查看
    handleLook(row, index) {
      this.title = '查看人员';
      this.gridName = row.gridName;
      this.BasicPersonId = row.id.toString();
      this.deleteShow = true;
    },
    //分页查询
    getDataList() {
      this.loading = true;
      this.searchForm.tableType = "2";
      this.selectCount = 0;
      queryBasicPersonList(this.searchForm).then(res => {
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
      deleteBasicPerson({ids: ids}).then(res => {
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
    handleSearchPage() {
      this.getDataList();
    },
    //重置
    handleReset() {
      this.searchForm.name = "";
      this.searchForm.residentialAddress = "";
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      this.selectDate = null;
      this.searchForm.personType = '';
      this.searchForm.streetId = '';
      this.searchForm.communityId = '';
      this.searchForm.ownedGrid = '';
      this.searchForm.searchInfo = '';
      this.communityIdPriority = [];
      this.gridData = [];
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
    getBasicPersonColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '姓名',
          align: 'center',
          key: 'name',
          sortable: false,
          tooltip: true,
          minWidth: 100,
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex',
          tooltip: true,
          sortable: false,
          minWidth: 80,
        },
        {
          title: '出生日期',
          key: 'birthDate',
          sortable: false,
          align: 'center',
          tooltip: true,
          minWidth: 150,
        },
        {
          title: '身份证号',
          align: 'center',
          key: 'cardId',
          tooltip: true,
          sortable: false,
          minWidth: 180,
          render: (h, params) => {

            let reg = /^(.{6}).*(.{4})$/
            let number = params.row.cardId.replace(reg, '$1****$2')
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
          title: '所属街道',
          align: 'center',
          key: 'streetName',
          tooltip: true,
          sortable: false,
          minWidth: 150,
        },
        {
          title: '所属社区',
          align: 'center',
          key: 'communityName',
          tooltip: true,
          sortable: false,
          minWidth: 150,
        },
        {
          title: '所属网格',
          align: 'center',
          key: 'ownedGrid',
          sortable: false,
          tooltip: true,
          minWidth: 150,
        },
        /*{
            title: '家庭地址',
            align: 'center',
            key: 'residentialAddress',
            tooltip: true,
            sortable: false
        },*/
        {
          title: '创建时间',
          align: 'center',
          key: 'createTime',
          tooltip: true,
          minWidth: 180,
          sortable: false,
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
      var columnss = this.getBasicPersonColumns();
      this.columns = columnss.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    },
    showHealthFile(row) {
      this.showHealthFileModal = true;
      this.BasicPersonId = row.id;
    }
  },
  mounted() {
    this.getDataList();
    getStreet({}).then(res => {
      if (res && res.success) {
        this.streetIdPriority = res.data;
      }
    });
  }
}
</script>
<style scoped="less">
.operation {
  margin-bottom: 10px;
}
</style>
