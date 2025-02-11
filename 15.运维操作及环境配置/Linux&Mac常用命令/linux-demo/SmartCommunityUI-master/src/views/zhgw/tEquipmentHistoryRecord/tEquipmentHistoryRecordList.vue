  <style lang="less" scoped>
  .tEquipmentHistoryRecordList {

    .ivu-form .ivu-form-item-label {
      text-align: left;
      padding: 0px 0px 0px 0;
    }
    .expand{
      align-self: center;
      cursor: pointer;
    }
  }

  .ivu-form-item-content > .ivu-btn {
    margin-right: 10px !important;
  }
</style>
<template>
  <div class="tEquipmentHistoryRecordList">
    <Card>
      <Row type="flex" justify="space-between">
        <Col v-if="expand" span="5">
          <div class="leftTree" v-if="expand">
            <Input v-model="searchKey" suffix="ios-search" @on-change="searchTreeData" placeholder="输入部门名称搜索" clearable/>
            <div class="tree-bar" style="height: 95%">
              <Tree ref="tree" :data="treeData" @on-select-change="selectTree"></Tree>
              <Spin size="large" fix v-if="treeLoading"></Spin>
            </div>
          </div>
        </Col>
        <div class="expand">
          <Icon :type="expandIcon" size="16" @click="changeExpand"/>
        </div>
        <Col :span="span">
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70">


              <FormItem label="通信状态" >
                <Select v-model="searchForm.conmmunicationStatus" placeholder="请选择" clearable style="width: 200px">
                  <Option v-for="(item, i) in conmmunicationStatusPriority" :key="item.label" :value="item.id.toString()">{{item.label}}</Option>
                </Select>
              </FormItem>

              <Form-item label="采集时间">
                <DatePicker v-model="collectionTime" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" clearable
                            @on-change="selectDateRange"
                            placeholder="选择起始时间" style="width: 200px"></DatePicker>
              </Form-item>

<!--              <Form-item label="创建时间">-->
<!--                <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable-->
<!--                            @on-change="selectDateRange"-->
<!--                            placeholder="选择起始时间" style="width: 200px"></DatePicker>-->
<!--              </Form-item>-->
              <Form-item style="margin-left:-35px" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
<!--                <a class="drop-down" @click="dropDown">-->
<!--                  {{dropDownContent}}-->
<!--                  <Icon :type="dropDownIcon"></Icon>-->
<!--                </a>-->
              </Form-item>
            </Form>
          </Row>
          <Row class="operation">
            <Button @click="addTEquipmentHistoryRecord" type="primary" icon="md-add">新增</Button>
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
              </DropdownMenu>
            </Dropdown>
            <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
            <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
            <div style="float: right;position: absolute;right: 10px;">
              <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
                <Button icon="md-list"></Button>
                <div slot="content" style="position:relative;min-height:5vh">
                  <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                    <row v-for="(item, i)  in colSelect">
                      <checkbox :label="item" :key="item"></checkbox>
                    </row>
                  </Checkbox-group>
                </div>
              </Poptip>
            </div>
          </Row>
          <Row v-show="openTip">
            <Alert show-icon>
              已选择
              <span class="select-count">{{selectCount}}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
              <span style="float: right;">点击右上角按钮配置动态列↑</span>
            </Alert>
          </Row>
          <Row>
            <Table :loading="loading" border :columns="columns" sortable="custom" :data="data"
                   @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" @click="handleLook(row, index)" size="small">
                  <Icon type="ios-eye-outline"/>
                  查看
                </Button>
                <Dropdown :transfer=true>
                  <Button size="small">
                    更多操作
                    <Icon type="md-arrow-dropdown"/>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="edit" @click.native="handleEdit(row, index)">
                      <Icon type="ios-create-outline"/>
                      修改
                    </DropdownItem>
                    <DropdownItem name="delete" @click.native="deleteData(row, index)">
                      <Icon type="md-trash"></Icon>
                      删除
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </Table>
          </Row>
          <Row type="flex" justify="end" class="page">
            <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
                  @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]"
                  size="small" show-total show-elevator show-sizer></Page>
          </Row>
        </Col>
      </Row>
    </Card>

    <updateTEquipmentHistoryRecord v-model="updateShow" :TEquipmentHistoryRecordId="TEquipmentHistoryRecordId"
                                   :modalTitle="title"
                                   v-on:handleSearch="handleSearch"></updateTEquipmentHistoryRecord>
    <lookTEquipmentHistoryRecord v-model="lookShow" :TEquipmentHistoryRecordId="TEquipmentHistoryRecordId"
                                 :modalTitle="title"
                                 v-on:handleSearch="handleSearch"></lookTEquipmentHistoryRecord>
  </div>

</template>
<script>
  import {getDictDataByType} from '@/api/index';
  import {
    deleteTEquipmentHistoryRecord,
    queryTEquipmentHistoryRecordList,
    getEquipmentHistoryRecordLatestData
  } from '@/api/zhgw/tEquipmentHistoryRecord/tEquipmentHistoryRecord'
  import {formartDate} from '@/api/tools/tool'
  import updateTEquipmentHistoryRecord from './updateTEquipmentHistoryRecord'
  import lookTEquipmentHistoryRecord from './lookTEquipmentHistoryRecord'
  import {getDeptAndEquipmentPacketTreeData} from "@/api/zhgw/dataOverview/dataOverview";

  export default {
    components: {
      updateTEquipmentHistoryRecord,
      lookTEquipmentHistoryRecord
    },
    data() {
      return {
        span:18,
        expand: true,
        treeLoading: false, // 树加载状态
        expandIcon: "ios-arrow-back",
        selectTreeTitle: '',
        searchKey: "", // 搜索树
        treeData: [],
        rightSpan: 18,
        marginLeft: '300px',
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        selectDate: null,
        data: [],
        columns: this.getTEquipmentHistoryRecordColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        collectionTime:null,
        selectList: [], // 多选数据
        conmmunicationStatusPriority:[],
        searchForm: {
          equipmentId:'',
          dataNumber:'',
          name:'',
          conmmunicationStatus:'',
          conmmunicationStatusName:'',
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        title: '',
        TEquipmentHistoryRecordId: '',
        updateShow: false,
        lookShow: false,
        tableHeight: 200,
        colOptions: ["通信状态", "采集时间", "水位1（米）", "水位2（米）", "气温（摄氏度）", "湿度（百分比）", "流速1（米/秒）", "流速2（米/秒）", "流量1（立方米/秒）", "流量2（立方米/秒）", "电源电压（伏特）", "累计流量1（立方米）", "累计流量2（立方米）", "水温（摄氏度）", "设备温度（摄氏度）", "信号强度（百分比）", "pm2.5（微克/立方米）", "pm10（微克/立方米）", "闸门开启高度(米)", "上传时间", "操作"],
        colSelect: ["通信状态", "采集时间", "水位1（米）", "水位2（米）", "气温（摄氏度）", "湿度（百分比）", "流速1（米/秒）", "流速2（米/秒）", "流量1（立方米/秒）", "流量2（立方米/秒）", "电源电压（伏特）", "累计流量1（立方米）", "累计流量2（立方米）", "水温（摄氏度）", "设备温度（摄氏度）", "信号强度（百分比）", "pm2.5（微克/立方米）", "pm10（微克/立方米）", "闸门开启高度(米)", "上传时间", "操作"],
      }
    },
    methods: {
      getConmmunicationStatusPriority() {
        getDictDataByType('conmmunication_status').then(res => {
          if (res && res.success) {
            this.conmmunicationStatusPriority = res.data;
          }
        });
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
      addTEquipmentHistoryRecord() {
        this.title = '新增';
        this.updateShow = true;
        this.TEquipmentHistoryRecordId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '编辑';
        this.TEquipmentHistoryRecordId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '查看';
        this.TEquipmentHistoryRecordId = row.id.toString();
        this.lookShow = true;
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        queryTEquipmentHistoryRecordList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.total = res.data.total;
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
        deleteTEquipmentHistoryRecord({ids: ids}).then(res => {
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
      //重置
      handleReset() {
        this.$refs.searchForm.resetFields();
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.searchForm.startDate = null;
        this.searchForm.endDate = null;
        this.selectDate = null;
        this.collectionTime = null;
        this.searchForm.dataNumber = '';
        this.searchForm.name = '';
        this.searchForm.conmmunicationStatus='';
        this.searchForm.conmmunicationStatusName= '';
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
      getTEquipmentHistoryRecordColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            fixed: 'left',
            align: 'center',
          },
          {
            title: '通信状态',
            align: 'center',
            minWidth: 100,
            fixed: 'left',
            key: 'conmmunicationStatusName',
            sortable: false,
            render: (h, params) => {
              if (params.row.conmmunicationStatusName =="正常" ) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                  }, "正常"),
                ])

              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                  }, '异常')])
              }
            }
          },
          {
            title: '采集时间',
            fixed: 'left',
            key: 'collectionTime',
            sortable: true,

            align: 'center',
            width: 180,
            render: (h, params) => {
              return h('div',
                formartDate(params.row.collectionTime, 'yyyy-MM-dd HH:mm:ss')
              )
            }
          },
          {
            title: '水位1（米）',
            align: 'center',
            minWidth: 120,
            key: 'waterLevel1',
            sortable: false
          },
          {
            title: '水位2（米）',
            align: 'center',
            minWidth: 120,
            key: 'waterLevel2',
            sortable: false
          },
          {
            title: '气温（摄氏度）',
            align: 'center',
            minWidth: 140,
            key: 'airTemperature',
            sortable: false
          },
          {
            title: '湿度（百分比）',
            align: 'center',
            minWidth: 140,
            key: 'humidity',
            sortable: false
          },
          {
            title: '流速1（米/秒）',
            align: 'center',
            minWidth: 140,
            key: 'currentSpeed1',
            sortable: false
          },
          {
            title: '流速2（米/秒）',
            align: 'center',
            minWidth: 140,
            key: 'currentSpeed2',
            sortable: false
          },
          {
            title: '流量1（立方米/秒）',
            align: 'center',
            minWidth: 180,
            key: 'flowRate1',
            sortable: false
          },
          {
            title: '流量2（立方米/秒）',
            align: 'center',
            key: 'flowRate2',
            minWidth: 180,
            sortable: false
          },
          {
            title: '电源电压（伏特）',
            align: 'center',
            minWidth: 160,
            key: 'voltage',
            sortable: false
          },
          {
            title: '累计流量1（立方米）',
            align: 'center',
            minWidth: 180,
            key: 'cumulativeFlow1',
            sortable: false
          },
          {
            title: '累计流量2（立方米）',
            align: 'center',
            minWidth: 180,
            key: 'cumulativeFlow2',
            sortable: false
          },
          {
            title: '水温（摄氏度）',
            align: 'center',
            minWidth: 140,
            key: 'waterTemperature',
            sortable: false
          },
          {
            title: '设备温度（摄氏度）',
            align: 'center',
            minWidth: 180,
            key: 'equipmentTemperature',
            sortable: false
          },
          {
            title: '信号强度（百分比）',
            align: 'center',
            minWidth: 180,
            key: 'signalIntensity',
            sortable: false
          },
          {
            title: 'pm2.5（微克/立方米）',
            align: 'center',
            minWidth: 180,
            key: 'pm25',
            sortable: false
          },
          {
            title: 'pm10（微克/立方米）',
            align: 'center',
            key: 'pm10',
            minWidth: 180,
            sortable: false
          },
          {
            title: '闸门开启高度(米)',
            align: 'center',
            minWidth: 170,
            key: 'gateOpeningHeight',
            sortable: false
          },
          {
            title: '上传时间',
            key: 'uploadTime',
            sortable: true,
            align: 'center',
            width: 180,
            render: (h, params) => {
              return h('div',
                formartDate(params.row.uploadTime, 'yyyy-MM-dd HH:mm:ss')
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            slot: 'action',
            width: 200,
          }
        ]
      },
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getTEquipmentHistoryRecordColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      },
      changeExpand() {//扩展 收缩按钮
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = "ios-arrow-back";
          this.marginLeft = '300px';
        } else {
          this.expandIcon = "ios-arrow-forward";
          this.marginLeft = '0px';
        }
      },
      selectTree(v) {//选择树
        if (v.length > 0) {
          this.selectTreeTitle = v[0].title;
          this.searchForm.page = 1;
          this.searchForm.size = 10;
          this.searchForm.equipmentId = v[0].value;
          this.getDataList()

          // 重新加载右侧数据

        } else {
          this.cancelEdit();
        }
      },
      cancelEdit() {//取消选择
        let data = this.$refs.tree.getSelectedNodes()[0];
        if (data) {
          data.selected = false;
        }
        this.selectTreeTitle = "";
      },

      searchTreeData() {// 加载树形数据
        getDeptAndEquipmentPacketTreeData({searchKey: this.searchKey}).then(res => {
          if (res && res.success) {
            this.treeData = res.data;
          }
        });
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


    },
    mounted() {
      this.getConmmunicationStatusPriority();
      this.searchTreeData();
      this.getDataList();
      //this.tableHeight = window.innerHeight - this.$refs.tEquipmentHistoryRecordTable.$el.offsetTop - 270
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
