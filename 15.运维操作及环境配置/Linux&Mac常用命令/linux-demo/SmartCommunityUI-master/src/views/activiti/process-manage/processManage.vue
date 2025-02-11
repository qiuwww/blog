<style lang="less">
</style>
<template>
  <div class="search">
    <processNodeEdit
      v-if="showProcessNodeEdit"
      @close="showProcessNodeEdit=false"
      :nodeEditData="nodeEditData"
    />
    <Card v-show="!showProcessNodeEdit">
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="流程名称" prop="name">
            <Input
              type="text"
              v-model="searchForm.name"
              placeholder="请输入名称"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="标识Key" prop="processKey">
            <Input
              type="text"
              v-model="searchForm.processKey"
              placeholder="请输入标识"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="部署时间">
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
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="deploy" type="primary" icon="md-cloud-upload">部署流程文件</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <i-switch
          size="large"
          v-model="searchForm.showLatest"
          @on-change="getDataList"
          style="margin:0 5px"
        >
          <span slot="open">最新</span>
          <span slot="close">全部</span>
        </i-switch>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>
      </Row>
      <Row v-show="openTip">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <span style="margin-left:20px">说明：当有多个相同标识的流程时，默认仅显示其最新版本</span>
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
          :current="searchForm.page"
          :total="total"
          :page-size="searchForm.size"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10,20,50,100]"
          size="small"
          show-total
          show-elevator
          show-sizer
          transfer
        ></Page>
      </Row>
    </Card>

    <!-- 部署流程文件 -->
    <Modal title="部署流程文件" footer-hide v-model="modalVisible" :mask-closable="false" :width="500">
      <Upload
        :action="deployByFileUrl"
        :headers="accessToken"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format="['zip','bar','bpmn','xml']"
        :max-size="5120"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        type="drag"
        ref="up"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击这里或将文件拖拽到这里上传</p>请选择BPMN文件，仅支持zip、bpmn20.xml、bar、bpmn格式文件
        </div>
      </Upload>
    </Modal>
    <!-- 编辑分类或备注 -->
    <Modal title="编辑流程信息" v-model="editModalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="110" :rules="formValidate">
        <FormItem label="流程分类">
          <div style="display:flex;">
            <Input
              v-model="categoryTitle"
              readonly
              clearable
              @on-clear="clearSelectCat"
              style="margin-right:10px;"
            />
            <Poptip trigger="click" placement="right" title="选择类别" width="250">
              <Button icon="md-list">选择分类</Button>
              <div slot="content">
                <Input
                  v-model="searchKey"
                  suffix="ios-search"
                  @on-change="searchCat"
                  placeholder="输入分类名搜索"
                  clearable
                />
                <div class="tree-list">
                  <Tree
                    :data="dataCat"
                    :load-data="loadDataTree"
                    :render="renderContent"
                  ></Tree>
                  <Spin size="large" fix v-if="catLoading"></Spin>
                </div>
              </div>
            </Poptip>
          </div>
        </FormItem>
        <FormItem label="关联表单路由" prop="routeName">
          <Select v-model="form.routeName" placeholder="请选择关联业务表单前端路由名" clearable>
            <Option v-for="(item, i) in dictForm" :key="i" :value="item.value" :label="item.label">
              <span style="margin-right:10px;">{{ item.label }}</span>
              <span style="color:#ccc;">{{ item.value }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="关联业务表" prop="businessTable">
          <Select v-model="form.businessTable" placeholder="请选择关联数据库业务表" clearable>
            <Option v-for="(item, i) in dictTable" :key="i" :value="item.value" :label="item.label">
              <span style="margin-right:10px;">{{ item.label }}</span>
              <span style="color:#ccc;">{{ item.value }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="备注描述" prop="description">
          <Input v-model="form.description" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="editModalVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmitEdit">提交</Button>
      </div>
    </Modal>
    <!-- 图片预览 -->
    <Modal :title="viewTitle" v-model="viewImage" draggable width="800">
      <img :src="diagramUrl" alt="无效的图片链接" style="width: 100%;margin: 0 auto;display: block;" />
      <div slot="footer">
        <Button @click="viewImage=false" style="margin-right:5px">关闭</Button>
        <Button :to="diagramUrl" target="_blank" type="primary">下载</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getProcessDataList,
  updateInfo,
  updateStatus,
  deployByFile,
  exportResource,
  convertToModel,
  deleteProcess,
  initActCategory,
  loadActCategory,
  searchActCategory
} from "@/api/activiti";
import { getDictDataByType } from "@/api/index";
import processNodeEdit from "./processNodeEdit.vue";
export default {
  name: "process-manage",
  components: {
    processNodeEdit
  },
  data() {
    return {
      showProcessNodeEdit: false,
      nodeEditData: {},
      openSearch: true,
      openTip: true,
      accessToken: {},
      deployByFileUrl: "",
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      viewImage: false,
      viewTitle: "流程图片预览",
      diagramUrl: "",
      searchForm: {
        // 搜索框对应data对象
        showLatest: true,
        name: "",
        processKey: "",
        status: "",
        page: 1, // 当前页数
        size: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
        startDate: "", // 起始时间
        endDate: "" // 终止时间
      },
      selectDate: null, // 选择日期绑定modal
      modalVisible: false,
      editModalVisible: false,
      dataCat: [],
      catLoading: false,
      searchKey: "",
      form: {
        routeName: "",
        businessTable: "",
        description: ""
      },
      formValidate: {
        routeName: [{ required: true, message: "不能为空", trigger: "blur" }],
        businessTable: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      categoryTitle: "",
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
          title: "名称",
          key: "name",
          minWidth: 150,
          tooltip: true,
          sortable: true
        },
        {
          title: "标识Key",
          key: "processKey",
          width: 130,
          tooltip: true,
          sortable: true
        },
        {
          title: "版本",
          key: "version",
          width: 90,
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
          title: "流程图片",
          key: "diagramName",
          width: 160,
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.showResource(1, params.row);
                    }
                  }
                },
                params.row.diagramName
              )
            ]);
          }
        },
        {
          title: "流程XML",
          key: "xmlName",
          minWidth: 200,
          sortable: true,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.showResource(0, params.row);
                    }
                  }
                },
                params.row.xmlName
              )
            ]);
          }
        },
        {
          title: "关联表单路由名",
          key: "routeName",
          minWidth: 200,
          sortable: true,
          render: (h, params) => {
            let re = "";
            this.dictForm.forEach(e => {
              if (e.value == params.row.routeName) {
                re = `${e.label} (${e.value})`;
              }
            });
            return h("div", re);
          }
        },
        {
          title: "数据库业务表",
          key: "businessTable",
          minWidth: 200,
          sortable: true,
          render: (h, params) => {
            let re = "";
            this.dictTable.forEach(e => {
              if (e.value == params.row.businessTable) {
                re = `${e.label} (${e.value})`;
              }
            });
            return h("div", re);
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 130,
          render: (h, params) => {
            if (params.row.status == 1) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "success",
                    text: "已激活"
                  }
                })
              ]);
            } else if (params.row.status == 0) {
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
              value: 1
            },
            {
              label: "已挂起",
              value: 0
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value == 0) {
              return row.status == 0;
            } else if (value == 1) {
              return row.status == 1;
            }
          }
        },
        {
          title: "所属分类",
          key: "categoryTitle",
          width: 130,
          tooltip: true,
          sortable: true
        },
        {
          title: "备注描述",
          key: "description",
          tooltip: true,
          width: 150,
          sortable: true
        },
        {
          title: "部署时间",
          key: "createTime",
          tooltip: true,
          width: 180,
          sortable: true,
          sortType: "desc"
        },
        {
          title: "更新时间",
          key: "updateTime",
          tooltip: true,
          width: 180,
          sortable: true
        },
        {
          title: "操作",
          key: "action",
          width: 375,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let suspendOrActive = "";
            if (params.row.status == 0) {
              // 挂起可激活
              suspendOrActive = h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    icon: "md-play"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editStatus(1, params.row);
                    }
                  }
                },
                "激活"
              );
            } else {
              // 激活可挂起
              suspendOrActive = h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    icon: "md-pause"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editStatus(0, params.row);
                    }
                  }
                },
                "挂起"
              );
            }
            return h("div", [
              suspendOrActive,
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "logo-buffer"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editNode(params.row);
                    }
                  }
                },
                "节点设置"
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
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.convert(params.row);
                    }
                  }
                },
                "转模型"
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
      dictTable: [],
      dictForm: []
    };
  },
  methods: {
    init() {
      this.accessToken = {
        accessToken: this.getStore("accessToken")
      };
      this.deployByFileUrl = deployByFile;
      this.getDataList();
      this.initCategoryTreeData();
      this.getDictDataType();
    },
    getDictDataType() {
      getDictDataByType("business_table").then(res => {
        if (res && res.success) {
          this.dictTable = res.data;
        }
      });
      getDictDataByType("business_form").then(res => {
        if (res && res.success) {
          this.dictForm = res.data;
        }
      });
    },
    renderContent(h, { root, node, data }) {
      let icon = "";
      if (data.type == "0") {
        icon = "md-folder-open";
      } else if (data.type == "1") {
        icon = "ios-bookmark-outline";
      }
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            cursor: "pointer"
          },
          on: {
            click: () => {
              this.selectTree(data);
            }
          }
        },
        [
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
            h("span", data.title)
          ])
        ]
      );
    },
    initCategoryTreeData() {
      initActCategory().then(res => {
        if (res && res.success) {
            if(res.data != null){
                res.data.forEach(function(e) {
                    if (e.isParent) {
                        e.loading = false;
                        e.children = [];
                    }
                    if (e.status == -1) {
                        e.title = "[已禁用] " + e.title;
                        e.disabled = true;
                    }
                });
                this.dataCat = res.data;
            }
        }
      });
    },
    loadDataTree(item, callback) {
      loadActCategory(item.id).then(res => {
        if (res && res.success) {
          res.data.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
            if (e.status == -1) {
              e.title = "[已禁用] " + e.title;
              e.disabled = true;
            }
          });
          callback(res.data);
        }
      });
    },
    searchCat() {
      // 搜索部门
      if (this.searchKey) {
        this.catLoading = true;
        searchActCategory({ title: this.searchKey }).then(res => {
          this.catLoading = false;
          if (res && res.success) {
            res.data.forEach(function(e) {
              if (e.status == -1) {
                e.title = "[已禁用] " + e.title;
                e.disabled = true;
              }
            });
            this.dataCat = res.data;
          }
        });
      } else {
        this.initCategoryTreeData();
      }
    },
    selectTree(v) {
      if (v) {
        // 转换null为""
        for (let attr in v) {
          if (v[attr] == null) {
            v[attr] = "";
          }
        }
        let str = JSON.stringify(v);
        let data = JSON.parse(str);
        if (data.type == 0) {
          this.$Message.warning("请选择一个类别");
          return;
        }
        this.form.categoryId = data.id;
        this.categoryTitle = data.title;
      }
    },
    clearSelectCat() {
      this.form.categoryId = "";
      this.categoryTitle = "";
    },
    changePage(v) {
      this.searchForm.page = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.size = v;
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
      getProcessDataList(this.searchForm).then(res => {
        this.loading = false;
        if (res && res.success) {
          this.data = res.data.content;
          this.total = res.data.totalElements;
        }
      });
    },
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      // 重新加载数据
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
    deploy(v) {
      this.modalVisible = true;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 .zip .bar .bpmn .bpmn20.xml格式文件"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小过大",
        desc: "所选文件‘ " + file.name + " ’大小过大, 不得超过 5M."
      });
    },
    handleSuccess(res, file) {
      if (res && res.success) {
        this.$Message.success("部署成功，请继续编辑完善流程信息");
        this.modalVisible = false;
        this.getDataList();
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.$Message.error(error.toString());
    },
    edit(v) {
      this.$refs.form.resetFields();
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.categoryTitle = data.categoryTitle;
      this.editModalVisible = true;
    },
    editNode(v) {
      this.nodeEditData = { id: v.id, name: v.name };
      this.showProcessNodeEdit = true;
    },
    handelSubmitEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          updateInfo(this.form).then(res => {
            this.submitLoading = false;
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
              this.editModalVisible = false;
            }
          });
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
        content: `您确认要${operation}流程${v.name}?`,
        loading: true,
        onOk: () => {
          let params = {
            status: status,
            id: v.id
          };
          updateStatus(params).then(res => {
            this.$Modal.remove();
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        }
      });
    },
    convert(v) {
      let that = this;
      this.$Modal.confirm({
        title: "确认转化",
        content: "您确认要转化流程 " + v.name + " 为模型?",
        loading: true,
        onOk: () => {
          convertToModel(v.id).then(res => {
            this.$Modal.remove();
            if (res && res.success) {
              setTimeout(function() {
                that.showJump();
              }, 300);
            }
          });
        }
      });
    },
    showJump() {
      this.$Modal.confirm({
        title: "转化成功",
        content: "是否立即跳转查看该模型?",
        onOk: () => {
          this.$router.push({
            name: "model-manage"
          });
        }
      });
    },
    showResource(type, v) {
      if (type == 0) {
        window.open(
          `${exportResource}?id=${
            v.id
          }&type=${type}&accessToken=${this.getStore("accessToken")}`
        );
      } else if (type == 1) {
        this.viewTitle = "流程图片预览(" + v.diagramName + ")";
        this.diagramUrl = `${exportResource}?id=${
          v.id
        }&type=${type}&accessToken=${this.getStore("accessToken")}`;
        this.viewImage = true;
      }
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除流程 " + v.name + " ?",
        loading: true,
        onOk: () => {
          deleteProcess(v.id).then(res => {
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
          deleteProcess(ids).then(res => {
            this.$Modal.remove();
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        }
      });
    },
	getStore : name => {
    if (!name) return;
    let v = window.localStorage.getItem(name);
    if (v == null) {
        return "";
    }
    return v;
}
  },
  mounted() {
    this.init();
  },
  watch: {
    // 监听路由变化
    // $route(to, from) {
    //   if (to.name == "process-manage") {
    //     this.getDataList();
    //   }
    // }
  }
};
</script>
