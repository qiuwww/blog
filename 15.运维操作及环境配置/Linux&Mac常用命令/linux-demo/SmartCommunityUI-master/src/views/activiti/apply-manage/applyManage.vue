<style lang="less">
@import "../../../styles/table-common.less";
@import "./applyManage.less";
</style>
<template>
  <div class="search">
    <historicDetail v-if="showHistory" @close="showHistory=false" :procInstId="procInstId" />
    <Card v-show="!showHistory">
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="标题" prop="title">
            <Input
              type="text"
              v-model="searchForm.title"
              placeholder="请输入"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="状态" prop="status">
            <Select v-model="searchForm.status" placeholder="请选择" clearable style="width: 200px">
              <Option value="0">草稿</Option>
              <Option value="1">处理中</Option>
              <Option value="2">已结束</Option>
              <Option value="3">已撤回</Option>
            </Select>
          </Form-item>
          <span v-if="drop">
            <Form-item label="结果" prop="result">
              <Select v-model="searchForm.result" placeholder="请选择" clearable style="width: 200px">
                <Option value="0">未提交</Option>
                <Option value="1">处理中</Option>
                <Option value="2">通过</Option>
                <Option value="3">驳回</Option>
              </Select>
            </Form-item>
            <Form-item label="创建时间">
              <DatePicker
                v-model="selectDate"
                type="daterange"
                format="yyyy-MM-dd"
                clearable
                @on-change="selectDateRange"
                placeholder="选择起始时间"
                style="width: 200px"
              ></DatePicker>
            </Form-item>
          </span>
          <Form-item style="margin-left:-35px;" class="br">
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
        <Button @click="add" type="primary" icon="md-add">新增申请</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>
      </Row>
      <Row v-show="openTip">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
        </Alert>
      </Row>
      <Row>
        <Table
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          sortable="custom"
          @on-sort-change="changeSort"
          @on-selection-change="showSelect"
          ref="table"
        ></Table>
      </Row>
      <Row type="flex" justify="end" class="page">
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
          transfer
          show-sizer
        ></Page>
      </Row>
    </Card>

    <!-- Drawer抽屉式选择流程 -->
    <Drawer title="选择流程" closable v-model="processModalVisible" width="820" draggable>
      <div class="apply-operation">
        <div>
          <Form ref="searchProcessForm" :model="searchProcessForm" inline :label-width="70">
            <Form-item label="流程名称" prop="name">
              <Input
                type="text"
                v-model="searchProcessForm.name"
                clearable
                placeholder="请输入流程名"
                style="width: 140px"
              />
            </Form-item>
            <Form-item label="所属分类" prop="category">
              <Cascader
                v-model="selectCat"
                :data="category"
                :load-data="loadData"
                @on-change="handleChangeCat"
                change-on-select
                filterable
                clearable
                placeholder="请选择分类"
                style="width: 140px"
              ></Cascader>
            </Form-item>
            <Form-item style="margin-left:-70px;" class="br">
              <Button @click="searchProcess" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleResetProcess">重置</Button>
              <i-switch
                size="large"
                v-model="searchProcessForm.showLatest"
                @on-change="searchProcess"
                style="margin:0 5px"
              >
                <span slot="open">最新</span>
                <span slot="close">全部</span>
              </i-switch>
            </Form-item>
          </Form>
        </div>
        <div>
          <RadioGroup v-model="showType" type="button">
            <Radio title="缩略图" label="thumb">
              <Icon type="ios-apps"></Icon>
            </Radio>
            <Radio title="列表" label="list">
              <Icon type="md-list"></Icon>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div
        class="process-list-wrapper"
        v-if="showType=='thumb'"
        :style="{maxHeight: maxHeight+'px'}"
      >
        <Card v-for="(item, i) in processData" :key="i" class="process-card">
          <div class="content" @click="chooseProcess(item)">
            <div class="other">
              <div class="name">{{i+1}}. {{item.name}}</div>
              <div class="key">{{item.description}}</div>
              <div class="info">
                版本：v.{{item.version}}
                <span style="margin-left:10px"></span>
                所属分类：{{item.categoryTitle}}
              </div>
            </div>
          </div>
        </Card>
        <Spin fix v-if="processLoading" />
      </div>
      <Table
        :height="maxHeight"
        :loading="processLoading"
        border
        :columns="processColumns"
        :data="processData"
        ref="processTable"
        v-if="showType=='list'"
      ></Table>
      <Row class="process-choose-drawer-footer">
        <Page
          :current="searchProcessForm.pageNumber"
          :total="processTotal"
          :page-size="searchProcessForm.pageSize"
          @on-change="changeProcessPage"
          @on-page-size-change="changeProcessPageSize"
          :page-size-opts="[10,20,50,100]"
          size="small"
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Drawer>

    <Modal title="提交申请" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="85" :rules="formValidate">
        <FormItem label="选择审批人" prop="assignees" v-show="showAssign" :error="error">
          <Select
            v-model="form.assignees"
            placeholder="请选择或输入搜索"
            filterable
            clearable
            multiple
            :loading="userLoading"
          >
            <Option
              v-for="(item, i) in assigneeList"
              :key="i"
              :value="item.id"
              :label="item.nickname"
            >
              <span style="margin-right:10px;">{{ item.nickname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="自定义搜索选择审批人" prop="assignees" v-show="isCustom" :error="error">
          <Select
            v-model="form.assignees"
            placeholder="请输入用户名搜索选择用户"
            filterable
            remote
            multiple
            :remote-method="searchUser"
            :loading="userLoading"
          >
            <Option v-for="(item, i) in userList" :value="item.id" :key="i" :label="item.nickname">
              <span style="margin-right:10px;">{{ item.nickname }}</span>
              <span style="color:#ccc;">{{ item.username }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="下一审批人" v-show="isGateway">
          <span>分支网关处暂不支持自定义选择下一审批人，将发送给下一节点所有人</span>
        </FormItem>
        <FormItem label="优先级" prop="priority">
          <Select v-model="form.priority" placeholder="请选择" clearable>
            <Option v-for="(item, i) in dictPriority" :key="i" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="消息通知">
          <Checkbox v-model="form.sendMessage">站内消息通知</Checkbox>
          <Checkbox v-model="form.sendSms">短信通知</Checkbox>
          <Checkbox v-model="form.sendEmail">邮件通知</Checkbox>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handelCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmit">提交</Button>
      </div>
    </Modal>

    <Modal title="确认撤回" v-model="modalCancelVisible" :mask-closable="false" :width="500">
      <Form ref="delForm" v-model="cancelForm" :label-width="70">
        <FormItem label="撤回原因" prop="reason">
          <Input type="textarea" v-model="cancelForm.reason" :rows="4" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalCancelVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmitCancel">提交</Button>
      </div>
    </Modal>
    <!--    表单新增、编辑-->
    <applyActivity v-model="applyActivityShow"  :applyActivityProcDefId="applyActivityProcDefId" :tFormGeneratorId="applyActivityId" :modalTitle="applyActivityTitle"
                   :title="applyActivityName"     v-on:handleSearch="getDataList"></applyActivity>
    <!--    表单查看-->
    <lookActivity v-model="applyActivityLookShow"  :applyActivityProcDefId="applyActivityProcDefId" :tFormGeneratorId="applyActivityId" :modalTitle="applyActivityTitle"
                   :title="applyActivityName"     v-on:handleSearch="getDataList"></lookActivity>
  </div>
</template>

<script>
import {
  getProcessDataList,
  getFirstNode,
  getBusinessDataList,
  applyBusiness,
  deleteBusiness,
  cancelApply,
  initActCategory,
  loadActCategory
} from "@/api/activiti";
import { searchUserByName,getDictDataByType } from "@/api/index";
import historicDetail from "../historic-detail/historicDetail.vue";
import applyActivity from './applyActivity'
import lookActivity from './lookActivity'
export default {
  name: "apply-manage",
  components: {
    historicDetail,applyActivity,lookActivity
  },
  data() {
    return {
      showHistory: false,
      procInstId: "",
      maxHeight: 510,
      openSearch: true,
      openTip: true,
      loading: true, // 表单加载状态
      processModalVisible: false,
      selectCat: [],
      category: [],
      error: "",
      showAssign: false,
      isGateway: false,
      isCustom: false,
      searchProcessForm: {
        showLatest: true,
        filter: true,
        name: "",
        status: "1", // 激活状态
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc" // 默认排序方式
      },
      processTotal: 0,
      cancelForm: {
        reason: ""
      },
      modalCancelVisible: false,
      processLoading: false,
      processColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "名称",
          key: "name",
          width: 150,
          sortable: true
        },
        {
          title: "备注描述",
          key: "description",
          width: 150,
          sortable: true
        },
        {
          title: "所属分类",
          key: "categoryTitle",
          width: 150,
          sortable: true
        },
        {
          title: "版本",
          key: "version",
          align: "center",
          sortable: true,
          render: (h, params) => {
            let re = "";
            if (params.row.version) {
              re = "v." + params.row.version;
            }
            return h("div", re);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 135,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.chooseProcess(params.row);
                    }
                  }
                },
                "选择该流程"
              )
            ]);
          }
        }
      ],
      processData: [],
      showType: "thumb",
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      drop: false, // 搜索展开标识
      dropDownContent: "展开", // 搜索展开标识文字
      dropDownIcon: "ios-arrow-down", //搜索展开图标
      searchForm: {
        // 搜索框对应data对象
        title: "",
        status: "",
        result: "",
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: "",
        endDate: "",
        sort: "createTime", // 默认排序字段
        order: "desc" // 默认排序方式
      },
      userLoading: false,
      modalVisible: false, // 添加或编辑显示
      selectDate: null,
      form: {
        sendMessage: true,
        sendSms: true,
        sendEmail: true,
        procDefId: "",
        assignees: [],
        priority: "0"
      },
      formValidate: {
        // 表单验证规则
        procDefId: [{ required: true, message: "不能为空", trigger: "blur" }],
        priority: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      submitLoading: false, // 添加或编辑提交状态
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "标题",
          key: "title",
          minWidth: 150,
          sortable: true,
          tooltip: true,
        },
        {
          title: "所属流程",
          key: "processName",
          width: 160,
          tooltip: true,
          render: (h, params) => {
            let text = params.row.processName;
            if (params.row.version) {
              text = params.row.processName + " - v." + params.row.version;
            }
            let dd = text;
            if(dd.length>10){
              dd = dd.substring(0,10)+"..."
            }
            return h("Tooltip", {
              props: {
                content: text,
                placement: 'bottom',
                transfer: true
              }
            }, dd)
          }
        },
        {
          title: "当前审批环节",
          key: "currTaskName",
          minWidth: 150,
          tooltip: true
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 120,
          sortable: true,
          render: (h, params) => {
            let text = "未知",
              color = "";
            if (params.row.status == 0) {
              text = "草稿";
              color = "default";
            } else if (params.row.status == 1) {
              text = "处理中";
              color = "orange";
            } else if (params.row.status == 2) {
              text = "已结束";
              color = "blue";
            } else if (params.row.status == 3) {
              text = "已撤回";
              color = "magenta";
            }
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "结果",
          key: "result",
          align: "center",
          width: 120,
          sortable: true,
          render: (h, params) => {
            let text = "未知",
              color = "";
            if (params.row.result == 0) {
              text = "未提交";
              color = "default";
            } else if (params.row.result == 1) {
              text = "处理中";
              color = "orange";
            } else if (params.row.result == 2) {
              text = "已通过";
              color = "green";
            } else if (params.row.result == 3) {
              text = "已驳回";
              color = "red";
            }
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 180,
          sortType: "desc",
          sortable: true,
          tooltip:true,
        },
        {
          title: "提交申请时间",
          key: "applyTime",
          width: 180,
          sortable: true,
          tooltip:true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 265,
          fixed: "right",
          render: (h, params) => {
            let re = "";
            if (params.row.status == 0) {
              re = [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.apply(params.row);
                      }
                    }
                  },
                  "提交申请"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.edit(params.row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.remove(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ];
            } else if (params.row.status == 1) {
              re = [
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      type: "warning",
                      icon: "ios-redo"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.cancel(params.row);
                      }
                    }
                  },
                  "撤回"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      type: "info"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.history(params.row);
                      }
                    }
                  },
                  "查看进度"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.detail(params.row);
                      }
                    }
                  },
                  "表单数据"
                )
              ];
            } else if (
              (params.row.status == 2 && params.row.result == 3) ||
              params.row.status == 3
            ) {
              re = [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.apply(params.row);
                      }
                    }
                  },
                  "重新申请"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.edit(params.row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      type: "info"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.history(params.row);
                      }
                    }
                  },
                  "审批历史"
                )
              ];
            } else {
              re = [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.detail(params.row);
                      }
                    }
                  },
                  "表单数据"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      type: "info"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.history(params.row);
                      }
                    }
                  },
                  "审批历史"
                )
              ];
            }

            return h("div", re);
          }
        }
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
      assigneeList: [],
      userList: [],
      dictPriority: [],//优先级
      applyActivityProcDefId:"",//流程定义id
      applyActivityId:"",//流程id
      applyActivityShow:false,////是否显示表单编辑弹框
      applyActivityTitle:"",//弹框标题
      applyActivityName:"",//流程名
      applyActivityLookShow:false,//是否显示表单查看弹框
    };
  },
  methods: {
    //初始化
    init() {
      this.getDataList();
      this.getProcessList();
      this.initCategoryData();
      this.getDictDataType();
    },
    //获取字典值
    getDictDataType() {
      //优先级
      getDictDataByType("priority").then(res => {
        if (res && res.success) {
          this.dictPriority = res.data;
        }
      });
    },
    getProcessList() {
      this.processLoading = true;
      getProcessDataList(this.searchProcessForm).then(res => {
        this.processLoading = false;
        if (res && res.success) {
          this.processData = res.data.content;
        }
      });
    },
    changeProcessPage(v) {
      this.searchProcessForm.pageNumber = v;
      this.getProcessList();
    },
    changeProcessPageSize(v) {
      this.searchProcessForm.pageSize = v;
      this.getProcessList();
    },
    searchProcess() {
      this.searchProcessForm.pageNumber = 1;
      this.getProcessList();
    },
    searchUser(v) {
      if (!v) {
        return;
      }
      this.userLoading = true;
      searchUserByName(v).then(res => {
        this.userLoading = false;
        if (res && res.success) {
          this.userList = res.result;
        }
      });
    },
    initCategoryData() {
      initActCategory().then(res => {
        if (res && res.success) {
          res.data.forEach(function(e) {
            if (e.isParent) {
              e.value = e.id;
              e.label = e.title;
              e.loading = false;
              e.children = [];
            } else {
              e.value = e.id;
              e.label = e.title;
            }
            if (e.status == -1) {
              e.label = "[已禁用] " + e.label;
              e.disabled = true;
            }
          });
          this.category = res.result;
        }
      });
    },
    loadData(item, callback) {
      item.loading = true;
      loadActCategory(item.value).then(res => {
        item.loading = false;
        if (res && res.success) {
          res.data.forEach(function(e) {
            if (e.isParent) {
              e.value = e.id;
              e.label = e.title;
              e.loading = false;
              e.children = [];
            } else {
              e.value = e.id;
              e.label = e.title;
            }
            if (e.status == -1) {
              e.label = "[已禁用] " + e.label;
              e.disabled = true;
            }
          });
          item.children = res.result;
          callback();
        }
      });
    },
    handleChangeCat(value, selectedData) {
      let categoryId = "";
      // 获取最后一个值
      if (value && value.length > 0) {
        categoryId = value[value.length - 1];
      }
      this.searchProcessForm.categoryId = categoryId;
    },
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
    handleResetProcess() {
      this.$refs.searchProcessForm.resetFields();
      this.searchProcessForm.categoryId = "";
      this.selectCat = [];
      // 重新加载数据
      this.getProcessList();
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    getDataList() {
      this.loading = true;
      // 避免后端默认值
      if (!this.searchForm.status) {
        this.searchForm.status = " ";
      }
      if (!this.searchForm.result) {
        this.searchForm.result = " ";
      }
      getBusinessDataList(this.searchForm).then(res => {
        this.loading = false;
        if (res && res.success) {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        }
      });
    },
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      // 重新加载数据
      this.getDataList();
    },
    handelCancel() {
      this.modalVisible = false;
    },
    handelSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (
            (this.showAssign || this.isCustom) &&
            this.form.assignees.length < 1
          ) {
            this.error = "请至少选择一个审批人";
            return;
          } else {
            this.error = "";
          }
          this.submitLoading = true;
          applyBusiness(this.form).then(res => {
            this.submitLoading = false;
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
              this.modalVisible = false;
            }
          });
        }
      });
    },

    add() {
      this.processModalVisible = true;
    },
    //选择流程
    chooseProcess(v) {
      if (!v.routeName) {
        this.$Message.warning(
          "该流程信息未完善，请于流程管理中编辑流程完善信息"
        );
        return;
      }
      this.processModalVisible = false;
      let query = { type: 0, backRoute: this.$route.name, procDefId: v.id };
      this.applyActivityProcDefId = v.id;
      this.applyActivityId = "";
      this.applyActivityShow = true;
      this.applyActivityTitle= "流程新增";
      this.applyActivityName=  v.name;
    },
    //表单编辑
    edit(v) {
      if (!v.routeName) {
        this.$Message.error("表单路由名为空");
        return;
      }
      let query = { type: 1, id: v.tableId, backRoute: this.$route.name };
      this.processModalVisible = false;
      this.applyActivityProcDefId = v.procDefId;
      this.applyActivityId = v.tableId;
      this.applyActivityShow = true;
      this.applyActivityTitle= "流程编辑";
      this.applyActivityName=  v.name;
      // this.$router.push({
      //   name: v.routeName,
      //   query: query
      // });
    },
    //表单查看
    detail(v) {
      if (!v.routeName) {
        this.$Message.error("表单路由名为空");
        return;
      }
      // let query = { type: 2, id: v.tableId, backRoute: this.$route.name };
      this.applyActivityProcDefId = v.procDefId;
      this.applyActivityId = v.tableId;
      this.applyActivityLookShow = true;
      this.applyActivityTitle= "流程编辑";
      this.applyActivityName=  v.name;
      // this.$router.push({
      //   name: v.routeName,
      //   query: query
      // });
    },
    apply(v) {
      if (!v.procDefId || v.procDefId == "null") {
        this.$Message.error("流程定义为空");
        return;
      }
      this.form.id = v.id;
      this.form.procDefId = v.procDefId;
      this.form.title = v.title;
      // 加载审批人
      this.userLoading = true;
      getFirstNode(v.procDefId).then(res => {
        this.userLoading = false;
        if (res && res.success) {
          this.error = "";
          if (res.result.type == 3 || res.result.type == 4) {
            this.isGateway = true;
            this.form.firstGateway = true;
            this.showAssign = false;
            this.isCustom = false;
            return;
          }
          if (res.result.type == 5) {
            this.isCustom = true;
            this.isGateway = false;
            this.form.firstGateway = false;
            this.showAssign = false;
            return;
          }
          if (res.result.type == 1) {
            this.showAssign = true;
            this.isGateway = false;
            this.form.firstGateway = false;
            this.isCustom = false;
            if (res.result.users && res.result.users.length > 0) {
              this.assigneeList = res.result.users;
              // 默认勾选
              let ids = [];
              res.result.users.forEach(e => {
                ids.push(e.id);
              });
              this.form.assignees = ids;
              this.showAssign = true;
            } else {
              this.form.assignees = [];
              this.showAssign = true;
              this.error = '请进入"流程管理"为审批节点分配候选审批人员';
            }
          }
        }
      });
      this.modalVisible = true;
    },
    cancel(v) {
      this.cancelForm.id = v.id;
      this.cancelForm.procInstId = v.procInstId;
      this.modalCancelVisible = true;
    },
    handelSubmitCancel() {
      this.submitLoading = true;
      cancelApply(this.cancelForm).then(res => {
        this.submitLoading = false;
        if (res && res.success) {
          this.$Message.success("操作成功");
          this.getDataList();
          this.modalCancelVisible = false;
        }
      });
    },
    history(v) {
      if (!v.procInstId) {
        this.$Message.error("流程实例ID不存在");
        return;
      }
      this.procInstId = v.procInstId;
      this.showHistory = true;
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.title + " ?",
        loading: true,
        onOk: () => {
          // 删除
          deleteBusiness( v.id ,{}).then(res => {
            this.$Modal.remove();
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        }
      });
    },
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function(e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          // 批量删除
          deleteBusiness( ids ).then(res => {
            this.$Modal.remove();
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        }
      });
    }
  },
  mounted() {
    // 计算高度
    this.maxHeight = Number(document.documentElement.clientHeight - 180);
    this.init();
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      if (to.name == "apply-manage") {
        this.getDataList();
        this.getProcessList();
      }
    }
  }
};
</script>
