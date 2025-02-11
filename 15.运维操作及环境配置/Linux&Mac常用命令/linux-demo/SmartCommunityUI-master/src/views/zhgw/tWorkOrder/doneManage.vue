<style lang="less">

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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="70" :rules="formValidate">
        <FormItem label="删除原因" prop="reason">
          <Input type="textarea" v-model="form.reason" :rows="4"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handelCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmit">提交</Button>
      </div>
    </Modal>

    <!--审批历史-->
    <historic-detail v-model="historyShow" :procInstId="procInstId" :modalTitle="title"></historic-detail>

    <!--查看-->
    <lookt-work-order v-model="lookShow" :TWorkOrderId="businessKey" :modalTitle="title"></lookt-work-order>
  </div>
</template>

<script>
    import {updateInsStatus, deleteHistoricTask} from "@/api/activiti";
    import {todoList, doneList} from "@/api/zhgw/tWorkOrderTask/tWorkOrderTask"
    import util from "@/libs/util";
    import historicDetail from "./historicDetail";
    import LooktWorkOrder from "./lookTWorkOrder";

    export default {
        components: {LooktWorkOrder, historicDetail},
        name: "done-manage",
        data() {
            return {
                businessKey: "",
                procInstId: '',
                title: '',
                lookShow: false,
                historyShow: false,
                openSearch: true,
                openTip: true,
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    name: "",
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    sort: "createTime", // 默认排序字段
                    order: "desc" // 默认排序方式
                },
                modalType: 0, // 添加或编辑标识
                modalVisible: false, // 添加或编辑显示
                modalTitle: "", // 添加或编辑标题
                form: {
                    // 添加或编辑表单对象初始化数据
                    reason: ""
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
                            let text = "";
                            this.dictPriority.forEach(e => {
                                if (e.value == params.row.priority) {
                                    text = e.title;
                                }
                            });
                            return h("div", text);
                        }
                    },
                    {
                        title: "审批操作",
                        key: "deleteReason",
                        align: "center",
                        width: 130
                    },
                    {
                        title: "审批意见",
                        key: "comment",
                        align: "center",
                        width: 130
                    },
                    {
                        title: "耗时",
                        key: "duration",
                        align: "center",
                        width: 130,
                        sortable: true,
                        render: (h, params) => {
                            return h("div", util.millsToTime(params.row.duration));
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
                        width: 240,
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
                                    "表单数据"
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
                                                this.history(params.row);
                                            }
                                        }
                                    },
                                    "审批历史"
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
                            ]);
                        }
                    }
                ],
                data: [], // 表单数据
                total: 0, // 表单数据总数
                deleteId: "",
                dictPriority: this.$store.state.dict.priority
            };
        },
        methods: {
            init() {
                this.getDataList();
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
                doneList(this.searchForm).then(res => {
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
            handelCancel() {
                this.modalVisible = false;
            },
            handelSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.submitLoading = true;
                        if (this.modalType == 0) {
                            deleteProcessIns(this.deleteId).then(res => {
                                this.submitLoading = false;
                                if (res && res.success) {
                                    this.$Message.success("操作成功");
                                    this.modalVisible = false;
                                    this.getDataList();
                                }
                            });
                        } else if (this.modalType == 1) {
                            let ids = "";
                            this.selectList.forEach(function (e) {
                                ids += e.id + ",";
                            });
                            ids = ids.substring(0, ids.length - 1);
                            // 批量删除
                            deleteProcessIns(ids).then(res => {
                                this.submitLoading = false;
                                if (res && res.success) {
                                    this.$Message.success("操作成功");
                                    this.modalVisible = false;
                                    this.clearSelectAll();
                                    this.getDataList();
                                }
                            });
                        }
                    }
                });
            },
            editStatus(status, v) {
                let operation = "";
                if (status == 0) {
                    operation = "暂停挂起";
                } else {
                    operation = "激活运行";
                }
                this.$Modal.confirm({
                    title: "确认" + operation,
                    content: `您确认要${operation}流程实例${v.name}?`,
                    loading: true,
                    onOk: () => {
                        let params = {
                            status: status,
                            id: v.id
                        };
                        updateInsStatus(params).then(res => {
                            this.$Modal.remove();
                            if (res && res.success) {
                                this.$Message.success("操作成功");
                                this.getDataList();
                            }
                        });
                    }
                });
            },
            detail(v) {
                this.title = "表单查看";
                this.lookShow = true;
                this.businessKey = v.businessKey;
            },
            history(v) {
                this.title = "查看历史";
                this.procInstId = v.procInstId;
                this.historyShow = true;
            },
            remove(v) {
                this.$Modal.confirm({
                    title: "确认删除",
                    // 记得确认修改此处
                    content: "您确认要删除 " + v.name + " ?",
                    loading: true,
                    onOk: () => {
                        deleteHistoricTask(v.id).then(res => {
                            this.$Modal.remove();
                            if (res && res.success) {
                                this.$Message.success("操作成功");
                                this.getDataList();
                            }
                        });
                    }
                });
            },
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning("您还未选择要删除的数据");
                    return;
                }
                this.modalTitle = "确认要删除所选的 " + this.selectCount + " 条数据";
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
                    loading: true,
                    onOk: () => {
                        let ids = "";
                        this.selectList.forEach(function (e) {
                            ids += e.id + ",";
                        });
                        ids = ids.substring(0, ids.length - 1);
                        // 批量删除
                        deleteHistoricTask(ids).then(res => {
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
            this.init();
        },
        watch: {
            // 监听路由变化
            $route(to, from) {
                if (to.name == "done-manage") {
                    this.getDataList();
                }
            }
        }
    };
</script>
