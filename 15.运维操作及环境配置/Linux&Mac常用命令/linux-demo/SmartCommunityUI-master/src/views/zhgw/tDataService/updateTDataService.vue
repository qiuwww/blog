<style lang="less" scoped>
	.tDataService{
		.form-item-input {
			width: 200px;
		}
		.ivu-form-item-error-tip {
			left: 80px;
		}
		 .ivu-form .ivu-form-item-label {
			width: 120px;
		}
		 /* .ivu-input-wrapper {
			 width: 190px;
		} */
		/* .ivu-select{
			width: 190px !important;
		} */
	}
</style>
<style lang="less">
	.tDataService{
		.ivu-dropdown {
			position: absolute;
			bottom: -1px;
			right: 10px;
		}
		.ivu-dropdown .ivu-select-dropdown {
			width: 200px;
			left: -178px !important;
		}
	}
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" width="620px">
		<Form ref="tDataServiceForm" :model="tDataServiceForm" :label-width="90" :rules="tDataServiceFormRule" class="tDataService">
			<Row>
				<Col span="12">
					<FormItem label="服务名称" prop="name">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="tDataServiceForm.name" placeholder="请输入服务名称"/>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="级别" prop="level">
						<Input disabled type="text" :maxlength=50 v-model="tDataServiceForm.level" placeholder="请输入级别"/>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="服务格式" prop="type">
						<Select  v-bind:disabled="disabled"  v-model="tDataServiceForm.type" placeholder="请选择服务格式" clearable ><!-- @on-clear="clearService" -->
							<Option v-for="(item, i) in typePriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="上级服务" prop="pid">
						<i-input v-model="selectModel" placeholder="请选择上级服务" readonly></i-input>
						<Dropdown trigger="custom" :visible="departVisible" placement="bottom-end" >
							<a href="javascript:void(0)" @click="departVisible=!departVisible">
								<Icon type="ios-arrow-down" class="departVisibleSelectIcon"></Icon>
							</a>
							<DropdownMenu slot="list" style="max-height: 200px;overflow-y: auto">
								<Tree v-bind:data="pidPriority" @on-select-change="handleCheckChange"></Tree>
							</DropdownMenu>
						</Dropdown>
						<!-- <Select  v-bind:disabled="disabled"  v-model="tDataServiceForm.pid" placeholder="请选择上级服务" clearable >
							<Option v-for="(item, i) in typePriority" :key="item.id" :value="item.value.toString()">{{item.label}}</Option>
						</Select> -->
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="服务类型" prop="format">
						<!-- <Input type="text" :maxlength=100 v-model="tDataServiceForm.format" placeholder="请输入服务类型"/> -->
						<Select  v-bind:disabled="disabled"  v-model="tDataServiceForm.format" placeholder="请选择服务类型" clearable >
							<Option v-for="(item, i) in formatProperty" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="是否选中" prop="checked">
						<RadioGroup v-bind:disabled="disabled" v-model="tDataServiceForm.checked">
						 	<Radio :label="1">是</Radio>
						 	<Radio :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="服务地址" prop="url">
						<Input v-bind:disabled="disabled" :rows="2" type="textarea" v-model="tDataServiceForm.url" placeholder="请输入服务地址" style="width:100%;"/>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="服务参数" prop="params">
						<Input v-bind:disabled="disabled"  :rows="2" type="textarea"  v-model="tDataServiceForm.params" placeholder="请输入服务参数" style="width:100%;"/>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="备注" prop="remarks">
						<Input v-bind:disabled="disabled"  :rows="2" type="textarea"  v-model="tDataServiceForm.remarks" placeholder="请输入备注" style="width:100%;"/>
					</FormItem>
				</Col>
			</Row>
		</Form>
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
			<Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
		</div>
	</Modal>
</template>
<script>
	import {queryTDataServiceList} from '@/api/zhgw/tDataService/tDataService'
	import {treeData,addTDataService,updateTDataService,getTDataService} from '@/api/zhgw/tDataService/tDataService'
	import { getDictDataByType } from '@/api/index';
	import { formartDate } from '@/api/tools/tool'
	export default {
		name: "updateTDataService",
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TDataServiceId: {
				type: String
			},
			modalTitle: {
				type: String
			}
		},
		data() {
			return {
				show: this.value,
				editTitle: this.modalTitle,
				loading: true,
				disabled:false,
				typePriority :[],
				tDataServiceForm: {
					pid:'',
					name:'',
					params:null,
					checked:'',
					type:'',
					remarks:'',
					format:'',
					url:'',
					level:'',
				},
				tDataServiceFormRule: this.getTDataServiceFormRule(),
				departVisible:false,
				selectModel:'',
				pidPriority:[],
				formatProperty:[],
			}
		},
		methods: {
			//判断是否是JSON
			isJSON(str) {
				if (typeof str == 'string') {
					try {
						var obj=JSON.parse(str);
						if(typeof obj == 'object' && obj ){
							return true;
						}else{
							return false;
						}
					} catch(e) {
						return false;
					}
				}
			},
			//清空服务类型
			/* clearService(){
				this.tDataServiceForm.type = "";
			}, */
			//初始化树数据
			initTree(){
				/* queryTDataServiceList(this.searchForm).then(res => {
					if(res.data) {
						this.pidPriority = this.getTreeData(res.data.records);
					}
				}); */
				treeData().then(res => {
                    if(res && res.success){
                        this.pidPriority = this.getTreeData(res.data.records);
                    }
                });
			},
			//初始化树结构
			getTreeData(data){
				if (data) {
					for (let i in data) {
						var item = data[i];
						data[i].title = data[i].name;
						data[i].value = data[i].id;
						data[i].expand = false;
						if (data[i].children) {
							data[i].children = this.getTreeData(data[i].children);
						}
					}
				}
				return data;
			},
			//服务树点击事件
			handleCheckChange(data){
				this.tDataServiceForm.pid = data[0].id;
				this.tDataServiceForm.level = (parseInt(data[0].level) + 1).toString();
				this.selectModel = data[0].name;
				this.departVisible = false;
			},
			getTypePriority(){
				getDictDataByType('type').then(res => {
					if (res && res.success) {
						 this.typePriority = res.data;
					}
				});
				getDictDataByType('service_format').then(res => {
					if (res && res.success) {
						 this.formatProperty = res.data;
					}
				});
			},
			handelSubmit() {
				this.$refs['tDataServiceForm'].validate((valid) => {
					if (valid) {
						this.loading = true;
						if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
							this.tDataServiceForm.id=this.TDataServiceId;
							if(this.tDataServiceForm.params && this.tDataServiceForm.params != undefined){
								if(!this.isJSON(this.tDataServiceForm.params.replace(/\s*/g,""))){//判断是否是JSON
									try  {
										this.tDataServiceForm.params = JSON.stringify(eval("(" + this.tDataServiceForm.params.replace(/\s*/g,"") + ")"));
									}catch(exception) {
										this.$Message.error('请输入正确格式的服务参数！');
										this.loading = false;
										return;
									}
								}
							}
							if(this.tDataServiceForm.type == undefined){
								this.tDataServiceForm.type = "";
							}
							updateTDataService(this.tDataServiceForm).then(res => {
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('修改成功');
									this.loading = false;
								}else{
									this.$Message.error(res.msg);
									this.loading = false;
								}
							}).catch(err => {
								this.loading = false;
							})
						}else{
							if(this.tDataServiceForm.params && this.tDataServiceForm.params != undefined){
								if(!this.isJSON(this.tDataServiceForm.params.replace(/\s*/g,""))){//判断是否是JSON
									try  {
										this.tDataServiceForm.params = JSON.stringify(eval("(" + this.tDataServiceForm.params.replace(/\s*/g,"") + ")"));
									}catch(exception) {
										this.$Message.error('请输入正确格式的服务参数！');
										this.loading = false;
										return;
									}
								}
							}
							if(this.tDataServiceForm.type == undefined){
								this.tDataServiceForm.type = "";
							}
							addTDataService(this.tDataServiceForm).then(res => {
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
									this.loading = false;
								}else{
									this.$Message.error(res.msg);
									this.loading = false;
								}
							}).catch(err => {
								this.loading = false;
							})
						}
					} else {
							// this.loading = true;
							this.$Message.error('表单验证不通过！');
					}
					/* setTimeout(() => {
						this.loading = false;
						this.$nextTick(() => {
							this.loading = true;
						});
					}, 1000); */
				});
			},
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.tDataServiceForm= {
					pid:'0',
					name:'',
					params:null,
					checked:'',
					type:'',
					remarks:'',
					format:'',
					url:'',
					level:'1',
				};
				this.selectModel = '';
				this.departVisible = false;
			},
			getTDataServiceFormRule() {
				return {
					name: [
						{required: true, message: '服务名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					/* params: [
						{required: true, message: '服务参数不能为空！', trigger: 'blur',pattern: /.+/ },
					], */
					checked: [
						{required: true,pattern:/^[0-9]+$/, message: '是否选中不能为空！', trigger: 'blur' },
					],
					/* type: [
						{required: true, message: '服务类型不能为空！', trigger: 'blur',pattern: /.+/ },
					], */
					/* remarks: [
						{required: true, message: '备注不能为空！', trigger: 'blur',pattern: /.+/ },
					], */
					/* format: [
						{required: true, message: '服务格式不能为空！', trigger: 'blur'},
						{type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'blur'}
					], */
					/* url: [
						{required: true, message: '服务地址不能为空！', trigger: 'blur'},
						{type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'blur'}
					], */
					level: [
						{required: true, message: '级别不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
				}
			}
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.initTree();
				this.getTypePriority();
				this.initForm();
				this.loading=false;
				this.editTitle = this.modalTitle;
				if(val) {
					this.$refs['tDataServiceForm'].resetFields();
					if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
						getTDataService({id: this.TDataServiceId}).then(res => {
							if (res && res.code == 200) {
								this.tDataServiceForm.pid = res.data.pid;
								this.tDataServiceForm.name = res.data.name;
								this.tDataServiceForm.params = res.data.params;
								this.tDataServiceForm.checked = res.data.checked;
								this.tDataServiceForm.type = res.data.type;
								this.tDataServiceForm.remarks = res.data.remarks;
								this.tDataServiceForm.format = res.data.format;
								this.tDataServiceForm.url = res.data.url;
								this.tDataServiceForm.level = res.data.level;
								if(res.data.pid!="0"){
									getTDataService({id:res.data.pid}).then(re => {
										this.selectModel = re.data.name;
									})
								}
							} else {
								this.$Message.error(res.msg);
							}
						});
					}
				} else {
					this.closeModal(val);
				}
			}
		}
	}
</script>
