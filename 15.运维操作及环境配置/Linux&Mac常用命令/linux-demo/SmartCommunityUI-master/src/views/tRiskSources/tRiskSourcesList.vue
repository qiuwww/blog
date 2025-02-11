<template>
	<div class="search">
		<Card>
			<Row v-show="openSearch" @keydown.enter.native="handleSearch">
				<Form ref="searchForm" :model="searchForm" inline :label-width="70">
					<Form-item label="规则名称">
						<Input type="text" v-model="searchForm.zclx" placeholder="请输入" clearable style="width: 200px" />
					</Form-item>
					<Form-item style="margin-left:-35px" class="br">
						<Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
						<Button @click="handleReset">重置</Button>
					</Form-item>
				</Form>
			</Row>
			<Row class="operation">
				<Button @click="addTRiskSources" type="primary" icon="md-add">新增</Button>
        <Dropdown :transfer=true>
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="edit" @click.native="delAll">
              <Icon type="md-trash"></Icon>
              批量删除
            </DropdownItem>
            <DropdownItem name="delete" @click.native="getDataList">
              <Icon type="md-refresh"></Icon>
              刷新
            </DropdownItem>
            <DropdownItem name="delete" @click.native="exportData">
              <Icon type="md-refresh"></Icon>
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
						<Button type="primary" @click="handleEdit(row, index)" size="small">查看</Button>
            <Dropdown :transfer=true trigger="hover">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="edit" @click.native="handleEdit(row, index)">
                  <Icon type="ios-create-outline" />
                  修改
                </DropdownItem>
                <DropdownItem name="delete" @click.native="deleteData(row, index)">
                  <Icon type="md-trash"></Icon>
                  删除
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
					</template>
				</Table>
			</Row>
			<Row type="flex" justify="end" class="page">
				<Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
			</Row>
		</Card>
    <!--图片预览-->
    <div class="images" v-viewer="{movable: false}" >
      <img v-for="(item, i)  in images" :src="item" :key="Math.random()" style="display: none; ">
    </div>
		<updateTRiskSources v-model="updateShow" :TRiskSourcesId="TRiskSourcesId" :modalTitle="title" v-on:handleSearch="handleSearch"></updateTRiskSources>
	</div>
</template>
<script>
	import {deleteTRiskSources, queryTRiskSourcesList} from '@/api/tRiskSources/tRiskSources'
	import updateTRiskSources from './updateTRiskSources'
  	import { formartDate, nginxUrl } from '@/api/tools/tool'
	export default {
		components: {
			updateTRiskSources,
		},
		data() {
			return {
			  menuList:[
          {
            "label":"45",
            "value":"45"
          },
          {
            "label":"45",
            "value":"45"
          },
          {
            "label":"45",
            "value":"45"
          },
        ],
        visible:false,
        images:[],
				search: '',
				data: [],
				columns: this.getTRiskSourcesColumns(),
				openSearch: true,//打开搜索
				openTip: true,//打开提示
				loading: true, // 表单加载状态
				selectCount: 0, // 多选计数
				selectList: [], // 多选数据
				searchForm: {
					// 搜索框对应data对象
					value: '',//查询
					pageNumber: 1, // 当前页数
					pageSize: 10, // 页面大小
					startDate: '',//开始时间
					endDate: '',//结束时间
					sort: 'createTime', // 默认排序字段
					order: 'desc' // 默认排序方式
				},
				total: 0,
				title: '',
				TRiskSourcesId: '',
				updateShow: false,
				tableHeight: 200,
        colOptions: ["风险名称", "风险类型","图片(点击预览)","风险描述","所处地点", "地理坐标","风险等级","可能导致事故","操作"], //默认全选
        colSelect: ["风险名称", "风险类型","图片(点击预览)","风险描述","所处地点", "地理坐标","风险等级","可能导致事故","操作"],
			}
		},
   methods: {
			//新增
			addTRiskSources() {
			this.title = '新增';
				this.updateShow = true
				this.TRiskSourcesId='';
			},
			//编辑
			handleEdit(row, index) {
			this.title = '编辑';
				this.TRiskSourcesId=row.id.toString();
				this.updateShow = true;
			},
			//分页查询
			getDataList() {
				this.loading = true;
				this.searchForm.id = null;
				queryTRiskSourcesList(this.searchForm).then(res => {
					if(res && res.success) {
						this.loading = false;
						this.data = res.data.records;
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
					deleteTRiskSources({ids:ids}).then(res => {
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
				this.searchForm.value = 10;
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
			getTRiskSourcesColumns() {
				let columnss = [
					{
						type: 'selection',
						width: 60,
						align: 'center',
					},
          {
            title: '风险名称',
            align: 'center',
            key: 'name',
            sortable: false
          },
					{
						title: '风险类型',
						align: 'center',
						key: 'type',
						sortable: false
					},
					{
						title: '图片(点击预览)',
						align: 'center',
						key: 'imgPath',
            width:140,
						sortable: false,
            render: (h, params) => {
						  if(params.row.imgPath){
                  return  h('img',{
                    style: {
                      cursor: "pointer",
                      width: "50%",
                      height: "50px",
                      "object-fit": "contain",
                    },
                    attrs: {
                      alt:"暂无",
                      src: nginxUrl+params.row.imgPath,
                    },
                    on: {
                      click: () => {
                        this.showFile(params.row);
                      }
                    }
                  })
              }else {
                return  h("div","暂无")
              }
            }
					},
					{
						title: '风险描述',
						align: 'center',
						key: 'description',
						sortable: false
					},
					{
						title: '所处地点',
						align: 'center',
						key: 'address',
						sortable: false
					},
          // {
          //   title: '地理坐标',
          //   align: 'center',
          //   key: 'coordinate',
          //   minWidth:100,
          //   sortable: false
          // },
					{
						title: '风险等级',
						align: 'center',
						key: 'riskLevel',
						sortable: false
					},
					{
						title: '可能导致事故',
						align: 'center',
						key: 'mayCause',
						sortable: false
					},
					{
						title:'操作',
						align: 'center',
						slot: 'action',
            fixed: "right",
            width:200,
					}
				];
        this.initTableColumn(columnss);
        return columnss;
			},
     //title提示
     initTableColumn(columnss) {
       //  title提示
       for (let i = 0; i < columnss.length; i++) {
         if ( columnss[i]. type!= 'selection' && columnss[i]. title!= '操作' && columnss[i]. title .indexOf("时间")==-1) {
           if(!columnss[i].render){
             this.$set(columnss[i], 'render', (h, params) => {
               return h('div', [
                 h('span', {
                   style: {
                     display: 'block',
                     width: '100%',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis',
                     whiteSpace: 'nowrap'
                   },
                   domProps: {
                     title: params.row[params.column.key]
                   }
                 }, params.row[params.column.key])
               ])

             });
           }
           this.$set(columnss[i], 'renderHeader', (h, params) => {
             return h('div', [
               h('span', {
                 style: {
                   display: 'inline-block',
                   width: '100%',
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                   whiteSpace: 'nowrap',
                   marginBottom: '-6px'
                 },
                 domProps: {
                   title: params.column.title
                 }
               }, params.column.title)
             ])

           })
         }

       }
     },
     //预览文件
     showFile(row){
       this.images = [];
       this.images.push(nginxUrl+row.imgPath);
       const viewer = this.$el.querySelector('.images').$viewer;
       viewer.show()
     },
     //动态列改变
     checkboxChange(data){
       var columnss =  this.getTRiskSourcesColumns();
       this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
     },
     //导出本页
     exportData(){
       let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
       this.$refs.table.exportCsv({
         filename: '本页数据',
         columns: excolumns,
         data:this.data
       });
     }
		},
    //页面加载执行
		mounted() {
		  //获取列表数据
			this.getDataList();
			//this.tableHeight = window.innerHeight - this.$refs.tRiskSourcesTable.$el.offsetTop - 270
		}
	}
</script>
<style scoped="less">
	 .operation{
		margin-bottom: 10px;
	}
</style>
