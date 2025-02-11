<template>
    <div class="search local" >
		<Card>
            <Row v-show="openSearch" @keydown.enter.native="handleSearch">
				<Form ref="searchForm" :model="searchForm" inline :label-width="70">
					<Form-item label="搜索内容">
						<Input v-model="searchForm.blurry" placeholder="请输入内容模糊搜索" />
					</Form-item>
					<Form-item label="创建时间">
						<DatePicker type="datetimerange" style="width:190px;" :editable="false" v-model="time" placeholder="开始时间 - 结束时间" @on-change="selectTime" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
					</Form-item>
					<Form-item style="margin-left:-70px" class="br">
						<Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
						<Button @click="handleReset">重置</Button>
					</Form-item>
				</Form>
			</Row>

            <Row class="operation">
				<Button @click="UploadLocal" type="primary" icon="ios-cloud-upload">上传</Button>
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
						<Button type="warning" @click="handleEdit(row, index)" size="small"><Icon type="ios-create"/>修改</Button>
						<Button type="error" @click="deleteData(row, index)" size="small"><Icon type="ios-trash"/>删除</Button>
					</template>
				</Table>
			</Row>
            <Row type="flex" justify="end" class="page">
				<Page :transfer=true :current="searchForm.page" :total="total" :page-size="searchForm.size" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
			</Row>
		</Card>

        <!-- 修改弹窗 -->
        <Modal v-model="showEdit" title="编辑文件" @on-ok="editOk">
            <Form ref="editForm" :model="editForm" :label-width="60">
                <Form-item label="文件名">
                    <Input v-model="editForm.name" placeholder="请输入文件名" />
                </Form-item>
            </Form>
        </Modal>

        <!-- 上传弹出 -->
        <Modal v-model="showUpload" title="编辑文件" @on-ok="uploadOk" :loading="uploadLoading">
            <Form ref="uploadForm" :model="uploadForm" :label-width="60">
                <Form-item label="文件名">
                    <Input v-model="uploadForm.name" placeholder="请输入文件名" />
                </Form-item>
                <Form-item label="上传">
                    <Upload ref="upload" type="drag" :headers="headers" :before-upload="handleUpload" :action="fileUploadApi + '?name=' + uploadForm.name" :max-size="102400"
                    :on-success="uploadSuccess" :on-error="uploadError">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>添加文件</p>
                        </div>
                    </Upload>
                    <div v-if="file">{{ file.name }}</div>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import {getLocalAll,edit,del,add} from '@/api/tools/localStorage'
import { formartDate } from '@/api/tools/tool'
export default {
    computed: {
        ...mapGetters([
            'fileUploadApi'
        ])
    },
    data() {
        return {
            loading:false,
            columns:this.getLocalColumns(),
            data:[],
            searchForm:{
                blurry:'',
                createTime:'',
                page:1,
                size:10,
                sort:'id,desc'
            },
            total:0,
            selectCount:0,
            openTip:true,
            openSearch: true,//打开搜索
            colOptions:["文件名","预览图","文件类型","类别","大小","操作人","创建时间","操作"],
            colSelect:["文件名","预览图","文件类型","类别","大小","操作人","创建时间","操作"],
            time:null,
            showEdit:false,
            editForm:{
                id:'',
                name:'',
            },
            userLoading:false,
            selectList:[],
            showUpload:false,
            uploadForm:{
                name:'',
            },
            headers:{ 'Authorization': getToken() },
            file:null,
            uploadLoading:false,

        }
    },
    methods:{
        handleUpload (file) {
            this.file = file;
            return false;
        },
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
        uploadOk(){
            this.uploadLoading = true;
            this.$refs.upload.post(this.file);
            this.uploadLoading = falsel
            this.getDataList();
        },
        selectTime(v){//选择时间
            this.searchForm.createTime = v;
        },
        handleReset() {//重置
            this.$refs.searchForm.resetFields();
            this.time = null;
            this.searchForm.createTime = '',
            this.searchForm.blurry = '',
            this.searchForm.page = 1;
            this.searchForm.size = 10;
            // 重新加载数据
            this.getDataList();
        },
        handleSearch() {//查询
            this.searchForm.page = 1;
            this.searchForm.size = 10;
            this.getDataList();
        },
       //动态列实现
        checkboxChange:function (data) {
            var columnss =  this.getLocalColumns();
            this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
        },
        handleDropdown(name){//列表上方更多操作
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
        UploadLocal(){//上传
            this.showUpload = true;
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
            this.searchForm.sort = e.key + ',' + e.order;
            if(e.order == 'normal') {
                this.searchForm.sort = e.key;
            }
            this.getDataList();
        },
        showSelect(e){
            this.selectList = e;
            this.selectCount = e.length;
        },
        handleEdit(row,index){//修改
            this.editForm.name = row.name;
            this.editForm.id = row.id;
            this.showEdit = true;
        },
        editOk(){
            edit(this.editForm).then(res => {
                if(!res){
                    this.$Message.success('修改成功');
                }
            })
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
        delAll(){//批量删除
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
        patchdeleteData(ids) {//删除（后台）
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
        getDataList(){//分页查询
            this.loading = true;
            this.searchForm.id = null;
            getLocalAll(this.searchForm).then(res => {
                if(res.content) {
                    this.loading = false;
                    this.data = res.content;
                    this.total = res.totalElements;
                }
            });
        },
        getLocalColumns(){//获取列表字段
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
                    key: 'name',
                    sortable: false
                },
                {
                    title: '预览图',
                    align: 'center',
                    key: 'path',
                    sortable: false,
                    render: (h, params) => {
                        return h('Avatar',{
                            props:{
                                size:'small',
                                src:params.row.path
                            }
                        },params.row.path)
                    }
                },
                {
                    title: '文件类型',
                    align: 'center',
                    tooltip:true,
                    key: 'suffix',
                    sortable: false
                },
                {
                    title: '类别',
                    align: 'center',
                    tooltip:true,
                    key: 'type',
                    sortable: false
                },
                {
                    title: '大小',
                    align: 'center',
                    tooltip:true,
                    key: 'size',
                    sortable: false
                },
                {
                    title: '操作人',
                    align: 'center',
                    tooltip:true,
                    key: 'operate',
                    sortable: false
                },
                {
                    title: '创建时间',
                    align: 'center',
                    tooltip:true,
                    key: 'createTime',
                    sortable: false,
                    width:180,
                    render: (h, params) => {
                        return h('Tooltip',{
                            props:{
                                content:formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'),
                                placement:'bottom',
                                transfer:true
                            }
                        },formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
                    }
                },
                {
                    title:'操作',
                    align: 'center',
                    slot: 'action',
                    width: 200,
                }
            ];
        }
    },
    mounted() {
        this.getDataList();
    }
}
</script>
<style lang="less" scoped>

</style>
