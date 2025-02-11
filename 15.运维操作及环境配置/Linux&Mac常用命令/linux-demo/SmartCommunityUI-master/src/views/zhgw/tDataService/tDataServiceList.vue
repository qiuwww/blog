<style lang="less" scoped>
.search{
  .ivu-select{
    width: 190px !important;
  }
  .ivu-input-wrapper{
    width: 190px !important;
  }
}
.expand{
  align-self: center;
  cursor: pointer;
}
</style>
<template>
  <div>
    <Card>
      <Row type="flex" justify="space-between">
        <Col v-if="expand" span="5">
          <Alert show-icon>
            当前选择：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="editTitle" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input v-model="searchKey" suffix="ios-search" @on-change="search" placeholder="请输入服务类型" clearable/>
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree ref="tree" :data="treeData" :render="renderContent" @on-select-change="selectTree"></Tree>
            <Spin size="large" fix v-if="treeLoading"></Spin>
          </div>
        </Col>
        <div class="expand">
          <Icon :type="expandIcon" size="16" @click="changeExpand"/>
        </div>
        <Col :span="span" class="search">
          <Row v-show="openSearch" @keydown.enter.native.prevent="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70" onSubmit="return false">
              <!-- <Form-item label="质检结果">
                  <Select placeholder="请选择质检结果" clearable>
                      <Option value="通过">通过</Option>
                      <Option value="不通过">不通过</Option>
                  </Select>
              </Form-item>
              <Form-item label="质检日期">

              </Form-item> -->
              <Form-item label="服务名称">
                <Input type="text" :maxlength=50 v-model="searchForm.name" placeholder="请输入服务名称"/>
              </Form-item>
              <Form-item label="服务类型">
                <Select v-model="searchForm.format" placeholder="请选择服务类型" clearable >
                  <Option v-for="(item, i)  in formatProperty" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
                </Select>
              </Form-item>
              <Form-item label="服务格式" v-if="drop">
                <Select v-model="searchForm.type" placeholder="请选择服务格式" clearable >
                  <Option v-for="(item, i)  in typePriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
                </Select>
              </Form-item>
              <Form-item label="服务地址" v-if="drop">
                <Input type="text" v-model="searchForm.url" placeholder="请输入服务地址"/>
              </Form-item>
              <Form-item label="入库时间" v-if="drop">
                <DatePicker type="datetimerange" v-model="dataTime" ref="dateTime" clearable format="yyyy-MM-dd HH:mm:ss"
                            @on-change="selectTime" placeholder="请选择入库时间" style="width:190px;"></DatePicker>
              </Form-item>
              <Form-item style="margin-left:-65px;" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
                <a class="drop-down" @click="dropDown">
                  {{dropDownContent}}
                  <Icon :type="dropDownIcon"></Icon>
                </a>
              </Form-item>
            </Form>
          </Row>
          <Row class="operation">
            <Button @click="addTDataService" type="primary" icon="md-add">新增</Button>
            <Dropdown>
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="getDataList"><Icon type="ios-refresh-circle-outline" />刷新数据</DropdownItem>
                <DropdownItem @click.native="delAll"><Icon type="md-trash"/>批量删除</DropdownItem>
                <DropdownItem @click.native="exportData"><Icon type="ios-arrow-round-down" />导出本页数据</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
            <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>
            <div style="float: right;position: absolute;right: 10px;">
              <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
                <Button icon="md-list"></Button>
                <div slot="content" style="position:relative;min-height:5vh">
                  <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                    <checkbox v-for="(item,i) in colSelect" :label="item" :key="item"></checkbox>
                  </Checkbox-group>
                </div>
              </Poptip>
            </div>
          </Row>
          <Row v-show="openTip" style="margin-top:10px;">
            <Alert show-icon>
              已选择
              <span class="select-count">{{selectCount}}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
            </Alert>
          </Row>
          <Row>
            <Table :loading="loading" border :columns="columns" :data="data" sortable="custom" @on-sort-change="changeSort"
                   @on-selection-change="showSelect" ref="table">
              <template slot="action" slot-scope="{ row, index }">
                <Button type="primary" size="small" @click.native="viewFrame(row,index)"><Icon type="ios-eye-outline"/>查看</Button>
                <Dropdown :transfer=true>
                  <Button size="small">
                    更多操作
                    <Icon  type="md-arrow-dropdown"/>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="edit" @click.native="handleEdit(row, index)"><Icon type="ios-create-outline" />修改</DropdownItem>
                    <!-- <DropdownItem name="managementAuthority" @click.native="managementAuthority(row, index)"><Icon type="ios-create-outline" />管理权限</DropdownItem> -->
                    <DropdownItem name="delete" @click.native="deleteData(row, index)"><Icon type="md-trash"></Icon>删除</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </Table>
          </Row>
          <Row type="flex" justify="end" class="page">
            <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
                  @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer transfer></Page>
          </Row>
        </Col>
      </Row>
    </Card>

    <updateTDataService v-model="updateShow" :TDataServiceId="TDataServiceId" :modalTitle="title" v-on:handleSearch="handleSearch"></updateTDataService>
    <lookTDataService v-model="lookShow" :TDataServiceId="TDataServiceId" :modalTitle="title" v-on:handleSearch="handleSearch"></lookTDataService>
  </div>
</template>
<script>
import {treeData,queryAll,treeSearch,deleteTDataService} from '@/api/zhgw/tDataService/tDataService';
import { getDictDataByType } from '@/api/index';
import lookTDataService from '../tDataService/lookTDataService';
import updateTDataService from '../tDataService/updateTDataService';
import { formartDate } from '@/api/tools/tool'
export default {
  components:{
    lookTDataService,
    updateTDataService
  },
  data() {
    return {
      expand:true,
      editTitle:'',
      searchKey:'',
      maxHeight: "500px",
      treeData:[],
      treeLoading:false,
      expandIcon:'ios-arrow-back',
      span:18,
      openSearch:true,
      searchForm:{
        pid:'',
        name:'',
        type:'',
        level:'',
        checked:'',
        params:'',
        remarks:'',
        format:'',
        url:'',
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null,//开始时间
        endDate: null,//结束时间
        sort: 'createTime', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      openTip:true,
      colOptions:["服务名称","服务类型","服务格式","服务地址","入库时间","操作"],
      colSelect:["服务名称","服务类型","服务格式","服务地址","入库时间","操作"],
      data:[],
      // csvData:[],
      selectCount:0,
      selectList:[],
      columns: this.getDataServiceColumns(),
      typePriority:[],
      loading:false,
      total:0,
      lookShow:false,
      TDataServiceId:'',
      title:'',
      drop:false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      dataTime:null,
      updateShow:false,
      formatProperty:[],
    }
  },
  methods:{
    renderContent(h, {root, node, data}) {
      let icon = "";
      if(data.level == 1) {
        icon = "md-list-box";
      } else if (data.level == 2) {
        icon = "md-list";
      } else if (data.level == 3) {
        icon = "md-filing";
      } else {
        icon = "md-radio-button-on";
      }
      return h("span", [
        h("span", [
          h("Icon", {
            props: {
              type: icon,
              size: "16"
            },
            style: {
              "margin-right": "8px",
              "margin-bottom": "3px"
            }
          }),
          h("span", data.name)
        ])
      ]);
    },
    //选择时间
    selectTime(v){
      this.searchForm.startDate = v[0];
      this.searchForm.endDate = v[1];
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
    //改变每页显示数据的条数
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    //改变页码
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    //查询
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    //新增
    addTDataService(){
      this.title = '新增';
      this.updateShow = true
      this.TDataServiceId='';
    },
    viewFrame(row,index){//查看按钮
      this.title = '查看';
      this.TDataServiceId=row.id.toString();
      this.lookShow = true;
    },
    showSelect(e){
      this.selectList = e;
      this.selectCount = e.length;
    },
    changeSort(e){
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    getTypePriority(){
      getDictDataByType('type').then(res => {//服务类型
        if (res && res.success) {
          this.typePriority = res.data;
        }
      });
      getDictDataByType('service_format').then(res => {//服务格式
        if (res && res.success) {
          this.formatProperty = res.data;
        }
      });
    },
    clearSelectAll(){//清空所有
      this.$refs.table.selectAll(false);
    },
    checkboxChange(data){
      var columnss = this.getDataServiceColumns();
      this.columns = columnss.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      });
    },
    exportData(){//导出本页
      let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
      this.$refs.table.exportCsv({
        filename: '本页数据',
        columns: excolumns,
        data:this.data
      });
    },
    //删除（后台）
    patchdeleteData(ids) {
      if(ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error('没有选择的数据');
        return;
      }
      deleteTDataService({ids:ids}).then(res => {
        this.userLoading = false;
        this.$Modal.remove();
        if(res && res.success) {
          this.modalTaskVisible = false;
          this.$Message.success(res.msg);
          this.getDataList();
          this.getTreeData();
        } else {
          this.$Message.error(res.msg);
        }

      });
    },
    //单一删除
    deleteData(row, index){
      this.$Modal.confirm({
        title:"确认删除",
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
    delAll(){//批量删除
      if(this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据');
        return;
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
        loading: true,
        onOk: () => {
          let ids =[];
          this.selectList.forEach(function(e) {
            ids.push(e.id );
          });
          this.patchdeleteData(ids);
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！');
        }
      });
    },
    //编辑
    handleEdit(row, index) {
      this.title = '编辑';
      this.TDataServiceId=row.id.toString();
      this.updateShow = true;
    },
    getDataList(){//表单数据
      this.loading = true;
      queryAll(this.searchForm).then(res => {
        if(res && res.success){
          this.loading = false;
          this.data = res.data.records;
          // this.csvData = JSON.parse(JSON.stringify(res.data.records));
          this.total = res.data.total;
        }
      })
    },
    handleReset(){//重置
      this.$refs.searchForm.resetFields();
      this.searchForm.name = '';
      this.searchForm.type = '';
      this.searchForm.level = '';
      this.searchForm.checked = '';
      this.searchForm.params = '';
      this.searchForm.remarks = '';
      this.searchForm.format = '';
      this.searchForm.url = '';
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.dataTime = null;
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      // 重新加载数据
      this.getDataList();
    },
    //取消选择
    cancelEdit(){
      let data = this.$refs.tree.getSelectedNodes()[0];
      if (data) {
        data.selected = false;
      }
      // 取消选择后获取全部数据
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.searchForm.pid = "";
      this.editTitle = "";
      this.getDataList();
    },
    search(){//搜索树
      if (this.searchKey) {
        this.treeLoading = true;
        treeSearch({name:this.searchKey}).then(res => {
          if(res && res.success){
            this.treeLoading = false;
            let parent = [];
            for(let i = 0;i<res.data.length;i++){
              parent.push('{"title":"' + res.data[i].name + '","id":"' + res.data[i].id + '"}');
            }
            parent = '[' + parent + ']';
            this.treeData = jQuery.parseJSON(parent);
          }
        });
      } else {
        this.getTreeData();// 为空重新加载
      }
    },
    selectTree(v){//树 选择
      if (v.length > 0) {
        this.editTitle = v[0].title;
        // 重新加载表
        this.searchForm.page = 1;
        this.searchForm.size = 10;
        this.searchForm.pid = v[0].id;
        this.getDataList();
      } else {
        this.cancelEdit();
      }
    },
    changeExpand(){//扩展 收缩按钮
      this.expand = !this.expand;
      if (this.expand) {
        this.expandIcon = "ios-arrow-back";
        this.span = 18;
      } else {
        this.expandIcon = "ios-arrow-forward";
        this.span = 23;
      }
    },
    setTreeData(data) {//初始化树结构
      if (data) {
        for (let i in data) {
          var item = data[i];
          data[i].title = data[i].name;
          data[i].value = data[i].id;
          data[i].expand = true;
          if (data[i].children) {
            data[i].children = this.setTreeData(data[i].children);
          }
        }
      }
      return data;
    },
    getTreeData(){//获取树数据
      this.treeLoading = true;
      treeData().then(res => {
        if(res && res.success){
          this.treeLoading = false;
          this.treeData = this.setTreeData(res.data.records);
        }
      });
    },
    init(){//初始化
      this.getTreeData();
      this.getDataList();
      this.getTypePriority();//服务类型
    },
    getDataServiceColumns(){
      return [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "服务名称",
          key: 'name',
          sortable: true,
          tooltip:true,
          align: "center"
        },
        {
          title: "服务类型",
          key: "formatName",
          sortable: true,
          tooltip:true,
          align: "center",
          /* render:(h, params) => {
let arr = this.formatProperty.filter(item => item.value == params.row.format);
let datad = this.csvData.filter(item => item.id == params.row.id);
if(arr.length>0){
                  if(datad.length>0){
                      datad[0].format = arr[0].label
                  }
  return h('Tooltip', {
    props: {
      content: arr[0].label,
      placement: 'bottom',
      transfer: true
    }
  }, arr[0].label);
              }
          } */
        },
        {
          title: "服务格式",
          key: "typeName",
          sortable: true,
          tooltip:true,
          align: "center",
          /* render:(h, params) => {
let arr = this.typePriority.filter(item => item.value == params.row.type);
let datad = this.csvData.filter(item => item.id == params.row.id);
if(arr.length>0){
                  if(datad.length>0){
                      datad[0].type = arr[0].label
                  }
  return h('Tooltip', {
    props: {
      content: arr[0].label,
      placement: 'bottom',
      transfer: true
    }
  }, arr[0].label);
              }
          } */
        },
        {
          title: "服务地址",
          key: "url",
          tooltip:true,
          sortable: true,
          align: "center"
        },
        {
          title: "入库时间",
          key: "createTime",
          sortable: true,
          tooltip:true,
          align: "center",
          ellipsis:true,
          /* render: (h, params) => {
              let newTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
              let datad = this.csvData.filter(item => item.id == params.row.id);
              if(datad.length>0){
                  datad[0].eventEndTime = '="' + newTime + '"';
              }
              return h('Tooltip', {
                  props: {
                      content: newTime,
                      placement: 'bottom',
                      transfer: true
                  }
              }, newTime);
          } */
        },
        {
          title: "操作",
          width: 200,
          align: "center",
          // fixed: "right",
          slot: 'action'
        }
      ];
    }
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight;
    this.maxHeight = Number(height - 287) + "px";
    this.init();//初始化
  }
}
</script>
