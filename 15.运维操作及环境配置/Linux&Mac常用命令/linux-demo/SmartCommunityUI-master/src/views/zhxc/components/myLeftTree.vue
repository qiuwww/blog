<style lang="less">
  @import "../../../styles/tree-common.less";

  .ivu-alert.ivu-alert-with-icon {
    padding: 8px 0px 8px 35px;
  }
</style>
<template>
  <div>
    <Alert show-icon>
      当前选择编辑：
      <span class="select-title">{{editTitle}}</span>
      <a class="select-clear" v-if="menuId" @click="cancelEdit">取消选择</a>
    </Alert>
    <Input
      v-model="searchKey"
      suffix="ios-search"
      @on-change="search"
      placeholder="输入菜单专题名搜索"
      clearable
    />
    <div class="tree-bar" style="maxHeight: calc(100vh - 180px);height: calc(100vh - 180px);">
      <Tree
        ref="tree"
        :data="menus"
        :multiple="false"
        :render="renderContent"
        @on-select-change="selectTree"
        :check-strictly="true"
        :check-directly="true"
      ></Tree>
      <Spin size="large" fix v-if="loading"></Spin>
    </div>
  </div>
</template>

<script>
    import {getMenus, getLeftMenuTree} from '@/api/system/menu'
    export default {
        data() {
            return {
                editTitle: '',
                menuId: '',
                searchKey: '',
                loading:'',
                menus:[]
            }
        },
        mounted() {
            this.getMenus();
        },
        methods: {
            // 获取所有菜单
            getMenus() {
                getLeftMenuTree({roleId:31}).then(res => {
                    this.menus = res.data.content;
                })
            },
            cancelEdit() {
                let data = this.$refs.tree.getSelectedNodes()[0];
                if (data) {
                    data.selected = false;
                }
                this.menuId = "";
                this.editTitle = "";
                this.$emit('onCancelEdit');
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
                    this.menuId = menu.id;
                    this.editTitle = menu.name;
                    this.$emit('onSelectChange', v);
                } else {
                    this.cancelEdit();
                    this.$emit('onCancelEdit');
                }
            },
            search() {
                if (this.searchKey) {
                    this.loading = true;
                    getLeftMenuTree({name: this.searchKey,roleId: 31}).then(res => {
                        this.loading = false;
                        if (res && res.success) {
                            this.menus = res.data.content;
                        }
                    });
                } else {
                    this.getMenus();
                }
            },
        }
    }
</script>
