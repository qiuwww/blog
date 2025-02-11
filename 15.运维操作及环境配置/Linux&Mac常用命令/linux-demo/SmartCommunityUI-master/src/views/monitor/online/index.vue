<template>
  <div class="search logList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="内容查询">
            <Input type="text" v-model="searchForm.filter" placeholder="全表模糊查询" clearable style="width: 200px"/>
          </Form-item>
          <Form-item style="margin-left:-50px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="handleReset" icon="md-refresh">刷新数据</Button>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>

        <div style="float: right;position: absolute;right: 10px;">
          <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
            <Button icon="md-list"></Button>
            <div slot="content" style="position:relative;min-height:5vh">
              <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                <checkbox v-for="(item,i) in colSelect" :label="item" :key="item"></checkbox>
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
          <span style="float: right;">点击右上角按钮配置动态列↑</span>
        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" border :columns="columns" sortable="custom" :data="data"
               @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="delMethod(row, index)" size="small">强退</Button>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.page + 1"
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
  </div>
</template>
<script>
    import {formartDate} from '@/api/tools/tool';
    import { del } from '@/api/monitor/online'
    import { getRequest} from '@/libs/axios';
    export default {
        components: {},
        data() {
            return {
                dialog: false,
                errorInfo: "",
                createTime: [],
                drop: false,
                search: '',
                data: [],
                columns: this.getTSubstancesColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    filter:'',
                    page: 0, // 当前页数
                    size: 10, // 页面大小
                    // sort: 'createTime', // 默认排序字段
                },
                total: 0,
                title: '',
                LogId: '',
                tableHeight: 200,
                colOptions:["用户名", "用户昵称", "岗位", "登录IP", "登录地点", "浏览器", "登录时间","操作"],
                colSelect: ["用户名", "用户昵称", "岗位", "登录IP", "登录地点", "浏览器", "登录时间","操作"],

            }
        },
        methods: {
            //分页查询
            getDataList() {
                this.loading = true;
                getRequest("/auth/online",this.searchForm).then(res=>{
                    this.data = res.content;
                    this.total = res.totalElements;
                    this.loading = false;
                })
            },
            delMethod(row, index) {
                let key = row.key;
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要强制退出用户昵称为："+row.nickName+" 的用户吗?",
                    loading: true,
                    onOk: () => {
                        const ids = []
                        if (key instanceof Array) {
                            key.forEach(val => {
                                ids.push(val.key)
                            })
                        } else {
                            ids.push(key)
                        }
                        //请求后台
                        del(ids).then(res=>{
                            this.$Modal.remove();
                            this.$message.success("强退成功")
                            this.getDataList();
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('取消了当前的操作行为！');
                    },
                });

            },
            //改变页码
            changePage(v) {
                this.searchForm.page = v -1;
                this.getDataList();
                this.clearSelectAll();
            },
            //改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.size = v;
                this.getDataList();
            },
            //查询
            handleSearch() {
                this.searchForm.page = 0;
                this.searchForm.size = 10;
                this.getDataList();
            },
            //重置
            handleReset() {
                this.searchForm.filter = "";
                this.searchForm.page = 0;
                this.searchForm.size = 10;
                // 重新加载数据
                this.getDataList();
            },
            //显示选择
            showSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            //清空选择
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            //获取列表字段
            getTSubstancesColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        type: "index",
                        width: 60,
                        align: "center",
                        tooltip:true,
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'userName',
                        sortable: false,
                    },
                    {
                        title: '用户昵称',
                        align: 'center',
                        key: 'nickName',
                        sortable: false
                    },
                    {
                        title: '岗位',
                        align: 'center',
                        key: 'job',
                        sortable: false
                    },
                    {
                        title: '登录IP',
                        align: 'center',
                        key: 'ip',
                        sortable: false
                    },
                    {
                        title: '登录地点',
                        align: 'center',
                        key: 'address',
                        sortable: false
                    },
                    {
                        title: '浏览器',
                        align: 'center',
                        key: 'browser',
                        sortable: false
                    },
                    {
                        title: '登录时间',
                        key: 'loginTime',
                        sortable: true,
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            let str = formartDate(params.row.loginTime, "yyyy-MM-dd");
                            return h("div", [h("div", {}, str)]);
                        }
                    },
                    {
                        fixed: 'right',
                        width: 180,
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        tooltip:true,
                    }
                ]
            },
            //动态列实现
            checkboxChange: function (data) {
                var columnss = this.getTSubstancesColumns();
                this.columns = columnss.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                })
            }
        },
        mounted() {
            this.getDataList();
            //this.tableHeight = window.innerHeight - this.$refs.logTable.$el.offsetTop - 270
        }
    }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
