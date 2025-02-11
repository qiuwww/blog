<style lang="less" scoped>
    .qiniu{

    }
</style>
<template>
    <div class="search qiniu" >
		<Card>
			<Row v-show="openSearch" @keydown.enter.native="handleSearch">
                <Form ref="searchForm" :model="searchForm" inline :label-width="70">
					<Form-item label="文件名称">
						<Input v-model="searchForm.key" placeholder="请输入文件名称" />
					</Form-item>
					<Form-item label="时间日期">
						<DatePicker type="datetimerange" style="width:190px;" :editable="false" v-model="time" placeholder="开始时间 - 结束时间" @on-change="selectTime" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
					</Form-item>

					<Form-item style="margin-left:-65px" class="br">
						<Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
						<Button @click="handleReset">重置</Button>
					</Form-item>
				</Form>
			</Row>

            <Row class="operation">
				<Button @click="UploadLocal" type="primary" icon="ios-cloud-upload">上传</Button>
				<Button @click="synchronize" type="warning" icon="ios-sync" :loading="sync">同步</Button>
				<Button @click="doConfig" type="success" icon="md-settings">配置</Button>
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
								<checkbox v-for="(item,i) in colSelect" :label="item" :key="item" ></checkbox>
							</Checkbox-group>
						</div>
					</Poptip>
				</div>
			</Row>

            <Row v-show="openTip" style="margin-top:10px;">
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
						<Button type="error" @click="deleteData(row, index)" size="small"><Icon type="ios-trash"/>删除</Button>
					</template>
				</Table>
			</Row>
            <Row type="flex" justify="end" class="page">
				<Page :transfer=true :current="searchForm.page" :total="total" :page-size="searchForm.size" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
			</Row>
		</Card>

        <!-- 七牛云配置 -->
        <Modal v-model="showLocal" title="编辑文件" @on-ok="localOk" :loading="Localloading">
            <Form ref="localForm" :model="localForm" :rules="ruleLocal" :label-width="110">
                <Form-item label="Access Key" prop="accessKey">
                    <Input v-model="localForm.accessKey" placeholder="accessKey，在安全中心，秘钥管理中查看" />
                </Form-item>
                <Form-item label="Secret Key" prop="secretKey">
                   <Input v-model="localForm.secretKey" placeholder="secretKey，在安全中心，秘钥管理中查看" />
                </Form-item>
                <Form-item label="空间名称" prop="bucket">
                   <Input v-model="localForm.bucket" placeholder="存储空间名称作为唯一的Bucket识别符" />
                </Form-item>
                <Form-item label="外链域名" prop="host">
                   <Input v-model="localForm.host" placeholder="外链域名，可自定义，需在七牛云绑定" />
                </Form-item>
                <Form-item label="存储区域">
                   <Select v-model="localForm.zone" style="width:200px" placeholder="请选择存储区域">
                        <Option v-for="(item, i)  in zoneList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="空间类型" prop="type">
                   <RadioGroup v-model="localForm.type">
                        <Radio label="公开" true-value="公开"></Radio>
                        <Radio label="私有" true-value="私有"></Radio>
                    </RadioGroup>
                </Form-item>
            </Form>
        </Modal>

        <!-- 上传 -->
        <Modal v-model="showUpload" title="上传文件" @on-ok="uploadOk" :loading="LocalLoading">
            <Upload ref="upload" multiple type="drag" :action="qiNiuUploadApi" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>上传文件</p>
                </div>
            </Upload>
        </Modal>
    </div>
</template>
<script>
import {getQiniuAll,sync,update,del} from '@/api/tools/qiniu'
import { mapGetters } from 'vuex'
import { formartDate } from '@/api/tools/tool'
export default {
    computed: {
        ...mapGetters([
          'qiNiuUploadApi'
        ])
    },
    data() {
        return {
            openSearch:true,
            loading:false,
            columns:this.getQinNiuColumns(),
            data:[],
            total:0,
            searchForm:{
                key:'',
                c:'',
                page:1,
                size:10,
                sort:'id,desc',
            },
            openTip:true,
            selectCount:0,
            colOptions:["文件名","文件类型","空间名称","文件大小","空间类型","创建日期","操作"],
            colSelect:["文件名","文件类型","空间名称","文件大小","空间类型","创建日期","操作"],
            time:null,
            sync:false,
            zoneList:[
                {value:'华东',label:"华东"},
                {value:'华北',label:"华北"},
                {value:'华南',label:"华南"},
                {value:'北美',label:"北美"},
                {value:'东南亚',label:"东南亚"},
            ],
            showLocal:false,
            localForm:{
                accessKey:'',
                secretKey:'',
                bucket:'',
                host:'',
                zone:'',
                type:'公开'
            },
            ruleLocal:this.ruleValidate(),
            Localloading:false,
            showUpload:false,
            LocalLoading:false,
            file:null,
        }
    },
    methods:{
        uploadSuccess(response, file, fileList){//上传成功
            if(response){
                this.$Message.success('上传成功');
            }
        },
        uploadError(error, file, fileList){//上传失败
            if(error){
                this.$Message.error('上传失败');
            }
        },
        handleUpload (file) {
            this.file = file;
            return false;
        },
        uploadOk(){
            this.$refs.upload.post(this.file);
            this.getDataList();
        },
        localOk(){
            this.Localloading = true;
            update(this.localForm).then(res => {
                this.Localloading = false;
                if(!res){
                    this.$Message.success('数据配置成功');
                }
            })
        },
        doConfig(){//配置
            this.$refs.localForm.resetFields();
            this.showLocal = true;
        },
        synchronize(){//同步
            this.sync = true;
            sync().then(res => {
                this.$Message.success('数据同步成功');
            }).catch(err => {
                this.sync = false;
             });
        },
        selectTime(v){//选择时间
            this.searchForm.c = v;
        },
        UploadLocal(){//上传
            this.showUpload = true;
        },
        handleDropdown(name){//更多操作
            if (name == "refresh") {
                this.getDataList();
            } else if (name == "removeAll") {
                this.delAll();
            }else if (name == "export") {
                let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
                this.$refs.table.exportCsv({
                    filename: '本页数据',
                    columns: excolumns,
                    data:this.data
                });
            }
        },
        clearSelectAll(){//清空选择
            this.$refs.table.selectAll(false);
        },
        changePage(v){//改变页码
            this.searchForm.page = v;
            this.getDataList();
            this.clearSelectAll();
        },
        changePageSize(v){//改变每页显示数据的条数
            this.searchForm.size = v;
            this.getDataList();
        },
        changeSort(e){
            this.searchForm.sort = e.key;
            this.searchForm.order = e.order;
            if(e.order == 'normal') {
                this.searchForm.order = '';
            }
            this.getDataList();
        },
        showSelect(e){//选择
            this.selectList = e;
            this.selectCount = e.length;
        },
        delAll(){
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
        deleteData(row,index){//删除
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
        //删除（后台）
        patchdeleteData(ids) {
            if(ids == undefined || ids == null || ids.length == 0) {
                this.$Message.error('没有选择的数据');
                    return;
                }
                del(ids).then(res => {
                    this.userLoading = false;
                    this.$Modal.remove();
                    if(!res) {
                        this.modalTaskVisible = false;
                        this.$Message.success('删除成功');
                        this.getDataList();
                    } else {
                        this.$Message.error('删除失败');
                    }
            });
        },
        handleSearch(){//搜索
            this.searchForm.page = 1;
            this.searchForm.size = 10;
            this.getDataList();
        },
        handleReset(){//重置
            this.$refs.searchForm.resetFields();
            this.time = null;
            this.searchForm.c = '',
            this.searchForm.key = '',
            this.searchForm.page = 1;
            this.searchForm.size = 10;
            // 重新加载数据
            this.getDataList();
        },
        getDataList() {//分页查询
            this.loading = true;
            this.searchForm.id = null;
            getQiniuAll(this.searchForm).then(res => {
                if(res.content) {
                    this.loading = false;
                    this.data = res.content;
                    this.total = res.totalElements;
                }
            });
        },
        getQinNiuColumns(){//获取列表字段
            return [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '文件名',
                    align: 'center',
                    tooltip:true,
                    key: 'bucket',
                    sortable: false
                },
                {
                    title: '文件类型',
                    align: 'center',
                    tooltip:true,
                    key: 'suffix',
                    sortable: false
                },
                {
                    title: '空间名称',
                    align: 'center',
                    tooltip:true,
                    key: 'url',
                    sortable: false
                },
                {
                    title: '文件大小',
                    align: 'center',
                    tooltip:true,
                    key: 'size',
                    sortable: false
                },
                {
                    title: '空间类型',
                    align: 'center',
                    tooltip:true,
                    key: 'type',
                    sortable: false
                },
                {
                    title: '创建日期',
                    align: 'center',
                    tooltip:true,
                    key: 'updateTime',
                    sortable: false,
                    render: (h, params) => {
                        return h('Tooltip',{
                            props:{
                                content:formartDate(params.row.updateTime, 'yyyy-MM-dd HH:mm:ss'),
                                placement:'bottom',
                                transfer:true
                            }
                        },formartDate(params.row.updateTime, 'yyyy-MM-dd HH:mm:ss'))
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
        checkboxChange:function (data) { //动态列实现
            var columnss =  this.getQinNiuColumns();
            this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
        },
        ruleValidate(){
            return {
                accessKey: [
                    { required: true, message: '请输入accessKey', trigger: 'blur' }
                ],
                secretKey: [
                    { required: true, message: '请输入secretKey', trigger: 'blur' }
                ],
                bucket: [
                    { required: true, message: '请输入空间名称', trigger: 'blur' }
                ],
                host: [
                    { required: true, message: '请输入外链域名', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '空间类型不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.getDataList();
    }
}
</script>
