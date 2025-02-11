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
      placeholder="输入区域名搜索"
      clearable
    />
    <div class="tree-bar" style="maxHeight: calc(100vh - 180px);height: calc(100vh - 180px);">
      <Tree
        ref="tree"
        :data="treeData"
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
    import {getLeftMenuTree} from '@/api/system/menu'
    import {getDepts} from "@/api/system/dept"
    export default {
        data() {
            return {
                editTitle: '',
                menuId: '',
                searchKey: '',
                loading:'',
                treeData:[] //树数据
            }
        },
        mounted() {
            this.getAllDict();
        },
        methods: {
            // 获取所有菜单
            getAllDict() {
                this.treeLoading = true;
                getDepts().then(res => {
                    this.treeLoading = false;
                    if (res.content) {
                        this.treeData = this.getTreeData(res.content,1);
                    }
                })
            },
            //解析tree数据
            getTreeData(data,numb) {
                if (data) {
                    for (let i in data) {
                        var item = data[i];
                        data[i].title = data[i].label;
                        data[i].value = data[i].id;
                        data[i].level = numb,
                        data[i].expand = true;
                        if (data[i].children) {
                            data[i].children = this.getTreeData(data[i].children,numb+1);
                        }
                    }
                }
                return data;
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
                if (data.level == 1) {
                    icon = "ios-navigate";
                } else if (data.level == 2) {
                    icon = "md-list-box";
                } else{
                    icon = "md-list";
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
                        h("span", data.title)
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
                    this.menuId = menu.value;
                    this.editTitle = menu.title;
                    this.$emit('onSelectChange', v);
                } else {
                    this.cancelEdit();
                    this.$emit('onCancelEdit');
                }
            },
            search() {// 搜索树
                if (this.searchKey) {
                    this.treeLoading = true;
                    getDepts({name: this.searchKey}).then(res => {
                        this.treeLoading = false;
                        let parent = [];
                        for (let i = 0; i < res.content.length; i++) {
                            parent.push('{"title":"' + res.content[i].name + '","id":' + res.content[i].id + '}');
                        }
                        parent = '[' + parent + ']';
                        this.treeData = jQuery.parseJSON(parent);
                    })
                } else {
                    this.getAllDict();// 为空重新加载
                }
            },
        }
    }
</script>
