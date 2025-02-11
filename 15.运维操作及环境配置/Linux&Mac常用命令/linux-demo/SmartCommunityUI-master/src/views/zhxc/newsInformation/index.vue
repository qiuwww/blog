<style lang="less">
  @import "../../../styles/tree-common.less";
  @import "../../../styles/tree&table-common.less";
</style>
<template>
  <div class="newsInformation">
    <Card>
      <Row type="flex" justify="start">
        <Col span="4">
          <myLeftTree @onSelectChange="selectTree" @onCancelEdit="cancelEdit"></myLeftTree>
        </Col>
        <Col span="20" style="padding-left: 20px;">
          <Row @keydown.enter.native.prevent="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70" onSubmit="return false">
              <Form-item label="菜单名称">
                <Input
                  type="text"
                  v-model="searchForm.menuName"
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
          <Row>
            <Button @click="addBasicMenuInformation" type="primary" icon="md-add">添加菜单详情</Button>
          </Row>
          <Row style="margin-top: 15px;">
            <Table
              :loading="loading"
              border
              :columns="tableColumns"
              :data="tableData"
              sortable="custom"
              ref="table">
              <template slot="action" slot-scope="{ row, index }">
                <Button type="info" size="small" @click.native="viewFrame(row,index)">
                  <Icon type="ios-eye-outline"/>
                  查看
                </Button>
                <Button type="primary" size="small" @click.native="editRow(row,index)">
                  <Icon type="ios-create-outline"/>
                  修改
                </Button>
                <Button type="error" size="small" @click.native="deleteRow(row,index)">
                  <Icon type="md-trash"></Icon>
                  删除
                </Button>
              </template>
            </Table>
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
            ></Page>
          </Row>
        </Col>
      </Row>
    </Card>

    <update v-model="modalShow" :basicMenuInformationId="editId" :modalTitle="modalTitle" :menuId="menuId.toString()"
            v-on:handleSearch="handleSearch"></update>
    <show v-model="lookShow" :basicMenuInformationId="lookId" :modalTitle="modalTitle"></show>
  </div>
</template>

<script>

    import myLeftTree from "../components/myLeftTree";
    import {
        getBasicMenuInformationList,
        getBasicMenuInformationById,
        deleteBasicMenuInformation
    } from '@/api/zhxc/basicMenuInformation/basicMenuInformation'

    import show from "./show";
    import update from "./update";
    //import update from "./update";
    export default {
        name: 'newsInformation',
        components: {show, myLeftTree, update},
        data() {
            return {
                lookId: '',
                id: '',
                editId: '',
                modalTitle: '',
                editorContent: '',
                modalShow: false,
                lookShow: false,
                menuId: '',
                editTitle: '',
                searchKey: '',
                menus: [],
                loading: true,
                searchForm: {
                    menuName: '',
                    menuId: '',
                    page: 1, // 当前页数
                    size: 10, // 页面大小
                },
                total: 0,
                tableData: [],
                tableColumns: [
                    {
                        title: "菜单名称",
                        key: 'menuName',
                        tooltip: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "创建人员",
                        key: 'createName',
                        tooltip: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "创建时间",
                        key: 'createTime',
                        tooltip: true,
                        ellipsis: true,
                        align: "center"
                    },
                    {
                        title: "操作",
                        width: 250,
                        align: "center",
                        fixed: "right",
                        slot: 'action'
                    }
                ],
                isChildren: false,
            }
        },
        mounted() {
            this.getDataList();
        },
        methods: {
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
                    if (menu.children == '') {
                        this.isChildren = false;
                    } else {
                        this.isChildren = true;
                    }
                    this.menuId = menu.id;
                    this.editTitle = menu.name;
                    this.getDataList();
                }
            },

            cancelEdit() {
                this.menuId = "";
                this.editTitle = "";
                this.getDataList();
            },

            handleSearch() {
                this.searchForm.page = 1;
                this.searchForm.size = 10;
                this.getDataList();
            },
            handleReset() {//重置
                this.searchForm.page = 1;
                this.searchForm.size = 10;
                this.searchForm.menuName = '';
                this.searchForm.menuId = '';
                this.menuId = "";
                // 重新加载数据
                this.getDataList();
            },
            changePage(v) {//分页
                this.searchForm.page = v;
                this.getDataList();
            },
            changePageSize(v) {//分页
                this.searchForm.size = v;
                this.getDataList();
            },
            getDataList() {
                this.loading = true;
                this.searchForm.menuId = this.menuId;
                getBasicMenuInformationList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.tableData = res.data.records;
                        this.total = res.data.total;
                        this.loading = false;
                    }
                });
            },
            viewFrame(row, index) {
                this.modalTitle = row.menuName + "详情查看";
                this.lookShow = true;
                this.lookId = row.id;
            },
            editRow(row, index) {
                this.modalTitle = row.menuName + "详情修改";
                this.editId = row.id;
                this.modalShow = true;
            },
            deleteRow(row, index) {
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除?",
                    loading: true,
                    onOk: () => {
                        // 删除
                        let ids = [];
                        ids.push(row.id);
                        this.patchdeleteData(ids);
                    }
                });
            },
            // 删除（后台）
            patchdeleteData(ids) {
                if (ids == undefined || ids == null || ids.length == 0) {
                    this.$Message.error('没有选择的数据');
                    return;
                }
                deleteBasicMenuInformation({ids: ids}).then(res => {
                    this.$Modal.remove();
                    if (res && res.success) {
                        this.$Message.success('删除成功');
                        this.getDataList();
                    } else {
                        this.$Message.error('删除失败');
                    }
                });
            },
            addBasicMenuInformation() {
                if (!this.menuId) {
                    this.$Message.error("请先选择对应的菜单！");
                    return;
                }

                if (!this.isChildren) {
                    let m = this.menuId;
                    //检查当前菜单下是否有存在的详情数据
                    let filter = this.tableData.filter(function (item) {
                        return item.menuId == m;
                    });

                    if (filter.length > 0) {
                        this.$Message.error("该菜单下已存在详情数据，不能重复添加！");
                        return;
                    }
                    this.modalTitle = this.editTitle + "详情新增";
                    this.editorContent = '';
                    this.editId = '';
                    this.modalShow = true;
                } else {
                    this.$Message.error("请选择其菜单的子节点！");
                }
            },
            handelCancel() {
                this.modalShow = false;
            }
        },
        watch: {}
    }
</script>
<style lang="less">
  .newsInformation {
    width: 100%;
    height: calc(100vh - 50px);

    .ivu-table-tip {
      overflow-x: hidden;
      overflow-y: hidden;
    }
    .ivu-col-span-20 {
      display: block;
      width: calc(100% - 275px);
    }
    .ivu-col-span-4 {
      display: block;
      width: 275px;
    }
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }

    .mt-container {
      display: flex;
      flex-wrap: nowrap !important;
    }

    .box-card {
      height: calc(100vh - 64px);
    }

    .ivu-card-head {
      line-height: 250%;
    }

    .ivu-card-body {
      height: calc(100% - 65px);
    }
  }
</style>
