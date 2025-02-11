<style lang="less" scoped>
    .warehousRecordList{
        .ivu-select {
            width: 200px;
        }

        .ivu-input-wrapper {
            width: 200px !important;
        }
    }
</style>
<template>
    <div class="search warehousRecordList">
        <Card>
            <Row v-show="openSearch" @keydown.enter.native="handleSearch">
                <Form ref="searchForm" :model="searchForm" inline :label-width="70">
                     <Form-item label="任务名称">
                        <Input type="text" :maxlength=50 v-model="searchForm.TASKNAME" placeholder="请输入任务名称"/>
                    </Form-item>
                     <Form-item label="所属区域">
                        <Select placeholder="请选择所属区域" v-model="searchForm.REGION" clearable>
                            <Option v-for="(item, i)  in deptProperty" :key="item.id" :value="item.label">{{item.label}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="管网长度">
                        <Input type="text" :maxlength=50 v-model="searchForm.PIPELENGTH" placeholder="请输入管网长度"/>
                    </Form-item>
                    <Form-item label="管网类型" v-if="drop">
                        <Select placeholder="请输入管网类型" v-model="searchForm.NETWORKTYPE" clearable>
                            <Option v-for="(item, i)  in pipeProperty" :key="item.id" :value="item.label">{{item.label}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="作业单位" v-if="drop">
                        <Input type="text" :maxlength=50 v-model="searchForm.WORKUNIT" placeholder="请输入作业单位"/>
                    </Form-item>
                    <Form-item label="处理人员" v-if="drop">
                        <Input type="text" :maxlength=50 v-model="searchForm.INSPECTOR" placeholder="请输入处理人员"/>
                    </Form-item>
                    <Form-item label="入库时间" v-if="drop">
                        <DatePicker type="datetimerange" ref="dateTime" clearable format="yyyy-MM-dd HH:mm:ss" v-model="time"
                            placeholder="请选择入库时间" style="width:200px;" @on-change="selectTime"></DatePicker>
                    </Form-item>
                    <Form-item style="margin-left:-65px" class="br">
                        <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                        <Button @click="handleReset">重置</Button>
                        <a class="drop-down" @click="dropDown">
                            {{dropDownContent}}
                            <Icon :type="dropDownIcon"></Icon>
                        </a>
                    </Form-item>
                </Form>
            </Row>
            <Row class="operation" style="margin-bottom:10px;">
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
                        <DropdownItem name="export">
                            <Icon type="md-arrow-down"/>
                            导出本页数据
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
                                <Row v-for="(item, i)  in colSelect" :key="item">
                                    <checkbox :label="item"></checkbox>
                                </Row>
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
                    </template>
                </Table>
            </Row>
            <Row type="flex" justify="end" class="page">
                <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
                    @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
                    show-sizer></Page>
            </Row>
        </Card>
        <lookWarehousRecord v-model="lookShow" :warehousRecordId="warehousRecordId" :modalTitle="title"></lookWarehousRecord>
    </div>
</template>
<script>
import {getByPage} from '@/api/zhgw/warehousRecord/warehousRecord';
import { formartDate } from '@/api/tools/tool';
import { getDictDataByType } from '@/api/index';
import lookWarehousRecord from './lookWarehousRecord';
export default {
    components:{
        lookWarehousRecord,
    },
    data() {
        return {
            openSearch:true,
            searchForm:{
                TASKNAME:'',
                REGION:'',
                NETWORKTYPE:'',
                PIPELENGTH:'',
                WORKUNIT:'',
                INSPECTOR:'',
                STORAGETIME:'',
                // 搜索框对应data对象
                pageIndex: 1, // 当前页数
                pagesize: 10, // 页面大小
                starttime:"",
                endtime:""
            },
            openTip:true,
            colOptions:["任务名称","所属区域","管网类型","管网长度","作业单位","处理人员","入库时间","操作"],
            colSelect:["任务名称","所属区域","管网类型","管网长度","作业单位","处理人员","入库时间","操作"],
            columns: this.getWarehousRecordColumns(),
            selectCount:0,
            loading:false,
            data:[],
            csvData:[],
            total:0,
            dropDownContent:"展开",
            dropDownIcon:"ios-arrow-down",
            drop:false,
            deptProperty:[],
            pipeProperty:[],
            time:null,
            lookShow:false,
            warehousRecordId:'',
            title:'',
        }
    },
    methods:{
        selectTime(v){
            if(v){
                this.searchForm.starttime = v[0];
                this.searchForm.endtime = v[1];
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
        getTypePriority(){
            getDictDataByType("dept_name").then(res => {//所属地区
                if(res && res.success){
                    this.deptProperty = res.data;
                }
            });
            getDictDataByType("pipe_type").then(res => {//管网类型
                if(res && res.success){
                    this.pipeProperty = res.data;
                }
            });
        },
        //初始化数据
        getDataList(){
            this.loading = true;
            getByPage(this.searchForm).then(res => {
                if(res && res.success){
                    this.loading = false;
                    this.data = res.data.list;
                    this.csvData = JSON.parse(JSON.stringify(res.data.list));
                    this.total = parseInt(res.data.count);
                }else{
                    this.loading = false;
                }
            }).catch(err => {
                this.loading = false;
            });
        },
        changePageSize(v){
            this.searchForm.pagesize = v;
            this.getDataList();
        },
        changePage(v){
            this.searchForm.pageIndex = v;
            this.getDataList();
            this.clearSelectAll();
        },
        //查看
        handleLook(row, index){
            this.lookShow = true;
            this.title = "查看";
            this.TDataServiceId=row._id.toString();
        },
        //显示选择
        showSelect(e){
            this.selectList = e;
            this.selectCount = e.length;
        },
        //改变排序方式
        changeSort(){

        },
        //清空选择
        clearSelectAll(){
            this.$refs.table.selectAll(false);
        },
        //动态列
        checkboxChange(data){
            var columnss = this.getWarehousRecordColumns();
            this.columns = columnss.filter(function (v) {
                return data.indexOf(v.title) > -1 || v.type == 'selection'
            })
        },
        //列表上方更多操作
        handleDropdown(name){
             if (name == "refresh") {
                this.getDataList();
            } else if (name == "export") {
                let excolumns = this.columns.filter(function (v) {
                    return v.title != "操作" && v.type != 'selection'
                });
                this.$refs.table.exportCsv({
                    filename: '本页数据',
                    columns: excolumns,
                    data: this.csvData
                });
            }
        },
        //搜索
        handleSearch(){
            this.searchForm.pageIndex=1;
            this.searchForm.pagesize=10;
            this.getDataList();
        },
        //重置
        handleReset(){
            this.searchForm.TASKNAME = '';
            this.searchForm.REGION = '';
            this.searchForm.NETWORKTYPE = '';
            this.searchForm.PIPELENGTH = '';
            this.searchForm.WORKUNIT = '';
            this.searchForm.INSPECTOR = '';
            this.searchForm.STORAGETIME = '';
            this.searchForm.starttime = "";
            this.searchForm.endtime = "";
            this.time = null;
            this.getDataList();
        },
        getWarehousRecordColumns(){
            return [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '任务名称',
                    align: 'center',
                    key: '_taskname',
                    sortable: false,
                    tooltip: true,
                },
                {
                    title: '所属区域',
                    align: 'center',
                    key: '_region',
                    sortable: false,
                    tooltip: true,
                },
                {
                    title: '管网类型',
                    align: 'center',
                    key: '_networktype',
                    sortable: false,
                    tooltip: true,
                },
                {
                    title: '管网长度',
                    align: 'center',
                    key: '_pipelength',
                    sortable: false,
                    tooltip: true,
                },
                {
                    title: '作业单位',
                    align: 'center',
                    key: '_workunit',
                    sortable: false,
                    tooltip: true,
                    ellipsis: true,
                },
                {
                    title: '处理人员',
                    align: 'center',
                    key: '_inspector',
                    sortable: false,
                    tooltip: true,
                    ellipsis: true,
                },
                {
                    title: '入库时间',
                    align: 'center',
                    key: '_storagetime',
                    sortable: false,
                    tooltip: true,
                    ellipsis: true,
                    render: (h, params) => {
                        let newTime = formartDate(params.row._storagetime, 'yyyy-MM-dd HH:mm:ss');
                        let datad = this.csvData.filter(item => item.id == params.row.id);
                        if(datad.length>0){
                            datad[0]._storagetime = '="' + newTime + '"';
                        }
                        return h('Tooltip', {
                            props: {
                                content: newTime,
                                placement: 'bottom',
                                transfer: true
                            }
                        }, newTime);
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    slot: 'action',
                    width: 200,
                }
            ];
        },
    },
    mounted(){
        this.getDataList();
        this.getTypePriority();
    }
}
</script>
