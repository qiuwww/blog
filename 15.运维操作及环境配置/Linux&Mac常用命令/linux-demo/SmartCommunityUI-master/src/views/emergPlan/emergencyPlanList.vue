<template>
  <div>
    <Card class="myCard">
      <div class="card-input">
        <input type="text" placeholder="请输入搜索内容..." v-model="searchForm.search">
        <button type="button" @click="getDataList">搜索</button>
      </div>
    </Card>
    <Card style="margin-top:10px;">
      <PageHeader hidden-breadcrumb :tab-list="tabList" :tab-active-key="tabActiveKey"  @on-tab-change="handleChangeTab">
      </PageHeader>
      <Row :gutter="24" type="flex" class="ivu-mt" style="padding:0px 4px;">
          <Col :xl="4" :lg="4" :md="12" :sm="24" :xs="24" style="min-width:246px;">
                <Button type="dashed" icon="md-add" long :style="{height:height}" @click="addEmergencyPlan">添加应急预案</Button>
          </Col>
          <Col :xl="4" :lg="4" :md="12" :sm="24" :xs="24" v-for="(item, index) in data" :key="index" class="ivu-mb" id="colHeight" style="min-width:246px;">
            <Card bordered="bordered" :padding="0" class="search-search-projects-item">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" class="search-search-projects-item-cover" style="width:100%;"  @click="handleEdit(item,index)">
                <div class="ivu-p-8"  @click="handleEdit(item,index)">
                    <div>
                        <strong>{{ item.emergName }}</strong>
                    </div>
                    <div class="search-search-projects-item-desc">{{ item.emergName }}</div>
                    <div class="search-search-projects-item-extra ivu-mt-8 ivu-pb-8">
                        <Time :time="item.createTime" type="date" />
                        <span class="ivu-fr">
                            <AvatarList :list="avatarList" size="small" />
                        </span>
                    </div>
                </div>
                <div class="card-btn">
                  <span @click="handleEdit(item,index)">修改</span><i>|</i>
                  <span @click="handleView(item,index)">查看</span><i>|</i>
                  <span @click="deleteData(item)">删除</span>
                </div>
            </Card>
          </Col>
      </Row>
    </Card>
    <Row type="flex" justify="end" class="page" style="margin-right:15px;">
      <Page
        :current="searchForm.pageNumber"
        :total="total"
        :page-size="searchForm.pageSize"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        :page-size-opts="[10,20,50,100]"
        size="small"
        show-total
        show-elevator
        show-sizer
      ></Page>
    </Row>
    <updateEmergencyPlan v-model="updateShow" :EmergencyPlanId="EmergencyPlanId" :modalTitle="title"  v-on:handleSearch="handleSearch"></updateEmergencyPlan>
  </div>
</template>
<script>
import {
  deleteEmergencyPlan,
  queryEmergencyPlanList
} from "@/api/emergencyPlan/emergencyPlan";
import { formartDate } from "@/api/tools/tool";
import request from "@/utils/request";
import updateEmergencyPlan from "./updateEmergencyPlan";
import { getDictDataByType } from '@/api/index';
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  components: {
    updateEmergencyPlan
  },
  data() {
    return {
      tabList:[],
      tabActiveKey:'',
      eType:[],
      src: "../../images/logo-small.png",
      search: "",
      data: [],
      columns: this.getEmergencyPlanColumns(),
      openSearch: true, //打开搜索
      openTip: true, //打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        emergType:'',
        // 搜索框对应data对象
        search: "", //查询
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: "", //开始时间
        endDate: "", //结束时间
        sort: "createTime", // 默认排序字段
        order: "desc" // 默认排序方式
      },
      total: 0,
      title: "",
      height:"307px",
      EmergencyPlanId: "",
      updateShow: false,
      viewShow: false,
      tableHeight: 200,
      emergTypePriority:[],
      avatarList: [
                    {
                        src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
                        tip: '史蒂夫·乔布斯'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
                        tip: '斯蒂夫·沃兹尼亚克'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
                        tip: '乔纳森·伊夫'
                    }
                ]
    };
  },
  methods: {
     getHeight(){
       var card = document.querySelector('#colHeight');
       if(card){
         this.height = document.querySelector('#colHeight').offsetHeight - 2 + "px";
       }
    },
    //tab切换获取值
     handleChangeTab ({ name }) {
        if(name != null && name != ''){
          this.searchForm.emergType = name;
          this.getDataList();
        }
     },
    //新增
    addEmergencyPlan() {
      this.title = "新增";
      this.updateShow = true;
      this.EmergencyPlanId = "";
      //清空session
      window.sessionStorage.removeItem("geoJson");
    },
    //编辑
    handleEdit(row, index) {
      this.title = "编辑";
      this.EmergencyPlanId = row.id.toString();
      this.updateShow = true;
      //清空session
      window.sessionStorage.removeItem("geoJson");
    },
    //查看
    handleView(row,index) {
      this.title = "查看";
      this.EmergencyPlanId = row.id.toString();
      this.updateShow = true;
    },
    //分页查询
    getDataList() {
      if(this.eType.toLocaleString() != null && this.eType.toLocaleString() != ""){
        this.searchForm.emergType = this.eType.toLocaleString();
      }
      this.loading = true;
      this.searchForm.id = null;
      queryEmergencyPlanList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false;
          this.data = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    //单一删除
    deleteData(row) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所点击选的数据?",
        loading: true,
        onOk: () => {
          this.userLoading = true;
          var ids = [];
          ids.push(row.id);
          this.patchdeleteData(ids, this);
        },
        onCancel: () => {
          this.$Message.info("取消了当前的操作行为！");
        }
      });
    },
    //批量删除
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + "条数据?",
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function(e) {
            ids.push(e.id);
          });
          this.patchdeleteData(ids, this);
        },
        onCancel: () => {
          this.$Message.info("取消了当前的操作行为！");
        }
      });
    },
    //删除（后台）
    patchdeleteData(ids, obj) {
      var _this = this;
      if (ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error("没有选择的数据");
        return;
      }

      return request({
        url: "/api/emergencyPlan/deleteEmergencyPlan",
        method: "post",
        data: ids
      }).then(function(res) {
        obj.$Modal.remove();
        if (res && res.success) {
          _this.$Message.success("删除成功");
          _this.getDataList();
        } else {
          _this.$Message.error("删除失败");
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
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    //查询
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    //重置
    handleReset() {
      this.searchForm.search = "";
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.value = 10;
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
    getEmergencyPlanColumns() {
      return [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "预案名称",
          align: "center",
          key: "emergName",
          sortable: false
        },
        {
          title: "预案制定日期",
          key: "emergMakeDate",
          width: 180,
          align: "center",
          sortType: "asc",
          sortable: true,
          render: (h, params) => {
            let str = formartDate(params.row.emergMakeDate, "yyyy-MM-dd");
            return h("div", [h("div", {}, str)]);
          }
        },
        {
          title: "预案类型",
          align: "center",
          key: "emergType",
          sortable: false
        },
        {
          title: "预案等级",
          align: "center",
          key: "emergLevel",
          sortable: false
        },
        {
          title: "预案制定单位",
          align: "center",
          key: "emergMakeDept",
          sortable: false
        },
        {
          title: "预案执行部门",
          align: "center",
          key: "emergImplDept",
          sortable: false
        },
        {
          title: "预案制定人员",
          align: "center",
          key: "emergMakePerson",
          sortable: false
        },
        {
          title: "操作",
          align: "center",
          slot: "action"
        }
      ];
    }
  },
  created(){
    //监听窗口宽度变化
    if(document.querySelector('#colHeight')){
      this.height = document.querySelector('#colHeight').offsetHeight - 2 + "px";
    }
    window.addEventListener('resize', this.getHeight);
    this.getHeight();

  },
  destroyed(){
    //销毁监听
    window.removeEventListener('resize', this.getHeight)
  },
  mounted() {
      const _this = this;
     //数据字典加载数据
      getDictDataByType("plan_type",{}).then(res=>{
      if(res && res.success){
        _this.emergTypePriority = res.data;
        res.data.map((item,index)=>{
          var obj = {};
          obj.label = item.label;
          obj.name = item.value;
          _this.tabList.push(obj);
        })
        _this.tabActiveKey = _this.tabList[0].label;
        _this.searchForm.emergType =  _this.tabList[0].label;
        _this.getDataList();
      }
    });
  }
};
</script>
<style lang="less" scoped>

  .myCard .title {
    margin-bottom: 25px;
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
  }
  .myCard input{
    float: left;
    width: 25%;
    height: 40px;
    border: 1px solid #dbdada;
    font-size: 16px;
    color: #515a6e;
    padding: 6px 7px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .myCard input:focus {
      border-color: #57a3f3;
      outline: 0;
      box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
  }

  input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: #BDCADA;
  }

  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 适配火狐 */
    color: #BDCADA;
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ 适配火狐 */
      color: #BDCADA;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+  适配ie*/
      color: #BDCADA;
  }

  .myCard button {
    // width: 73px;
    height: 40px;
    border: 0;
    background: #2d8cf0 !important;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    color: #fff !important;
    font-size: 16px;
    margin-right: 10px;
    padding: 0 16px !important;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .card-input .addButton{
    border-radius: 4px;
  }
  .card-btn {
    height: 40px;
    margin-top: 1px solid #ccc;
    border-top: 1px solid #E8EAEC;
    margin: 0 10px;
    display: flex;
    justify-content: space-around;
    line-height: 40px;
    color: #a4a6a7;
    user-select: none;
  }
  .card-btn span {
    width: 100%;
    text-align: center;
  }
  .card-btn span:active {
    color: #ccc;
  }

  .card-btn i {
    color: #e9e7e7;
  }
  .ivu-form-item {
    margin-bottom: 0;
  }
  .search-search-projects-item-desc {
    height: 40px;
    overflow: hidden;
  }
  .ivu-avatar-small {
    width: 27px !important;
    height: 27px !important;
  }
  .ivu-page-header {
    padding:1px 32px 0px 32px;
  }
</style>
