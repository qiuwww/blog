<style lang="less">
  .logList {

  }

  .ivu-form-item-content > .ivu-btn {
    margin-right: 10px !important;
  }
</style>
<template>
  <div class="search logList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Input type="text" v-model="searchForm.blurry" placeholder="请输入你要搜索的内容" clearable style="width: 200px"/>
          <Form-item label="创建时间">
            <DatePicker v-model="createTime" type="daterange" format="yyyy-MM-dd" clearable
                        @on-change="selectDateRange"
                        placeholder="选择起始时间" style="width: 200px">
            </DatePicker>
          </Form-item>
          <Form-item style="margin-left:-35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
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
        <Table :loading="loading" border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table">
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer transfer></Page>
      </Row>
    </Card>
    <Modal v-model="dialog" draggable scrollable title="异常详情" width="85%" footer-hide>
      <pre v-highlightjs="errorInfo" style="height: 600px;"><code class="java"/></pre>
    </Modal>
  </div>
</template>
<script>
    import {queryLogList} from '@/api/log/log';
    import {formartDate} from '@/api/tools/tool';
    import expandRow from './table-expand.vue';

    export default {
        components: {expandRow},
        data() {
            return {
                dialog: false,
                errorInfo: "",
                createTime: [],
                drop: false,
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                search: '',
                data: [],
                columns: this.getLogColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    blurry: "",
                    startDate: "",
                    endDate: "",
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    sort: 'createTime', // 默认排序字段
                    order: 'desc' // 默认排序方式
                },
                total: 0,
                title: '',
                LogId: '',
                tableHeight: 200,
                colOptions: ["用户名", "Ip", "Ip来源", "描述", "浏览器", "请求耗时", "创建日期"],
                colSelect: ["用户名", "Ip", "Ip来源", "描述", "浏览器", "请求耗时", "创建日期"],
            }
        },
        methods: {
            //列表上方更多操作
            handleDropdown(name) {
                if (name == "refresh") {
                    this.getDataList();
                } else if (name == "removeAll") {
                    this.delAll();
                } else if (name == "export") {
                    let excolumns = this.columns.filter(function (v) {
                        return v.title != "操作" && v.type != 'selection'
                    });
                    this.$refs.table.exportCsv({
                        filename: '本页数据',
                        columns: excolumns,
                        data: this.data
                    });
                }
            },
            //展开 收起
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "展开";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            //时间选择事件
            selectDateRange(v) {
                if (v) {
                    this.searchForm.startDate = v[0];
                    this.searchForm.endDate = v[1];
                }
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.id = null;
                if (this.createTime) {
                    this.searchForm.startDate = this.createTime[0];
                    this.searchForm.endDate = this.createTime[1];
                }
                queryLogList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.loading = false;
                        this.data = res.data.content;
                        this.total = res.data.totalElements;
                    }
                });
            },
            handleLook(row, index) {
                this.errorInfo = row.exception_detail;
                this.dialog = true;
            },
            //改变页码
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.getDataList();
                this.clearSelectAll();
            },
            //改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.getDataList();
            },
            //改变排序方式
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == 'normal') {
                    this.searchForm.order = '';
                }
                this.getDataList();
            },
            //查询
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getDataList();
            },
            //重置
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.startDate = null;
                this.searchForm.endDate = null;
                this.selectDate = null;
                this.searchForm.createTime = '',
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
            getLogColumns() {
                return [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'username',
                        tooltip:true,
                        sortable: false,
                    },
                    {
                        title: 'Ip',
                        align: 'center',
                        key: 'request_ip',
                        tooltip:true,
                        sortable: false
                    },
                    {
                        title: 'IP来源',
                        align: 'center',
                        key: 'address',
                        tooltip:true,
                        sortable: false
                    },
                    {
                        title: '描述',
                        align: 'center',
                        key: 'description',
                        tooltip:true,
                        sortable: false
                    },
                    {
                        title: '浏览器',
                        align: 'center',
                        key: 'browser',
                        tooltip:true,
                        sortable: false
                    },
                    {
                        title: '请求耗时',
                        align: 'center',
                        key: 'time',
                        tooltip:true,
                        sortable: false,
                        render: (h, params) => {
                            if (params.row.time <= 300) {
                                return  h('Tag',{
                                    props: {
                                        color:"success"
                                    },

                                },params.row.time + "ms")

                            } else if (params.row.time <= 1000) {
                                return  h('Tag',{
                                    props: {
                                        color:"warning"
                                    },

                                },params.row.time + "ms")
                            } else {
                                return  h('Tag',{
                                    props: {
                                        color:"error"
                                    },
                                },params.row.time + "ms")
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        sortable: true,
                        align: 'center',
                        tooltip:true,
                        width: 180,
                        render: (h, params) => {
                            return h('div',
                                formartDate(params.row.create_time, 'yyyy-MM-dd HH:mm:ss')
                            )
                        }
                    },
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
