<style lang="less" scoped>
.tZhsqTaskList{
	.ivu-form .ivu-form-item-label {
		text-align: left;
		padding: 0px 0px 0px 0;
	}
	.ivu-form-item-content>.ivu-btn{
		margin-right: 10px !important;
	}
	.ivu-select{
		width: 190px !important;
	}
	.ivu-input-wrapper{
		width: 190px !important;
	}
}

</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
	<div class="search tZhsqTaskList">
		<Card>
			<Row v-show="openSearch" @keydown.enter.native="handleSearch">
				<Form ref="searchForm" :model="searchForm" inline :label-width="70">
					<Form-item label="任务分类">
						<Select  v-model="searchForm.taskSort" placeholder="请选择任务分类" clearable >
							<Option v-for="(item, i) in taskSortPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
						</Select>
					</Form-item>
					<Form-item label="任务名称">
						<Input v-model="searchForm.taskName" placeholder="请输入任务名称" />
					</Form-item>
					<Form-item label="所属街道" >
						<Select v-model="searchForm.houseStreetId" placeholder="请选择所属街道" clearable @on-select="streetChange"
								:label-in-value="true" @on-clear="clearStreet">
						<Option v-for="(item, i) in streetData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
						</Select>
					</Form-item>
					<Form-item label="所属社区" v-show="drop">
						<Select  v-model="searchForm.communityId" placeholder="请选择所属社区" clearable @on-change="selectCommunity"
								:label-in-value="true" ref="closeCommunity" @on-clear="clearCommunity">
							<Option v-for="(item, i) in communityPriority" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
						</Select>
					</Form-item>
					<Form-item label="所属网格" v-show="drop">
						<Select  v-model="searchForm.gridId" placeholder="请选择所属网格" clearable ref="closeGrid">
							<Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{item.name}}</Option>
						</Select>
					</Form-item>
					<Form-item label="执行人" v-show="drop">
						<Select  v-model="searchForm.executor" placeholder="请输入执行人" clearable>
							<Option v-for="(item, i) in executorPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
						</Select>
					</Form-item>
					<Form-item label="完成时间" v-show="drop">
						<DatePicker type="datetimerange" style="width:190px;" :editable="false" v-model="time" placeholder="开始时间 - 结束时间" @on-change="selectTime" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
					</Form-item>
					<Form-item label="任务状态" v-show="drop">
						<Select  v-model="searchForm.taskStatus" placeholder="请选择任务状态" clearable >
							<Option v-for="(item, i) in taskStatusPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
						</Select>
					</Form-item>
					<Form-item style="margin-left:-70px" class="br">
						<Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
						<Button @click="handleReset">重置</Button>
						<a class="drop-down" @click="dropDown">
							{{dropDownContent}}
							<Icon :type="dropDownIcon"></Icon>
						</a>
					</Form-item>
				</Form>
			</Row>
			<Row class="operation">
				<Button @click="addTZhsqTaskList" type="primary" icon="md-add">新增</Button>
				<Dropdown @on-click="handleDropdown">
					<Button>
						更多操作
						<Icon type="md-arrow-dropdown"/>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem name="refresh"><Icon type="md-sync" />刷新</DropdownItem>
						<DropdownItem name="removeAll"> <Icon type="md-trash"/>批量删除</DropdownItem>
						<DropdownItem name="export"> <Icon type="md-arrow-down" />导出本页数据</DropdownItem>
            			<DropdownItem name="excelExport"> <Icon type="md-arrow-down" />根据查询条件导出</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
				<Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
				<div style="float: right;position: absolute;right: 10px;">
					<Poptip transfer trigger="click" placement="bottom-end" title="动态列">
						<Button icon="md-list"></Button>
						<div slot="content" style="position:relative;min-height:5vh">
							<Checkbox-group v-model="colOptions" @on-change="checkboxChange">
								<checkbox v-for="(item,i) in colSelect" :label="item" :key="item" ></checkbox>
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
				<Table :loading="loading" border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table">
					<template slot-scope="{ row, index }" slot="action">
						<Button type="primary" v-if="permitIds.includes('archive_work__see')" @click="handleLook(row, index)" size="small"><Icon type="ios-eye-outline"/>查看</Button>
						<Dropdown :transfer=true>
							<Button size="small">
								更多操作
								<Icon  type="md-arrow-dropdown"/>
							</Button>
							<DropdownMenu slot="list">
								<DropdownItem name="edit" @click.native="handleEdit(row, index)"><Icon type="ios-create-outline" />修改</DropdownItem>
								<DropdownItem name="delete" @click.native="deleteData(row, index)"><Icon type="md-trash"></Icon>删除</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</template>
				</Table>
			</Row>
			<Row type="flex" justify="end" class="page">
				<Page :transfer=true :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
			</Row>
		</Card>
		<updateTZhsqTaskList v-model="updateShow" :TZhsqTaskListId="TZhsqTaskListId" :modalTitle="title" v-on:handleSearch="handleSearch"></updateTZhsqTaskList>
		<looktZhsqTaskList v-model="lookShow" :TZhsqTaskListId="TZhsqTaskListId" :modalTitle="title"></looktZhsqTaskList>
	</div>

</template>
<script>
	import {deleteTZhsqTaskList, queryTZhsqTaskListList,exportExcel} from '@/api/zhsq/tZhsqTaskList/tZhsqTaskList'
	import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
	import { formartDate } from '@/api/tools/tool'
	import updateTZhsqTaskList from './updateTZhsqTaskList'
	import looktZhsqTaskList from './lookTZhsqTaskList'
	import {communityData,sortData,statusData,executorData} from '@/api/tools/zhsqSelectData';
	import {mapGetters} from "vuex";
	import {getStreetData,getCommunityData,getDictDataByType} from "@/api/index";

	export default {
		name:'tZhsqTaskList',
		computed: {
          ...mapGetters(["permitIds"])
        },
		components: {
			updateTZhsqTaskList,
			looktZhsqTaskList
		},
		data() {
			return {
				drop: false,
				dropDownContent: "展开",
				dropDownIcon: "ios-arrow-down",
				search: '',
				data: [],
				csvData:[],
				columns: this.getTZhsqTaskListColumns(),
				openSearch: true,//打开搜索
				openTip: true,//打开提示
				loading: true, // 表单加载状态
				selectCount: 0, // 多选计数
				selectList: [], // 多选数据
				searchForm: {
					taskSort:'',
					taskName:'',
					community:'',
					communityId:'',
					houseStreetId:'',
					houseStreet:'',
					grid:'',
					gridId:'',
					taskEndTime:null,
					executor:'',
					taskStatus:'',
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
				TZhsqTaskListId: '',
				updateShow: false,
				tableHeight: 200,
				colOptions: ["任务名称","任务分类","所属社区","所属网格","发起人","执行人","任务开始时间","任务结束时间","任务状态","创建时间","操作"],
				colSelect: ["任务名称","任务分类","所属社区","所属网格","发起人","执行人","任务开始时间","任务结束时间","任务状态","创建时间","操作"],
				taskSortPriority:[],
				communityPriority:[],
				gridPriority:[],
				taskStatusPriority:[],
				lookShow:false,
				executorPriority:[],
				time:null,
				streetData:[],
			}
		},
		 methods: {
			clearCommunity(){//清除社区
				this.$refs.closeGrid.clearSingleSelect();
                this.searchForm.communityId = '';
                this.searchForm.gridId = '';
                this.gridPriority = [];
			},
			clearStreet(){//清除街道
				this.$refs.closeCommunity.clearSingleSelect();
                this.$refs.closeGrid.clearSingleSelect();
                this.searchForm.houseStreetId = '';
                this.searchForm.communityId = '';
                this.searchForm.gridId = '';
                this.communityPriority = null;
                this.gridPriority = null;
			},
			getStreetData() {//获取街道
                getStreetData().then(res => {
                    this.streetData = res.data;
                })
            },
			streetChange(e) {//街道选择
				if (e) {
					this.searchForm.houseStreetId = e.value;
					getCommunityData({streetId: e.value}).then(res => {
						if (res && res.success) {
							this.communityPriority = res.data;
						}
					});
				} else {
					this.communityPriority = null;
					this.searchForm.houseStreetId = '';
				}
            },
			getStatusData(){//初始化任务状态
				getDictDataByType('status').then(res => {
					if(res && res.success){
						this.taskStatusPriority = res.data;
					}
				})
			},
			getExecutorData(){//初始化执行人
				getDictDataByType('executor').then(res => {
					if(res && res.success){
						this.executorPriority = res.data;
					}
				})
			},
			getSortData(){//初始化任务分类
				getDictDataByType('sort').then(res => {
					if(res && res.success){
						this.taskSortPriority = res.data;
					}
				})
			},
			selectCommunity(v){//选择所属社区
				this.gridItem({"communityId":v.value});
				this.searchForm.gridId="";
			},
			//选择网格
			gridItem(data){
				if(data.communityId){
					queryAllList(data).then(res => {
						if(res && res.success){
							this.gridPriority = res.data;
						}else {
							this.$Message.error('获取网格数据失败，请重新刷新');
						}
					})
				}else{
					this.gridPriority = [];
				}
			},
			//选择时间
			selectTime(v){
				this.searchForm.startDate = v[0];
				this.searchForm.endDate = v[1];
			},
			//查看
			handleLook(row, index){
				this.title = '任务列表查看';
				this.TZhsqTaskListId=row.id.toString();
				this.lookShow = true;
			},
			 //列表上方更多操作
			handleDropdown(name) {
				if (name == "refresh") {
					this.getDataList();
				} else if (name == "removeAll") {
					this.delAll();
				}else if (name == "export") {
					let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
					this.$refs.table.exportCsv({
						filename: '本页数据',
						columns: excolumns,
						data:this.csvData
					});
				}else if(name == "excelExport"){
         this.excelData();
        }
			 },
       //导出查询数据
       excelData() {
        var _this = this;
       exportExcel(_this.searchForm).then(res => {
         const content = res;
         const blob = new Blob([content], { type: 'application/ms-excel' });
         const fileName = '任务列表档案.xlsx';
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
       }).catch(function(error) {
         _this.$Message.error('数据导出失败');
         _this.isExportShow = false;
       });
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
			addTZhsqTaskList() {
				this.title = '任务列表新增';
				this.updateShow = true
				this.TZhsqTaskListId='';
			},
			//编辑
			handleEdit(row, index) {
				this.title = '任务列表修改';
				this.TZhsqTaskListId=row.id.toString();
				this.updateShow = true;
			},
			//分页查询
			getDataList() {
				this.loading = true;
				this.searchForm.id = null;

				queryTZhsqTaskListList(this.searchForm).then(res => {
					if(res && res.success) {
						this.loading = false;
						this.data = res.data.records;
						this.csvData = JSON.parse(JSON.stringify(res.data.records));
						this.total = res.data.total;
					}
				});
			},
			//单一删除
			deleteData(row, index){
				this.$Modal.confirm({
					title:"确认删除",
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
				if(this.selectCount <= 0) {
					this.$Message.warning('您还未选择要删除的数据');
					return;
				}
				this.$Modal.confirm({
					title: '确认删除',
					content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
					loading: true,
					onOk: () => {
						let ids =[];
						this.selectList.forEach(function(e) {
							ids.push(e.id );
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
				if(ids == undefined || ids == null || ids.length == 0) {
					this.$Message.error('没有选择的数据');
					return;
				}
				deleteTZhsqTaskList({ids:ids}).then(res => {
					this.userLoading = false;
					this.$Modal.remove();
					if(res && res.success) {
						this.modalTaskVisible = false;
						this.$Message.success('删除成功');
						this.getDataList();
					} else {
						this.$Message.error('删除失败');
					}
				}).catch(error => {
					this.userLoading = false;
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
				if(e.order == 'normal') {
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
				this.time = null;
				this.searchForm.taskSort = '',
				this.searchForm.taskName = '',
				this.searchForm.houseStreetId = '',
				this.searchForm.houseStreet = '',
				this.searchForm.community = '',
				this.searchForm.communityId = '',
				this.searchForm.grid = '',
				this.searchForm.gridId = '',
				this.searchForm.taskEndTime = null,
				this.searchForm.executor = '',
				this.searchForm.taskStatus = '',
				this.searchForm.pageNumber = 1;
				this.searchForm.pageSize = 10;
				this.searchForm.startDate = null;
				this.searchForm.endDate = null;
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
			getTZhsqTaskListColumns() {
				return [
					{
						type: 'selection',
						minWidth: 60,
						align: 'center',
					},
					{
						title: '任务名称',
						align: 'center',
						ellipsis:true,
						key: 'taskName',
						minWidth:100,
						tooltip:true,
						sortable: false
					},
					{
						title: '任务分类',
						align: 'center',
						ellipsis:true,
						key: 'taskSort',
						minWidth:100,
						tooltip:true,
						sortable: false,
						render: (h, params) => {
							let sort = this.taskSortPriority.filter(item => item.id == params.row.taskSort);
							let datad = this.csvData.filter(item => item.id == params.row.id);
							if(sort.length>0){
								datad[0].taskSort = sort[0].label
								return h('Tooltip',{
									props:{
										content:sort[0].label,
										placement:'bottom',
										transfer:true
									}
								},sort[0].label)
							}
						}
					},
					{
						title: '所属社区',
						align: 'center',
						ellipsis:true,
						key: 'community',
						minWidth:100,
						tooltip:true,
						sortable: false
					},
					{
						title: '所属网格',
						align: 'center',
						ellipsis:true,
						key: 'grid',
						minWidth:100,
						tooltip:true,
						sortable: false
					},
					{
						title: '发起人',
						align: 'center',
						ellipsis:true,
						key: 'sponsor',
						minWidth:100,
						tooltip:true,
						sortable: false
					},
					{
						title: '执行人',
						align: 'center',
						ellipsis:true,
						key: 'executor',
						minWidth:100,
						tooltip:true,
						sortable: false,
						render: (h, params) => {
							let executors = this.executorPriority.filter(item => item.id == params.row.executor)
							let datad = this.csvData.filter(item => item.id == params.row.id);
							if(executors.length>0){
								datad[0].executor = executors[0].label;
								return h('Tooltip',{
									props:{
										content:executors[0].label,
										placement:'bottom',
										transfer:true
									}
								},executors[0].label)
							}
						}
					},
					{
						title: '任务开始时间',
						key: 'taskStartingTime',
						tooltip:true,
						sortable: true,
						align: 'center',
						minWidth: 180,
						render: (h, params) => {
							let newTime = formartDate(params.row.taskStartingTime, 'yyyy-MM-dd HH:mm:ss');
							let datad = this.csvData.filter(item => item.id == params.row.id);
							datad[0].taskStartingTime = '="' + newTime + '"';
							return h('Tooltip',{
								props:{
									content:newTime,
									placement:'bottom',
									transfer:true
								}
							},newTime)
						}
					},
					{
						title: '任务结束时间',
						key: 'taskEndTime',
						tooltip:true,
						sortable: true,
						align: 'center',
						minWidth: 180,
						render: (h, params) => {
							let newTime = formartDate(params.row.taskEndTime, 'yyyy-MM-dd HH:mm:ss');
							let datad = this.csvData.filter(item => item.id == params.row.id);
							datad[0].taskEndTime = '="' + newTime + '"'
							return h('Tooltip',{
								props:{
									content:newTime,
									placement:'bottom',
									transfer:true
								}
							},newTime)
						}
					},
					{
						title: '任务状态',
						align: 'center',
						tooltip:true,
						key: 'taskStatus',
						minWidth:100,
						sortable: false,
						render:(h, params) => {
							let statu = this.taskStatusPriority.filter(item => item.id == params.row.taskStatus);
							let datad = this.csvData.filter(item => item.id == params.row.id);
							if(statu.length>0){
								datad[0].taskStatus = statu[0].label;
								return h('Tooltip',{
									props:{
										content:statu[0].label,
										placement:'bottom',
										transfer:true
									}
								},statu[0].label);
							}
						}
					},
					{
						title: '创建时间',
						key: 'createTime',
						tooltip:true,
						sortable: true,
						align: 'center',
						minWidth: 180,
						render: (h, params) => {
							let newTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
							let datad = this.csvData.filter(item => item.id == params.row.id);
							datad[0].createTime = '="' + newTime + '"';
							return h('Tooltip',{
								props:{
									content:newTime,
									placement:'bottom',
									transfer:true
								}
							},newTime)
						}
					},
					{
						title:'操作',
						align: 'center',
						slot: 'action',
						width: 200,
					}
				]
			},
			//动态列实现
			checkboxChange:function (data) {
			var columnss =  this.getTZhsqTaskListColumns();
			this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
			}
		},
		mounted() {
			this.getDataList();
			this.getStreetData();
			this.getSortData();
			this.getExecutorData();
			this.getStatusData();
		}
	}
</script>
<style scoped="less">
	 .operation{
		margin-bottom: 10px;
	}
</style>
