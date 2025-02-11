<style lang="less">
  @import "../../../styles/table-common.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="任务名称" prop="name">
            <Input
              type="text"
              v-model="searchForm.name"
              placeholder="请输入"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="passAll" icon="md-checkmark-circle-outline">批量通过</Button>
        <Button @click="backAll" icon="md-close">批量驳回</Button>
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
          sortable="custom"
          :data="data"
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
          show-sizer
        ></Page>
      </Row>
    </Card>


    <!--查看-->
    <look-t-work-order v-model="lookShow" :TWorkOrderId="TWorkOrderId" :modalTitle="title"></look-t-work-order>
    <!--处理-->
    <deal-t-work-order v-model="dealShow" :taskObj="taskObj" :modalTitle="title"
                       v-on:handleSearch="handleSearch"></deal-t-work-order>
    <!--驳回-->
    <back-t-work-order v-model="backShow" :taskObj="taskObj" :procInstId="procInstId" :modalTitle="title"
                       v-on:handleSearch="handleSearch"></back-t-work-order>
    <!--审批历史-->
    <historic-detail v-model="historyShow" :procInstId="procInstId" :modalTitle="title"></historic-detail>
  </div>
</template>

<script>
    import {
        pass,
        back,
        getBackList,
        backToTask,
        delegate,
        getNextNode,
        getNode,
        deleteTask
    } from "@/api/activiti";

    import backTWorkOrder from "./backTWorkOrder";
    import {todoList, doneList} from "@/api/zhgw/tWorkOrderTask/tWorkOrderTask"
    import dealTWorkOrder from "./dealTWorkOrder";
    import {searchUserByName, getDictDataByType} from "@/api/index";
    import lookTWorkOrder from "./lookTWorkOrder";
    import {passAll, backAll} from "@/api/zhgw/tWorkOrderTask/tWorkOrderTask"
    import historicDetail from "./historicDetail";

    export default {
        name: "todo-manage",
        components: {
            lookTWorkOrder, dealTWorkOrder, backTWorkOrder, historicDetail
        },
        data() {
            return {
                historyShow: false,
                procInstId: '',
                backShow: false,
                modalTaskTitle: '',
                dealShow: false,
                taskObj: {},
                title: '',
                TWorkOrderId: '',
                lookShow: false,
                openSearch: true,
                openTip: true,
                loading: true, // 表单加载状态
                modalTaskVisible: false,
                userLoading: false,
                backLoading: false,
                userList: [],
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                assigneeList: [],
                backList: [
                    {
                        key: "-1",
                        name: "发起人"
                    }
                ],
                error: "",
                showAssign: false,
                searchForm: {
                    // 搜索框对应data对象
                    name: "",
                    pageNumber: 1, // 当前页数
                    pageSize: 10 // 页面大小
                },
                form: {
                    id: "",
                    userId: "",
                    procInstId: "",
                    comment: "",
                    type: 0,
                    assignees: [],
                    backTaskKey: "-1",
                    sendMessage: true,
                    sendSms: true,
                    sendEmail: true
                },
                formValidate: {
                    // 表单验证规则
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
                        title: "任务名称",
                        key: "name",
                        minWidth: 160
                    },
                    {
                        title: "所属流程",
                        key: "processName",
                        width: 150
                    },
                    {
                        title: "委托代办人",
                        key: "owner",
                        width: 130
                    },
                    {
                        title: "流程发起人",
                        key: "applyer",
                        width: 130
                    },
                    {
                        title: "优先级",
                        key: "priority",
                        width: 100,
                        sortable: true,
                        render: (h, params) => {
                            let text = "无",
                                color = "";
                            if (params.row.priority == 0) {
                                color = "green";
                            } else if (params.row.priority == 1) {
                                color = "orange";
                            } else if (params.row.priority == 2) {
                                color = "red";
                            } else {
                                color = "default";
                            }
                            // this.dictPriority.forEach(e => {
                            //     if (e.value == params.row.priority) {
                            //         text = e.title;
                            //     }
                            // });
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
                        title: "状态",
                        key: "isSuspended",
                        align: "center",
                        width: 110,
                        render: (h, params) => {
                            if (!params.row.isSuspended) {
                                return h("div", [
                                    h("Badge", {
                                        props: {
                                            status: "success",
                                            text: "已激活"
                                        }
                                    })
                                ]);
                            } else if (params.row.isSuspended) {
                                return h("div", [
                                    h("Badge", {
                                        props: {
                                            status: "error",
                                            text: "已挂起"
                                        }
                                    })
                                ]);
                            }
                        },
                        filters: [
                            {
                                label: "已激活",
                                value: false
                            },
                            {
                                label: "已挂起",
                                value: true
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            if (value) {
                                return row.isSuspended == true;
                            } else if (!value) {
                                return row.isSuspended == false;
                            }
                        }
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        width: 180,
                        sortType: "desc",
                        sortable: true
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 320,
                        fixed: "right",
                        render: (h, params) => {
                            return h("div", [
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
                                                this.detail(params.row);
                                            }
                                        }
                                    },
                                    "申请详情"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            size: "small",
                                            type: "success"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.passTask(params.row);
                                            }
                                        }
                                    },
                                    "通过"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            size: "small",
                                            type: "warning"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.backTask(params.row);
                                            }
                                        }
                                    },
                                    "驳回"
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
                                    "历史"
                                )
                            ]);
                        }
                    }
                ],
                data: [], // 表单数据
                total: 0, // 表单数据总数
                dictPriority: [],
                isGateway: false
            };
        },
        methods: {
            init() {
                this.getDictDataType();
                this.getDataList();
            },
            getDictDataType() {
                getDictDataByType("priority").then(res => {
                    if (res && res.success) {
                        this.dictPriority = res.result;
                    }
                });
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
            getDataList() {
                this.loading = true;
                todoList(this.searchForm).then(res => {
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
                // 重新加载数据
                this.getDataList();
            },
            showSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            detail(v) {
                this.TWorkOrderId = v.businessKey;
                this.title = "工单查看";
                this.lookShow = true;
            },
            //审批
            passTask(v) {
                this.title = "审批";
                this.dealShow = true;
                this.taskObj = v;
            },

            backTask(v) {
                this.title = "驳回";
                this.procInstId = v.procInstId;
                this.backShow = true;
                this.taskObj = v;
            },
            delegateTask(v) {
                this.modalTaskTitle = "委托他人代办";
                this.form.id = v.id;
                this.form.procInstId = v.procInstId;
                this.form.type = 2;
                this.showAssign = false;
                this.modalTaskVisible = true;
            },
            history(v) {
                this.procInstId = v.procInstId;
                this.historyShow = true;
                this.title = "审批历史查看";
            },
            passAll(v) {
                if (this.selectCount <= 0) {
                    this.$Message.warning("您还未选择要通过的数据");
                    return;
                }
                // 批量通过
                this.modalVisible = true;
                this.$Modal.confirm({
                    title: "确认通过",
                    content:
                        "您确认要通过所选的 " +
                        this.selectCount +
                        " 条数据? 注意：将默认分配给节点设定的所有可审批用户",
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        this.selectList.forEach(function (e) {
                            ids.push(e.id);
                        });

                        passAll({ids: ids}).then(res => {
                            this.$Modal.remove();
                            if (res && res.success) {
                                this.$Message.success("操作成功");
                                this.modalVisible = false;
                                this.clearSelectAll();
                                this.getDataList();
                            }
                        });
                    }
                });
            },
            backAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning("您还未选择要驳回的数据");
                    return;
                }
                // 批量驳回
                this.modalVisible = true;
                this.$Modal.confirm({
                    title: "确认驳回",
                    content:
                        "您确认要驳回所选的 " +
                        this.selectCount +
                        " 条数据? 注意：所有流程将驳回至发起人",
                    loading: true,
                    onOk: () => {
                        let procInstIds = [];
                        this.selectList.forEach(function (e) {
                            procInstIds.push(e.procInstId);
                        });

                        backAll({procInstIds: procInstIds}).then(res => {
                            this.$Modal.remove();
                            if (res && res.success) {
                                this.$Message.success("操作成功");
                                this.modalVisible = false;
                                this.clearSelectAll();
                                this.getDataList();
                            }
                        });
                    }
                });
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            // 监听路由变化
            $route(to, from) {
                if (to.name == "todo-manage") {
                    this.getDataList();
                }
            }
        }
    };
</script>
