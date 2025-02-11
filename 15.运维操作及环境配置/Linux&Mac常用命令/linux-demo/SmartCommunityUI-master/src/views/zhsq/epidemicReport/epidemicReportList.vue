<style lang="less">
  .epidemicReportList {

  }


</style>
<template>
  <div class="epidemicReportList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="姓名">
            <Input type="text" v-model="searchForm.personName" placeholder="请输入姓名" clearable/>
          </Form-item>
          <Form-item label="身份证">
            <Input type="text" v-model="searchForm.personIdCard" placeholder="请输入身份证" clearable/>
          </Form-item>
          <Form-item label="电话号码">
            <Input type="text" v-model="searchForm.personMobile" placeholder="请输入电话号码" clearable/>
          </Form-item>

          <Form-item style="margin-left:-35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <!--            <a class="drop-down" @click="dropDown">-->
            <!--              {{dropDownContent}}-->
            <!--              <Icon :type="dropDownIcon"></Icon>-->
            <!--            </a>-->
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="exportExcel" type="primary" icon="md-add">导出数据</Button>

        <!--        <Dropdown @on-click="handleDropdown">-->
        <!--          <Button>-->
        <!--            更多操作-->
        <!--            <Icon type="md-arrow-dropdown"/>-->
        <!--          </Button>-->
        <!--          <DropdownMenu slot="list">-->
        <!--            <DropdownItem name="refresh">-->
        <!--              <Icon type="md-sync"/>-->
        <!--              刷新-->
        <!--            </DropdownItem>-->
        <!--&lt;!&ndash;            <DropdownItem name="removeAll">&ndash;&gt;-->
        <!--&lt;!&ndash;              <Icon type="md-trash"/>&ndash;&gt;-->
        <!--&lt;!&ndash;              批量删除&ndash;&gt;-->
        <!--&lt;!&ndash;            </DropdownItem>&ndash;&gt;-->
        <!--            <DropdownItem name="export">-->
        <!--              <Icon type="md-arrow-down"/>-->
        <!--              导出数据-->
        <!--            </DropdownItem>-->
        <!--          </DropdownMenu>-->
        <!--        </Dropdown>-->
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
        <div style="float: right;position: absolute;right: 10px;">
          <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
            <Button icon="md-list"></Button>
            <div slot="content" style="position:relative;min-height:5vh">
              <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                <row v-for="(item, i)  in colSelect">
                  <checkbox :label="item" :key="item"></checkbox>
                </row>
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
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="handleLook(row, index)" size="small">
              <Icon type="ios-eye-outline"/>
              查看
            </Button>
<!--            <Dropdown :transfer=true>-->
<!--              <Button size="small">-->
<!--                更多操作-->
<!--                <Icon type="md-arrow-dropdown"/>-->
<!--              </Button>-->
<!--              <DropdownMenu slot="list">-->
<!--                <DropdownItem name="edit" @click.native="handleEdit(row, index)">-->
<!--                  <Icon type="ios-create-outline"/>-->
<!--                  修改-->
<!--                </DropdownItem>-->
<!--                <DropdownItem name="delete" @click.native="deleteData(row, index)">-->
<!--                  <Icon type="md-trash"></Icon>-->
<!--                  删除-->
<!--                </DropdownItem>-->
<!--              </DropdownMenu>-->
<!--            </Dropdown>-->
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator show-sizer transfer></Page>
      </Row>
    </Card>
    <updateEpidemicReport v-model="updateShow" :EpidemicReportId="EpidemicReportId" :modalTitle="title" v-on:handleSearch="getDataList"></updateEpidemicReport>
  </div>
</template>
<script>
    import {deleteEpidemicReport, queryEpidemicReportList, exportExcel} from '@/api/zhsq/epidemicReport/epidemicReport'
    import {formartDate} from '@/api/tools/tool'
    import updateEpidemicReport from './updateEpidemicReport'
    export default {
        components: {updateEpidemicReport},
        data() {
            return {
                drop: false,
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                search: '',
                data: [],
                columns: this.getEpidemicReportColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    personName: "",
                    personIdCard: "",
                    personMobile: "",
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: null,//开始时间
                    endDate: null,//结束时间
                    sort: 'createTime', // 默认排序字段
                    order: 'desc' // 默认排序方式
                },
                total: 0,
                title: '',
                EpidemicReportId: '',
                updateShow: false,
                tableHeight: 200,
                colOptions: [
                    "姓名", "身份证号", "电话号码", "申报人身份", "从事行业", "备用手机号", "来源地", "来源地省", "来源地市", "来源地区", "来源地详细地址", "到泸详细地址", "到泸街道", "到泸社区", "泸州本地联系人姓名", "泸州本地联系人电话", "离开日期", "到泸日期", "交通方式", "健康码颜色", "承诺日期", "添加日期", "操作"],
                colSelect: [
                    "姓名", "身份证号", "电话号码", "申报人身份", "从事行业", "备用手机号", "来源地", "来源地省", "来源地市", "来源地区", "来源地详细地址", "到泸详细地址", "到泸街道", "到泸社区", "泸州本地联系人姓名", "泸州本地联系人电话", "离开日期", "到泸日期", "交通方式", "健康码颜色", "承诺日期", "添加日期", "操作"],
            }
        },
        methods: {
            exportExcel() {
                let fileName = "返乡填报信息.xlsx";
                exportExcel({}).then(res => {
                    const content = res;
                    const blob = new Blob([content], {type: 'application/ms-excel'});
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a');
                        elink.download = fileName;
                        elink.style.display = 'none';
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        URL.revokeObjectURL(elink.href); // 释放URL 对象
                        document.body.removeChild(elink);
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName);
                    }
                }).catch(function (error) {
                    this.$Message.error('数据导出失败');
                });
            },
            //列表上方更多操作
            handleDropdown(name) {
                if (name == "refresh") {
                    this.getDataList();
                } else if (name == "removeAll") {
                    this.delAll();
                } else if (name == "export") {

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
            //新增
            addEpidemicReport() {
                this.title = '新增';
                this.updateShow = true
                this.EpidemicReportId = '';
            },
            //编辑
            handleEdit(row, index) {
                this.title = '编辑';
                this.EpidemicReportId = row.id.toString();
                this.updateShow = true;
            },
            //查看
            handleLook(row, index) {
                this.title = '查看';
                this.EpidemicReportId = row.id.toString();
                this.updateShow = true;
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.selectCount = 0;
                this.searchForm.id = null;
                queryEpidemicReportList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.loading = false;
                        this.data = res.data.records;
                        this.total = res.data.total;
                    }
                }).catch(err => {
                    this.loading = false
                });
            },
            //单一删除
            deleteData(row, index) {
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所点击选的数据?",
                    loading: true,
                    onOk: () => {
                        this.userLoading = true;
                        var ids = [];
                        ids.push(row.id);
                        this.patchdeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('取消了当前的操作行为！');
                    },
                });
            },
            //批量删除
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning('您还未选择要删除的数据');
                    return;
                }
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        this.selectList.forEach(function (e) {
                            ids.push(e.id);
                        });
                        this.patchdeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('取消了当前的操作行为！');
                    }
                });
            },
            //删除（后台）
            patchdeleteData(ids) {
                if (ids == undefined || ids == null || ids.length == 0) {
                    this.$Message.error('没有选择的数据');
                    return;
                }
                deleteEpidemicReport({ids: ids}).then(res => {
                    this.userLoading = false;
                    this.$Modal.remove();
                    if (res && res.success) {
                        this.modalTaskVisible = false;
                        this.$Message.success('删除成功');
                        this.getDataList();
                    } else {
                        this.$Message.error('删除失败');
                    }
                });
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
                this.searchForm.personName = "";
                this.searchForm.personIdCard = "";
                this.searchForm.personMobile = "";
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
            getEpidemicReportColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'personName',
                        sortable: false,
                        minWidth:80,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '身份证号',
                        align: 'center',
                        key: 'personIdCard',
                        minWidth:180,
                        sortable: false,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '电话号码',
                        align: 'center',
                        key: 'personMobile',
                        minWidth:130,
                        sortable: false,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '来源地',
                        align: 'center',
                        key: 'personOrigin',
                        minWidth:100,
                        sortable: false,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '来源地省',
                        align: 'center',
                        key: 'originProvince',
                        minWidth:90,
                        sortable: false,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '来源地市',
                        align: 'center',
                        key: 'originCity',
                        sortable: false,
                        minWidth:90,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '来源地区',
                        align: 'center',
                        key: 'originArea',
                        sortable: false,
                        minWidth:90,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '来源地详细地址',
                        align: 'center',
                        key: 'originAddress',
                        sortable: false,
                        minWidth:200,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '到泸街道',
                        align: 'center',
                        key: 'toStree',
                        sortable: false,
                        minWidth:100,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '到泸社区',
                        align: 'center',
                        key: 'toCommunity',
                        sortable: false,
                        minWidth:100,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '到泸详细地址',
                        align: 'center',
                        key: 'toAddress',
                        sortable: false,
                        minWidth:200,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '到泸日期',
                        key: 'arriveDate',
                        sortable: true,
                        align: 'center',
                        minWidth: 180,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '交通方式',
                        align: 'center',
                        key: 'transportation',
                        sortable: false,
                        minWidth: 100,
                        tooltip:true,
                        ellipsis:true
                    },
                    {
                        title: '健康码颜色',
                        align: 'center',
                        key: 'healthCodeColor',
                        sortable: false,
                        minWidth: 100,
                        tooltip:true,
                        ellipsis:true,
                        render: (h, params) => {
                            let color = '';
                            let name = '';
                            if (params.row.healthCodeColor == '红色') {
                                color = "error";
                                name = "红色";
                            }
                            if (params.row.healthCodeColor == '绿色') {
                                color = "success";
                                name = "绿色";
                            }
                            if (params.row.healthCodeColor == '黄色') {
                                color = "warning";
                                name = "黄色";
                            }
                            return h("Tag", {
                                props: {
                                    color: color,
                                    type: "border"
                                },
                            }, name)
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        width: 200,
                    }
                ]
            },
            //动态列实现
            checkboxChange: function (data) {
                var columnss = this.getEpidemicReportColumns();
                this.columns = columnss.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                })
            }
        },
        mounted() {
            this.getDataList();
            this.colSelect = [];
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].title) {
                    this.colSelect.push(this.columns[i].title)
                }
            }
        }
    }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
