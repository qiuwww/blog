<style lang="less">
#tUrbancomponentsList{
  .ivu-select .ivu-select-dropdown {
    /*width: auto;*/
    width: 200px;
  }
}
</style>
<template>
	<div class="search" id="tUrbancomponentsList">
		<Card>
			<Row v-show="openSearch" @keydown.enter.native="handleSearch">
				<Form ref="searchForm" :model="searchForm" inline :label-width="70" @submit.native.prevent>
          <FormItem label="部件类型" prop="name">
            <TreeSelect v-model="searchForm.componentType" :data="pidPriority" v-width="200" clearable/>
          </FormItem>
          <FormItem label="部件状态" prop="departmentStatu">
            <Select  style="width: 200px" v-model="searchForm.departmentStatu" placeholder="请选择" clearable>
              <Option v-for="(item, i) in departmentStatuArray" :key="i" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属辖区" prop="jurisdiction" v-if="drop">
            <TreeSelect v-model="searchForm.jurisdiction" v-bind:disabled="disabled" v-width="200" :data="gridPriority"   @on-change="onGridChange" />
          </FormItem>
					<Form-item label="创建时间" v-if="drop">
					   <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
					placeholder="选择起始时间" style="width: 200px"></DatePicker>
					</Form-item>
					<Form-item style="margin-left:-35px" class="br">
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
				<Button @click="addTUrbancomponents" type="primary" icon="md-add">新增</Button>
				<Dropdown @on-click="handleDropdown">
					<Button>
						更多操作
						<Icon type="md-arrow-dropdown"/>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem name="refresh"><Icon type="md-sync" />刷新</DropdownItem>
						<DropdownItem name="removeAll"> <Icon type="md-trash"/>批量删除</DropdownItem>
						<DropdownItem name="export"> <Icon type="md-arrow-down" />导出本页数据</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
				<Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
				<div style="float: right;position: absolute;right: 10px;">
					<Poptip transfer trigger="click" placement="bottom-end" title="动态列">
						<Button icon="md-list"></Button>
						<div slot="content" style="position:relative;min-height:5vh">
							<Checkbox-group v-model="colOptions" @on-change="checkboxChange">
								<row v-for="(item,i) in colSelect">
									<checkbox  :label="item" :key="i"></checkbox>
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
				<Table :loading="loading" border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table">
					<template slot-scope="{ row, index }" slot="action">
						<Button type="primary" @click="handleLook(row, index)" size="small"><Icon type="ios-eye-outline"/>查看</Button>
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
				<Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator show-sizer transfer></Page>
			</Row>
		</Card>
		<updateTUrbancomponents v-model="updateShow" :TUrbancomponentsId="TUrbancomponentsId" :modalTitle="title" v-on:handleSearch="getDataList"></updateTUrbancomponents>
    <plot
      v-model="showMap"
      :obj-data="pointArr"
      :select-type="selectType"
      div-id="tUrbancomponentsList"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />
	</div>
</template>
<script>
  import {
    queryTComponentmanagementTreeByPage,
    queryTComponentmanagementTreeNotPage
  } from '@/api/zhsq/tComponentmanagement/tComponentmanagement'
	import {
	  deleteTUrbancomponents,
    queryTUrbancomponentsList,
    updateTUrbancomponents as updateRowTUrbancomponents,
	} from '@/api/zhsq/tUrbancomponents/tUrbancomponents'
	import { formartDate } from '@/api/tools/tool'
	import updateTUrbancomponents from './updateTUrbancomponents'
  import plot from '../../gismap/components/plot'
  import {
    loadGridDeptTreeByPage,
    loadGridDeptTreeNotPage
  } from '@/api/zhsq/system'
  import {getDept} from '@/api/system/dept'

  import { mapGetters } from 'vuex'
  import {getDictDataByType} from '@/api/index';

  import {transData } from '@/api/tools/tool'
  import {queryAllGridsTree} from '@/api/zhsq/basicGrids/basicGrids'

	export default {
		components: {
			updateTUrbancomponents,
      plot,
		},
		data() {
			return {
				drop: false,
				selectDate:null,
				dropDownContent: "展开",
				dropDownIcon: "ios-arrow-down",
				search: '',
				data: [],
				columns: this.getTUrbancomponentsColumns(),
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
					order: 'desc', // 默认排序方式
					componentType: '', // 部件类型
          jurisdiction: '', // 所属辖区
          departmentStatu: '', // 部件状态
				},
				total: 0,
				title: '',
				TUrbancomponentsId: '',
				updateShow: false,
				tableHeight: 200,
				colOptions: ["部件类型","部门名称","下级部门","部件状态","所属辖区","坐标位置","创建时间","操作"],
				colSelect: ["部件类型","部门名称","下级部门","部件状态","所属辖区","坐标位置","创建时间","操作"],
				csvData: [],
        editId: '',
        editPosition: '',
        selectType: 'Point',//标记点类型
        showMap: false,//地图显示
        pointArr: [],//点位坐标数据
        tUrbancomponentsForm: {
          id:'',
          position:'',
        },
        areaTypeArr: [],//所属辖区
        /*分页查询部件(树级)*/
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        queryName: '', // 名称 模糊查询
        startDate: null,//开始时间 模糊查询
        endDate: null,//结束时间 模糊查询
        areaTypeArr: [],//所属辖区
        pidPriority: [],
        deptArray: [],
        jurisdictionArray: [],//辖区数据集
        departmentStatuArray: [{"id":"0","value":"0","label":"损坏"},{"id":"1","value":"1","label":"完好"}],//部件状态
        gridValuePriority: [],
        gridPriority: [],
			}
		},
		 methods: {
       //获取上级部门
       getPidPriority() {
         let _this = this;
         // getDept('').then(res => {
         //   if (res.content) {
         //     this.pidPriority = this.getTreeData(res.content);
         //   }
         // });
         queryTComponentmanagementTreeNotPage({
           // pageNum: this.pageNum,
           // pageSize: this.pageSize,
           // name: this.queryName,
           // startDate: this.startDate,
           // endDate: this.endDate,
         }).then(res => {
           if(res && res.success) {
             if (res.data) {
               _this.pidPriority = _this.getTreeData(res.data);
             }
           }
         }).catch(err => {
           this.loading = false
         });
       },
       //生成部门
       getTreeData(data) {
         if (data) {

           for (let i in data) {
             var item = data[i];

             if(data[i].label == null || !data[i].label){
               data[i].title = data[i].name;
             }
             if(data[i].label != null && data[i].label){
               data[i].title = data[i].label;
             }
             data[i].value = data[i].id;
             data[i].expand = true;
             if (data[i].children) {
               data[i].children = this.getTreeData(data[i].children);
             }
           }
         }
         return data;
       },
       //查询部门
       getDept() {
         getDept('').then(res => {
           if (res.content) {
             this.deptArray = this.getTreeData(res.content);
           }
         });
       },
       //所属辖区
       getDictData() {
         /*loadGridDeptTreeNotPage({
           attribute: 1
         }).then(res => {
           if(res && res.success) {
             if (res.data) {
               this.areaTypeArr = this.getTreeData(res.data);
             }
           }
         }).catch(err => {
           this.loading = false
         });*/
         let _this = this;
         queryAllGridsTree({}).then(res => {
           if (res && res.success) {
             if (res.data) {
               _this.gridValuePriority = JSON.parse(JSON.stringify(res.data))
               _this.gridPriority = transData(res.data, 'id', 'pid', 'children');
               console.log('辖区/网格：')
               console.log(_this.gridPriority);
             }
           }
         }).catch(err => {
           this.loading = false
         });
       },
       //辖区选择
       onGridChange(e) {
         if (e) {
           this.searchForm.jurisdiction = e;
           let grid = this.gridValuePriority.filter(item => item.id == e)
           if (grid == null || grid == undefined || grid.length <= 0) {
             this.$Message.error('选择辖区失败，请联系管理员');
             return
           }
           let seleteLevel = grid[0].lel;
           //没有选择网格
           if (seleteLevel != 2 && seleteLevel != '2') {
             this.searchForm.jurisdiction = '';
             this.$Message.error('请选择网格！！！');
             return
           }
         }
       },
		  //获取坐标点
       getResultPoint(obj, type) {
         const arr = obj.flatCoordinates
         const position = JSON.stringify(arr)
         // 修改当前行
         this.tUrbancomponentsForm.id = this.editId;
         this.tUrbancomponentsForm.position = position;
         updateRowTUrbancomponents(this.tUrbancomponentsForm).then(res => {
           if (res && res.code == 200) {
             this.pointArr = []
             this.$Message.success('保存成功')
             this.getDataList()
           } else {
             this.$Message.error(res.msg)
           }
         })
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
			addTUrbancomponents() {
			this.title = '新增';
				this.updateShow = true
				this.TUrbancomponentsId='';
			},
			//编辑
			handleEdit(row, index) {
			this.title = '编辑';
				this.TUrbancomponentsId=row.id.toString();
				this.updateShow = true;
			},
			//查看
			handleLook(row, index) {
			this.title = '查看';
				this.TUrbancomponentsId=row.id.toString();
				this.updateShow = true;
			},
			//分页查询
			getDataList() {
				this.loading = true;
				this.selectCount = 0;
				this.searchForm.id = null;
				queryTUrbancomponentsList(this.searchForm).then(res => {
					if(res && res.success) {
						this.loading = false;
						this.data = res.data.records;
						this.total = res.data.total;
						this.csvData = JSON.parse(JSON.stringify(res.data.records));
					}
				}).catch(err => {
					this.loading = false
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
					deleteTUrbancomponents({ids:ids}).then(res => {
						this.userLoading = false;
						this.$Modal.remove();
						if(res && res.success) {
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
				this.searchForm.pageNumber = 1;
				this.searchForm.pageSize = 10;
				this.searchForm.startDate = null;
				this.searchForm.endDate = null;
				this.selectDate = null;
        this.searchForm.componentType = '';
        this.searchForm.jurisdiction = '';
        this.searchForm.departmentStatu = '';
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
      // 点击列表标注 修改坐标点
      editRow(row) {
       this.editId = row.id
       this.editPosition = row.position
       if (row.position) {
         try {
           this.pointArr = JSON.parse(row.position)
         } catch (e) {
         }
       } else {
         this.pointArr = []
       }
       this.showMap = true
      },
       getItem(dataValue,array){
         let item = '';
         for(let i = 0;i < array.length;i ++){
           if(array[i].value == dataValue){
             item = array[i].title;
             if(item){
               return item;
             }
           }else if(array[i].children) {
             item = this.getItem(dataValue,array[i].children);
             if(item){
               return item;
             }
           }
         }
         return item;
       },
			//获取列表字段
			getTUrbancomponentsColumns() {
				return [
					{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '部件类型',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'componentType',
						sortable: false,
            render: (h, params) => {
              let item = this.getItem(params.row.componentType,this.pidPriority);
              let _this = this;
              let dataD = _this.csvData.filter(item => item.id == params.row.id);
              dataD[0].componentType = item;
              return h('Tooltip', {
                props: {
                  content: item,
                  placement: 'bottom',
                  transfer: true
                }
              }, item);
            }
					},
					{
						title: '部门名称',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'departmentName',
						sortable: false,
            render: (h, params) => {
						  let _this = this;
              let item = this.getItem(params.row.departmentName,this.deptArray);
              let dataD = _this.csvData.filter(item => item.id == params.row.id);
              dataD[0].departmentName = item;
              return h('Tooltip', {
                props: {
                  content: item,
                  placement: 'bottom',
                  transfer: true
                }
              }, item);
            }
					},
					{
						title: '下级部门',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'lowerDepartment',
						sortable: false
					},
					{
						title: '部件状态',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'departmentStatu',
						sortable: false,
            render: (h, params) => {
						  let _this = this;
              let item = params.row.departmentStatu==0 ? '损坏' : '完好';
              let dataD = _this.csvData.filter(item => item.id == params.row.id);
              dataD[0].departmentStatu = item;

              return h('Tooltip', {
                props: {
                  content: item,
                  placement: 'bottom',
                  transfer: true
                }
              }, item);
            }
					},
					{
						title: '所属辖区',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'jurisdiction',
						sortable: false,
            render: (h, params) => {
              let _this = this;
              let item = this.getItem(params.row.jurisdiction,_this.gridPriority);
              let dataD = _this.csvData.filter(item => item.id == params.row.id);
              dataD[0].jurisdiction = item;
              return h('Tooltip', {
                props: {
                  content: item,
                  placement: 'bottom',
                  transfer: true
                }
              }, item);
            }
					},
					{
            title: '坐标位置',
            align: 'center',
            key: 'position',
            render: (h, params) => {
              let _this = this;
              let positions = params.row.position ? '已标注' : '未标注';
              let dataD = _this.csvData.filter(item => item.id == params.row.id);
              dataD[0].position = positions;
              if (params.row.position) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.editRow(params.row)
                      }
                    }
                  }, '已标注')
                ])
              } else {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },

                    on: {
                      click: () => {
                        this.editRow(params.row)
                      }
                    }
                  }, '未标注')
                ])
              }
            }
					},
					{
						title: '创建时间',
						key: 'createTime',
						sortable: true,
						align: 'center',
						ellipsis: true,
						tooltip: true,
						width: 180,
						render: (h, params) => {
              let _this = this;
							let newTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
							let dataD = _this.csvData.filter(item => item.id == params.row.id);
							if (dataD.length > 0) {
                dataD[0].createTime = '="' + newTime + '"';
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
						title:'操作',
						align: 'center',
						slot: 'action',
						width: 200,
					}
				]
			},
			//动态列实现
			checkboxChange:function (data) {
				var columnss =  this.getTUrbancomponentsColumns();
				this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
			}
		},
		mounted() {
			this.getDictData();
			this.getDept();
			this.getDataList();
      this.getPidPriority();
			//this.tableHeight = window.innerHeight - this.$refs.tUrbancomponentsTable.$el.offsetTop - 270
		}
	}
</script>
<style scoped="less">
	 .operation{
		margin-bottom: 10px;
	}
</style>
