<style lang="less" scoped>
    .inspectionRecordList{
        .ivu-select {
            width: 200px;
        }
        .ivu-input-wrapper {
            width: 200px !important;
        }
    }
</style>
<template>
    <div class="search inspectionRecordList">
        <Card>
            <Row v-show="openSearch" @keydown.enter.native="handleSearch">
                <Form ref="searchForm" :model="searchForm" inline :label-width="70">
                    <Form-item label="任务名称">
                        <Input type="text" :maxlength=50 v-model="searchForm.Taskname" placeholder="请输入任务名称"/>
                    </Form-item>
                    <Form-item label="所属区域">
                        <Select placeholder="请选择所属区域" v-model="searchForm.Region" clearable>
                            <Option v-for="(item, i)  in deptProperty" :key="item.id" :value="item.label">{{item.label}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="管网类型">
                        <Select placeholder="请输入管网类型" v-model="searchForm.Networktype" clearable>
                            <Option v-for="(item, i)  in pipeProperty" :key="item.id" :value="item.label">{{item.label}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="质检结果" v-if="drop">
                        <Select placeholder="请选择质检结果" v-model="searchForm.Qualityresults" clearable>
                            <Option v-for="(item, i)  in qualityProperty" :key="item.id" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="是否入库" v-if="drop">
                        <Select placeholder="请选择是否入库" v-model="searchForm.Isinstorage" clearable>
                            <Option v-for="(item, i)  in instorageProperty" :key="item.id" :value="item.value">{{item.label}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="作业单位" v-if="drop">
                        <Input type="text" :maxlength=50 v-model="searchForm.Workunit" placeholder="请输入作业单位"/>
                    </Form-item>
                    <Form-item label="检测人员" v-if="drop">
                        <Input type="text" :maxlength=50 v-model="searchForm.Inspector" placeholder="请输入检测人员"/>
                    </Form-item>
                    <Form-item label="质检时间" v-if="drop">
                        <DatePicker type="datetimerange" ref="dateTime" clearable format="yyyy-MM-dd HH:mm:ss" v-model="time"
                            placeholder="请选择质检时间" style="width:200px;" @on-change="selectTime"></DatePicker>
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
                <Button @click="lookMap">查看地图</Button>
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
                            查看质检报告
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

        <!--地图-->
        <look-map v-model="showMap" :modalTitle="title"></look-map>
    </div>
</template>
<script>
import {getByPage,lookInspection} from '@/api/zhgw/inspectionRecord/inspectionRecord';
import { formartDate } from '@/api/tools/tool';
import { getDictDataByType } from '@/api/index';
import lookMap from './lookMap';
export default {
  components: {lookMap},
  data() {
        return {
            openSearch:true,
            searchForm:{
                ID:'',
                Taskname:'',
                Region:'',
                Networktype:'',
                Pipelength:'',
                Qualityresults:'',
                Isinstorage:'',
                Workunit:'',
                Inspector:'',
                QualityTime:'',
                // 搜索框对应data对象
                pageIndex: 1, // 当前页数
                pagesize: 10, // 页面大小
                starttime:"",
                endtime:""
            },
            openTip:true,
            colOptions:["任务名称","所属区域","管网类型","管网长度","质检结果","是否入库","作业单位","检测人员","质检时间","操作"],
            colSelect:["任务名称","所属区域","管网类型","管网长度","质检结果","是否入库","作业单位","检测人员","质检时间","操作"],
            columns: this.getInspectionRecordColumns(),
            selectCount:0,
            loading:false,
            data:[],
            csvData:[],
            total:0,
            deptProperty:[],
            pipeProperty:[],
            qualityProperty:[],
            instorageProperty:[],
            dropDownContent:"展开",
            dropDownIcon:"ios-arrow-down",
            drop:false,
            time:null,
            showMap:false,
            title:'',
        }
    },
    methods:{
        //查看地图
        lookMap(){
            this.showMap = true;
            this.title = "查看地图";
        },
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
            getDictDataByType("quality_result").then(res => {//质检结果
                if(res && res.success){
                    this.qualityProperty = res.data;
                }
            });
            getDictDataByType("is_instorage").then(res => {//是否入库
                if(res && res.success){
                    this.instorageProperty = res.data;
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
        changePage(){
            this.searchForm.pageIndex = v;
            this.getDataList();
            this.clearSelectAll();
        },
        //查看
        handleLook(row, index){
            window.location.href = lookInspection(row._qualitypath);
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
            var columnss = this.getInspectionRecordColumns();
            this.columns = columnss.filter(function (v) {
                return data.indexOf(v.title) > -1 || v.type == 'selection'
            })
        },
        //列表上方更多操作
        handleDropdown(name){
            if (name == "refresh") {
                this.getDataList();
            }else if (name == "export") {
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
            this.searchForm.pageIndex = 1; // 当前页数
            this.searchForm.pagesize = 10; // 页面大小
            this.getDataList();
        },
        //重置
        handleReset(){
            this.searchForm.ID='';
            this.searchForm.Taskname='';
            this.searchForm.Region='';
            this.searchForm.Networktype='';
            this.searchForm.Pipelength='';
            this.searchForm.Qualityresults='';
            this.searchForm.Isinstorage='';
            this.searchForm.Workunit='';
            this.searchForm.Inspector='';
            this.searchForm.QualityTime='';
            this.searchForm.starttime = "";
            this.searchForm.endtime = "";
            this.time = null;
            this.searchForm.pageIndex = 1; // 当前页数
            this.searchForm.pagesize = 10; // 页面大小
            this.getDataList();
        },
        getInspectionRecordColumns(){
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
                    title: '质检结果',
                    align: 'center',
                    key: '_qualityresults',
                    sortable: false,
                    ellipsis: true,
                    tooltip: true,
                    render: (h, params) => {
                        let str = '';
                        if(params.row._qualityresults=="0"){
                            str = "没通过";
                        }else if(params.row._qualityresults=="1"){
                            str = "通过";
                        }
                        let datad = this.csvData.filter(item => item.id == params.row.id);
                        if(datad.length>0){
                            datad[0]._qualityresults = str;
                        }
                        return h('Tooltip', {
                            props: {
                                content: str,
                                placement: 'bottom',
                                transfer: true
                            }
                        }, str);
                    }
                },
                {
                    title: '是否入库',
                    align: 'center',
                    key: '_isinstorage',
                    sortable: false,
                    tooltip: true,
                    render: (h, params) => {
                        let str = '';
                        if(params.row._isinstorage=="0"){
                            str = "未入库";
                        }else if(params.row._isinstorage=="1"){
                            str = "已入库";
                        }
                        let datad = this.csvData.filter(item => item.id == params.row.id);
                        if(datad.length>0){
                            datad[0]._isinstorage = str;
                        }
                        return h('Tooltip', {
                            props: {
                                content: str,
                                placement: 'bottom',
                                transfer: true
                            }
                        }, str);
                    }
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
                    title: '检测人员',
                    align: 'center',
                    key: '_inspector',
                    sortable: false,
                    tooltip: true,
                    ellipsis: true,
                },
                {
                    title: '质检时间',
                    align: 'center',
                    key: '_qualitytime',
                    sortable: false,
                    tooltip: true,
                    ellipsis: true,
                    render: (h, params) => {
                        let newTime = formartDate(params.row._qualitytime, 'yyyy-MM-dd HH:mm:ss');
                        let datad = this.csvData.filter(item => item.id == params.row.id);
                        if(datad.length>0){
                            datad[0]._qualitytime = '="' + newTime + '"';
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
        }
    },
    mounted() {
        this.getDataList();
        this.getTypePriority();
    }
}
</script>
