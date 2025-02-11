<style lang="less">
  .drawFlowSelected {
    .ivu-drawer {
      box-sizing: border-box;

      .ivu-drawer-body {
        .apply-operation {
          display: flex;
          justify-content: space-between;
        }

        .process-wrapper {
          display: flex;
          flex-wrap: wrap;

          .process-card {
            width: 45%;
            margin: 10px;

            .content {
              display: flex;
              flex-direction: column;

              .other {
                padding: 16px;
                height: 130px;

                .name {
                  font-size: 16px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  color: rgba(0, 0, 0, .85);
                  font-weight: 500;
                  margin-bottom: 4px;
                }

                .key {
                  height: 45px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: break-all;
                  color: rgba(0, 0, 0, .45);
                }

                .info {
                  font-size: 12px;
                  height: 36px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <!-- Drawer抽屉式选择流程 -->
  <Drawer title="选择流程" closable v-model="show" width="800" draggable class="drawFlowSelected">
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
            <Button @click="getProcessList" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleResetProcess">重置</Button>
            <i-switch
              size="large"
              v-model="searchProcessForm.showLatest"
              @on-change="getProcessList"
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
    <div class="process-wrapper" v-if="showType=='thumb'">
      <Card v-for="(item, i) in processData" :key="i" class="process-card">
        <div class="content" @click="chooseProcess(item)">
          <div class="other">
            <div class="name">{{i+1}}. {{item.name}}</div>
            <div class="key">{{item.description}}</div>
            <div class="info">版本：v.{{item.version}} 所属分类：{{item.categoryTitle}}</div>
          </div>
        </div>
      </Card>
      <Spin fix v-if="loading"/>
    </div>
    <Table
      :loading="loading"
      border
      :columns="processColumns"
      :data="processData"
      ref="processTable"
      v-if="showType=='list'"
    ></Table>
  </Drawer>
</template>
<script>
    import {getTWorkOrder} from '@/api/zhgw/tWorkOrder/tWorkOrder'
    import {getDictDataByType} from '@/api/index';
    import {getProcessDataList, loadActCategory, initActCategory} from '@/api/activiti'

    export default {
        name: "drawFlowSelected",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                category:[],
                selectCat: [],
                loading: false,
                show: this.value,
                editTitle: this.modalTitle,
                disabled: false,
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
                searchProcessForm: {
                    showLatest: true,
                    name: "",
                    status: "1", // 激活状态
                    pageNumber: 1, // 当前页数
                    pageSize: 1000, // 页面大小
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
                    procDefId: [{required: true, message: "不能为空", trigger: "blur"}],
                    priority: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                submitLoading: false, // 添加或编辑提交状态
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
            }
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            },
            init() {
                // this.getDataList();
                this.getProcessList();
                this.initCategoryData();
            },
            getProcessList() {
                this.loading = true;
                getProcessDataList(this.searchProcessForm).then(res => {
                    this.loading = false;
                    if (res && res.success) {

                        this.processData = res.data.content;
                    }
                });
            },
            initCategoryData() {
                initActCategory().then(res => {
                    if (res && res.success && res.data != null) {
                        res.data.forEach(function (e) {
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
            handleResetProcess() {
                this.$refs.searchProcessForm.resetFields();
                // 重新加载数据
                this.getProcessList();
            },
            handleChangeCat(value, selectedData) {
                let categoryId = "";
                // 获取最后一个值
                if (value && value.length > 0) {
                    categoryId = value[value.length - 1];
                }
                this.searchProcessForm.categoryId = categoryId;
            },
            loadData(item, callback) {
                item.loading = true;
                loadActCategory(item.value).then(res => {
                    item.loading = false;
                    if (res && res.success) {
                        res.result.forEach(function (e) {
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
            chooseProcess(v) {
                if (!v.routeName) {
                    this.$Message.warning(
                        "该流程信息未完善，请于流程管理中编辑流程完善信息"
                    );
                    return;
                }
                this.$emit("drawClose", v);
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val){
                if(val){

                }else{
                    this.closeModal(val);
                }
            }
        }
    }
</script>
