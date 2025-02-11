<style lang="less">
  @import "../../../styles/tree&table-common.less";
  @import "./dictManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row type="flex" justify="space-between">
        <Col v-if="expand" span="5">
          <Row class="operation">
            <Button @click="addDcit" type="primary" icon="md-add">添加字典</Button>
            <Dropdown @on-click="handleDropdown">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="editDcit">编辑字典</DropdownItem>
                <DropdownItem name="delDcit">删除字典</DropdownItem>
                <DropdownItem name="refreshDcit">刷新</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Row>
          <Alert show-icon>
            当前选择：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="editTitle" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入搜索字典"
            clearable
          />
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree ref="tree" :data="treeData" @on-select-change="selectTree"></Tree>
            <Spin size="large" fix v-if="treeLoading"></Spin>
          </div>
        </Col>
        <div class="expand">
          <Icon :type="exIcon" class="exIcon" @click="changeExpand"/>
        </div>
        <Col :span="span">
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70" onSubmit="return false">
              <Form-item label="数据名称" prop="label">
                <Input
                  type="text"
                  v-model="searchForm.label"
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
            <Button @click="add" type="primary" icon="md-add">添加数据</Button>
            <Button @click="delAll" icon="md-trash">批量删除</Button>
            <Button @click="handleReset" icon="md-refresh">刷新数据</Button>
            <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
            <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>

            <div style="float: right;position: absolute;right: 10px;">
              <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
                <Button icon="md-list"></Button>
                <div slot="content" style="position:relative;min-height:5vh">
                  <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                    <checkbox v-for="(item,i) in colSelect" :label="item" :key="item" ></checkbox>
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
              show-sizer
              transfer
            ></Page>
          </Row>
        </Col>
      </Row>
    </Card>

    <Modal :title="dictModalTitle" v-model="dictModalVisible" :mask-closable="false" :width="500">
      <Form ref="dictForm" :model="dictForm" :label-width="85" :rules="dictFormValidate">
        <FormItem label="字典名称" prop="type">
          <Input v-model="dictForm.type"/>
        </FormItem>
        <FormItem label="字典类型" prop="name">
          <Input v-model="dictForm.name"/>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input v-model="dictForm.remark"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="dictModalVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmitDict">提交</Button>
      </div>
    </Modal>
    <!--    字典详细情况-->
    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="名称" prop="label">
          <Input v-model="form.label"/>
        </FormItem>
        <FormItem label="数据名称" prop="value">
          <Input v-model="form.value"/>
        </FormItem>
        <FormItem label="排序值">
          <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
            <InputNumber :max="1000" :min="0" v-model="form.sort"></InputNumber>
          </Tooltip>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    import {add, del, edit} from '@/api/system/dict'
    import {addDetail, delDetail, editDetail, delAll} from '@/api/system/dictDetail'
    import {getRequest} from '@/libs/axios'
    import {formartDate} from "@/api/tools/tool";

    export default {
        name: "dic-manage",
        data() {
            return {
                colOptions: ["名称","数据值","排序值","创建时间","操作"], //默认全选
                colSelect: ["名称","数据值","排序值","创建时间","操作"],
                columns: this.getTShootingColumns(),
                openSearch: true,
                openTip: true,
                treeLoading: false, // 树加载状态
                maxHeight: "500px",
                loading: false, // 表格加载状态
                editTitle: "", // 编辑节点名称
                searchKey: "", // 搜索树
                expand: true,
                span: 18,
                exIcon: "ios-arrow-back",
                selectNode: {},
                treeData: [], // 树数据
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    dictId: '',
                    name: "",
                    label: "",
                    status: "",
                    page: 0, // 当前页数
                    size: 10, // 页面大小
                },
                modalType: 0, // 添加或编辑标识
                modalVisible: false, // 添加或编辑显示
                dictModalVisible: false,
                dictModalTitle: "",
                modalTitle: "", // 添加或编辑标题
                dictForm: {
                    name: "",
                    type: "",
                    remark: "",
                },
                form: {
                    // 添加或编辑表单对象初始化数据
                    label: "",
                    value: "",
                    sort: 0,
                    dict: {
                        id: ''
                    }
                },
                dictFormValidate: {
                    // 表单验证规则
                    type: [{required: true, message: "不能为空", trigger: "blur"}],
                    name: [{required: true, message: "不能为空", trigger: "blur"}],
                },
                formValidate: {
                    // 表单验证规则
                    label: [{required: true, message: "不能为空", trigger: "blur"}],
                    value: [{required: true, message: "不能为空", trigger: "blur", type: 'string'}],
                    sort: [{required: true, message: "排序值不能为空", type: 'number'}]
                },

                submitLoading: false, // 添加或编辑提交状态
                data: [], //表单数据
                total: 0 // 表单数据总数
            };
        },
        methods: {
            getTShootingColumns(){
                return [
                    // 表头
                    {
                        type: "selection",
                        width: 60,
                        align: "center"
                    },
                    {
                        type: "index",
                        width: 60,
                        align: "center",
                        tooltip:true,
                    },
                    {
                        title: "名称",
                        key: "label",
                        minWidth: 150,
                        align: 'center',
                        sortable: true,
                        tooltip:true,
                    },
                    {
                        title: "数据值",
                        key: "value",
                        width: 150,
                        align: 'center',
                        sortable: true,
                        tooltip:true,
                    },
                    {
                        title: "排序值",
                        key: "sort",
                        width: 100,
                        sortable: true,
                        align: 'center',
                        sortType: "asc",
                        tooltip:true,
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        width: 250,
                        align: 'center',
                        sortable: true,
                        tooltip:true,
                        render: (h, params) => {
                            let str = formartDate(params.row.createTime, "yyyy-MM-dd");
                            return h("div", [h("div", {}, str)]);
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 160,
                        align: "center",
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
                            ]);
                        }
                    }
                ]
            },
            init() {
                // 获取树数据
                this.getAllDict();
                // 获取表单数据
                this.getDataList();
            },
            getAllDict() {
                let _this = this;
                this.treeLoading = true;
                getRequest('/dict/all', {}).then(res => {
                    if (res) {
                        _this.treeData = [];
                        _this.treeData = _this.reloadDict(res);
                        this.treeLoading = false;
                    }
                });
            },
            search() {
                var _this = this;
                // 搜索树
                if (this.searchKey) {
                    this.treeLoading = true;
                    getRequest('/dict/all', {type: _this.searchKey}).then(res => {
                        if (res) {
                            _this.treeData = [];
                            _this.treeData = _this.reloadDict(res);
                            _this.treeLoading = false;
                        }
                    });
                } else {
                    // 为空重新加载
                    _this.getAllDict();
                }
            },
            //把数据库中的字段，重新赋值为tree需要的类型
            reloadDict(tdata) {
                var data = [];
                tdata.map((item, index) => {
                    var obj = {};
                    obj.id = item.id;
                    obj.title = item.type;
                    obj.type = item.name;
                    obj.sortOrder = item.id;
                    data.push(obj);
                });
                return data;
            },
            selectTree(v) {
                this.loading = true;
                if (v.length > 0) {
                    this.$refs.dictForm.resetFields();
                    // 转换null为""
                    for (let attr in v[0]) {
                        if (v[0][attr] == null) {
                            v[0][attr] = "";
                        }
                    }
                    let str = JSON.stringify(v[0]);
                    let data = JSON.parse(str);
                    this.selectNode = data;
                    this.dictForm = data;

                    //因为框架的字段和数据库不同，所以这里做转换
                    this.dictForm.id = data.id;
                    this.dictForm.name = data.type;
                    this.dictForm.type = data.title;

                    this.editTitle = "(" + data.type + ")";
                    // 重新加载表
                    this.searchForm.page = 0;
                    this.searchForm.size = 10;
                    this.searchForm.dictId = this.selectNode.id;
                    this.getDataList();

                } else {
                    this.cancelEdit();
                }

            },
            cancelEdit() {
                let data = this.$refs.tree.getSelectedNodes()[0];
                if (data) {
                    data.selected = false;
                }
                // 取消选择后获取全部数据
                this.selectNode = {};
                this.editTitle = "";
                this.getDataList();
            },
            changeSelect(v) {
                this.selectCount = v.length;
                this.selectList = v;
            },
            changeExpand() {
                this.expand = !this.expand;
                if (this.expand) {
                    this.exIcon = "ios-arrow-back";
                    this.span = 18;
                } else {
                    this.exIcon = "ios-arrow-forward";
                    this.span = 23;
                }
            },
            changePage(v) {
                this.searchForm.page = v - 1;
                this.getDataList();
                this.clearSelectAll();
            },
            changePageSize(v) {
                this.searchForm.size = v - 1;
                this.getDataList();
            },
            getDataList() {
                this.loading = true;
                //根据字典id，加载字典细类
                getRequest('/dictDetail/all', this.searchForm).then(res => {
                    if (res) {
                        this.data = res.content;
                        this.total = res.totalElements;
                        this.loading = false;
                    }
                });

            },
            handleSearch() {
                this.searchForm.page = 0;
                this.searchForm.size = 10;
                this.getDataList();
            },
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.dictId = "";
                this.searchForm.page = 0;
                this.searchForm.size = 10;
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
            showSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            refreshDict() {
                this.selectNode = {};
                this.editTitle = "";
                this.searchKey = "";
                this.getAllDict();
                this.handleReset();
            },
            handleDropdown(name) {
                if (name == "editDcit") {
                    if (!this.selectNode.id) {
                        this.$Message.warning("您还未选择要编辑的字典");
                        return;
                    }
                    this.editDcit();
                } else if (name == "delDcit") {
                    this.delDcit();
                } else if (name == "refreshDcit") {
                    this.refreshDict();
                }
            },
            addDcit() {
                this.modalType = 0;
                this.dictModalTitle = "添加字典";
                this.$refs.dictForm.resetFields();
                this.dictModalVisible = true;
            },
            editDcit() {
                this.modalType = 1;
                this.dictModalTitle = "编辑字典";
                this.dictModalVisible = true;
            },
            delDcit() {
                if (!this.selectNode.id) {
                    this.$Message.warning("您还未选择要删除的字典");
                    return;
                }
                this.$Modal.confirm({
                    title: "确认删除",
                    loading: true,
                    content: "您确认要删除 " + this.selectNode.title + " ?",
                    onOk: () => {
                        // 删除
                        del(this.selectNode.id).then(res => {
                            this.$Modal.remove();
                            this.$Message.success("操作成功");
                            this.dictModalVisible = false;
                            this.submitLoading = false;
                            this.refreshDict();
                        })
                    }
                });
            },
            add() {
                if (!this.selectNode.id) {
                    this.$Message.warning("请先选择一个字典类别");
                    return;
                }
                this.modalType = 0;
                this.modalTitle = "添加字典 " + this.editTitle + " 的数据";
                this.$refs.form.resetFields();
                this.modalVisible = true;
            },
            edit(v) {
                this.modalType = 1;
                this.modalTitle = "编辑字典 " + this.editTitle + " 的数据";
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
                this.form.dict.id = data.dict.id;
                this.form.sort = parseFloat(data.sort);
                this.modalVisible = true;
            },
            handelSubmitDict() {
                this.$refs.dictForm.validate(valid => {
                    if (valid) {
                        this.submitLoading = true;
                        if (this.modalType == 0) {
                            // 添加 避免编辑后传入id等数据 记得删除
                            delete this.dictForm.id;
                            add(this.dictForm).then(res => {
                                this.$Message.success("操作成功");
                                this.getAllDict();
                                this.dictModalVisible = false;
                                this.submitLoading = false;
                            })
                        } else if (this.modalType == 1) {
                            // 编辑
                            edit(this.dictForm).then(res => {
                                this.$Message.success("操作成功");
                                this.getAllDict();
                                this.dictModalVisible = false;
                                this.submitLoading = false;
                            })
                        }
                    }
                });
            },
            handelSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.submitLoading = true;
                        if (this.modalType == 0) {
                            // 添加 避免编辑后传入id等数据 记得删除
                            delete this.form.id;
                            this.form.dict.id = this.selectNode.id;
                            addDetail(this.form).then(res => {
                                this.$Message.success("操作成功");
                                this.getDataList();
                                this.modalVisible = false;
                                this.submitLoading = false;
                            });
                        } else if (this.modalType == 1) {
                            // 编辑
                            editDetail(this.form).then(res => {
                                this.$Message.success("操作成功");
                                this.getDataList();
                                this.modalVisible = false;
                                this.submitLoading = false;
                            })
                        }
                    }
                });
            },
            remove(v) {
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除 " + v.label + " ?",
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        ids.push(v.id);
                        delAll({ids: ids}).then(res => {
                            if (res && res.success) {
                                this.$Modal.remove();
                                this.$Message.success(res.message);
                                this.getDataList();
                                this.submitLoading = false;
                            } else {
                                this.$Modal.remove();
                                this.$Message.success(res.message);
                                this.submitLoading = false;
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
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        this.selectList.forEach(function (e) {
                            ids.push(e.id)
                        });
                        delAll({ids: ids}).then(res => {
                            if (res && res.success) {
                                this.$Modal.remove();
                                this.$Message.success(res.message);
                                this.getDataList();
                                this.submitLoading = false;
                            } else {
                                this.$Modal.remove();
                                this.$Message.success(res.message);
                                this.submitLoading = false;
                            }
                        });
                    }
                });
            },
            //动态列实现
            checkboxChange:function (data) {
                var columnss =  this.getTShootingColumns();
                this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
            },
        },
        mounted() {
            // 计算高度
            let height = document.documentElement.clientHeight;
            this.maxHeight = Number(height - 287) + "px";
            this.init();
        }
    };
</script>
