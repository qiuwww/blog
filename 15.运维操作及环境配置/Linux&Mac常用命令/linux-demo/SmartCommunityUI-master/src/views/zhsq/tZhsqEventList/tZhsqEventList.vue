<style lang="less" scoped>
.tZhsqEventListList{
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
<template>
	<div class="search tZhsqEventListList" >
		<Card>
			<Row v-show="openSearch" @keydown.enter.native="handleSearch">
				<Form ref="searchForm" :model="searchForm" inline :label-width="70">
					<Form-item label="事件分类">
						<Select  v-model="searchForm.eventClassification" placeholder="请选择事件分类" clearable >
							<Option v-for="(item, i) in eventClassificationPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
						</Select>
					</Form-item>
					<Form-item label="事件标题">
						<Input type="text" v-model="searchForm.eventName" placeholder="请输入事件标题" clearable />
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
						<Select  v-model="searchForm.gridId" placeholder="请选择所属网格" clearable>
							<Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{item.name}}</Option>
						</Select>
					</Form-item>
					<Form-item label="完成时间" v-show="drop">
						<DatePicker type="datetimerange" style="width:190px;" :editable="false" placeholder="开始时间 - 结束时间" v-model="time" @on-change="selectTime" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
					</Form-item>
					<Form-item label="事件状态" v-show="drop">
						<Select  v-model="searchForm.eventStatus" placeholder="请选择事件状态" clearable >
							<Option v-for="(item, i) in eventStatusPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
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
				<Button @click="addTZhsqEventList" type="primary" icon="md-add">新增</Button>
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
						<Button v-if="permitIds.includes('archive_work_shijian_see')" type="primary" @click="handleLook(row, index)" size="small"><Icon type="ios-eye-outline"/>查看</Button>
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
		<updateTZhsqEventList v-model="updateShow" :TZhsqEventListId="TZhsqEventListId" :modalTitle="title" v-on:handleSearch="handleSearch"></updateTZhsqEventList>
		<lookTZhsqEventList v-model="lookShow" :TZhsqEventListId="TZhsqEventListId" :modalTitle="title" v-on:handleSearch="handleSearch"></lookTZhsqEventList>

		<plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getLocation" divId="tZhsqEventList"
		:objData="locationArr" iconPath="/img/archives/shijianzuobiao.png" :selectType="selectType" ></plot>
	</div>
</template>
<script>
	import {deleteTZhsqEventList, queryTZhsqEventListList,exportExcel} from '@/api/zhsq/tZhsqEventList/tZhsqEventList'
	import { formartDate } from '@/api/tools/tool'
	import updateTZhsqEventList from './updateTZhsqEventList'
	import lookTZhsqEventList from './lookTZhsqEventList'
	import {communityData,statusData,sortData} from '@/api/tools/zhsqSelectData';
	import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
	import plot from "@/views/gismap/components/plot";
	import {updateTZhsqEventList as updateTZhsqEventListData} from '@/api/zhsq/tZhsqEventList/tZhsqEventList'
	import {mapGetters} from "vuex";
	import {getStreetData,getCommunityData,getDictDataByType} from "@/api/index";

	export default {
		computed: {
          ...mapGetters(["permitIds"])
        },
		components: {
			updateTZhsqEventList,
			lookTZhsqEventList,
			plot
		},
		data() {
			return {
				drop: false,
				dropDownContent: "展开",
				dropDownIcon: "ios-arrow-down",
				search: '',
				data: [],
				csvData:[],
				columns: this.getTZhsqEventListColumns(),
				openSearch: true,//打开搜索
				openTip: true,//打开提示
				loading: true, // 表单加载状态
				selectCount: 0, // 多选计数
				selectList: [], // 多选数据
				searchForm: {
					// 搜索框对应data对象
					eventClassification:'',
					eventName:'',
					community:'',
					communityId:'',
					houseStreetId:'',
					houseStreet:'',
					grid:'',
					gridId:'',
					eventStatus:'',
					pageNumber: 1, // 当前页数
					pageSize: 10, // 页面大小
					startDate: null,//开始时间
					endDate: null,//结束时间
					sort: 'create_time', // 默认排序字段
					order: 'desc' // 默认排序方式
				},
				total: 0,
				title: '',
				TZhsqEventListId: '',
				updateShow: false,
				tableHeight: 200,
				colOptions: ["事件标题","事件分类","所属社区","所属网格","发起人","执行人","事件开始时间","事件结束时间","事件状态","地图标注","创建时间","操作"],
				colSelect: ["事件标题","事件分类","所属社区","所属网格","发起人","执行人","事件开始时间","事件结束时间","事件状态","地图标注","创建时间","操作"],
				eventClassificationPriority:[],
				communityPriority:[],
				streetData:[],
				gridPriority:[],
				eventStatusPriority:[],
				lookShow:false,
				time:null,
				locationArr:[],
				selectType:'Point',
				ShowMap:false,
				executorPriority:[],
			}
		},
		 methods: {
			clearCommunity(){//清除社区
				this.$refs.closeGrid.clearSingleSelect();
				this.searchForm.communityId = '';
				this.searchForm.community = '';
				this.searchForm.gridId = '';
				this.searchForm.grid = '';
                this.gridPriority = [];
			},
			clearStreet(){//清除街道
				this.$refs.closeCommunity.clearSingleSelect();
                this.$refs.closeGrid.clearSingleSelect();
				this.searchForm.houseStreetId = '';
				this.searchForm.houseStreet = '';
				this.searchForm.communityId = '';
				this.searchForm.community = '';
				this.searchForm.gridId = '';
				this.searchForm.grid = '';
                this.communityPriority = null;
                this.gridPriority = null;
			},
			getExecutorData(){//初始化执行人
				getDictDataByType('executor').then(res => {
					if(res && res.success){
						this.executorPriority = res.data;
					}
				})
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
			 getStatusData(){//初始化事件状态
				getDictDataByType('status').then(res => {
					if(res && res.success){
						this.eventStatusPriority = res.data;
					}
				})
			 },
			getSortData(){//初始化事件分类
				getDictDataByType('sort').then(res => {
					if(res && res.success){
						this.eventClassificationPriority = res.data;
					}
				})
			},
			selectCommunity(v){
				this.gridItem({"communityId":v.value});
				this.searchForm.gridId="";
			},
			//点击列表标注 修改坐标点
            editRow(row) {
				this.editId = row.id;
                if (row.position) {
                    try {
                        this.locationArr = JSON.parse(row.position);
                    } catch (e) {
                    }
                }else {
                  this.locationArr=null;
                }
                this.ShowMap = true;
            },
			getLocation(obj,type){
				let arr = obj.flatCoordinates;
                let location = JSON.stringify(arr);
				//修改当前行
                updateTZhsqEventListData({id: this.editId, position: location}).then(res => {
                    if (res && res.code == 200) {
                        this.$Message.success('保存成功');
                        this.getDataList();
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
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
			selectTime(v){
				this.searchForm.startDate = v[0];
				this.searchForm.endDate = v[1];
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
         const fileName = '事件列表档案.xlsx';
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
			addTZhsqEventList() {
				this.title = '事件列表新增';
				this.updateShow = true
				this.TZhsqEventListId='';
			},
			//编辑
			handleEdit(row, index) {
				this.title = '事件列表修改';
				this.TZhsqEventListId=row.id.toString();
				this.updateShow = true;
			},
			//查看
			handleLook(row, index) {
				this.title = '事件列表查看';
				this.TZhsqEventListId=row.id.toString();
				this.lookShow = true;
			},
			//分页查询
			getDataList() {
				this.loading = true;
				this.searchForm.id = null;
				queryTZhsqEventListList(this.searchForm).then(res => {
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
				deleteTZhsqEventList({ids:ids}).then(res => {
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
				this.searchForm.pageNumber = 1;
				this.searchForm.pageSize = 10;
				this.searchForm.startDate = null;
				this.searchForm.endDate = null;
				this.selectDate = null;
				this.searchForm.eventClassification='',
				this.searchForm.eventName='',
				this.searchForm.houseStreet = '',
				this.searchForm.houseStreetId = '',
				this.searchForm.community='',
				this.searchForm.communityId = '',
				this.searchForm.grid='',
				this.searchForm.gridId = '',
				this.searchForm.sponsor='',
				this.searchForm.eventStartingTime=null,
				this.searchForm.eventEndTime=null,
				this.searchForm.executor='',
				this.searchForm.eventStatus='',
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
			getTZhsqEventListColumns() {
				return [
					{
						type: 'selection',
						minWidth: 60,
						align: 'center',
					},
					{
						title: '事件标题',
						align: 'center',
						tooltip:true,
						key: 'eventName',
						minWidth:100,
						sortable: false
					},
					{
						title: '事件分类',
						align: 'center',
						tooltip:true,
						minWidth:100,
						key: 'eventClassification',
						sortable: false,
						render: (h, params) => {
							let classification = this.eventClassificationPriority.filter(item => item.id == params.row.eventClassification)
							let datad = this.csvData.filter(item => item.id == params.row.id);
							if(classification.length>0){
								datad[0].eventClassification = classification[0].label;
								return h('Tooltip',{
									props:{
										content:classification[0].label,
										placement:'bottom',
										transfer:true
									}
								},classification[0].label)
							}
						}
					},
					{
						title: '所属社区',
						align: 'center',
						tooltip:true,
						minWidth:100,
						key: 'community',
						sortable: false
					},
					{
						title: '所属网格',
						align: 'center',
						tooltip:true,
						minWidth:100,
						key: 'grid',
						sortable: false
					},
					{
						title: '发起人',
						align: 'center',
						tooltip:true,
						minWidth:100,
						key: 'sponsor',
						sortable: false
					},
					{
						title: '执行人',
						align: 'center',
						tooltip:true,
						minWidth:100,
						key: 'executor',
						sortable: false,
						render: (h, params) => {
							let arr = this.executorPriority.filter(item => item.id == params.row.executor);
							let datad = this.csvData.filter(item => item.id == params.row.id);
							if(arr.length>0){
								datad[0].executor = arr[0].label;
								return h('Tooltip',{
									props:{
										content:arr[0].label,
										placement:'bottom',
										transfer:true
									}
								},arr[0].label)
							}
						}
					},
					{
						title: '事件开始时间',
						key: 'eventStartingTime',
						tooltip:true,
						sortable: true,
						align: 'center',
						minWidth: 180,
						render: (h, params) => {
							let newTime = formartDate(params.row.eventStartingTime, 'yyyy-MM-dd HH:mm:ss');
							let datad = this.csvData.filter(item => item.id == params.row.id);
							datad[0].eventStartingTime = '="' + newTime + '"';
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
						title: '事件结束时间',
						key: 'eventEndTime',
						tooltip:true,
						sortable: true,
						align: 'center',
						minWidth: 180,
						render: (h, params) => {
							let newTime = formartDate(params.row.eventEndTime, 'yyyy-MM-dd HH:mm:ss');
							let datad = this.csvData.filter(item => item.id == params.row.id);
							datad[0].eventEndTime = '="' + newTime + '"';
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
						title: '事件状态',
						ellipsis:true,
						align: 'center',
						key: 'eventStatus',
						sortable: false,
						minWidth:100,
						render:(h,params) => {
							 let statu = this.eventStatusPriority.filter(item => item.id == params.row.eventStatus);
							 let datad = this.csvData.filter(item => item.id == params.row.id);
							/*if(params.row.eventStatus == 0){
								statu = '处理中';
							}else if (params.row.eventStatus == 1){
								statu = '已完成';
							} */
							if(statu.length>0){
							 	datad[0].eventStatus = statu[0].label;
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
						title: '地图标注',
						align: 'center',
						key: 'position',
						sortable: false,
						minWidth: 100,
						render:(h, params) => {
							let datad = this.csvData.filter(item => item.id == params.row.id);
							if (params.row.position) {
								datad[0].position = "已标注";
							  return h('div', [
							        h('Button', {
							          props: {
							                  type: 'success',
							                  size: 'small'
							          },
							          on: {
							                  click: () => {
							                       this.editRow(params.row)
							                   },
							                },
							      }, "已标注"),
							      ])

							  } else {
								  datad[0].position = "未标注"
							    return h('div', [
							       h('Button', {
							       props: {
							             type: 'error',
							             size: 'small'
							       },
							       on: {
							               click: () => {
							                    this.editRow(params.row)
							                },
							             },
							       }, '未标注')])
							  }
						}
					},
					{
                        title: '创建时间',
                        key: 'createTime',
                        sortable: true,
                        align: 'center',
                        minWidth: 180,
                        tooltip: true,
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
						minWidth: 200,
					}
				]
			},
			//动态列实现
			checkboxChange:function (data) {
			var columnss =  this.getTZhsqEventListColumns();
			this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
			}
		},
		mounted() {
			this.getDataList();
			this.getStreetData();
			this.getSortData();
			this.getStatusData();
			this.getExecutorData();
			//this.tableHeight = window.innerHeight - this.$refs.tZhsqEventListTable.$el.offsetTop - 270
		}
	}
</script>
<style scoped="less">
	 .operation{
		margin-bottom: 10px;
	}
</style>
