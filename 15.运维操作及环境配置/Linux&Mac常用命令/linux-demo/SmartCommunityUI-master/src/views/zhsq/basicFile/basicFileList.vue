<style lang="less">
  .basicFileList{
    .ivu-form-item-content > .ivu-btn {
      margin-right: 40px !important;
    }
  }

</style>
<template>
  <div class="search basicFileList">
    <div >
      <Card>
        <Row class="operation">
          <Button @click="addBasicFile()" type="primary" icon="md-add">导入图层文件</Button>
        </Row>
        <Row>
          <Table :loading="loading" stripe :columns="columns" sortable="custom" :data="data"
                 @on-sort-change="changeSort"
                 @on-selection-change="showSelect" ref="table">

            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" @click="handleLook(row.filePath, row.fillColor)" size="small">
                <Icon type="ios-eye-outline"/>
                查看
              </Button>

              <Button type="success" @click="handleEdit(row, index)" size="small">
                <Icon type="ios-create-outline"/>
                修改
              </Button>
            </template>
          </Table>
        </Row>
        <Row type="flex" justify="center"  class="page">
          <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
                @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
                show-sizer transfer></Page>
        </Row>
      </Card>
    </div>
    <updateBasicFile v-model="updateShow" :BasicFileId="BasicFileId" :modalTitle="title" :addType="types"
                     v-on:handleSearch="handleSearchPage"></updateBasicFile>

    <showJson v-model="jsonShow" :jsonUrl="jsonUrl" :modalTitle="title" :divId="divId" :backgroundColor="backgroundColor"></showJson>
  </div>
</template>
<script>
    import {deleteBasicFile, queryBasicFileList} from '@/api/zhsq/basicFile/basicFile'
    import updateBasicFile from './updateBasicFile'
    import showJson from '../../gismap/components/showjson'
    import {nginxUrl, formartDate} from '@/api/tools/tool'

    export default {
        components: {
            updateBasicFile,
            showJson
        },
        props: {
            type: {
                type: String,
                default: ""
            },
        },
        data() {
            return {
                jsonShow: false,
                jsonUrl: "",
                backgroundColor: "",
                types: this.type,
                divId: "basicFile" + this.type,
                drop: false,
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                search: '',
                data: [],
                columns: this.getBasicFileColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: null,//开始时间
                    endDate: null,//结束时间
                    sort: 'create_time', // 默认排序字段

                    order: 'desc' // 默认排序方式
                },
                total: 0,
                title: '',
                BasicFileId: '',
                updateShow: false,
                tableHeight: 200,
                colOptions: [
                    "文件名称", "文件路径", "文件类型", "备注", "是否删除", "操作"],
                colSelect: [
                    "文件名称", "文件路径", "文件类型", "备注", "是否删除", "操作"],
            }
        },
        methods: {
            //新增
            addBasicFile() {
                this.title = this.types == 1 ? '产业功能划分文件上传' : '生态环境划分文件上传';
                this.updateShow = true;
                this.BasicFileId = '';
            },
            //编辑
            handleEdit(row, index) {
                this.title = this.types == 1 ? '产业功能划分文件修改' : '生态环境划分文件修改';
                this.BasicFileId = row.id.toString();
                this.updateShow = true;
            },
            //查看
            handleLook(url,color) {
                this.title = this.types == 1 ? '产业功能划分文件查看' : '生态环境划分文件查看';
                this.jsonUrl = nginxUrl+ url;
                this.backgroundColor = color;
                this.jsonShow = true;
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.id = null;
                this.searchForm.type = this.types;
                queryBasicFileList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.data = res.data.records;
                        this.total = res.data.total;
                    }
                }).finally(res => {
                    this.loading = false;
                });
            },
            // //单一删除
            // deleteData(row, index) {
            //     this.$Modal.confirm({
            //         title: "确认删除",
            //         content: "您确认要删除所点击选的数据?",
            //         loading: true,
            //         onOk: () => {
            //             this.userLoading = true;
            //             var ids = [];
            //             ids.push(row.id);
            //             this.patchdeleteData(ids);
            //         },
            //         onCancel: () => {
            //             this.$Message.info('取消了当前的操作行为！');
            //         },
            //     });
            // },
            // //批量删除
            // delAll() {
            //     if (this.selectCount <= 0) {
            //         this.$Message.warning('您还未选择要删除的数据');
            //         return;
            //     }
            //     this.$Modal.confirm({
            //         title: '确认删除',
            //         content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
            //         loading: true,
            //         onOk: () => {
            //             let ids = [];
            //             this.selectList.forEach(function (e) {
            //                 ids.push(e.id);
            //             });
            //             this.patchdeleteData(ids);
            //         },
            //         onCancel: () => {
            //             this.$Message.info('取消了当前的操作行为！');
            //         }
            //     });
            // },
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
            // 查询
            handleSearchPage() {
              this.searchForm.pageSize = 10
              this.getDataList()
            },
            //重置
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.startDate = null;
                this.searchForm.endDate = null;
                this.selectDate = null;
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
            getBasicFileColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '文件名称',
                        align: 'center',
                        key: 'fileName',
                        minWidth: 120,
                        tooltip: true,
                        ellipse:true
                    },
                    {
                        title: '文件路径',
                        align: 'center',
                        key: 'filePath',
                        minWidth: 250,
                        tooltip: true,
                      ellipse:true
                    },
                    {
                        title: '文件类型',
                        align: 'center',
                        key: 'fileType',
                        minWidth: 100,
                        tooltip: true,
                      ellipse:true
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'isDelete',
                        sortable: false,
                        minWidth: 100,
                        render: (h, params) => {
                            if (params.row.isDelete == 0) {
                                return h('Tag', {
                                    props: {
                                        color: "success"
                                    },

                                }, "正常")

                            } else {
                                return h('Tag', {
                                    props: {
                                        color: "error"
                                    },
                                }, "已删除")
                            }
                        }
                    },

                    {
                        title: '是否填充',
                        align: 'center',
                        key: 'whetherToFill',
                        minWidth: 90,
                        tooltip: true,
                        ellipse:true,
                        render: (h, params) => {
                            return h('div', params.row.whetherToFill == 1 ? '是' : '');
                        }
                    },
                    {
                        title: '填充色',
                        align: 'center',
                        key: 'fillColor',
                        minWidth: 90,
                        tooltip: true,
                        ellipse:true,
                        render: (h, params) => {
                            return h('div', {
                                style: {
                                    'background-color': params.row.fillColor,
                                    width: '30px',
                                    height: '30px',
                                    'margin-left': '50%',
                                    transform: 'translateX(-50%)'
                                },
                            });
                        }
                    },
                    {
                      title: '备注',
                      align: 'center',
                      key: 'remark',
                      minWidth: 150,
                      tooltip: true,
                      ellipse:true
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        sortable: false,
                        align: 'center',
                        width: 180,
                        tooltip: true,
                        ellipse:true,
                        render: (h, params) => {
                            let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
                            return h('Tooltip', {
                                props: {
                                    content: createTime,
                                    placement: 'bottom',
                                    transfer: true
                                }
                            }, createTime)
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        minWidth: 220,
                        // render: (h, params) => {
                        //     return h("div", {
                        //         domProps: {
                        //             innerHTML: '<a>查看</a>'//渲染html内容
                        //         },
                        //         on: {
                        //             click: () => {
                        //                 this.handleLook(nginxUrl + params.row.filePath, params.row.fillColor)
                        //             }
                        //         }
                        //     })
                        // }
                    }
                ]
            },
            //动态列实现
            // checkboxChange: function (data) {
            //     var columnss = this.getTSubstancesColumns();
            //     this.columns = columnss.filter(function (v) {
            //         return data.indexOf(v.title) > -1 || v.type == 'selection'
            //     })
            // }
        },
        mounted() {
            this.getDataList();
            //this.tableHeight = window.innerHeight - this.$refs.basicFileTable.$el.offsetTop - 270
        }
    }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
