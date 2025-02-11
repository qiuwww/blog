<style lang="less">
  @import "../../../styles/tree-common.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="addMenu" type="primary" icon="md-add">添加子菜单</Button>
        <Button @click="addButton" type="primary" icon="md-add">添加功能按钮</Button>
        <Button @click="addRootMenu" icon="md-add">添加顶部菜单</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">刷新</DropdownItem>
            <DropdownItem name="expandOne">收合所有</DropdownItem>
            <DropdownItem name="expandTwo">仅展开一级</DropdownItem>
            <DropdownItem name="expandThree">仅展开两级</DropdownItem>
            <DropdownItem name="expandAll">展开所有</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <i-switch v-model="strict" size="large" style="margin-left:5px">
          <span slot="open">级联</span>
          <span slot="close">单选</span>
        </i-switch>
      </Row>
      <Row type="flex" justify="start">
        <Col :md="8" :lg="8" :xl="6">
          <Alert show-icon>
            当前选择编辑：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="form.id" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入菜单名搜索"
            clearable
          />
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree
              ref="tree"
              :data="data"
              show-checkbox
              :render="renderContent"
              @on-select-change="selectTree"
              @on-check-change="changeSelect"
              :check-strictly="!strict"
            ></Tree>
            <Spin size="large" fix v-if="loading"></Spin>
          </div>
        </Col>
        <Col :md="15" :lg="13" :xl="9" style="margin-left:10px;">
          <Form ref="form" :model="form" :label-width="110" :rules="formValidate">
            <FormItem label="类型" prop="type">
              <div v-show="form.type==-1">
                <Icon type="ios-navigate-outline" size="16" style="margin-right:5px;"></Icon>
                <span>顶部菜单</span>
              </div>
              <div v-show="form.type==0 || form.type==1">
                <Icon type="ios-list-box-outline" size="16" style="margin-right:5px;"></Icon>
                <span>页面菜单</span>
              </div>
              <div v-show="form.type==2">
                <Icon type="md-radio-button-on" size="16" style="margin-right:5px;"></Icon>
                <span>操作按钮</span>
              </div>
            </FormItem>

            <FormItem label="顶部名称" prop="headName" v-if="form.type==0 || form.type==1">
              <Input v-model="form.headName" disabled/>
            </FormItem>
            <FormItem label="菜单名称" prop="name" v-if="form.type==0 || form.type==1 || form.type==-1">
              <Input v-model="form.name"/>
            </FormItem>
            <FormItem label="按钮名称" prop="name" v-if="form.type==2" class="block-tool">
              <Tooltip placement="right" content="操作按钮名称不得重复">
                <Input v-model="form.name"/>
              </Tooltip>
            </FormItem>
            <FormItem label="权限标识" v-if="form.type==0 || form.type==1 || form.type==2">
              <Input v-model="form.permission"/>
            </FormItem>
            <FormItem label="路由地址" prop="path" v-if="form.type==0 || form.type==1 || form.type== -1">
              <Input v-model="form.path"/>
            </FormItem>
            <FormItem label="图标" prop="icon" v-if="form.type==-1||form.type==0 || form.type==1">
              <icon-choose v-model="form.icon"></icon-choose>
            </FormItem>
            <FormItem label="前端组件" v-if="form.type==0 || form.type==1 || form.type == -1">
              <Input v-model="form.component"/>
            </FormItem>
            <FormItem label="排序值" prop="sort">
              <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
                <InputNumber :max="1000" :min="0" v-model="form.sort"></InputNumber>
              </Tooltip>
            </FormItem>
            <FormItem label="隐藏左侧菜单" prop="hidden" v-if="form.level==0" class="block-tool">
              <i-switch size="large" v-model="form.hideSider">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
<!--            <FormItem label="外联菜单" prop="hidden" v-if="form.type == 1 || form.type == 0" class="block-tool">-->
<!--              <i-switch size="large" v-model="form.iframe">-->
<!--                <span slot="open">是</span>-->
<!--                <span slot="close">否</span>-->
<!--              </i-switch>-->
<!--            </FormItem>-->
            <FormItem label="在新窗口打开" v-if="form.type != 2" class="block-tool">
              <i-switch size="large" v-model="form.newWindow">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="是否隐藏" prop="hidden" v-if="form.type == 1 || form.type == 0" class="block-tool">
              <i-switch size="large" v-model="form.hidden">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
              <Tooltip
                content="当设为不始终显示时，不会在左侧菜单显示"
                placement="right"
                transfer
                max-width="280"
                style="display: inline-block !important;"
              >
                <Icon
                  type="md-help-circle"
                  size="20"
                  color="#c5c5c5"
                  style="margin-left:10px;cursor:pointer;"
                />
              </Tooltip>
            </FormItem>

            <Form-item>
              <Button
                style="margin-right:5px"
                @click="submitEdit"
                :loading="submitLoading"
                type="primary"
                icon="ios-create-outline"
              >修改并保存
              </Button>
              <Button @click="handleReset">重置</Button>
            </Form-item>
          </Form>
        </Col>
      </Row>
    </Card>

    <Modal
      draggable
      :title="modalTitle"
      v-model="menuModalVisible"
      :mask-closable="false"
      :width="500"
      :styles="{top: '30px'}"
    >
      <Form ref="formAdd" :model="formAdd" :label-width="100" :rules="formValidate">
        <div v-if="showParent">
          <FormItem label="上级节点：">{{parentTitle}}</FormItem>
        </div>
        <FormItem label="类型" prop="type">
          <div v-show="formAdd.type==-1">
            <Icon type="ios-navigate-outline" size="16" style="margin-right:5px;"></Icon>
            <span>顶部菜单</span>
          </div>
          <div v-show="formAdd.type==1 || formAdd.type==0">
            <Icon type="ios-list-box-outline" size="16" style="margin-right:5px;"></Icon>
            <span>页面菜单</span>
          </div>
          <div v-show="formAdd.type==2">
            <Icon type="md-radio-button-on" size="16" style="margin-right:5px;"></Icon>
            <span>操作按钮</span>
          </div>
        </FormItem>
        <FormItem label="顶部名称" prop="headName" v-if="formAdd.type==0 || formAdd.type==1">
          <Input v-model="formAdd.headName" disabled/>
        </FormItem>
        <FormItem label="菜单名称" prop="name" v-if="formAdd.type==1||formAdd.type==0||formAdd.type==-1">
          <Input v-model="formAdd.name"/>
        </FormItem>
        <FormItem label="按钮名称" prop="name" v-if="formAdd.type==2" class="block-tool">
          <Tooltip placement="right" content="操作按钮名称不得重复">
            <Input v-model="formAdd.name"/>
          </Tooltip>
        </FormItem>
        <FormItem label="路由地址" prop="path" v-if="formAdd.type==0 || formAdd.type==1 || formAdd.type == -1">
          <Input v-model="formAdd.path"/>
        </FormItem>
        <FormItem label="图标" prop="icon" v-if="formAdd.type==-1||formAdd.type==0 || formAdd.type==1">
          <icon-choose v-model="formAdd.icon"></icon-choose>
        </FormItem>
        <FormItem label="权限标识" v-if="formAdd.type==0 || formAdd.type==1||formAdd.type==2">
          <Input v-model="formAdd.permission"/>
        </FormItem>
        <FormItem label="前端组件" v-if="formAdd.type==0 || formAdd.type==1  || form.type == -1">
          <Input v-model="formAdd.component"/>
        </FormItem>
        <FormItem label="排序值" prop="sort">
          <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
            <InputNumber :max="1000" :min="0" v-model="formAdd.sort"></InputNumber>
          </Tooltip>
        </FormItem>
        <FormItem label="隐藏左侧菜单" prop="hidden" v-if="formAdd.level==0" class="block-tool">
          <i-switch size="large" v-model="formAdd.hideSider">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="在新窗口打开" v-if="formAdd.type != 2" class="block-tool">
          <i-switch size="large" v-model="formAdd.newWindow">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
<!--        <FormItem label="外联菜单" prop="hidden" v-if="formAdd.type == 1 || form.type == 0" class="block-tool">-->
<!--          <i-switch size="large" v-model="formAdd.iframe">-->
<!--            <span slot="open">是</span>-->
<!--            <span slot="close">否</span>-->
<!--          </i-switch>-->
<!--        </FormItem>-->
        <FormItem label="是否隐藏" prop="hidden" v-if="formAdd.type == 1 || form.type == 0" class="block-tool">
          <i-switch size="large" v-model="formAdd.hidden">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
          <Tooltip
            content="当设为不始终显示时，不会在左侧菜单显示"
            placement="right"
            transfer
            max-width="280"
            style="display: inline-block !important;"
          >
            <Icon
              type="md-help-circle"
              size="20"
              color="#c5c5c5"
              style="margin-left:10px;cursor:pointer;"
            />
          </Tooltip>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button type="text" @click="menuModalVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="submitAdd">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
    import IconChoose from "@/views/components/icon-choose";
    import {getMenus, editMenus, addMenus, deleteMenus} from "@/api/system/menu"

    export default {
        name: "menu-manage",
        components: {
            IconChoose
        },
        data() {
            return {
                loading: true,
                strict: true,
                maxHeight: "500px",
                expandLevel: 1,
                menuModalVisible: false,
                iconModalVisible: false,
                selectList: [],
                selectCount: 0,
                showParent: false,
                searchKey: "",
                parentTitle: "",
                editTitle: "",
                modalTitle: "",
                form: {
                    id: "",
                    iframe: false,
                    cache: false,
                    name: "",
                    icon: "",
                    path: "",
                    component: "",
                    pid: "",
                    type: 0,
                    sort: 0,
                    level: 0,
                    url: "",
                    hidden: false,
                    newWindow:false,
                    permission: ""
                },
                formAdd: {
                    buttonType: "",
                    newWindow:false,
                },
                formValidate: {
                    name: [{required: true, message: "名称不能为空", trigger: "blur"}],
                    headName: [{required: true, message: "顶部名称不能为空", trigger: "blur"}],
                    icon: [{required: true, message: "图标不能为空", trigger: "click"}],
                    path: [{required: true, message: "路由地址不能为空", trigger: "blur"}],
                    component: [
                        {required: true, message: "组件名称不能为空", trigger: "blur"}
                    ],
                    sort: [
                        {
                            required: true,
                            type: "number",
                            message: "排序值不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                submitLoading: false,
                data: [],
            };
        },
        methods: {
            init() {
                this.getAllList();
            },
            renderContent(h, {root, node, data}) {
                let icon = "";
                if (data.level == 0) {
                    icon = "ios-navigate";
                } else if (data.level == 1) {
                    icon = "md-list-box";
                } else if (data.level == 2 || data.level == 3) {
                    icon = "md-list";
                } else if (data.level == 4) {
                    icon = "md-radio-button-on";
                } else {
                    icon = "md-radio-button-off";
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
            handleDropdown(name) {
                if (name == "expandOne") {
                    this.expandLevel = 1;
                    this.getAllList();
                } else if (name == "expandTwo") {
                    this.expandLevel = 2;
                    this.getAllList();
                } else if (name == "expandThree") {
                    this.expandLevel = 3;
                    this.getAllList();
                }
                if (name == "expandAll") {
                    this.expandLevel = 4;
                    this.getAllList();
                } else if (name == "refresh") {
                    this.getAllList();
                }
            },
            getAllList() {
                this.loading = true;
                getMenus({}).then(res => {
                    this.loading = false;
                    if (res && res.success) {
                        // 仅展开指定级数 默认后端已展开所有
                        let expandLevel = this.expandLevel;
                        res.data.content.forEach(function (e) {
                            if (expandLevel == 1) {
                                if (e.level == 1) {
                                    e.expand = false;
                                }
                                if (e.children && e.children.length > 0) {
                                    e.children.forEach(function (c) {
                                        if (c.level == 2) {
                                            c.expand = false;
                                        }
                                        if (c.children && c.children.length > 0) {
                                            c.children.forEach(function (b) {
                                                if (b.level == 3) {
                                                    b.expand = false;
                                                }
                                            });
                                        }
                                    });
                                }
                            } else if (expandLevel == 2) {
                                if (e.level == 1) {
                                    e.expand = true;
                                }
                                if (e.children && e.children.length > 0) {
                                    e.children.forEach(function (c) {
                                        if (c.level == 2) {
                                            c.expand = false;
                                        }
                                        if (c.children && c.children.length > 0) {
                                            c.children.forEach(function (b) {
                                                if (b.level == 3) {
                                                    b.expand = false;
                                                }
                                            });
                                        }
                                    });
                                }
                            } else if (expandLevel == 3) {
                                if (e.level == 1) {
                                    e.expand = true;
                                }
                                if (e.children && e.children.length > 0) {
                                    e.children.forEach(function (c) {
                                        if (c.level == 2) {
                                            c.expand = true;
                                        }
                                        if (c.children && c.children.length > 0) {
                                            c.children.forEach(function (b) {
                                                if (b.level == 3) {
                                                    b.expand = false;
                                                }
                                            });
                                        }
                                    });
                                }
                            } else if (expandLevel == 4) {
                                e.expand = true;
                                if (e.children && e.children.length > 0) {
                                    e.children.forEach(function (c) {
                                        if (c.level == 2) {
                                            c.expand = true;
                                        }
                                        if (c.children && c.children.length > 0) {
                                            c.children.forEach(function (b) {
                                                if (b.level == 3) {
                                                    b.expand = true;
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                        this.data = res.data.content;
                    }
                });
            },
            search() {
                if (this.searchKey) {
                    this.loading = true;
                    getMenus({name: this.searchKey}).then(res => {
                        this.loading = false;
                        if (res && res.success) {
                            this.data = res.data.content;
                        }
                    });
                } else {
                    this.getAllList();
                }
            },
            selectTree(v) {
                if (v.length > 0) {
                    // 转换null为""
                    for (let attr in v[0]) {
                        if (v[0][attr] == null) {
                            v[0][attr] = "";
                        }
                    }
                    let str = JSON.stringify(v[0]);
                    let menu = JSON.parse(str);
                    this.form = menu;
                    this.editTitle = menu.name;
                } else {
                    this.cancelEdit();
                }
            },
            cancelEdit() {
                let data = this.$refs.tree.getSelectedNodes()[0];
                if (data) {
                    data.selected = false;
                }
                try {
                    this.$refs.form.resetFields();
                } catch (e) {

                }

                this.form.id = "";
                this.editTitle = "";
            },
            handleReset() {
                let type = this.form.type;
                try {
                    this.$refs.form.resetFields();
                } catch (e) {

                }
                this.form.icon = "";
                this.form.component = "";
                this.form.type = type;
            },
            submitEdit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        if (!this.form.id) {
                            this.$Message.warning("请先点击选择要修改的菜单节点");
                            return;
                        }
                        this.submitLoading = true;
                        editMenus(this.form).then(res => {
                            this.submitLoading = false;
                            if (res && res.success) {
                                this.$Message.success("编辑成功");
                                this.init();
                                this.menuModalVisible = false;
                            }
                        }).catch(ex => {
                            this.submitLoading = false;
                            this.$Message.error("提交失败！");
                        });
                    }
                });
            },
            submitAdd() {
                this.$refs.formAdd.validate(valid => {
                    if (valid) {
                        this.submitLoading = true;

                        addMenus(this.formAdd).then(res => {
                            this.submitLoading = false;
                            if (res && res.success) {
                                this.$Message.success("添加成功");
                                this.init();
                                this.menuModalVisible = false;
                            }
                        }).catch(ex => {
                            this.submitLoading = false;
                            this.$Message.error("添加失败！");
                        });
                    }
                });
            },
            addMenu() {
                if (!this.form.id) {
                    this.$Message.warning("请先点击选择一个菜单权限节点");
                    return;
                }
                this.parentTitle = this.form.name;
                this.modalTitle = "添加功能菜单(可拖动)";
                this.showParent = true;
                let type = 0;
                if (this.form.level == 0) {
                    type = 0;
                } else {
                    type = 1;
                }
                this.formAdd = {
                    icon: "",
                    type: type,
                    pid: this.form.id,
                    level: Number(this.form.level) + 1,
                    sort: 0,
                    state: 1,
                    hidden: false,
                    permission: "",
                    name: "",
                    iframe: false,
                    cache: false,
                    hideSider: false,
                    newWindow:false,
                    headName: this.form.level == 1 ? this.form.headName : this.form.name
                };
                this.menuModalVisible = true;
            },
            addButton(){
                if (!this.form.id) {
                    this.$Message.warning("请先点击选择一个菜单权限节点");
                    return;
                }
                this.parentTitle = this.form.name;
                this.modalTitle = "添加功能按钮(可拖动)";
                this.showParent = true;
                this.formAdd = {
                    icon: "",
                    type: 2,
                    pid: this.form.id,
                    level: Number(this.form.level) + 1,
                    sort: 1,
                    state: 1,
                    hidden: false,
                    permission: "",
                    name: "",
                    iframe: false,
                    cache: false,
                    hideSider: false,
                    newWindow:false,
                    headName: this.form.headName
                };
                this.menuModalVisible = true;
            },
            addRootMenu() {
                this.modalTitle = "添加顶部菜单(可拖动)";
                this.showParent = false;
                this.formAdd = {
                    pid: -1,
                    name: "",
                    type: -1,
                    level: 0,
                    sort: 0,
                    iframe: false,
                    hidden: false,
                    cache: false,
                    hideSider: false,
                    headName: "",
                    newWindow:false,
                    path :""
                };
                this.menuModalVisible = true;
            },
            changeSelect(v) {
                this.selectCount = v.length;
                this.selectList = v;
            },
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning("您还未勾选要删除的数据");
                    return;
                }
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        this.selectList.forEach(function (e) {
                            ids.push(e.id);
                        });
                        deleteMenus({ids: ids}).then(res => {
                            this.$Modal.remove();
                            if (res && res.success) {
                                this.$Message.success("删除成功");
                                this.selectList = [];
                                this.selectCount = 0;
                                this.cancelEdit();
                                this.init();
                            }
                        });
                    }
                });
            }
        },
        mounted() {
            // 计算高度
            let height = document.documentElement.clientHeight;
            this.maxHeight = Number(height - 287) + "px";
            this.init();
        }
    };
</script>
