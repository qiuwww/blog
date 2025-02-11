<style lang="less">
  .search {
    .searchRow {
      .ivu-select {
        width: 200px;
      }
    }
  }
</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <div class="search">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch" class="searchRow">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110">

          <Form-item label="所属街道">
            <Select v-model="searchForm.streetId" placeholder="请选择" @on-change="streetChange" label-in-value>
              <Option v-for="(item, i)  in streetData" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属社区">
            <Select v-model="searchForm.communityId" placeholder="请选择" @on-change="communityChange" label-in-value>
              <Option v-for="(item, i)  in communityData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="所属网格">
            <Select v-model="searchForm.ownedGridId" placeholder="请选择">
              <Option v-for="(item, i) in gridData" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="租客姓名" v-if="searchShow">
            <Input type="text" v-model="searchForm.name" placeholder="请输入" style="width: 200px"/>
          </Form-item>

          <Form-item label="身份证号" v-if="searchShow">
            <Input type="text" v-model="searchForm.cardId" placeholder="请输入" style="width: 200px"/>
          </Form-item>

          <Form-item style="margin-left:-70px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置查询</Button>
            <a class="drop-down" @click="dropDown">
              {{dropDownContent}}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <!--        <Button @click="addBasicHousingCustomer" type="primary" icon="md-add">新增</Button>-->
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">
              <Icon type="md-sync"/>
              刷新
            </DropdownItem>
            <DropdownItem name="removeAll" v-if="permitIds.includes('archive_buildings_chuzu_delete')">
              <Icon type="md-trash"/>
              批量删除
            </DropdownItem>
            <DropdownItem name="export">
              <Icon type="md-arrow-down"/>
              导出本页数据
            </DropdownItem>
            <DropdownItem name="excelExport">
              <Icon type="md-arrow-down"/>
              根据查询条件导出
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
        <div style="float: right;position: absolute;right: 10px;">
          <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
            <Button icon="md-list"></Button>
            <div slot="content" style="position:relative;min-height:5vh">
              <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                <checkbox v-for="(item, i)  in colSelect" :label="item" :key="item"></checkbox>
              </Checkbox-group>
            </div>
          </Poptip>
        </div>
      </Row>
      <Row v-show="selectCount>0">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <span style="float: right;">点击右上角按钮配置动态列↑</span>
        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" stripe :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="handleLook(row, index)" size="small" v-if="permitIds.includes('archive_buildings_chuzu_see')">
              <Icon type="ios-eye-outline"/>
              查看
            </Button>
            <Dropdown :transfer=true>
              <Button size="small">
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="delete" @click.native="deleteData(row, index)" v-if="permitIds.includes('archive_buildings_chuzu_delete')">
                  <Icon type="md-trash"></Icon>
                  删除
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center"  class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer></Page>
      </Row>
    </Card>
    <updateBasicHouseRent v-model="updateShow" :BasicHousingManageId="BasicHousingManageId" :modalTitle="title"
                          v-on:handleSearch="handleSearchPage"></updateBasicHouseRent>
    <lookHousingManage v-model="deleteShow" :BasicHousingManageId="BasicHousingManageId"
                       :modalTitle="title"></lookHousingManage>


    <bindHouse v-model="bindShow" :BasicPersonId="BasicPersonId" :modalTitle="title"
               v-on:handleSearch="handleSearchPage"></bindHouse>
  </div>
</template>
<script>
    import {deleteBasicHousingCustomer, getAllPersonByRela, exportExcelRent} from '@/api/zhsq/basicHouse/basicHouse'
    import lookHousingManage from "../basicHouseManage/lookHousingManage";
    import {getDictionary, getStreet, getCommunity} from '@/api/index';
    import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
    import updateBasicHouseRent from './updateBasicHouseRent'
    import lookBasicHousing from './lookBasicHousing'
    import {formartDate} from '@/api/tools/tool'
    import bindHouse from "./bindHouse";
    import {mapGetters} from "vuex";
    export default {
        computed: {
          ...mapGetters(["permitIds"])
        },
        components: {
            updateBasicHouseRent, lookBasicHousing, bindHouse, lookHousingManage
        },
        data() {
            return {
                bindShow: false,
                rowData: {},
                deleteShow: false,
                searchShow: false,
                drop: false,
                BasicPersonId: '',
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                search: '',
                data: [],
                columns: this.getBasicHousingCustomerColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    houseStreet: '',
                    houseCommunity: '',
                    houseGrid: '',
                    houseName: '',
                    customerName: '',
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: null,//开始时间
                    endDate: null,//结束时间
                    sort: 'create_time', // 默认排序字段
                    order: 'desc' // 默认排序方式
                },
                streetData: [],
                communityData: [],
                gridData: [],
                gridData1: [],
                //住房状态
                rentStatusData:[],
                //人口类型
                personTypeData:[],
                total: 0,
                title: '',
                BasicHousingManageId: '',
                updateShow: false,
                tableHeight: 200,
                colOptions: ["租客姓名", "租客身份证号", "人口类型", "所属街道", "所属社区", "租用状态", "创建时间", "操作"],
                colSelect: ["租客姓名", "租客身份证号", "人口类型", "所属街道", "所属社区", "租用状态", "创建时间", "操作"],
            }
        },
        methods: {
            //住房状态
            getRentStatusData(){
                getDictionary({fieldName:'rentStatus'}).then(res => {
                    if (res && res.success) {
                        this.rentStatusData = res.data;
                    }
                });
            },
            //人口类型
            getPersonType() {
                getDictionary({fieldName: 'personTypeDatas'}).then(res => {
                    if (res && res.success) {
                        this.personTypeData = res.data;
                    }
                });
            },
            //获取街道
            getStreetData() {
                getStreet({}).then(res => {
                    if (res && res.success) {
                        this.streetData = res.data;
                    }
                })
            },
            //街道改变
            streetChange(e) {
                if (e) {
                    //社区
                    this.searchForm.communityId = "";
                    this.communityData = [];
                    //网格
                    this.searchForm.ownedGridId = "";
                    this.gridData = [];

                    getCommunity({streetId:e.value}).then(res=>{
                       if(res && res.success){
                           this.communityData = res.data;
                       }
                    });
                }
            },
            //社区改变
            communityChange(e) {
                if (e) {
                    //网格
                    this.searchForm.ownedGridId = "";
                    this.gridData = [];

                    queryAllList({communityId: e.value}).then(res => {
                        if (res.data.length > 0) {
                            this.gridData = res.data;
                        }
                    });
                }
            },
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
                } else if (name == "excelExport") {
                    this.excelData();
                }
            },
            //导出查询数据
            excelData() {
                var _this = this;
                this.searchForm.id = null;
                exportExcelRent(_this.searchForm).then(res => {
                    const content = res;
                    const blob = new Blob([content], {type: 'application/ms-excel'});
                    const fileName = '出租房屋档案.xlsx';
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
                    _this.isExportShow = false;
                }).catch(function (error) {
                    _this.$Message.error('数据导出失败');
                    _this.isExportShow = false;
                });
            },
            //展开 收起
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "展开";
                    this.dropDownIcon = "ios-arrow-down";
                    this.searchShow = false;
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                    this.searchShow = true;
                }
                this.drop = !this.drop;
            },
            handleLook(row, index) {
                this.title = '出租房屋查看';
                this.deleteShow = true;
                this.BasicHousingManageId = row.house_id.toString();
            },
            //编辑
            handleEdit(row, index) {
                this.title = '出租房屋修改';
                this.BasicHousingManageId = row.house_id.toString();
                this.updateShow = true;
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.id = null;
                getAllPersonByRela(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.loading = false;
                        this.data = res.data.records;
                        this.total = res.data.total;
                        //console.log(this.data)
                        //房屋状态
                        this.getRentStatusData();
                        //人口类型
                        this.getPersonType();
                    }
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
                        let ids = [];
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
                deleteBasicHousingCustomer({ids: ids}).then(res => {
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
            //查询
            handleSearchPage() {
              // this.searchForm.pageNumber = 1;
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
                this.searchForm.streetId = '';
                this.searchForm.communityId = '';
                this.searchForm.ownedGridId = '';
                this.searchForm.name = '';
                this.searchForm.cardId = '';
                this.communityData = [];
                this.gridData = [];
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
            getBasicHousingCustomerColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '租客姓名',
                        align: 'center',
                        key: 'name',
                        sortable: false,
                        tooltip: true,
                        ellipsis:true,
                        minWidth: 100
                    },
                    {
                        title: '租客身份证号',
                        align: 'center',
                        key: 'card_id',
                        sortable: false,
                        tooltip: true,
                        ellipsis:true,
                        minWidth: 120
                    },
                    {
                        title: '人口类型',
                        align: 'center',
                        key: 'person_type',
                        tooltip: true,
                        ellipsis:true,
                        sortable: false,
                        width: 100,
                        render: (h, param) => {
                            if (param.row.person_type) {
                                let tempArr = this.personTypeData.filter(item=>item.number.toString() === param.row.person_type.toString());
                                if(tempArr.length>0){
                                    // return h('span',tempArr[0].name)
                                  return h('Tooltip', {
                                    props: {
                                      content: tempArr[0].name,
                                      placement: 'bottom',
                                      transfer: true
                                    }
                                  }, tempArr[0].name)
                                }else{
                                    // return h('span','暂无');
                                  return h('Tooltip', {
                                    props: {
                                      content: '暂无',
                                      placement: 'bottom',
                                      transfer: true
                                    }
                                  }, '暂无')
                                }
                            } else {
                                // return h('span','暂无');
                              return h('Tooltip', {
                                props: {
                                  content: '暂无',
                                  placement: 'bottom',
                                  transfer: true
                                }
                              }, '暂无')
                            }
                        }
                    },
                    {
                        title: '所属街道',
                        align: 'center',
                        key: 'street_name',
                        sortable: false,
                        tooltip: true,
                        ellipsis:true,
                        minWidth: 100
                    },
                    {
                        title: '所属社区',
                        align: 'center',
                        key: 'community_name',
                        sortable: false,
                        tooltip: true,
                        ellipsis:true,
                        minWidth: 100
                    },
                    {
                        title: '租用状态',
                        align: 'center',
                        key: 'rent_status',
                        sortable: false,
                        tooltip: true,
                        ellipsis:true,
                        minWidth: 100,
                        render: (h, param) => {
                            if (param.row.rent_status) {
                                let tempArr = this.rentStatusData.filter(item=>item.number.toString() === param.row.rent_status.toString());
                                if(tempArr.length>0){
                                    // return h('span',tempArr[0].name)
                                  return h('Tooltip', {
                                    props: {
                                      content: tempArr[0].name,
                                      placement: 'bottom',
                                      transfer: true
                                    }
                                  }, tempArr[0].name)
                                }else{
                                    // return h('span','暂无');
                                  return h('Tooltip', {
                                    props: {
                                      content: '暂无',
                                      placement: 'bottom',
                                      transfer: true
                                    }
                                  }, '暂无')
                                }
                            } else {
                                // return h('span','暂无');
                              return h('Tooltip', {
                                props: {
                                  content: '暂无',
                                  placement: 'bottom',
                                  transfer: true
                                }
                              }, '暂无')
                            }
                        }
                    },{
                        title: '创建时间',
                        key: 'create_time',
                        sortable: false,
                        align: 'center',
                        width: 180,
                        tooltip: true,
                        ellipsis:true,
                        render: (h, params) => {
                            params.row.createTime = formartDate(params.row.create_time, 'yyyy-MM-dd HH:mm:ss');
                            /*return h('div',
                                formartDate(params.row.create_time, 'yyyy-MM-dd HH:mm:ss')
                            )*/
                          return h('Tooltip', {
                            props: {
                              content: formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'),
                              placement: 'bottom',
                              transfer: true
                            }
                          }, formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
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
                let cols = this.getBasicHousingCustomerColumns();
                this.columns = cols.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                })
            }
        },
        mounted() {
            this.getDataList();
            this.getStreetData();
        }
    }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
