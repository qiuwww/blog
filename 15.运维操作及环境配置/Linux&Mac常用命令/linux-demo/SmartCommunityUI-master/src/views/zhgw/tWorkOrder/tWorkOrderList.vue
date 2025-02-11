<style lang="less">
  .tWorkOrderList {
    .emerge {
      padding: 4px 8px;
      border: 1px solid #ED4014 !important;
      color: #ED4014;
      border-radius: 4px;
      text-align: center;
    }

    .normal {
      padding: 4px 8px;
      border: 1px solid #FF9900 !important;
      color: #FF9900;
      border-radius: 4px;
      text-align: center;
    }

    .light {
      padding: 4px 8px;
      border: 1px solid #19BE6B !important;
      color: #19BE6B;
      border-radius: 4px;
      text-align: center;
    }

    .operation {
      margin-bottom: 10px;
    }

    .ivu-form .ivu-form-item-label {
      padding: 0;
      position: relative;
      transform: translateY(70%);
      left: -10px;
    }

    .funOption {
      padding: 0 4px;
      text-align: center;
      user-select: none;
    }

    .funOption:active {
      background: #ADDEFA;
    }

    .search {
      .ivu-select {
        width: 186px !important;
      }

      .searchBtn {
        margin-left: -40px !important;
      }
    }
  }
</style>

<template>
  <div class="tWorkOrderList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search">
          <Form-item label="编号">
            <Input v-model="searchForm.number" placeholder="请输入编号"/>
          </Form-item>
          <Form-item label="工单描述">
            <Input v-model="searchForm.remarks" placeholder="请输入工单描述"/>
          </Form-item>
          <Form-item label="工单类型" v-if="drop">
            <Select placeholder="处理人" clearable v-model="searchForm.type">
              <Option v-for="(item, i)  in type" :key="item.id" :value="item.value.toString()">{{item.label}}</Option>
            </Select>
          </Form-item>
          <Form-item label="处理人" v-if="drop">
            <Input v-model="searchForm.handlePerson" placeholder="请输入编号"/>
          </Form-item>
          <Form-item label="工单级别" v-if="drop">
            <Select placeholder="状态" clearable v-model="searchForm.level">
              <Option v-for="(item, i)  in level" :key="item.id" :value="item.value.toString()">{{item.label}}</Option>
            </Select>
          </Form-item>
          <Form-item label="状态" v-if="drop">
            <Select placeholder="状态" clearable v-model="searchForm.status">
              <Option v-for="(item, i)  in status" :key="item.id" :value="item.value.toString()">{{item.label}}</Option>
            </Select>
          </Form-item>
          <Form-item class="searchBtn">
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
        <Button @click="addTWorkOrder" type="primary" icon="md-add">新增</Button>
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
            <DropdownItem name="exportPerson">
              <Icon type="md-arrow-down"/>
              导出所有数据
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
                <row v-for="(item,i) in colSelect">
                  <checkbox  :label="item" :key="item"></checkbox>
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
        <Table border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table" :loading="loading">

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
                <DropdownItem name="inBind" @click.native="handleTWorkOrder(row,index)">
                  <Icon type="ios-hand-outline"/>
                  处理
                </DropdownItem>
                <DropdownItem name="outBind" @click.native="handleWorkOrder(row,index)">
                  <Icon type="md-share"/>
                  派单
                </DropdownItem>
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
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer></Page>
      </Row>
    </Card>
    <!-- 新增-->
    <update-t-work-order v-model="updateShow" :TWorkOrderId="TWorkOrderId" :procDefId="procDefId" :modalTitle="title"
                           v-on:handleSearch="getDataList" ></update-t-work-order>
    <!--查看-->
    <look-t-work-order v-model="lookShow" :TWorkOrderId="TWorkOrderId" :modalTitle="title"></look-t-work-order>

    <!--处理-->
    <handle-t-work-order v-model="handleShow" :TWorkOrderId="TWorkOrderId" :modalTitle="title" :procInstId="procInstId" :tStatus="tStatus"></handle-t-work-order>

    <!--派单-->
    <audit-t-work-order v-model="auditShow" :TWorkOrderId="TWorkOrderId" :modalTitle="title" :procDefId="procDefId"  v-on:handleSearch="getDataList"></audit-t-work-order>

    <!--抽屉选择流程-->
    <draw-flow-selected v-model="drawShow" v-on:drawClose="drawClose"></draw-flow-selected>
  </div>
</template>
<script>
    import {
        deleteTWorkOrder,
        queryTWorkOrderList,
        download
    } from '@/api/zhgw/tWorkOrder/tWorkOrder'
    import {formartDate} from '@/api/tools/tool'
    import {getDictDataByType} from '@/api/index';
    import updateTWorkOrder from "./updateTWorkOrder";
    import lookTWorkOrder from "./lookTWorkOrder";
    import handleTWorkOrder from "./handleTWorkOrder";
    import auditTWorkOrder from "./auditTWorkOrder";
    import drawFlowSelected from "./drawFlowSelected";

    export default {
        components: {
            updateTWorkOrder, lookTWorkOrder, handleTWorkOrder, auditTWorkOrder, drawFlowSelected
        },
        data() {
            return {
                procInstId:'',
                drop: false,
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                search: '',
                columns: this.getTWorkOrderColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    number: '',
                    type: '',
                    handlePerson: '',
                    time: '',
                    status: '',
                    level: '',
                    remarks: '',
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: null,//开始时间
                    endDate: null,//结束时间
                    sort: 'createTime', // 默认排序字段
                    order: 'desc' // 默认排序方式
                },
                total: 0,
                title: '',
                TWorkOrderId: '',
                procDefId:'',
                updateShow: false,
                lookShow: false,
                auditShow: false,
                handleShow: false,
                drawShow: false,
                drop: false,
                tableHeight: 200,
                colOptions: ["编号", "工单描述", "工单类型", "处理人", "工单时间", "状态", "工单级别", "操作"],
                colSelect: ["编号", "工单描述", "工单类型", "处理人", "工单时间", "状态", "工单级别", "操作"],
                type: [],
                level: [],
                status: [],
                data: [],
                tStatus:''
            }
        },
        methods: {
            //设备类型
            getTypePriority() {
                getDictDataByType('work_order_level').then(res => {
                    if (res && res.success) {
                        this.level = res.data;
                    }
                });
            },
            //列表上方更多操作
            handleDropdown(name) {
                if (name == "refresh") {
                    this.handleReset();
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
                } else if (name == "exportPerson") {
                    this.exportData();
                }
            },
            exportData() {//导出人口数据
                var _this = this;
                download(_this.searchForm).then(res => {
                    const content = res;
                    const blob = new Blob([content], {type: 'application/ms-excel'});
                    const fileName = '任务工单.xlsx';
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
            //查看
            handleLook(row, index) {
                this.title = '工单查看';
                this.lookShow = true;
                this.TWorkOrderId = row.id.toString();
            },
            //编辑
            handleEdit(row, index) {
                this.title = '工单修改';
                this.TWorkOrderId = row.id.toString();
                this.updateShow = true;
            },
            //开启流程选择
            addTWorkOrder() {
                this.drawShow = true
            },
            //关闭流程选择
            drawClose(v) {
                this.drawShow = false;
                if(v.id == null || v.id == ""){
                    this.$Message.error('流程定义参数传递失败，请联系管理员');
                    return;
                }
                //新增工单信息
                this.title = '工单添加';
                this.updateShow = true;
                this.procDefId = v.id;
            },
            //处理
            handleTWorkOrder(row, index) {
                this.title = '工单处理';
                this.handleShow = true;
                this.TWorkOrderId = row.id.toString();
                if(row.procInstId){
                    this.procInstId = row.procInstId.toString();
                }
                this.tStatus = row.statusCode.toString();
            },
            //工单指派
            handleWorkOrder(row, index) {
                if(row.status != "预处理"){
                    this.$message.warning("已经派单，禁止继续操作");
                    return;
                }
                this.title = '工单指派';
                this.auditShow = true;
                this.TWorkOrderId = row.id.toString();
                this.procDefId = row.procDefId.toString();
            },
            //刷新
            refresh() {
                this.getDataList();
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.id = null;
                queryTWorkOrderList(this.searchForm).then(res => {
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
                deleteTWorkOrder({ids: ids}).then(res => {
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
                this.searchForm.number = '';
                this.searchForm.type = '';
                this.searchForm.level = '';
                this.searchForm.handlePerson = '';
                this.searchForm.status = '';
                this.searchForm.remarks = '';
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.startDate = null;
                this.searchForm.endDate = null;
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
            getTWorkOrderColumns() {
                return [
                    {
                        type: 'selection',
                        align: 'center',
                        minWidth: 50
                    },
                    {
                        title: '编号',
                        align: 'center',
                        key: 'number',
                        sortable: false,
                        tooltip: true,
                        minWidth: 80
                    }, {
                        title: '工单标题',
                        align: 'center',
                        key: 'title',
                        sortable: false,
                        tooltip: true,
                        minWidth: 80
                    }, {
                        title: '工单类型',
                        align: 'center',
                        key: 'type',
                        sortable: false,
                        tooltip: true,
                        minWidth: 80
                    },
                    // {
                    //     title: '处理人',
                    //     align: 'center',
                    //     key: 'handlePerson',
                    //     sortable: false,
                    //     tooltip: true,
                    //     minWidth: 80
                    // },
                    {
                        title: '工单时间',
                        align: 'center',
                        key: 'time',
                        sortable: false,
                        tooltip: true,
                        minWidth: 80
                    }, {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        sortable: false,
                        tooltip: true,
                        minWidth: 80
                    }, {
                        title: '工单级别',
                        align: 'center',
                        key: 'level',
                        sortable: false,
                        tooltip: true,
                        minWidth: 80,
                        render: (h, param) => {
                            if (param.row.level) {
                                let tempArr = this.level.filter(item => item.label === param.row.level);
                                if (tempArr != null && tempArr.length > 0) {
                                    return h("Tooltip", {
                                        class: tempArr[0].value,
                                        props: {
                                            content: tempArr[0].label,
                                            placement: 'bottom',
                                            transfer: true
                                        }
                                    }, tempArr[0].label)
                                } else {
                                    return h("Tooltip", {
                                        props: {
                                            content: "暂无",
                                            placement: 'bottom',
                                            transfer: true
                                        }
                                    }, "暂无")
                                }
                            } else {
                                return h("Tooltip", {
                                    props: {
                                        content: "暂无",
                                        placement: 'bottom',
                                        transfer: true
                                    }
                                }, "暂无")
                            }
                        }
                    }, {
                        title: '工单描述',
                        align: 'center',
                        key: 'remarks',
                        sortable: false,
                        tooltip: true,
                        minWidth: 80
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        width: 200
                    }
                ]
            },
            //动态列实现
            checkboxChange: function (data) {
                let columnss = this.getTWorkOrderColumns();
                this.columns = columnss.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                })
            }
        },
        mounted() {
            this.getTypePriority();
            this.getDataList();
        }
    }
</script>
