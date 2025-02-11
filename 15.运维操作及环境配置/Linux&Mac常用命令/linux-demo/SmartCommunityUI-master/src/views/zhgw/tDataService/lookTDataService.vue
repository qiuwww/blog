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
		 .ivu-input-wrapper {
			 width: 190px;
		}
		.ivu-select{
			width: 190px !important;
		}
	}
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" width="620px">
		<Form ref="tDataServiceForm" :model="tDataServiceForm" :label-width="90" class="tDataService"><!-- :rules="tDataServiceFormRule" -->
			<Row>
				<Col span="12">
					<FormItem label="服务名称" prop="name">
						{{tDataServiceForm.name}}
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="级别" prop="level">
						{{tDataServiceForm.level}}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="服务类型" prop="format">
						<p style="word-wrap:break-word;">{{tDataServiceForm.format}}</p>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="服务格式" prop="type">
						{{tDataServiceForm.type}}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="是否选中" prop="checked">
						{{tDataServiceForm.checked}}
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="服务地址" prop="url">
						<p style="word-wrap:break-word;">{{tDataServiceForm.url}}</p>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="服务参数" prop="params">
						<p style="word-wrap:break-word;">{{tDataServiceForm.params}}</p>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="24">
					<FormItem label="备注" prop="remarks">
						{{tDataServiceForm.remarks}}
					</FormItem>
				</Col>
			</Row>
		</Form>
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
		</div>
	</Modal>
</template>
<script>
	import {addTDataService,updateTDataService,getTDataService} from '@/api/zhgw/tDataService/tDataService'
	import { getDictDataByType } from '@/api/index';
	import { formartDate } from '@/api/tools/tool'
	export default {
		name: "lookTDataService",
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
					name:'',
					params:'',
					checked:'',
					type:'',
					remarks:'',
					level:'',
					format:'',
					url:'',
				},
				formatProperty:[],
				// tDataServiceFormRule: this.getTDataServiceFormRule(),
			}
		},
		methods: {
			getTypePriority(){
				getDictDataByType('type').then(res => {//服务类型
					if (res && res.success) {
						 this.typePriority = res.data;
					}
                });
                getDictDataByType('service_format').then(res => {//服务格式
					if (res && res.success) {
						 this.formatProperty = res.data;
					}
				});
			},
			handelSubmit() {
				this.$refs['tDataServiceForm'].validate((valid) => {
					if (valid) {
						if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
							this.tDataServiceForm.id=this.TDataServiceId;
							updateTDataService(this.tDataServiceForm).then(res => {
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error(res.msg);
								}
							})
						}else{
							addTDataService(this.tDataServiceForm).then(res => {
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error(res.msg);
								}
							})
						}
					} else {
							this.loading = true;
						this.$Message.error('表单验证不通过！');
					}
					setTimeout(() => {
						this.loading = false;
						this.$nextTick(() => {
							this.loading = true;
						});
					}, 1000);
				});
			},
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.tDataServiceForm= {
					name:'',
					params:'',
					checked:'',
					type:'',
					remarks:'',
					level:'',
					format:'',
					url:'',
				};
			},
			getTDataServiceFormRule() {
				return {
					name: [
						{required: true, message: '服务名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					params: [
						{required: true, message: '服务参数不能为空！', trigger: 'blur',pattern: /.+/ },
					],
					checked: [
						{required: true,pattern:/^[0-9]+$/, message: '是否选中(0选中，1不选中)不能为空！', trigger: 'blur' },
					],
					type: [
						{required: true, message: '服务类型不能为空！', trigger: 'blur',pattern: /.+/ },
					],
					remarks: [
						{required: true, message: '备注不能为空！', trigger: 'blur',pattern: /.+/ },
					],
					level: [
						{required: true, message: '级别不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
				}
			}
		},
		/* mounted(){
			this.getTypePriority();
		}, */
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.initForm();
				this.loading=false;
				this.editTitle = this.modalTitle;
				if(val) {
					this.$refs['tDataServiceForm'].resetFields();
					if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
						getTDataService({id: this.TDataServiceId}).then(res => {
							if (res && res.code == 200) {
								this.tDataServiceForm.name = res.data.name;
								this.tDataServiceForm.params = res.data.params;
								if(res.data.checked=="0"){
									this.tDataServiceForm.checked = "是";
								}else if(res.data.checked=="1"){
									this.tDataServiceForm.checked = "否";
								}
								/* let arr = this.typePriority.filter(item => {
									return item.id == res.data.type
								})
								if(arr.length>0){
									this.tDataServiceForm.type = arr[0].label;
								} */
								this.tDataServiceForm.type = res.data.typeName;
								this.tDataServiceForm.remarks = res.data.remarks;
								this.tDataServiceForm.level = res.data.level;
								this.tDataServiceForm.url = res.data.url;
								/* let formatArr = this.formatProperty.filter(item => {
									return item.id == res.data.format;
								})
								if(formatArr.length>0){
									this.tDataServiceForm.format = formatArr[0].label;
								} */
								this.tDataServiceForm.format = res.data.formatName;
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
