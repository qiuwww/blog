<style lang="less">
.tEmergencyhedgingList{
}
</style>
<template>
	<div class="search" tEmergencyhedgingList>
		<Card>
			<Row v-show="openSearch" @keydown.enter.native="handleSearch">
				<Form ref="searchForm" :model="searchForm" inline :label-width="70" @submit.native.prevent>
          <FormItem label="名称" prop="name">
            <Input  type="text" style="width: 200px" v-model="searchForm.name" placeholder="请输入名称" clearable/>
          </FormItem>
          <FormItem label="负责人" prop="responsiblePerson">
            <Input  type="text" style="width: 200px" v-model="searchForm.responsiblePerson" placeholder="请输入负责人" clearable/>
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
				<Button @click="addTEmergencyhedging" type="primary" icon="md-add">新增</Button>
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
		<updateTEmergencyhedging v-model="updateShow" :TEmergencyhedgingId="TEmergencyhedgingId" :modalTitle="title" v-on:handleSearch="getDataList"></updateTEmergencyhedging>
    <plot
      v-model="showMap"
      :obj-data="pointArr"
      :select-type="selectType"
      div-id="tEmergencyhedgingList"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />
	</div>
</template>
<script>
	import {
	  deleteTEmergencyhedging,
    queryTEmergencyhedgingList,
    updateTEmergencyhedging as updateTEmergencyhedgingShow,
    updateTEmergencyhedging as updateRowTEmergencyhedging,
	} from '@/api/zhsq/tEmergencyhedging/tEmergencyhedging'
	import { formartDate } from '@/api/tools/tool'
	import updateTEmergencyhedging from './updateTEmergencyhedging'
  import plot from '../../gismap/components/plot'
	export default {
		components: {
			updateTEmergencyhedging,
      plot
		},
		data() {
			return {
        selectType: 'Polygon',//标记点类型
        showMap: false,//地图显示
        pointArr: [],//点位坐标数据
        editId: '',
        editPosition: '',
				drop: false,
				selectDate:null,
				dropDownContent: "展开",
				dropDownIcon: "ios-arrow-down",
				search: '',
				data: [],
				columns: this.getTEmergencyhedgingColumns(),
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
          name: '',//名称
          responsiblePerson: '',//负责人
				},
				total: 0,
				title: '',
				TEmergencyhedgingId: '',
				updateShow: false,
				tableHeight: 200,
				colOptions: ["名称","负责人","显示状态","坐标位置","位置名称","面积","创建时间","操作"],
				colSelect: ["名称","负责人","显示状态","坐标位置","位置名称","面积","创建时间","操作"],
				csvData: [],
        tEmergencyhedgingForm: null,
        tEmergencyhedgingPositionForm: {
          id:'',
          position:'',
        },
			}
		},
		 methods: {
       //获取坐标点
       getResultPoint(obj, type) {
         const arr = obj.flatCoordinates
         const position = JSON.stringify(arr)
         // 修改当前行
         this.tEmergencyhedgingPositionForm.id = this.editId;
         this.tEmergencyhedgingPositionForm.position = position;
         updateRowTEmergencyhedging(this.tEmergencyhedgingPositionForm).then(res => {
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
			addTEmergencyhedging() {
			this.title = '新增';
				this.updateShow = true
				this.TEmergencyhedgingId='';
			},
			//编辑
			handleEdit(row, index) {
			this.title = '编辑';
				this.TEmergencyhedgingId=row.id.toString();
				this.updateShow = true;
			},
			//查看
			handleLook(row, index) {
			this.title = '查看';
				this.TEmergencyhedgingId=row.id.toString();
				this.updateShow = true;
			},
			//分页查询
			getDataList() {
				this.loading = true;
				this.selectCount = 0;
				this.searchForm.id = null;
				queryTEmergencyhedgingList(this.searchForm).then(res => {
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
					deleteTEmergencyhedging({ids:ids}).then(res => {
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
				this.searchForm.name = '';
				this.searchForm.responsiblePerson = '';
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
       //显示状态
       displayState(row) {
         let str = '';
         if (row.isLabel == 0) {
           str = '显示';
           row.isLabel = 1;
         } else if (row.isLabel == 1) {
           str = '隐藏';
           row.isLabel = 0
         }
         this.tEmergencyhedgingForm = row;
         this.$Modal.confirm({
           title: "确认要" + str,
           content: "您是否要" + str + "?",
           loading: true,
           onOk: () => {
             updateTEmergencyhedgingShow(this.tEmergencyhedgingForm).then(res => {
               this.$Modal.remove();
               if (res && res.code == 200) {
                 this.$Message.success('修改成功');
               } else {
                 this.$Message.error(res.msg);
               }
             }).catch(err => {
               this.$Message.error('修改失败!');
             });
           },
           onCancel: () => {
             if (row.isLabel == 0) {
               row.isLabel = 1;
             } else if (row.isLabel == 1) {
               row.isLabel = 0;
             }
             this.$Message.info('取消了当前的操作行为！');
           },
         });
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
			//获取列表字段
			getTEmergencyhedgingColumns() {
				return [
					{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '名称',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'name',
						sortable: false
					},
          {
            title: '负责人',
            align: 'center',
            ellipsis: true,
            tooltip: true,
            key: 'responsiblePerson',
            sortable: false
          },
          {
            title: '显示状态',
            align: 'center',
            ellipsis: true,
            tooltip: true,
            key: 'isLabel',
            sortable: false,
            render: (h, params) => {
              let isLabel = params.row.isLabel==0 ? '隐藏' : '显示';
              let dataD = this.csvData.filter(item => item.id == params.row.id);
              dataD[0].isLabel = isLabel;
              return h('div', [
                h('i-switch', { //数据库1是已处理，0是未处理
                  props: {
                    type: 'primary',
                    value: params.row.isLabel,  //控制开关的打开或关闭状态，官网文档属性是value
                    trueValue: '1',
                    falseValue: '0'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.displayState(params.row); //params.index是拿到table的行序列，可以取到对应的表格值
                    }
                  }
                },)
              ]);
            }
          },
					{
						title: '坐标位置',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'position',
						sortable: false,
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
						title: '位置名称',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'placeName',
						sortable: false
					},
					{
						title: '面积',
						align: 'center',
						ellipsis: true,
						tooltip: true,
						key: 'measureArea',
						sortable: false,
            render: (h, params) => {
              let item;
              if (params.row.measureArea && params.row.measureArea!=undefined && params.row.measureArea!=null) {
                item = params.row.measureArea + "㎡";
              }
              let _this = this;
              let dataD = _this.csvData.filter(item => item.id == params.row.id);
              dataD[0].measureArea = item;

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
            title: '创建时间',
            key: 'createTime',
            sortable: true,
            align: 'center',
            ellipsis: true,
            tooltip: true,
            width: 180,
            render: (h, params) => {
              let newTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
              let datad = this.csvData.filter(item => item.id == params.row.id);
              if (datad.length > 0) {
                datad[0].createTime = '="' + newTime + '"';
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
				var columnss =  this.getTEmergencyhedgingColumns();
				this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
			}
		},
		mounted() {
			this.getDataList();
			//this.tableHeight = window.innerHeight - this.$refs.tEmergencyhedgingTable.$el.offsetTop - 270
		}
	}
</script>
<style scoped="less">
	 .operation{
		margin-bottom: 10px;
	}
</style>
